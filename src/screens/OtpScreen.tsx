import { useState } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { RootStackParamList }
from "../types/navigation";

import { Colors }
from "../theme/colors";

import OTPInput
from "../components/OTPInput";

import AppButton
from "../components/AppButton";

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    "OTP"
  >;

export default function OtpScreen({
  navigation,
}: Props) {
  const [otp, setOtp] =
    useState("");

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text
            style={styles.icon}
          >
            ←
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "Login"
            )
          }
        >
          <Text
            style={styles.icon}
          >
            ✕
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text
          style={styles.title}
        >
          Confirm your phone
        </Text>

        <Text
          style={styles.subtitle}
        >
          Enter the code sent to
        </Text>

        <Text
          style={styles.phone}
        >
          +62 8123456789
        </Text>

        <View
          style={styles.otpContainer}
        >
          <OTPInput
            value={otp}
            onChange={setOtp}
          />
        </View>

        <View
          style={styles.resendRow}
        >
          <Text>
            Didn't receive code?
          </Text>

          <TouchableOpacity>
            <Text
              style={
                styles.resend
              }
            >
              Resend
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={
            styles.buttonContainer
          }
        >
          <AppButton
            title="Verify Your Number"
            onPress={() =>
              navigation.replace(
                "Market"
              )
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        Colors.background,
    },

    header: {
      flexDirection: "row",
      justifyContent:
        "space-between",

      paddingHorizontal: 24,
      paddingTop: 12,
    },

    icon: {
      fontSize: 24,
    },

    content: {
      flex: 1,
      paddingHorizontal: 24,

      justifyContent:
        "center",
    },

    title: {
      fontSize: 30,
      fontWeight: "700",
      marginBottom: 12,
    },

    subtitle: {
      color:
        Colors.subtitle,
    },

    phone: {
      marginTop: 4,
      marginBottom: 32,

      fontWeight: "600",
    },

    otpContainer: {
      marginBottom: 24,
    },

    resendRow: {
      flexDirection: "row",
      justifyContent:
        "center",
      gap: 4,
    },

    resend: {
      color:
        Colors.primary,
      fontWeight: "600",
    },

    buttonContainer: {
      marginTop: 40,
    },
  });