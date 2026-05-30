import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";

interface Props {
  title: string;
  onPress: () => void;
}

export default function AppButton({
  title,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 6,
    backgroundColor: Colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});