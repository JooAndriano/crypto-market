import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Props {
  flag: string;
  dialCode: string;
  onPress: () => void;
}

export default function CountryCode({
  flag,
  dialCode,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.flag}>
        {flag}
      </Text>

      <Text style={styles.code}>
        {dialCode}
      </Text>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexDirection:
        "row",

      alignItems:
        "center",

      paddingHorizontal:
        12,

      borderRightWidth:
        1,

      borderRightColor:
        "#EAEAEA",
    },

    flag: {
      fontSize: 18,
    },

    code: {
      marginLeft: 6,

      fontWeight: "600",
    },
  });