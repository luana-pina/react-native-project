import { Pressable, StyleSheet, Text, View } from "react-native";
import Base from "../../../components/Base/Base";
import GamesButtons from "../../../components/UI/Butons/GamesButtons/GamesButtons";
import Title from "../../../components/UI/Title";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../shared/constants/colors";
import { IDrawerScreenProps } from "../../shared/interfaces/NavigationProps";
import GameCard from "../../../components/GameCard/Gamecard";
import { FlatList } from "react-native-gesture-handler";
import { DUMMY_BETS, DUMMY_DATA } from "../../shared/providers/data";
import { stringToArray } from "../../shared/utils/stringToArray";
import { convertDate } from "../../shared/utils/convertData";
import { useLayoutEffect } from "react";
import { gamesActions } from "../../shared/store";
import { useDispatch } from "react-redux";

const Home: React.FC<IDrawerScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  function gameCardRender(itemData: any) {
    const convertFormat = {
      ...itemData.item,
      choosen_numbers: stringToArray(itemData.item.choosen_numbers),
    };
    return (
      <GameCard
        item={convertFormat}
        key={itemData.item.id}
        createAt={convertDate(itemData.item.created_at)}
      />
    );
  }

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
        <Pressable onPress={() => navigation.navigate("Bets")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Title
              text="New Bet"
              size={22}
              color={Colors.green400}
              style={{ marginRight: 5 }}
            />
            <AntDesign name="arrowright" size={24} color={Colors.green400} />
          </View>
        </Pressable>
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
