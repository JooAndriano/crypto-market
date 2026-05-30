import {
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";

import { Country } from "../types/country";

import { countryFlags }
from "../utils/countryFlags";

interface Props {
  visible: boolean;
  countries: Country[];
  onClose: () => void;
  onSelect: (
    country: Country
  ) => void;
}

export default function CountryPickerModal({
  visible,
  countries,
  onClose,
  onSelect,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View
        style={styles.overlay}
      >
        <View
          style={styles.content}
        >
          <FlatList
            data={countries}
            keyExtractor={item =>
              item.code
            }
            renderItem={({
              item,
            }) => (
              <TouchableOpacity
                style={
                  styles.item
                }
                onPress={() => {
                  onSelect(
                    item
                  );

                  onClose();
                }}
              >
             <Text>
               {
                 countryFlags[
                   item.code
                 ]
               }{" "}
               {item.name}
             </Text>

                <Text>
                  {
                    item.dial_code
                  }
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles =
  StyleSheet.create({
    overlay: {
      flex: 1,

      justifyContent:
        "flex-end",

      backgroundColor:
        "rgba(0,0,0,0.4)",
    },

    content: {
      height: "70%",

      backgroundColor:
        "#FFF",

      borderTopLeftRadius:
        20,

      borderTopRightRadius:
        20,
    },

    item: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      padding: 16,

      borderBottomWidth: 1,

      borderBottomColor:
        "#EEE",
    },
  });