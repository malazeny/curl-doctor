import { 
    View, 
    Text, 
    TextInput,
    TouchableOpacity, 
    StyleSheet, 
    Image, 
     } from "react-native";

import {router} from "expo-router";

export default function Login() {
  return (
// Back Button
    <View style={styles.container}>
        <TouchableOpacity
            style={styles .backButton}
            onPress={() => router.back() }
        >
            <Text style={styles.backText}> ‹ Back </Text>
        </TouchableOpacity>

{/* Login content */}

    <View style={styles.content}>
        <Text style = {styles.title}> Welcome Back! </Text>

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

        <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}> Log In </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text style={styles.signupText}> 
                Trouble logging in?
            </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.signupText}> 
                Don't have an account? Sign Up 
            </Text>
        </TouchableOpacity> */}
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
});