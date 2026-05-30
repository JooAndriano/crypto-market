import React from "react";

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

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="OTP"
        component={OtpScreen}
      />

      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
      />
    </Stack.Navigator>
  );
}