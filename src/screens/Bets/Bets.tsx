import { Modal, StyleSheet, Text, View } from "react-native";
import Base from "../../../components/Base/Base";
import GamesButtons from "../../../components/UI/Butons/GamesButtons/GamesButtons";
import Title from "../../../components/UI/Title";
import { Colors } from "../../shared/constants/colors";
import { DUMMY_DATA } from "../../shared/providers/data";
import GameTable from "../../../components/GameTable/GameTable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cardGameActions, gamesActions } from "../../shared/store";
import { IDrawerScreenProps, IRootState } from "../../shared/interfaces";
import GamesActions from "../../../components/GamesActions/GamesActions";
import { useLayoutEffect, useState } from "react";
import PressableFeedback from "../../../components/PressableFeedback";
import Cart from "../../../components/Cart/Cart";

const Bets: React.FC<IDrawerScreenProps> = ({ navigation }) => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const game = useSelector((state: IRootState) => state.games.gameSelected);
  const cartItems = useSelector((state: IRootState) => state.cart.cardGames);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    gameSelectHandler(DUMMY_DATA.types[0].id);
  }, []);

  function gameSelectHandler(id: number) {
    dispatch(
      gamesActions.getSelectedGame({
        requestData: DUMMY_DATA.types,
        gameId: id,
      })
    );
  }
  function onSave() {
    setModalIsVisible(false);
    navigation.navigate("Home");
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
