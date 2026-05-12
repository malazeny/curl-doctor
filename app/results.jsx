import React from 'react';

import {
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { routineRules } from './Data/routines';
import { productRecommendations } from './Data/products';

export default function Results() {
    const { answers } = useLocalSearchParams();

    const rawAnswers = Array.isArray(answers) ? answers[0] : answers;
    const parsedAnswers = rawAnswers ? JSON.parse(rawAnswers) : {};
    console.log(parsedAnswers);   


    const name = parsedAnswers.name || "There";
    const biggestConcern = parsedAnswers[5];
    const goals = parsedAnswers[10] || [];

    const selectNeeds = [biggestConcern, ...goals]. filter(Boolean);

    const Routine = {
        daily : [],
        weekly : [],
        monthly : [],
        everyThreeMonths : [],
    };

    const Products = [];

    selectNeeds.forEach((need) => {
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
    
            <Text style={styles.title}>Hi, {name} !</Text>

            <Text style={styles.subtitle}>
                Here is your curl prescription
            </Text>

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

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/dashboard")}
                >
                    <Text style={styles.buttonText}>Go to Dashboard</Text>
                </TouchableOpacity>
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
        fontSize: 36,
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
        borderRadius: 24,
        padding: 20,
        marginBottom: 18,
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

