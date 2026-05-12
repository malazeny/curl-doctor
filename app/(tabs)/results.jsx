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
import { routineRules } from '../Data/routines';
import { productRecommendations } from '../Data/products';

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
    const biggestConcern = Array.isArray(parsedAnswers[5])
        ? parsedAnswers[5]
        : [parsedAnswers[5]];
    const goals = Array.isArray(parsedAnswers[10])
        ? parsedAnswers[10]
        : [parsedAnswers[10]];
    const selectedNeeds = [
            ...biggestConcern,
            ...goals,
          ].filter(Boolean);

    const Routine = {
        daily : [],
        weekly : [],
        monthly : [],
        everyThreeMonths : [],
    };

    const Products = [];

    selectedNeeds.forEach((need) => {
        const rules = routineRules[need];
        if (rules) {
            Routine.daily.push(...rules.daily);
            Routine.weekly.push(...rules.weekly);
            Routine.monthly.push(...rules.monthly);
            Routine.everyThreeMonths.push(...rules.everyThreeMonths);
        }

       if (productRecommendations[need]) {
            Products.push(...productRecommendations[need]);
       }
    });

    const uniqueProducts = [...new Set(Products)];  

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

            <RoutineSection title="Daily Routine" items={Routine.daily} />
            <RoutineSection title="Weekly Routine" items={Routine.weekly} />
            <RoutineSection title="Monthly Routine" items={Routine.monthly} />
            <RoutineSection title="Every 3 Months" items={Routine.everyThreeMonths} />

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

