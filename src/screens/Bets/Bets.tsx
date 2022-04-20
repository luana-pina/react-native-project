import { Modal, Text, View } from "react-native";
import {
  Base,
  Cart,
  GamesActions,
  GamesButtons,
  GameTable,
  PressableFeedback,
  Title,
} from "@components/index";
import { Colors } from "@constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, gamesActions } from "@store/index";
import {
  ICartGamesBody,
  IDrawerScreenProps,
  IRootState,
} from "@interfaces/index";
import { useLayoutEffect, useState } from "react";
import { cart, games } from "@providers/index";
import { showToast } from "@utils/index";
import Toast from "react-native-root-toast";
import { BetsStyle } from "./styles";

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
        <View style={BetsStyle.centeredView}>
          <Cart onClose={() => setModalIsVisible(false)} onSave={onSave} />
        </View>
      </Modal>
      <Base>
        <View style={BetsStyle.titleContent}>
          <View style={{ flexDirection: "row" }}>
            <Title text="NEW BET" size={22} />
            <Text style={BetsStyle.title}>FOR {game?.type.toUpperCase()}</Text>
          </View>
          <PressableFeedback
            onPress={() => {
              setModalIsVisible(true);
            }}
          >
            {cartItems.length > 0 && (
              <View style={BetsStyle.cartItemsNumberView}>
                <Text style={BetsStyle.cartItemsNumberText}>
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
        <Text style={BetsStyle.subtitle}>Choose a game</Text>
        <GamesButtons onPress={gameSelectHandler} gamePage />
        <Text style={BetsStyle.subtitle}>Fill your bet</Text>
        <Text style={BetsStyle.description}>{game?.description}</Text>
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
