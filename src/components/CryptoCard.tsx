import React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";

export default function CryptoCard({
  item,
}: any) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.image}
      />

      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={styles.symbol}
        >
          {item.symbol}
        </Text>

        <Text
          style={styles.name}
        >
          {item.name}
        </Text>
      </View>

      <View>
        <Text
          style={styles.price}
        >
          {item.price_idr}
        </Text>

        <Text
          style={{
            color:
              item.isPositive
                ? Colors.success
                : Colors.error,
          }}
        >
          {item.change_percent}
        </Text>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      flexDirection: "row",

      alignItems:
        "center",

      padding: 16,

      marginBottom: 12,

      backgroundColor:
        "#FFF",

      borderRadius: 12,

      borderWidth: 1,

      borderColor: "#EEE",
    },

    image: {
      width: 48,
      height: 48,
      marginRight: 12,
    },

    symbol: {
      fontWeight: "700",
    },

    name: {
      color: "#666",
      marginTop: 2,
    },

    price: {
      fontWeight: "600",
    },
  });