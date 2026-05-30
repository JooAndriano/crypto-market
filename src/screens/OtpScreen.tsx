import React, {
  useContext,
  useState,
} from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
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

import { AuthContext }
from "../context/authContext";

import {
  verifyOtp,
} from "../services/authService";

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    "OTP"
  >;

export default function OtpScreen({
  navigation,
}: Props) {
    const [loading, setLoading] = useState(false);
     const { state } = useContext(AuthContext);
     const [otp, setOtp] = useState(state.otp);

async function handleVerify() {
  try {
    setLoading(true);

    if (
      state.loginMethod ===
      "email"
    ) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name:
                "MainTabs",
            },
          ],
        });

      return;
    }

    await verifyOtp(
      otp,
      state.phone,
      state.token!
    );

    navigation.reset({
      index: 0,
      routes: [
        {
          name:
            "MainTabs",
        },
      ],
    });

  } catch (error: any) {
      console.log("VERIFY BODY", {
        otp,
        phone: state.phone,
      });

    Alert.alert(
      "Error",
      error?.response?.data
        ?.message ??
        "Invalid OTP"
    );
  } finally {
    setLoading(false);
  }
}

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

        <Text style={styles.phone}>
          {state.loginMethod ===
          "phone"
            ? state.phone
            : state.email}
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
           title={
             loading
              ? "Loading..."
              : "Verify Your Number"
           }
           onPress={handleVerify}
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