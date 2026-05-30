import React from "react";

import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";

interface Props {
  title: string;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryChip({
  title,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,

        selected &&
          styles.selected,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,

          selected &&
            styles.selectedText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 999,

    marginRight: 12,

    backgroundColor:
      "#F4F4F4",
  },

  selected: {
    backgroundColor:
      Colors.primary,
  },

  text: {
    color: "#555",
  },

  selectedText: {
    color: "#FFF",
  },
});