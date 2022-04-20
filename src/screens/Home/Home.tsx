import { Text, View } from "react-native";
import {
  Base,
  GamesButtons,
  NoGames,
  PressableFeedback,
  Title,
} from "@components/index";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@constants/colors";
import { FlatList } from "react-native-gesture-handler";
import { useCallback, useLayoutEffect, useState } from "react";
import { cartActions, gamesActions } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import {
  gameCardRender,
  isSelectedHandler,
  showToast,
} from "@utils/index";
import {
  ICardRecentsGames,
  IDrawerScreenProps,
  IRootState,
} from "@interfaces/index";
import { games } from "@providers/index";
import { useFocusEffect } from "@react-navigation/native";
import { HomeStyle } from "./styles";

const Home: React.FC<IDrawerScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState<ICardRecentsGames[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const { getRecentGames, getGamesTypes } = games();
  const recentGamesUser = useSelector(
    (state: IRootState) => state.games.recentGames
  );

  useLayoutEffect(() => {
    async function gamesType() {
      await getGamesTypes()
        .then(({ data }) => {
          dispatch(cartActions.getMinCartValue(data.min_cart_value));
          dispatch(
            gamesActions.getSelectedGame({
              requestData: data.types,
              gameId: data.types[0].id,
            })
          );
        })
        .catch((err) => {
          showToast(err.message, "error");
        });
    }
    gamesType();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function recentGames() {
        await getRecentGames()
          .then(({ data }) => {
            dispatch(gamesActions.getRecentGames({ requestData: data }));
            setFiltered(data);
          })
          .catch((err) => {
            showToast(err.message, "error");
          });
      }
      recentGames();
    }, [])
  );

  function onSelectFilter(id: number) {
    const newOptions: number[] = [...options];
    const isSelected = isSelectedHandler(newOptions, id);
    if (isSelected) {
      newOptions.splice(isSelected.index, 1);
    } else {
      newOptions.push(id);
    }
    setOptions(newOptions);

    const filter = recentGamesUser.filter((bet) => {
      return newOptions.join(",").match(`${bet.type.id}`);
    });
    filter.sort((a, b) => {
      if (a.type.type > b.type.type) return 1;
      if (a.type.type < b.type.type) return -1;
      return 0;
    });

    if (newOptions.length > 0) {
      setFiltered(filter);
    } else {
      setFiltered(recentGamesUser);
    }
  }

  return (
    <Base>
      <View style={HomeStyle.titleContainer}>
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
      <Text style={HomeStyle.filtersTitle}>Filters</Text>
      <GamesButtons onPress={onSelectFilter} options={options} />
      <View style={HomeStyle.betsContainer}>
        {filtered?.length > 0 ? (
          <FlatList
            listKey="bets"
            data={filtered}
            keyExtractor={(item) => String(item.id)}
            renderItem={gameCardRender}
          />
        ) : (
          <NoGames />
        )}
      </View>
    </Base>
  );
};

export default Home;
