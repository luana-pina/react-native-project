import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { IRootState } from "@interfaces/index";
import GameButton from "./GameButton";

const GamesButtons: React.FunctionComponent<{
  onPress: (id: number) => void;
  gamePage?: boolean;
  options?: number[];
}> = ({ onPress, gamePage, options }) => {
  const gamesType = useSelector((state: IRootState) => state.games.gamesType);

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
      data={gamesType}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderButton}
      numColumns={3}
      scrollEnabled={false}
    />
  );
};
export default GamesButtons;
