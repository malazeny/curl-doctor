import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";
import { questions } from "./Data/questions";

export default function EditProfile() {
    const [answers, setAnswers] = useState({});
  
    useEffect(() => {
      const loadAnswers = async () => {
        const savedAnswers = await AsyncStorage.getItem("quizAnswers");
  
        if (savedAnswers) {
          setAnswers(JSON.parse(savedAnswers));
        }
      };
  
      loadAnswers();
    }, []);

    const editableQuestions = questions.filter(
        (question) => question.type !== "text"

    );

    const toggleAnswer = (question, option) => {
        if(question.multiSelect){
            const currentAnswers = Array.isArray(answers[question.id])
                ? answers[question.id]
                : [];

            const updatedAnswers = currentAnswers.includes(option)
                ? currentAnswers.filter((item) => item !== option)
                : [...currentAnswers, option];
            
            setAnswers({
                ...answers, [question.id]: updatedAnswers,
            });

            return;
        }

        setAnswers({...answers,[question.id] : option});
    };

    const saveProfile = async () => {
        await AsyncStorage.setItem("quizAnswers", JSON.stringify(answers));
        router.push("/(tabs)/profile");
    };

    return(
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Edit Hair Profile</Text>
            <Text style={styles.subtitle}>
                Update your hair details anytime so your routine stays personal.
            </Text>

            {editableQuestions.map((question) => (
                <View key={question.id} style={styles.card}>
                    <Text style={styles.question}>{question.question}</Text>

                    {question.options.map((option) => {
                        const currentAnswer = answers[question.id];

                        const isSelected = question.multiSelect
                            ? currentAnswer?.includes(option)
                            : currentAnswer === option;

                        return (
                            <TouchableOpacity 
                                key = {option} 
                                style={[styles.optionButton, isSelected && styles.selectedOption,
                                ]}
                                onPress={() => toggleAnswer(question, option)}
                            >
                                <Text
                                    style={[
                                        styles.optionText, isSelected && styles.selectedOptionText,
                                    ]}>
                                    {option}
                                 </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}

            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                <Text style={styles.saveButtonText}> Save Changes</Text>
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
        fontSize: 36, 
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

    saveButton:{
        backgroundColor: "#111", 
        paddingVertical: 18, 
        borderRadius: 999, 
        alignItems: "center", 
        marginTop: 20,
    },
    saveButtonText: {
        color: "#fff", 
        fontSize: 16, 
        fontWeight: "600",
    },
});