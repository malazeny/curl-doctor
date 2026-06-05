import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { generateWashDaySteps } from "./Data/washDaySteps";

export default function WashDay() {
    const [steps, setSteps] = useState([]);
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        const load = async () => {
            const saved = await AsyncStorage.getItem("quizAnswers");
            if (saved) {
                const answers = JSON.parse(saved);
                setSteps(generateWashDaySteps(answers));
            }
        };
        load();
    }, []);

    const toggleStep = (id) => {
        setCompleted((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const finishWashDay = async () => {
        const today = new Date().toISOString();
        await AsyncStorage.setItem("lastWashDay", today);
        Alert.alert(
            "Wash day complete! ",
            "Your wash day has been logged. Your curls are going to look amazing.",
            [{ text: "Done", onPress: () => router.back() }]
        );
    };

    const allDone = steps.length > 0 && completed.length === steps.length;

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backText}>‹ Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Wash Day</Text>
            <Text style={styles.subtitle}>
                Your personalized wash day routine — check off each step as you go.
            </Text>

            <View style={styles.progressRow}>
                <Text style={styles.progressText}>
                    {completed.length} of {steps.length} steps done
                </Text>
                <View style={styles.progressBarBg}>
                    <View
                        style={[
                            styles.progressBarFill,
                            {
                                width: steps.length > 0
                                    ? `${(completed.length / steps.length) * 100}%`
                                    : "0%",
                            },
                        ]}
                    />
                </View>
            </View>

            {steps.map((step, index) => {
                const isDone = completed.includes(step.id);
                return (
                    <TouchableOpacity
                        key={step.id}
                        style={[styles.stepCard, isDone && styles.stepCardDone]}
                        onPress={() => toggleStep(step.id)}
                    >
                        <View style={styles.stepLeft}>
                            <Text style={styles.stepNumber}>{index + 1}</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <View style={styles.stepTitleRow}>
                                <Text style={styles.stepEmoji}>{step.emoji}</Text>
                                <Text style={[styles.stepTitle, isDone && styles.stepTitleDone]}>
                                    {step.title}
                                </Text>
                            </View>
                            <Text style={[styles.stepDescription, isDone && styles.stepDescriptionDone]}>
                                {step.description}
                            </Text>
                        </View>
                        <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
                            {isDone && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                    </TouchableOpacity>
                );
            })}

            <TouchableOpacity
                style={[styles.finishButton, !allDone && styles.finishButtonDisabled]}
                onPress={finishWashDay}
                disabled={!allDone}
            >
                <Text style={styles.finishButtonText}>
                    {allDone ? "Complete Wash Day" : `${steps.length - completed.length} steps remaining`}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 50,
    },
    backButton: {
        marginBottom: 16,
    },
    backText: {
        fontSize: 17,
        color: "#111",
        fontWeight: "600",
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#111",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: "#555",
        lineHeight: 22,
        marginBottom: 24,
    },
    progressRow: {
        marginBottom: 24,
    },
    progressText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#888",
        marginBottom: 8,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: "#EEE",
        borderRadius: 3,
    },
    progressBarFill: {
        height: 6,
        backgroundColor: "#111",
        borderRadius: 3,
    },
    stepCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#FFF9F0",
        borderRadius: 20,
        padding: 18,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#EFE2D1",
    },
    stepCardDone: {
        backgroundColor: "#111",
        borderColor: "#111",
    },
    stepLeft: {
        width: 28,
        alignItems: "center",
        paddingTop: 2,
        marginRight: 14,
    },
    stepNumber: {
        fontSize: 13,
        fontWeight: "700",
        color: "#aaa",
    },
    stepContent: {
        flex: 1,
    },
    stepTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    stepEmoji: {
        fontSize: 18,
        marginRight: 8,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111",
    },
    stepTitleDone: {
        color: "#fff",
    },
    stepDescription: {
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },
    stepDescriptionDone: {
        color: "#aaa",
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
        marginTop: 2,
    },
    checkboxDone: {
        backgroundColor: "#fff",
        borderColor: "#fff",
    },
    checkmark: {
        fontSize: 13,
        fontWeight: "700",
        color: "#111",
    },
    finishButton: {
        backgroundColor: "#111",
        paddingVertical: 18,
        borderRadius: 999,
        alignItems: "center",
        marginTop: 12,
    },
    finishButtonDisabled: {
        backgroundColor: "#ddd",
    },
    finishButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});