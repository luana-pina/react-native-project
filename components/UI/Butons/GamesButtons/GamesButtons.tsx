import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DUMMY_DATA } from "../../../../src/shared/providers/data";
import GameButton from "./GameButton";

const GamesButtons: React.FunctionComponent<{
  onPress: () => void;
  gamePage?: boolean;
}> = ({ onPress, gamePage }) => {
  const renderButton = (itemData: any) => {
    console.log(itemData);
    return <GameButton game={itemData.item} onPress={onPress} />;
  };

  return (
    <FlatList
      data={DUMMY_DATA.types}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderButton}
      numColumns={3}
    />
  );
};
export default GamesButtons;
