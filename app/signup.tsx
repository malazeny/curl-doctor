import { 
    View, 
    Text, 
    TextInput,
    TouchableOpacity, 
    StyleSheet, 
    Image, 
     } from "react-native";

import {router} from "expo-router";

export default function Signup() {
  return (

// Back Button
    <View style={styles.container}>
        <TouchableOpacity
            style={styles .backButton}
            onPress={() => router.back() }
        >
            <Text style={styles.backText}> ‹ Back </Text>
        </TouchableOpacity>

{/* Signup content */}

    <View style={styles.content}>
        <Text style = {styles.title}> Get started </Text>
        <Text style = {styles.subtitle}> First create your account </Text>

    <View style={styles.form}>
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#777"
            keyboardType="email-address"
        />

        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry={true}
        />

        <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#777"
            secureTextEntry={true}
        />

        <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}> Create Account </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.signupText}> 
                Already have an Account?
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
        fontSize: 18,
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
        marginBottom: 14,
    },
    subtitle:{
        fontSize: 17, 
        color: "555", 
        marginBottom: 30,
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
});