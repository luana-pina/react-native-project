import { StyleSheet, Text, View } from "react-native";
import Base from "../../../components/Base/Base";
import GamesButtons from "../../../components/UI/Butons/GamesButtons/GamesButtons";
import Title from "../../../components/UI/Title";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../shared/constants/colors";
import { IDrawerScreenProps } from "../../shared/interfaces/NavigationProps";
import { FlatList } from "react-native-gesture-handler";
import { DUMMY_BETS, DUMMY_DATA } from "../../shared/providers/data";
import { useLayoutEffect } from "react";
import { gamesActions } from "../../shared/store";
import { useDispatch } from "react-redux";
import PressableFeedback from "../../../components/PressableFeedback";
import { gameCardRender } from "../../shared/utils/gameCartRender";

const Home: React.FC<IDrawerScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(
      gamesActions.getSelectedGame({
        requestData: DUMMY_DATA.types,
        gameId: DUMMY_DATA.types[0].id,
      })
    );
  }, []);

  return (
    <Base>
      <View style={styles.titleContainer}>
        <Title text="RECENT GAMES" size={22} />
        <PressableFeedback onPress={() => navigation.navigate("Bets")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Title
              text="New Bet"
              size={22}
              color={Colors.green400}
              style={{ marginRight: 5 }}
            />
            <AntDesign name="arrowright" size={24} color={Colors.green400} />
          </View>
        </PressableFeedback>
      </View>
      <Text style={styles.filtersTitle}>Filters</Text>
      <GamesButtons onPress={() => {}} />
      <View style={styles.betsContainer}>
        <FlatList
          listKey="bets"
          data={DUMMY_BETS}
          keyExtractor={(item) => String(item.id)}
          renderItem={gameCardRender}
        />
      </View>
    </Base>
  );
};

export default Home;

const styles = StyleSheet.create({
  filtersTitle: {
    color: Colors.gray600,
    marginTop: 20,
  },
  titleContainer: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  betsContainer: {
    paddingHorizontal: 10,
    paddingTop: 30,
  },
});
