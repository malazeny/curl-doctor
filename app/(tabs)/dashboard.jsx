import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { router, useNavigation } from "expo-router";
import { routineRules } from "../Data/routines";
import { productRecommendations } from "../Data/products";

export default function Dashboard() {
    const [answers, setAnswers] = useState({});
    const [completedTasks, setCompletedTasks] = useState([]);
    const [lastWashDay, setLastWashDay] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const loadAnswers = async () => {
            const savedCheckIns = await AsyncStorage.getItem("weeklyCheckIns");
            if (savedCheckIns) {
                setCheckIns(JSON.parse(savedCheckIns));
            }
            const savedAnswers = await AsyncStorage.getItem("quizAnswers");
            if (savedAnswers) {
                setAnswers(JSON.parse(savedAnswers));
            }
            const savedTasks = await AsyncStorage.getItem("completedTasks");
            if (savedTasks) {
                setCompletedTasks(JSON.parse(savedTasks));
            }
            const savedWashDay = await AsyncStorage.getItem("lastWashDay");
            if (savedWashDay) setLastWashDay(savedWashDay);
            const savedStreak = await AsyncStorage.getItem("streakData");
            if (savedStreak) {
                const { count, days } = JSON.parse(savedStreak);
                setStreak(count || 0);
                setStreakDays(days || [false,false,false,false,false,false,false]);
            }
        };
        loadAnswers();

        const unsubscribe = navigation.addListener("focus", loadAnswers);
        return unsubscribe;
    }, [navigation]);

    const name = answers.name || "there";  
    const [checkIns, setCheckIns] = useState([]);
    const latestCheckIn = checkIns[0];
    const [streak, setStreak] = useState(0);
    const [streakDays, setStreakDays] = useState([false,false,false,false,false,false,false]);
    
    const concerns = Array.isArray(answers[5])
        ? answers[5] 
        : [answers[5]];

    const goals = Array.isArray(answers[10])
        ? answers[10] 
        : [answers[10]];

    const curlTips = [
        "Tip: Scrunch out the crunch after your gel fully dries.",
        "Tip: Refresh with water + leave-in before styling today.",
        "Tip: Pineapple your hair tonight to preserve your curls.",
        "Tip: Deep condition once a week for maximum moisture.",
        "Tip: Use a microfiber towel — regular towels cause frizz.",
        "Tip: Apply products to soaking wet hair for better definition.",
        "Tip: Low manipulation = less breakage. Let your curls rest.",
    ];
    const dailyTip = curlTips[new Date().getDay()];
    
    const selectedNeeds = [...concerns, ...goals].filter(Boolean);

    const dailyTasks = [];
    const weeklyTasks = [];
    const products = [];

    selectedNeeds.forEach((need) => {
        const rules = routineRules[need];

        if (rules) {
            dailyTasks.push(...rules.daily);
            weeklyTasks.push(...rules.weekly);
        }

        if (productRecommendations[need]) {
            products.push(...productRecommendations[need]);
        }
    });

    const todayTask = [...new Set(dailyTasks)][0] || "Refresh and check in with your curls today.";
    const weeklyTask = [...new Set(weeklyTasks)][0] || "Keep your routine consistent this week.";
    const uniqueProducts = [...new Set(products)].slice(0, 3);

    const toggleTask = async (task) => {
        const updatedTasks = completedTasks.includes(task)
            ? completedTasks.filter((item) => item !== task)
            : [...completedTasks, task];
    
        setCompletedTasks(updatedTasks);
        await AsyncStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
    
        const totalTasks = [...new Set(dailyTasks)].slice(0, 3).length;
        const allDone = updatedTasks.length >= totalTasks;
    
        if (allDone) {
            const todayIndex = new Date().getDay();
            const updatedDays = [...streakDays];
            updatedDays[todayIndex] = true;
            const newStreak = updatedDays.filter(Boolean).length;
            setStreakDays(updatedDays);
            setStreak(newStreak);
            await AsyncStorage.setItem("streakData", JSON.stringify({ count: newStreak, days: updatedDays }));
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    const getWashDayText = () => {
        if (!lastWashDay) return "No wash day logged yet.";
        const last = new Date(lastWashDay);
        const today = new Date();
        const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return "You washed your hair today!";
        if (diffDays === 1) return "Last wash day was yesterday.";
        return `Day ${diffDays} since your last wash.`;
    };

    <View style={styles.tipCard}>
        <Text style={styles.tipLabel}>Today's Tip</Text>
        <Text style={styles.tipText}>{dailyTip}</Text>
    </View>

    return (
        <ScrollView
            style={styles.ScrollView}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
        <Text style={styles.greeting}>{getGreeting()}, {name}</Text>
        <Text style={styles.taskTitle}>
        Here's what your curls need today.
        </Text>

        <View style={styles.streakCard}>
            <View style={styles.streakHeader}>
                <Text style={styles.cardTitle}>Curl Streak</Text>
                <Text style={styles.streakCount}>{streak} days</Text>
            </View>
            <View style={styles.streakDots}>
                {streakDays.map((done, i) => (
                    <View
                        key={i}
                        style={[styles.dot, done && styles.dotFilled]}
                    />
                ))}
            </View>
                <Text style={styles.item}>
                {streak > 0
                    ? `${streak} day streak — keep it going!`
                    : "Complete today's tasks to start your streak."}
                </Text>
            </View>

        <View style={styles.heroCard}>
            <View style={styles.checklistHeader}>
                <Text style={styles.cardLabel}>Today's Curl Checklist</Text>
                <Text style={styles.progressText}>
                    {completedTasks.filter(t => [...new Set(dailyTasks)].slice(0,3).includes(t)).length}
                    /{[...new Set(dailyTasks)].slice(0,3).length}
                </Text>
            </View>
            <View style={styles.washDayCard}>
                <Text style={styles.cardTitle}>Wash Day</Text>
                <Text style={styles.item}>{getWashDayText()}</Text>
            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/wash-day")}
            >
                <Text style={styles.primaryButtonText}>Start Wash Day Routine</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.progressBarBg}>
                <View style={[
                    styles.progressBarFill,
                {
                width: `${([...new Set(dailyTasks)].slice(0,3).length > 0
                    ? completedTasks.filter(t => [...new Set(dailyTasks)].slice(0,3).includes(t)).length
                    / [...new Set(dailyTasks)].slice(0,3).length
                    : 0) * 100}%`
                }
                ]} />
        </View>

            {[...new Set(dailyTasks)].slice(0, 3).map((task) => {
                const isCompleted = completedTasks.includes(task);

                return(
                    <TouchableOpacity
                        key = {task}
                        style= {styles.checklistRow}
                        onPress = {() => toggleTask(task)}
                        >
                        <Text style={styles.checkbox}>
                            {isCompleted ? "✓" : ""}
                        </Text>

                        <Text
                            style={[
                                styles.heroText,
                                isCompleted && styles.completedTask,
                            ]}
                        >
                            {task}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>

        <View style={styles.checkIncard}>
        <Text style={styles.cardTitle}>Weekly Check-In</Text>
        <Text style={styles.item}>
            Tell Curl Doctor how your hair is doing this week.
        </Text>

        <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/check-in")}
        >
            <Text style={styles.primaryButtonText}>Start Check-In</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.progressCard}>
    <Text style={styles.cardTitle}>Latest Progress</Text>

    {latestCheckIn ? (
        <>
      <Text style={styles.item}>
        • Hair felt: {latestCheckIn.answers.hairFeeling}
      </Text>
      <Text style={styles.item}>
        • Scalp felt: {latestCheckIn.answers.scalpFeeling}
      </Text>
      <Text style={styles.item}>
        • Routine: {latestCheckIn.answers.routineConsistency}
      </Text>
    </>
    ) : (
    <Text style={styles.item}>
      No weekly check-ins yet.
    </Text>
    )}
    </View>
        <View style={styles.profileCard}>
            <Text style={styles.cardTitle}>Your hair profile</Text>
            <Text style={styles.item}>• Curl Pattern: {answers[1] || "Not Set"}</Text>
            <Text style={styles.item}>• Porosity: {answers[2] || "Not Set"}</Text>
            <Text style={styles.item}>• Density: {answers[3] || "Not Set"}</Text>
            <Text style={styles.item}>• Scalp: {answers[8] || "Not Set"}</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.cardTitle}>Suggested Product Types</Text>

            {uniqueProducts.length > 0 ? (
                uniqueProducts.map((product) => (
                    <Text key={product} style={styles.item}>
                        • {product}
                    </Text>
                ))
            ) : (
                <Text style={styles.item}>No product suggestion yet.</Text>
            )}
        </View>

        {/* <TouchableOpacity 
            style={styles.secondarybutton}
            onPress={() => router.push("/quiz")}
        >
            <Text style={styles.secondaryButtonText}>Update My Hair Profile</Text>
        </TouchableOpacity> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "white",
    },

    container: {
        paddingHorizontal: 24,
        paddingTop: 80, 
        paddingBottom: 30,
    },

    greeting: {
        fontSize: 38,
        fontWeight: "800",
        marginBottom: 8,
        color: "#111",
    },

    taskTitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 28,
    },

    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 28,
    },

    heroCard: {
        backgroundColor: "#111",
        borderRadius: 30,
        marginTop: 20,
        padding: 22,
        marginBottom: 18,
    },

    cardLabel: {
        fontSize: 14,
        color: "#F7F1E8",
        marginBottom: 12,
    },

    heroText: {
        fontSize: 20,
        color: "#fff",
        lineHeight: 30,
        fontWeight: "700",
    },

    card: {
        backgroundColor: "#FFF9F0",
        borderRadius: 26,
        padding: 22,
        marginBottom: 18,
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
        color: "#111",
    },

    checklistRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    checkbox: {
        width: 28, 
        height: 28,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#F7F1E8",
        color: "#F7F1E8",
        textAlign: "center",
        lineHeight: 25, 
        marginRight: 12,
        fontWeight: "700",
    },

    completedTask: {
        textDecorationLine: "line-through",
        opacity: 0.6,
    },

    item: {
        fontSize: 16,
        color: "#333",
        marginBottom: 6,
        lineHeight: 24,
    },

    primaryButton: {
        backgroundColor: "#111",
        paddingVertical: 18,
        borderRadius: 999,
        alignItems: "center",
        marginTop: 12,
        marginBottom: 4,
    },

    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    secondaryButton: {
        paddingVertical: 18,
        alignItems: "center",
    },

    secondaryButtonText:{
      color: "#444",
      fontSize: 16,
      fontWeight: "600",  
    },
    tipCard: {
        backgroundColor: "#E8F4EC",
        borderRadius: 20,
        padding: 18,
        marginBottom: 18,
    },
    tipLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: "#2D6A4F",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 6,
    },
    tipText: {
        fontSize: 15,
        color: "#1B4332",
        lineHeight: 22,
    },

    streakCard: {
        backgroundColor: "#FFF9F0",
        borderRadius: 26,
        padding: 22,
        marginBottom: 18,
    },
    streakHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    streakCount: {
        fontSize: 28,
        fontWeight: "800",
        color: "#C47E5A",
    },
    streakDots: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 12,
    },
    dot: {
        width: 30,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#E5D9C8",
    },
    dotFilled: {
        backgroundColor: "#C47E5A",
    },
    checklistHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    progressText: {
        color: "#F7F1E8",
        fontSize: 14,
        fontWeight: "700",
    },
    progressBarBg: {
        height: 6,
        backgroundColor: "#333",
        borderRadius: 3,
        marginBottom: 16,
    },
    progressBarFill: {
        height: 6,
        backgroundColor: "#F7F1E8",
        borderRadius: 3,
    },
    washDayCard: {
        backgroundColor: "#FFF0EB",
        borderRadius: 26,
        padding: 22,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#F0D0C0",
    },
    checkInCard: {
        backgroundColor: "#EEF4FF",
        borderRadius: 26,
        padding: 22,
        paddingBottom: 28,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#C8D8F5",
    },
    progressCard: {
        backgroundColor: "#F5F0FF",
        borderRadius: 26,
        padding: 22,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#D8CCF0",
    },
    profileCard: {
        backgroundColor: "#F0F5F0",
        borderRadius: 26,
        padding: 22,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#C0DCC0",
    },
});