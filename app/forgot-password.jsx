import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  
  import { router } from "expo-router";
  
  export default function ForgotPassword() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
  
        <View style={styles.content}>
          <Text style={styles.title}>Reset Password</Text>
  
          <Text style={styles.subtitle}>
            Enter your email and we’ll send you a reset link.
          </Text>
  
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#777"
            keyboardType="email-address"
          />
  
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              Send Reset Link
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      paddingHorizontal: 24,
      paddingTop: 60,
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
      fontSize: 34,
      fontWeight: "700",
      marginBottom: 16,
      color: "#111",
    },
  
    subtitle: {
      fontSize: 16,
      color: "#555",
      marginBottom: 40,
      lineHeight: 24,
    },
  
    input: {
      borderBottomWidth: 1,
      borderBottomColor: "#999",
      paddingVertical: 12,
      fontSize: 16,
      marginBottom: 32,
      color: "#111",
    },
  
    primaryButton: {
      backgroundColor: "#111",
      paddingVertical: 16,
      borderRadius: 999,
      alignItems: "center",
    },
  
    primaryButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });