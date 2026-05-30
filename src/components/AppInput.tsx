import React, { ReactNode } from "react";

import {
  Text,
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
  error?: string;
  leftComponent?: ReactNode;
}

export default function AppInput({
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
  error,
  leftComponent,
}: Props) {
  return (
    <View>
      <View
        style={[
          styles.container,
          !!error &&
            styles.errorInput,
        ]}
      >
        {leftComponent}

        <TextInput
          value={value}
          placeholder={placeholder}
          secureTextEntry={
            secureTextEntry
          }
          keyboardType={
            keyboardType
          }
          onChangeText={
            onChangeText
          }
          style={styles.input}
        />
      </View>

      {!!error && (
        <Text
          style={
            styles.errorText
          }
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    height: 52,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: 6,
  },

  input: {
    flex: 1,

    height: "100%",

    paddingHorizontal: 14,
  },

  errorInput: {
    borderColor: Colors.error,
  },

  errorText: {
    marginTop: 6,

    color: Colors.error,

    fontSize: 12,
  },
});
