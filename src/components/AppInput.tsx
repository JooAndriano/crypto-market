import React from "react";

import {
  TextInput,
  View,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import { Colors } from "../theme/colors";

interface Props {
  value: string;
  placeholder: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export default function AppInput({
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
}: Props) {
  return (
    <View>
      <TextInput
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 52,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: 6,

    paddingHorizontal: 14,
  },
});