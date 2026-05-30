import { useMemo, useState } from "react";

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import SearchInput from "../components/SearchInput";
import CategoryChip from "../components/CategoryChip";
import CryptoCard from "../components/CryptoCard";
import EmptyState from "../components/EmptyState";

import { Colors } from "../theme/colors";
import { mockCrypto } from "../utils/mockCrypto";

export default function MarketScreen() {
  const [search, setSearch] =
    useState("");

  const [selectedTab,
    setSelectedTab] =
    useState("all");

  const filteredData =
    useMemo(() => {
      return mockCrypto.filter(
        item => {
          const searchMatch =
            item.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            item.symbol
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const tabMatch =
            selectedTab ===
            "all"
              ? true
              : selectedTab ===
                "favorite"
              ? item.isFavorite
              : true;

          return (
            searchMatch &&
            tabMatch
          );
        }
      );
    }, [
      search,
      selectedTab,
    ]);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View
        style={styles.content}
      >
        <Text
          style={styles.title}
        >
          Market
        </Text>

        <SearchInput
          value={search}
          onChangeText={
            setSearch
          }
        />

        <View
          style={
            styles.filterContainer
          }
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
          >
            <CategoryChip
              title="All"
              selected={
                selectedTab ===
                "all"
              }
              onPress={() =>
                setSelectedTab(
                  "all"
                )
              }
            />

            <CategoryChip
              title="Cryptocurrency"
              selected={
                selectedTab ===
                "crypto"
              }
              onPress={() =>
                setSelectedTab(
                  "crypto"
                )
              }
            />

            <CategoryChip
              title="Favorite"
              selected={
                selectedTab ===
                "favorite"
              }
              onPress={() =>
                setSelectedTab(
                  "favorite"
                )
              }
            />
          </ScrollView>
        </View>

        {filteredData.length ===
        0 ? (
          <EmptyState
            keyword={search}
          />
        ) : (
          <FlatList
            data={
              filteredData
            }
            keyExtractor={
              item => item.id
            }
            showsVerticalScrollIndicator={
              false
            }
            renderItem={({
              item,
            }) => (
              <CryptoCard
                item={item}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        Colors.background,
    },

    content: {
      flex: 1,
      paddingHorizontal: 20,
    },

    title: {
      fontSize: 32,
      fontWeight: "700",
      color: Colors.text,

      marginTop: 12,
      marginBottom: 20,
    },

    filterContainer: {
      marginTop: 16,
      marginBottom: 20,
    },
  });