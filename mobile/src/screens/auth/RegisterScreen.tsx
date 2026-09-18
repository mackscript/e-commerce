import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const RegisterScreen = () => {
    const navigation = useNavigation()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleContinue = () => {

        // if (!name.trim()) {
        //     Alert.alert("Validation", "Please enter your name.");
        //     return;
        // }

        // if (!email.trim()) {
        //     Alert.alert("Validation", "Please enter your email.");
        //     return;
        // }

        // console.log({
        //     name,
        //     email,
        // });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >
            <View style={styles.content}>
                <Text style={styles.logo}>
                    ShopFlow
                </Text>

                <Text style={styles.title}>
                    Create your account
                </Text>

                <Text style={styles.subtitle}>
                    Enter your details to continue
                </Text>

                <View style={styles.form}>
                    <Text style={styles.label}>
                        Email
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="you@example.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Text style={styles.label}>
                        Name
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Your name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleContinue}
                    >
                        <Text style={styles.buttonText}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "center",
    },

    logo: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 40,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        color: "#666666",
        marginBottom: 32,
    },

    form: {
        width: "100%",
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
        marginTop: 16,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#111111",
    },

    button: {
        height: 52,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111111",
        marginTop: 28,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default RegisterScreen;