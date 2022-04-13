import { FlatList } from "react-native";
import { DUMMY_DATA } from "../../../../src/shared/providers/data";
import GameButton from "./GameButton";

const GamesButtons: React.FunctionComponent<{
  onPress: (id: number) => void;
  gamePage?: boolean;
  options?: number[];
}> = ({ onPress, gamePage, options }) => {
  const renderButton = (itemData: any) => {
    return (
      <GameButton
        game={itemData.item}
        onPress={onPress}
        gamePage={gamePage}
        options={options}
      />
    );
  };

  return (
    <FlatList
      data={DUMMY_DATA.types}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderButton}
      numColumns={3}
      scrollEnabled={false}
    />
  );
};
export default GamesButtons;
