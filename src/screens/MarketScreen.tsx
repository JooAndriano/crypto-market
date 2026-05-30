import { useEffect, useMemo, useState, useContext } from "react";

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import SearchInput from "../components/SearchInput";
import CategoryChip from "../components/CategoryChip";
import CryptoCard from "../components/CryptoCard";
import EmptyState from "../components/EmptyState";

import { Colors } from "../theme/colors";
import { CryptoCurrency } from "../types/crypto";
import { getMarket } from "../services/marketServices";
import { AuthContext } from "../context/authContext";

export default function MarketScreen() {
    const { state } =
       useContext(AuthContext);

  const [search, setSearch] =
    useState("");

  const [selectedTab,
    setSelectedTab] =
    useState("all");

  const [loading,
    setLoading] =
    useState(true);

  const [market,
    setMarket] =
    useState<CryptoCurrency[]>([]);

  useEffect(() => {
    fetchMarket();
  }, []);

 async function fetchMarket() {
   try {
     const data =
       await getMarket(
         state.token!
       );

     console.log(
       "MARKET RESPONSE"
     );

     console.log(
       JSON.stringify(
         data,
         null,
         2
       )
     );

     setMarket(
       Array.isArray(data)
         ? data
         : []
     );
   } catch (error: any) {
     console.log(
       "MARKET ERROR"
     );

     console.log(
       JSON.stringify(
         error?.response?.data,
         null,
         2
       )
     );

     setMarket([]);
   } finally {
     setLoading(false);
   }
 }

 const filteredData = useMemo(() => {
   return market.filter(item => {

     const searchMatch =
       item.name
         ?.toLowerCase()
         .includes(
           search.toLowerCase()
         ) ||
       item.symbol
         ?.toLowerCase()
         .includes(
           search.toLowerCase()
         );

     const tabMatch =
       (() => {
         switch (selectedTab) {
           case "crypto":
             return (
               item.type ===
               "cryptocurrency"
             );

           case "favorite":
             return (
               item.isFavorite
             );

           default:
             return true;
         }
       })();

     return (
       searchMatch &&
       tabMatch
     );
   });
 }, [
   market,
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

        {loading ? (
          <ActivityIndicator
            size="large"
          />
        ) : filteredData.length ===
          0 ? (
          <EmptyState
            keyword={search}
          />
        ) : (
          <FlatList
            data={
              filteredData
            }
            keyExtractor={item =>
              item.id
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