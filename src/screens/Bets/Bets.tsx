import { Modal, StyleSheet, Text, View } from "react-native";
import {
  Base,
  Cart,
  GamesActions,
  GamesButtons,
  GameTable,
  PressableFeedback,
  Title,
} from "../../components";
import { Colors } from "../../shared/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, gamesActions } from "../../shared/store";
import {
  ICartGamesBody,
  IDrawerScreenProps,
  IRootState,
} from "../../shared/interfaces";
import { useLayoutEffect, useState } from "react";
import { cart, games } from "../../shared/providers";
import { showToast } from "../../shared/utils";
import Toast from "react-native-root-toast";

const Bets: React.FC<IDrawerScreenProps> = ({ navigation }) => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const game = useSelector((state: IRootState) => state.games.gameSelected);
  const cartItems = useSelector((state: IRootState) => state.cart.cardGames);
  const dispatch = useDispatch();
  const gamesTypeApp = useSelector(
    (state: IRootState) => state.games.gamesType
  );
  const { getGamesTypes } = games();
  const { sendCart } = cart();

  useLayoutEffect(() => {
    gameSelectHandler(gamesTypeApp[0].id);
  }, []);

  async function gameSelectHandler(id: number) {
    await getGamesTypes()
      .then(({ data }) => {
        dispatch(
          gamesActions.getSelectedGame({
            requestData: data.types,
            gameId: id,
          })
        );
      })
      .catch((err) => showToast(err.message, "error"));
  }
  async function onSave() {
    const cartGamesBody: ICartGamesBody[] = [];
    cartItems.forEach((item) => {
      cartGamesBody.push({
        game_id: item.type.id,
        numbers: item.choosen_numbers,
      });
    });
    const toast = Toast.show("Loading...", {
      position: 60,
      duration: 100000,
      animation: true,
      backgroundColor: Colors.background700,
      textColor: Colors.gray800,
      textStyle: { fontWeight: "bold" },
    });
    await sendCart({ games: cartGamesBody })
      .then((res) => {
        Toast.hide(toast);
        dispatch(cartActions.clearCart());
        setModalIsVisible(false);
        navigation.navigate("Home");
        showToast("Games sended successfully!", "success");
      })
      .catch((err) => {
        Toast.hide(toast);
        showToast(err.message, "error");
      });
  }

  return (
    <>
      <Modal visible={modalIsVisible} transparent animationType="slide">
        <View style={styles.centeredView}>
          <Cart onClose={() => setModalIsVisible(false)} onSave={onSave} />
        </View>
      </Modal>
      <Base>
        <View style={styles.titleContent}>
          <View style={{ flexDirection: "row" }}>
            <Title text="NEW BET" size={22} />
            <Text style={styles.title}>FOR {game?.type.toUpperCase()}</Text>
          </View>
          <PressableFeedback
            onPress={() => {
              setModalIsVisible(true);
            }}
          >
            {cartItems.length > 0 && (
              <View style={styles.cartItemsNumberView}>
                <Text style={styles.cartItemsNumberText}>
                  {cartItems.length}
                </Text>
              </View>
            )}
            <MaterialCommunityIcons
              name="cart-outline"
              size={25}
              color={Colors.green500}
              style={{ marginLeft: 7 }}
            />
          </PressableFeedback>
        </View>
        <Text style={styles.subtitle}>Choose a game</Text>
        <GamesButtons onPress={gameSelectHandler} gamePage />
        <Text style={styles.subtitle}>Fill your bet</Text>
        <Text style={styles.description}>{game?.description}</Text>
        <GameTable />
        <GamesActions
          range={game.range}
          maxNumber={game.max_number}
          showModal={() => setModalIsVisible(true)}
        />
      </Base>
    </>
  );
};

export default Bets;

const styles = StyleSheet.create({
  titleContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontStyle: "italic",
    color: Colors.gray800,
    marginLeft: 4,
  },
  cartItemsNumberText: {
    fontSize: 10,
    fontStyle: "italic",
    fontWeight: "bold",
    color: Colors.white,
  },
  cartItemsNumberView: {
    backgroundColor: Colors.green500,
    borderRadius: 50,
    width: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 15,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    color: Colors.gray800,
    paddingTop: 30,
    paddingBottom: 10,
  },
  description: {
    fontSize: 14,
    fontStyle: "italic",
    color: Colors.gray800,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
