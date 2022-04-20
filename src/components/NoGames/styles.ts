import { StyleSheet } from "react-native";
import { Colors } from "@constants/colors";

export const noGamesStyle = StyleSheet.create({
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
