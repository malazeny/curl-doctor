import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
     } from "react-native";

import { router } from "expo-router";

const VALID_EMAIL = "hello@curldoctor.com";
const VALID_PASSWORD = "curls2025";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }
        if (
            email.trim().toLowerCase() === VALID_EMAIL &&
            password === VALID_PASSWORD
        ) {
            setError("");
            router.replace("/quiz");
        } else {
            setError("Incorrect email or password. Please try again.");
        }
    };

  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
        >
            <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

    <View style={styles.content}>
        <Text style={styles.title}>Welcome Back!</Text>

    <View style={styles.form}>
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#777"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
                setEmail(text);
                setError("");
            }}
        />

        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
                setPassword(text);
                setError("");
            }}
        />

        {error ? (
            <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text style={styles.signupText}>
                Trouble logging in?
            </Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 24,
    }, 
    backButton: {
       alignSelf: "flex-start",
    },
    backText: {
        fontSize: 16,
        color: "#111",
      },
    content: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#111",
        marginBottom: 40,
    },
    form: {
        width: "100%",
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        paddingVertical: 12,
        marginBottom: 22,
        fontSize: 16,
        color: "#111",
    },
    primaryButton: {
        backgroundColor: "#ebe5ca",
        paddingVertical: 16,
        alignItems: "center",
        borderRadius: 999,
        marginBottom: 20,
        marginTop: 18,
    },
    primaryButtonText: {
        color: "#111",
        fontSize: 16,
        fontWeight: "600",
    },
    signupText: {
        color: "#444",
        fontSize: 14,
        textAlign: "center",
    },
    errorText: {
        color: "#CC3333",
        fontSize: 14,
        marginBottom: 12,
        textAlign: "center",
    },
});