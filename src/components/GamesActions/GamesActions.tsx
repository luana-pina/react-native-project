import { Alert, StyleSheet, View } from "react-native";
import ActionsButton from "../UI/Butons/ActionsButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../shared/interfaces";
import { cardGameActions, cartActions } from "../../shared/store";

const GamesActions: React.FunctionComponent<{
  range: number;
  maxNumber: number;
  showModal: Function;
}> = ({ range, maxNumber, showModal }) => {
  const selectedNumbers: number[] = useSelector(
    (state: IRootState) => state.cardGame.card.choosen_numbers
  );
  const card = useSelector((state: IRootState) => state.cardGame.card);
  const cartItems = useSelector((state: IRootState) => state.cart.cardGames);
  const game = useSelector((state: IRootState) => state.games.gameSelected);
  const dispatch = useDispatch();

  function completeGame() {
    let max = range;
    let times = maxNumber;
    const numbersArray = [...selectedNumbers];
    let numb: number;
    let cont = 0;
    if (selectedNumbers.length !== 0) {
      cont = selectedNumbers.length;
    }
    while (cont < times) {
      numb = Math.floor(Math.random() * max + 1);
      if (!numbersArray.some((item) => item === numb)) {
        dispatch(
          cardGameActions.chooseNumber({
            newNumber: numb,
            maxNumber: maxNumber,
          })
        );
        numbersArray.push(numb);
        cont++;
      }
    }
    dispatch(
      cardGameActions.addCardInfo({
        id: Math.floor(Math.random() * (99 - 1 + 1) + 1),
        price: game?.price,
        type: { type: game?.type, id: game?.id },
      })
    );
  }

  function clearGame() {
    dispatch(cardGameActions.clearCard());
  }
  function addToCart() {
    const isSingular = maxNumber - selectedNumbers.length === 1;
    if (selectedNumbers.length < maxNumber) {
      Alert.alert(
        "Numbers quantity less than allowed!",
        `Please, select ${maxNumber - selectedNumbers.length} number${
          isSingular ? "" : "s"
        } more!`
      );
    } else {
      dispatch(cartActions.addCardToCart(card));
      dispatch(cardGameActions.clearCard());
      if (cartItems.length < 1) {
        showModal();
      }
    }
  }

  return (
    <View style={styles.buttonsContent}>
      <ActionsButton text="Complete game" onPress={completeGame} />
      <ActionsButton text="Clear game" onPress={clearGame} />
      <ActionsButton text="Add to cart" filledBackground onPress={addToCart}>
        <MaterialCommunityIcons
          name="cart-outline"
          size={20}
          color={Colors.white}
        />
      </ActionsButton>
    </View>
  );
};

export default GamesActions;

const styles = StyleSheet.create({
  buttonsContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
});
