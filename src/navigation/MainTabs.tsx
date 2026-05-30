import React from "react";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import Ionicons
from "@expo/vector-icons/Ionicons";

import MarketScreen
from "../screens/MarketScreen";

import ServiceScreen
from "../screens/ServiceScreen";

const Tab =
  createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }) => ({
        headerShown: false,

        tabBarIcon: ({
          color,
          size,
        }) => {
          let iconName:
            keyof typeof Ionicons.glyphMap =
            "grid";

          if (
            route.name ===
            "Markets"
          ) {
            iconName =
              "bar-chart";
          }

          if (
            route.name ===
            "Services"
          ) {
            iconName =
              "construct";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Markets"
        component={
          MarketScreen
        }
      />

      <Tab.Screen
        name="Services"
        component={
          ServiceScreen
        }
      />
    </Tab.Navigator>
  );
}