import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

import { RootStackParamList } from "../types/navigation";
import { Colors } from "../theme/colors";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen({
  navigation,
}: Props) {
  const [isEmail, setIsEmail] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Sign In
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>
            {isEmail
              ? "Email"
              : "Mobile Number"}
          </Text>

          <TouchableOpacity
            onPress={() =>
              setIsEmail(!isEmail)
            }
          >
            <Text style={styles.switchText}>
              {isEmail
                ? "Sign in with Phone Number"
                : "Sign in with Email"}
            </Text>
          </TouchableOpacity>
        </View>

        {isEmail ? (
          <AppInput
            value={email}
            placeholder="username@gmail.com"
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        ) : (
          <AppInput
            value={phone}
            placeholder="Enter your number"
            onChangeText={setPhone}
            keyboardType="number-pad"
          />
        )}

        <View style={styles.passwordSection}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Password
            </Text>

            <TouchableOpacity
              onPress={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              <Text
                style={styles.switchText}
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

          <AppInput
            value={password}
            placeholder="Enter your password"
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
        </View>

        <Text style={styles.forgot}>
          Forgot Password?
        </Text>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Sign In"
            onPress={() =>
              navigation.navigate(
                "OTP"
              )
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 32,
  },

  row: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  label: {
    fontSize: 13,
    color: Colors.text,
  },

  switchText: {
    fontSize: 12,
    color: Colors.primary,
  },

  passwordSection: {
    marginTop: 16,
  },

  forgot: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.primary,
  },

  buttonContainer: {
    marginTop: 32,
  },
});