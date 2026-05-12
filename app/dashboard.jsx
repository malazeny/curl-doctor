import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { router } from "expo-router";
import { routineRules } from "./Data/routines";
import { productRecommendations } from "./Data/products";

export default function Dashboard() {
    const [answers, setAnswers] = useState({});

    useEffect (() => {
        const loadAnswers = async () => {
            const savedAnswers = await AsyncStorage.getItem("quizAnswers");

            if (savedAnswers) {
                setAnswers(JSON.parse(savedAnswers));
            }
        };

        loadAnswers();
    }, []);

    const name = answers.name || "there";  
    
    const concerns = Array.isArray(answers[5])
        ? answers[5] 
        : [answers[5]];

    const goals = Array.isArray(answers[10])
        ? answers[10] 
        : [answers[10]];
    
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

    return (
        <ScrollView
            style={styles.ScrollView}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
        <Text style={styles.greeting}>Hi, {name} !</Text>
        <Text style={styles.taskTitle}>
        Here's what your curls need today.
        </Text>

        <View style={styles.heroCard}>
            <Text style={styles.cardLabel}>Today's Curl Task</Text>
            <Text style={styles.heroText}>{todayTask}</Text>
        </View>

        <View style={styles.card}>
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

        <TouchableOpacity 
            style={styles.secondarybutton}
            onPress={() => router.push("/quiz")}
        >
            <Text style={styles.secondaryButtonText}>Update My Hair Profile</Text>
        </TouchableOpacity>
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
        fontSize: 24,
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
});