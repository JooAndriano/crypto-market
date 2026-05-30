
import {
  TextInput,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";

interface Props {
  value: string;
  onChangeText: (
    value: string
  ) => void;
}

export default function SearchInput({
  value,
  onChangeText,
}: Props) {
  return (
    <TextInput
      value={value}
      placeholder="Search"
      onChangeText={onChangeText}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: 10,

    paddingHorizontal: 16,
  },
});