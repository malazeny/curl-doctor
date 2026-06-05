import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { generateRoutine } from "../Data/generateRoutine";

export default function Routine() {
    const [parsedAnswers, setParsedAnswers] = useState({});

    useEffect(() => {
        const load = async () => {
            const saved = await AsyncStorage.getItem("quizAnswers");
            if (saved) setParsedAnswers(JSON.parse(saved));
        };
        load();
    }, []);

    const routine = generateRoutine(parsedAnswers);

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Your Routine</Text>
            <Text style={styles.subtitle}>
                A personalized plan built around your curl type, porosity, and goals.
            </Text>

            <RoutineSection
                title="Daily"
                emoji="☀️"
                color="#FFF9F0"
                borderColor="#EFE2D1"
                items={routine.daily}
            />
            <RoutineSection
                title="Weekly"
                emoji="📅"
                color="#F0F4FF"
                borderColor="#D1DAEF"
                items={routine.weekly}
            />
            <RoutineSection
                title="Monthly"
                emoji="🌙"
                color="#F4F0FF"
                borderColor="#D9D1EF"
                items={routine.monthly}
            />
            <RoutineSection
                title="Every 3 Months"
                emoji="✂️"
                color="#F0FFF4"
                borderColor="#D1EFD9"
                items={routine.everyThreeMonths}
            />
        </ScrollView>
    );
}

function RoutineSection({ title, emoji, color, borderColor, items }) {
    return (
        <View style={[styles.card, { backgroundColor: color, borderColor }]}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardEmoji}>{emoji}</Text>
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            {items.length > 0 ? (
                [...new Set(items)].map((item) => (
                    <View key={item} style={styles.itemRow}>
                        <View style={styles.bullet} />
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.emptyText}>No steps for this frequency.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 40,
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
        marginBottom: 28,
    },
    card: {
        borderRadius: 24,
        padding: 22,
        marginBottom: 16,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    cardEmoji: {
        fontSize: 20,
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111",
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#111",
        marginTop: 8,
        marginRight: 10,
    },
    itemText: {
        fontSize: 15,
        color: "#333",
        lineHeight: 22,
        flex: 1,
    },
    emptyText: {
        fontSize: 15,
        color: "#999",
    },
});