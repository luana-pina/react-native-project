import { Text, View } from "react-native";
import { Colors } from "../../shared/constants/colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import { noGamesStyle } from "./styles";

const NoGames: React.FunctionComponent = () => {
  return (
    <View style={noGamesStyle.noGamesView}>
      <SimpleLineIcons
        name="game-controller"
        size={20}
        color={Colors.gray600}
      />
      <Text style={noGamesStyle.noGamesText}>You do not have games yet </Text>
    </View>
  );
};

export default NoGames;
