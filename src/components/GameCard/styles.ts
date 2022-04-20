import { StyleSheet } from "react-native";
import { Colors } from "@constants/colors";

export const gameCartStyle = StyleSheet.create({
  cardWrapper: {
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    marginVertical: 5,
  },
  cardContent: {
    paddingVertical: 5,
    paddingLeft: 8,
    borderLeftWidth: 4,
    borderRadius: 4,
    maxWidth: 300,
  },
  selectedNumbers: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
    color: Colors.gray700,
    letterSpacing: 0,
    marginBottom: 8,
  },
  infoCardContainer: {
    flex: 1,
  },
  gameName: { fontWeight: "bold", fontStyle: "italic" },
  price: {
    fontSize: 12,
    fontStyle: "italic",
    color: Colors.gray600,
    letterSpacing: 0,
  },
});
