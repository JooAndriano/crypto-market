import { useRef } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
} from "react-native";

import { Colors } from "../theme/colors";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function OTPInput({
  value,
  onChange,
}: Props) {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const updateValue = (
    text: string,
    index: number
  ) => {
    const otp = value
      .padEnd(6, "")
      .split("");

    otp[index] = text;

    onChange(
      otp.join("").substring(0, 6)
    );

    if (
      text &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleKeyPress = (
    e: any,
    index: number
  ) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      !value[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputRefs.current[
              index
            ] = ref;
          }}
          style={styles.box}
          keyboardType="number-pad"
          maxLength={1}
          value={
            value[index] || ""
          }
          onChangeText={text =>
            updateValue(
              text,
              index
            )
          }
          onKeyPress={e =>
            handleKeyPress(
              e,
              index
            )
          }
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent:
      "space-between",
  },

  box: {
    width: 50,
    height: 56,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: 8,

    textAlign: "center",

    fontSize: 22,
    fontWeight: "600",
  },
});