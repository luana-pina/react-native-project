import { Alert, StyleSheet, Text, View } from "react-native";
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
import PressableFeedback from "../PressableFeedback";
import { useDispatch } from "react-redux";
import { cartActions } from "../../src/shared/store";

const GameCard: React.FunctionComponent<{
  item: ICardGame | ICardGameCart | ICardGameAccount;
  canDelete?: boolean;
  createAt?: string;
}> = ({ item, canDelete, createAt }) => {
  const orderlyArray = [...item.choosen_numbers];
  const [color, setColor] = useState<string>(Colors.gray800);
  const [gameName, setGameName] = useState<string>("");
  const dispatch = useDispatch();

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

  function onDelete(id: number) {
    Alert.alert(
      "Are you sure?",
      "Once you delete a game, there is no going back. Please be certain.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(cartActions.removeCardToCart({ cardId: id }));
          },
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  }

  return (
    <View style={styles.cardWrapper}>
      {canDelete && (
        <PressableFeedback
          onPress={() => {
            onDelete(item.id);
          }}
        >
          <Ionicons
            name="trash-outline"
            size={24}
            color={Colors.gray800}
            style={{ marginRight: 5 }}
          />
        </PressableFeedback>
      )}
      <View style={[styles.cardContent, { borderLeftColor: color }]}>
        <Text style={styles.selectedNumbers}>
          {orderlyArray.sort((a, b) => a - b).join(", ")}
        </Text>
        <View
          style={[
            styles.infoCardContainer,
            { flexDirection: canDelete ? "row" : "column-reverse" },
            canDelete && { alignItems: "baseline" },
          ]}
        >
          <Text style={[styles.gameName, { color: color }]}>{gameName}</Text>

          <Text
            style={canDelete ? [styles.price, { marginLeft: 5 }] : styles.price}
          >
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
    paddingVertical: 5,
    paddingLeft: 8,
    borderLeftWidth: 4,
    borderRadius: 4,
    maxWidth: 300,
  },
  selectedNumbers: {
    fontSize: 14,
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
  price: {
    fontSize: 12,
    fontStyle: "italic",
    color: Colors.gray600,
    letterSpacing: 0,
  },
});
