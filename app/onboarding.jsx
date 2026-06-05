import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
    {
        id: "1",
        title: "Welcome to Curl Doctor",
        description:
            "Your personalized curly hair guide — built around your unique curl type, porosity, and goals.",
    },
    {
        id: "2",
        title: "Take the Quiz",
        description:
            "Answer a few quick questions about your hair. We'll generate a routine and product list made just for you.",
    },
    {
        id: "3",
        title: "Track Your Progress",
        description:
            "Log your wash days, check in weekly, and watch your curls transform over time.",
    },
];

export default function Onboarding() {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleNext = () => {
        if (activeIndex < slides.length - 1) {
            flatListRef.current.scrollToIndex({ index: activeIndex + 1 });
            setActiveIndex(activeIndex + 1);
        } else {
            handleFinish();
        }
    };

    const handleFinish = async () => {
        await AsyncStorage.setItem("hasSeenOnboarding", "true");
        router.replace("/signup");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={handleFinish}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <FlatList
                ref={flatListRef}
                data={slides}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Text style={styles.emoji}>{item.emoji}</Text>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <View style={styles.dots}>
                    {slides.map((_, i) => (
                        <View
                            key={i}
                            style={[styles.dot, i === activeIndex && styles.dotActive]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>
                        {activeIndex === slides.length - 1 ? "Get Started" : "Next"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F1E8",
    },
    skipButton: {
        position: "absolute",
        top: 60,
        right: 28,
        zIndex: 10,
    },
    skipText: {
        fontSize: 15,
        color: "#777",
        fontWeight: "600",
    },
    slide: {
        width,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
        paddingBottom: 120,
    },
    emoji: {
        fontSize: 72,
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111",
        textAlign: "center",
        marginBottom: 16,
        lineHeight: 34,
    },
    description: {
        fontSize: 17,
        color: "#555",
        textAlign: "center",
        lineHeight: 26,
    },
    footer: {
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        paddingHorizontal: 28,
        alignItems: "center",
    },
    dots: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 28,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#D9D0C1",
    },
    dotActive: {
        backgroundColor: "#111",
        width: 24,
    },
    button: {
        backgroundColor: "#111",
        width: "100%",
        paddingVertical: 18,
        borderRadius: 999,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },
});