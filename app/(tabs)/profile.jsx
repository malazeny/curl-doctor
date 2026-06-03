import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

export default function Profile() {
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

    const name = answers.name || "Curl Friend";   

    const goals = Array.isArray(answers[10])
        ? answers[10]
        : [answers[10]];
    
    const concerns = Array.isArray(answers[5])
        ? answers[5]
        : [answers[5]]; 
    
    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
    >
        <View style={styles.avatar}>
            <Text style = {styles.avatarText}>
                {name.charAt(0).toUpperCase()}
            </Text>
        </View>

        <View style={styles.card}>

        <Text style= {styles.cardTitle}>Hair Details</Text>

        <Text style={styles.item}>
            • Curl Pattern: {answers[1] || "Not specified"}
        </Text>

        <Text style={styles.item}>
            • Hair Porosity: {answers[2] || "Not specified"}
        </Text>

        <Text style={styles.item}>
            • Hair Density: {answers[3] || "Not specified"}
        </Text>

        <Text style={styles.item}>
            • Hair Thickness: {answers[4] || "Not specified"}
        </Text>

        <Text style={styles.item}>
            • Scalp Type: {answers[8] || "Not specified"}
        </Text>
    </View>

    <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Hair Goals</Text>
        {[...new Set(goals)].filter(Boolean).map((goal) => (
            <Text key={goal} style={styles.item}>
                • {goal}
            </Text>
        ))}
    </View>

    <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/edit-profile")}
    >
        <Text style={styles.primaryButtonText}>
            Update My Hair Profile
        </Text>
    </TouchableOpacity>

    <TouchableOpacity
        style={styles.secondaryButton}
        onPress={async () => {
            await AsyncStorage.removeItem("quizAnswers");
            router.replace("/");
        }}
    >
        <Text style={styles.secondaryButtonText}>
            Reset Quiz Answers
        </Text>
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
        paddingBottom: 50,
        alignItems: "center",
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    avatarText: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "700",
    },

    name: {
        fontSize: 35,
        fontWeight: "800",
        color: "#111",
    },

    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 30, 
        marginTop: 8,
    },

    card: {
        width: "100%",
        backgroundColor: "#FFF9F0",
        borderRadius: 28,
        padding: 22,
        marginBottom: 18,
    },

    cardTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 14,
        color: "#111",
    },

    item: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
        lineHeight: 24,
    },

    primaryButton: {
        backgroundColor: "#111",
        paddingVertical: 16,
        borderRadius: 999,
        alignItems: "center",
        width: "100%",
        marginTop: 12,
    },

    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    secondaryButton: {
        marginTop: 18,
    },

    secondaryButtonText: {
        color: "#666",
        fontSize: 16,
        fontWeight: "600",
    },

});