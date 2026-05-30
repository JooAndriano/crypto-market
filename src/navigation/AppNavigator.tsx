import React, { useContext } from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen
from "../screens/LoginScreen";

import OtpScreen
from "../screens/OtpScreen";

import MainTabs
from "./MainTabs";

import { RootStackParamList }
from "../types/navigation";

import { AuthContext } from "../context/authContext";
import { ActivityIndicator, View } from "react-native";
import { Colors } from "../theme/colors";

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { state } = useContext(AuthContext);

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {state.token ? (
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="OTP"
            component={OtpScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}