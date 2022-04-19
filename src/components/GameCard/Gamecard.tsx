import { Alert, Text, View } from "react-native";
import {
  ICardGame,
  ICardGameAccount,
  ICardGameCart,
  IRootState,
} from "../../shared/interfaces/";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../shared/constants/colors";
import { useEffect, useState } from "react";
import { convertToReal } from "../../shared/utils/convertToReal";
import PressableFeedback from "../UI/PressableFeedback/PressableFeedback";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../shared/store/cart-slice";
import { gameCartStyle } from "./styles";

const GameCard: React.FunctionComponent<{
  item: ICardGame | ICardGameCart | ICardGameAccount;
  canDelete?: boolean;
  createAt?: string;
}> = ({ item, canDelete, createAt }) => {
  const orderlyArray = [...item.choosen_numbers];
  const [color, setColor] = useState<string>(Colors.gray800);
  const [gameName, setGameName] = useState<string>("");
  const dispatch = useDispatch();
  const gamesType = useSelector((state: IRootState) => state.games.gamesType);

  useEffect(() => {
    function getCardColor() {
      gamesType.forEach((game) => {
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
      }
    );
  }

  return (
    <View style={gameCartStyle.cardWrapper}>
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
      <View style={[gameCartStyle.cardContent, { borderLeftColor: color }]}>
        <Text style={gameCartStyle.selectedNumbers}>
          {orderlyArray.sort((a, b) => a - b).join(", ")}
        </Text>
        <View
          style={[
            gameCartStyle.infoCardContainer,
            { flexDirection: canDelete ? "row" : "column-reverse" },
            canDelete && { alignItems: "baseline" },
          ]}
        >
          <Text style={[gameCartStyle.gameName, { color: color }]}>
            {gameName}
          </Text>

          <Text
            style={
              canDelete
                ? [gameCartStyle.price, { marginLeft: 5 }]
                : gameCartStyle.price
            }
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
