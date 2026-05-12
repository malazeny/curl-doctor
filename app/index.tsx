import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Image, 
     } from "react-native";

import {router} from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style = {styles.title}> Curl Doctor</Text>

        <Text style = {styles.subtitle}> 
            Personalized haircare {"\n"}
            made for your hair needs 
        </Text>
        </View>

{/* Buttons */}
<View style={styles.buttonContainer}>
    <TouchableOpacity
    style={styles.primaryButton}
    onPress={() => router.push("/signup")}
>
    <Text style = {styles.primaryButtonText}>
        Get Started
    </Text>
</TouchableOpacity>

<TouchableOpacity
    onPress={() => router.push("/login")}
    >
    <Text style = {styles.loginText}>
        Already have an account?
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 350,
        paddingBottom: 70, 
        paddingHorizontal: 24,
    }, 

    textContainer: {
        alignItems: "center",
    },

    title: {
        fontSize: 62,
        fontWeight: "700",
        color: "#111",
        marginBottom: 14,
        letterSpacing: -1,
    },

    subtitle:{
        fontSize: 20, 
        color: "#111", 
        textAlign: "center",
        lineHeight: 28,
    }, 
    buttonContainer: {
        width: "100%",
        alignItems: "center",
    },
    primaryButton: {
        backgroundColor: "#111",
        width: "100%",
        paddingVertical: 18,
        alignItems: "center",
        borderRadius: 999,
        marginBottom: 18,
    },

    primaryButtonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },
    loginText: {
        color: "#444",
        fontSize: 15,
    },
});
