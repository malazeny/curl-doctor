import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { router } from "expo-router";
import { questions } from "./Data/questions";

const checkInQuestions = [
    {
      id: "hairFeeling",
      question: "How are your curls feeling this week?",
      options: ["Dry", "Frizzy", "Defined", "Flat", "Breaking", "Healthy"],
    },
    {
      id: "scalpFeeling",
      question: "How does your scalp feel?",
      options: ["Dry", "Oily", "Itchy", "Sensitive", "Balanced"],
    },
    {
      id: "routineConsistency",
      question: "How consistent were you with your routine?",
      options: ["Not consistent", "Somewhat consistent", "Very consistent"],
    },
];

export default function CheckIn (){
    const [answers, setAnswers] = useState({});
    const handleSelect = (questionId, option) => {
        setAnswers({
            ...answers,
            [questionId]: option,
        });
    };
    const saveCheckIn = async () => {
        const savedCheckIns = await AsyncStorage.getItem("weeklyCheckIns");
        const previousCheckIns = savedCheckIns ? JSON.parse(savedCheckIns) : [];

        const newCheckIn = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            answers,
        };
        const updatedCheckIns = [newCheckIn, ...previousCheckIns];

        await AsyncStorage.setItem(
            "weeklyCheckIns", 
            JSON.stringify(updatedCheckIns)
        );

        router.push("/(tabs)/dashboard")
    };

    return(
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Weekly Curly Check-In</Text>

                <Text style={styles.subtitle}>
                    Tell Curl Doctor how your hair is doing this week.
                </Text>

                {checkInQuestions.map((question) => (
                    <View key={question.id} style={styles.card}>
                        <Text style={styles.question}>{question.question}</Text>

                        {question.options.map((option) => {
                            const isSelected = answers[question.id] ===option;

                            return(
                                <TouchableOpacity
                                    key={option}
                                    style={[styles.optionButton, isSelected && styles.selectedOption,
                                    ]}
                                    onPress={() => handleSelect(question.id, option)}
                                    >
                                        <Text
                                            style={[styles.optionText, isSelected && styles.selectedOptionText,
                                            ]}
                                            >
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                        </View>
                    ))}

                    <TouchableOpacity style={styles.saveButton} onPress={saveCheckIn}>
                        <Text style={styles.saveButtonText}>Save Check In</Text>
                    </TouchableOpacity>
                </ScrollView>
            );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1, 
        backgroundColor: "#F7F1E8",
    }, 
    container: {
        paddingTop: 80, 
        paddingHorizontal: 24, 
        paddingBottom: 60,
    }, 
    title: {
        fontSize: 34, 
        fontWeight: "800", 
        color: "#111", 
        marginBottom: 10,
    }, 
    subtitle: {
        fontSize: 16, 
        color: "#666", 
        lineHeight: 24, 
        marginBottom: 28,
    },
    card: {
        backgroundColor: "#FFF9F0", 
        borderRadius: 26, 
        padding: 20, 
        marginBottom: 18,
    }, 
    question: {
        fontSize: 20, 
        fontWeight: "700", 
        color: "#111", 
        marginBottom: 16,
    }, 
    optionButton: {
        borderWidth: 1, 
        borderColor: "#111", 
        borderRadius: 999,
        paddingVertical: 14, 
        paddingHorizontal: 18, 
        marginBottom: 12, 
    }, 

    selectedOption: {
        backgroundColor: "#111",
    },
    optionText: {
        color: "#111", 
        fontSize: 15, 
        textAlign: "center", 
        fontWeight: "600",
    },
    selectedOptionText: {
        color: "#fff",
    }, 
    saveButton: {
        backgroundColor: "#111", 
        paddingVertical: 18,
        borderRadius: 999, 
        alignItems: "center", 
        marginTop: 20,
    }, 
    saveButtonText: {
        color: "#fff", 
        fontSize: 16, 
        fontWeight: "600"
    }
});



