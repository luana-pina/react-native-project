import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../src/shared/constants/colors";
import { SimpleLineIcons } from "@expo/vector-icons";

const NoGames: React.FunctionComponent = () => {
  return (
    <View style={styles.noGamesView}>
      <SimpleLineIcons
        name="game-controller"
        size={20}
        color={Colors.gray600}
      />
      <Text style={styles.noGamesText}>You do not have games yet </Text>
    </View>
  );
};

export default NoGames;

const styles = StyleSheet.create({
  noGamesView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "baseline",
    paddingVertical: 40,
  },
  noGamesText: {
    fontSize: 14,
    color: Colors.gray600,
    fontStyle: "italic",
    marginLeft: 10,
  },
});
