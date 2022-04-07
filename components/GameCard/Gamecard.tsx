import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  ICardGame,
  ICardGameAccount,
  ICardGameCart,
} from "../../src/shared/interfaces/Games";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../src/shared/constants/colors";
import { useEffect, useState } from "react";
import { DUMMY_DATA } from "../../src/shared/providers/data";
import { convertToReal } from "../../src/shared/utils/convertToReal";

const GameCard: React.FunctionComponent<{
  item: ICardGame | ICardGameCart | ICardGameAccount;
  canDelete?: boolean;
  createAt?: string;
}> = ({ item, canDelete, createAt }) => {
  const orderlyArray = [...item.choosen_numbers];
  const [color, setColor] = useState<string>(Colors.gray800);
  const [gameName, setGameName] = useState<string>("");

  useEffect(() => {
    function getCardColor() {
      DUMMY_DATA.types.forEach((game) => {
        if (game.id === item.type.id) {
          setColor(game.color);
          setGameName(game.type);
        }
      });
    }
    getCardColor();
  }, [item]);

  return (
    <View style={styles.cardWrapper}>
      {canDelete && (
        <Pressable onPress={() => {}}>
          <Ionicons name="trash-outline" size={24} color={Colors.gray800} />
        </Pressable>
      )}
      <View style={[styles.cardContent, { borderLeftColor: color }]}>
        <Text style={styles.selectedNumbers}>
          {orderlyArray.sort((a, b) => a - b).join(", ")}
        </Text>
        <View
          style={[
            styles.infoCardContainer,
            { flexDirection: canDelete ? "row" : "column-reverse" },
          ]}
        >
          <Text style={[styles.gameName, { color: color }]}>{gameName}</Text>

          <Text style={styles.price}>
            {canDelete
              ? `R$${convertToReal(item.price)}`
              : `${createAt} - (R$${convertToReal(item.price)})`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  cardWrapper: {
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    marginVertical: 5,
  },
  cardContent: {
    padding: 10,
    borderLeftWidth: 4,
    borderRadius: 4,
    maxWidth: 300,
  },
  selectedNumbers: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    color: Colors.gray700,
    letterSpacing: 0,
    marginBottom: 8,
  },
  infoCardContainer: {
    flex: 1,
  },
  gameName: { fontWeight: "bold", fontStyle: "italic" },
  priceCanDelete: {},
  price: {
    fontSize: 12,
    fontStyle: "italic",
    color: Colors.gray600,
    letterSpacing: 0,
  },
});
