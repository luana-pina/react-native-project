import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const HomeStyle = StyleSheet.create({
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