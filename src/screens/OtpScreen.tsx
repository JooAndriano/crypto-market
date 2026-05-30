import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "OTP"
>;

export default function OtpScreen({
  navigation,
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>OTP Screen</Text>

      <Button
        title="Go Market"
        onPress={() =>
          navigation.navigate("Market")
        }
      />
    </View>
  );
}