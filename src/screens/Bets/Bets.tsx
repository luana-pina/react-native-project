import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Base from "../../../components/Base/Base";
import GamesButtons from "../../../components/UI/Butons/GamesButtons/GamesButtons";
import Title from "../../../components/UI/Title";
import { Colors } from "../../shared/constants/colors";
import { DUMMY_DATA } from "../../shared/providers/data";
import GameTable from "../../../components/GameTable/GameTable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { gamesActions } from "../../shared/store";
import { IRootState } from "../../shared/interfaces";
import GamesActions from "../../../components/GamesActions/GamesActions";
import { useState } from "react";

const Bets: React.FC = () => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const game = useSelector((state: IRootState) => state.games.gameSelected);
  const dispatch = useDispatch();

  function gameSelectHandler(id: number) {
    dispatch(
      gamesActions.getSelectedGame({
        requestData: DUMMY_DATA.types,
        gameId: id,
      })
    );
  }

  return (
    <>
      <Modal visible={modalIsVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalIsVisible(!modalIsVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Base>
        <View style={styles.titleContent}>
          <View style={{ flexDirection: "row" }}>
            <Title text="NEW BET" size={22} />
            <Text style={styles.title}>FOR {game?.type.toUpperCase()}</Text>
          </View>
          <Pressable
            android_ripple={{ color: Colors.background700 }}
            onPress={() => {
              setModalIsVisible(true);
            }}
          >
            <MaterialCommunityIcons
              name="cart-outline"
              size={25}
              color={Colors.green500}
            />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>Choose a game</Text>
        <GamesButtons onPress={gameSelectHandler} gamePage />
        <Text style={styles.subtitle}>Fill your bet</Text>
        <Text style={styles.description}>{game?.description}</Text>
        <GameTable />
        <GamesActions range={game.range} maxNumber={game.max_number} />
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
