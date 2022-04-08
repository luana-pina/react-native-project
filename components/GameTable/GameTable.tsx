import { useEffect } from "react";
import { FlatList } from "react-native";
import GameTableButton from "./GameTableButton";

const GameTable: React.FunctionComponent<{ range: number | undefined }> = ({
  range,
}) => {
  const selectedNumbers: Array<number> = [];
  const rangeArrayNumbers: Array<Object> = [];

  function renderButtons(itemData: any) {
    console.log(itemData.item);
    return (
      <GameTableButton
        key={itemData.item.number}
        onPress={() => {}}
        text={String(itemData.item.number)}
      />
    );
  }

  useEffect(() => {
    if (range) {
      for (let i = 0; i < range; i++) {
        rangeArrayNumbers.push({ number: i + 1 });
      }
    }
    console.log(rangeArrayNumbers);
  }, []);

  return (
    <FlatList
      listKey="gameTable"
      data={rangeArrayNumbers}
      renderItem={renderButtons}
      keyExtractor={(item) => String(item)}
      numColumns={6}
    />
  );
};

export default GameTable;
