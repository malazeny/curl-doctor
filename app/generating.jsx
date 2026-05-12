import React, { useEffect, useRef } from "react";

import {
  View,
  Text,
  Animated,
  StyleSheet,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

export default function Generating() {
    const {answers} = useLocalSearchParams();
    const spin = useRef(new Animated.Value(0)).current;

    useEffect (() => {
        Animated.loop(
            Animated.timing(spin, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            })
        ).start();

        const timer = setTimeout(() => {
            router.replace({
                pathname: "/results",
                params: {answers},
            });
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const rotate = spin.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    }); 
    
    return (
        < View style = {styles.container} >
            < Animated.Text
            style = {[
                styles.curl, 
                {transform: [{rotate}]
            }]
            }
            >
                〰️
            </Animated.Text>
            < Text style = {styles.text} >
                Creating your personalized haircare routine...
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F1E8",
        paddingHorizontal: 30,
    },

    curl: {
        fontSize: 80,
        marginBottom: 30,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#111",
        textAlign: "center",
        marginBottom: 14,
    },

    subtitle : {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        lineHeight: 24,
    },
});