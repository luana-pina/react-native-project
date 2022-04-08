import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Base from "../../../components/Base/Base";
import ActionsButton from "../../../components/UI/Butons/ActionsButton";
import GamesButtons from "../../../components/UI/Butons/GamesButtons/GamesButtons";
import Title from "../../../components/UI/Title";
import { Colors } from "../../shared/constants/colors";
import { IGame } from "../../shared/interfaces/Games";
import { DUMMY_DATA } from "../../shared/providers/data";
import GameTable from "../../../components/GameTable/GameTable";

const Bets: React.FC = () => {
  const [game, setGame] = useState<IGame>();

  useEffect(() => {
    setGame(DUMMY_DATA.types[0]);
  }, []);

  return (
    <Base>
      <View style={styles.titleContent}>
        <Title text="NEW BET" size={22} />
        <Text style={styles.title}>FOR {game?.type.toUpperCase()}</Text>
      </View>
      <Text style={styles.subtitle}>Choose a game</Text>
      <GamesButtons onPress={() => {}} />
      <Text style={styles.subtitle}>Fill your bet</Text>
      <Text style={styles.description}>{game?.description}</Text>
      <GameTable range={game?.range} />
      <View style={styles.buttonsContent}>
        <ActionsButton text="Complete game" onPress={() => {}} />
        <ActionsButton text="Clear game" onPress={() => {}} />
        <ActionsButton text="Add to cart" filledBackground onPress={() => {}}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={20}
            color={Colors.white}
          />
        </ActionsButton>
      </View>
    </Base>
  );
};

export default Bets;

const styles = StyleSheet.create({
  titleContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
  },
  buttonsContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 30,
    justifyContent: "space-between",
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
});
