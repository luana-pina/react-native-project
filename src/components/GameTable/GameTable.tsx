import { useLayoutEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@interfaces/index";
import { cardGameActions } from "@store/index";
import { isSelectedHandler } from "@utils/index";
import GameTableButton from "./GameTableButton";
import { gameTableStyle } from "./styles";

const GameTable: React.FunctionComponent<{}> = () => {
  const [rangeArrayNumbers, setRangeArrayNumbers] = useState<
    Array<{ id: string; text: number }>
  >([]);
  const selectedNumbers: number[] = useSelector(
    (state: IRootState) => state.cardGame.card.choosen_numbers
  );
  const game = useSelector((state: IRootState) => state.games.gameSelected);
  const dispatch = useDispatch();

  const renderButtons = ({ item }: any) => {
    return (
      <GameTableButton
        onPress={() => {
          dispatch(
            cardGameActions.chooseNumber({
              newNumber: item.text,
              maxNumber: game.max_number,
            })
          );
          dispatch(
            cardGameActions.addCardInfo({
              id: Math.floor(Math.random() * (99 - 1 + 1) + 1),
              price: game?.price,
              type: { type: game?.type, id: game?.id },
            })
          );
        }}
        text={String(item.text)}
        color={game.color}
        isSelected={isSelectedHandler(selectedNumbers, item.text)}
      />
    );
  };

  useLayoutEffect(() => {
    const createdArray = [];
    if (game.range) {
      for (let i = 0; i < game.range; i++) {
        createdArray.push({ id: String(i), text: i + 1 });
      }
    }
    setRangeArrayNumbers(createdArray);
    dispatch(cardGameActions.clearCard());
  }, []);

  return (
    <View style={gameTableStyle.tableConatiner}>
      <FlatList
        listKey="gameTable"
        data={rangeArrayNumbers}
        renderItem={renderButtons}
        keyExtractor={(item) => item.id}
        numColumns={6}
      />
    </View>
  );
};

export default GameTable;
