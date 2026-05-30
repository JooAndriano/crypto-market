import React from "react";

import {
  View,
  Text,
} from "react-native";

export default function EmptyState({
  keyword,
}: {
  keyword: string;
}) {
  return (
    <View
      style={{
        marginTop: 80,
        alignItems:
          "center",
      }}
    >
      <Text>
        We couldn't find
        "{keyword}"
      </Text>

      <Text>
        Try searching with a
        different keyword.
      </Text>
    </View>
  );
}