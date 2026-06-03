import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { router } from 'expo-router';
import { generateRoutine } from "../Data/generateRoutine";

export default function Results() {

const [parsedAnswers, setParsedAnswers] = useState({});

// console.log("PARSED ANSWERS:", parsedAnswers);
// console.log("CONCERN:", parsedAnswers[5]);
// console.log("GOALS:", parsedAnswers[10]);

useEffect(() => {
  const loadAnswers = async () => {
    const savedAnswers = await AsyncStorage.getItem("quizAnswers");

    if (savedAnswers) {
      setParsedAnswers(JSON.parse(savedAnswers));
    }
  };

  loadAnswers();
}, []);

    const name = parsedAnswers.name || "There";

    const routine = generateRoutine(parsedAnswers);
    const uniqueProducts = routine.products;
    
    return (
        <ScrollView 
        style ={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        >
    
            <Text style={styles.title}> Here is your curl prescription!</Text>

            {/* <Text style={styles.subtitle}>
                Here is your curl prescription
            </Text> */}

            <RoutineSection title="Daily Routine" items={routine.daily} />
            <RoutineSection title="Weekly Routine" items={routine.weekly} />
            <RoutineSection title="Monthly Routine" items={routine.monthly} />
            <RoutineSection title="Every 3 Months" items={routine.everyThreeMonths} />

            <Text style={styles.sectionTitle}>Types of products to look for</Text>

            {uniqueProducts.map((product, index) => (
                <Text key ={product} style={styles.item}>
                    • {product}
                </Text>
            ))}

                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/(tabs)/dashboard")}
                >
                    <Text style={styles.buttonText}>Go to Dashboard</Text>
                </TouchableOpacity> */}
        </ScrollView>
    );
}

function RoutineSection ({ title, items}) {
    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {items.length > 0 ? ( 
                [...new Set(items)].map((item) => (
                    <Text key={item} style={styles.item}>
                        • {item}
                    </Text>
                ))
            ) : (
                <Text style={styles.item}>No routine steps yet</Text>
            )}
        </View>
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
        paddingBottom: 40,
    },

    title: {
        fontSize: 25,
        fontWeight: "700",
        marginBottom: 10,
        color: "#111",
    },

    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 28,
        lineHeight: 24,
    },

    card: {
        backgroundColor: "#FFF9F0",
        borderRadius: 28,
        padding: 22,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#EFE2D1",
    },

    sectionTitle: {
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

    button: {
        backgroundColor: "#111",
        paddingVertical: 18,
        borderRadius: 999,
        alignItems: "center",
        marginTop: 24,
        marginBottom: 40,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

