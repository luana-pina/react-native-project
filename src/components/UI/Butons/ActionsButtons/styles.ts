import { StyleSheet } from "react-native";
import { Colors } from "@constants/colors";

export const actionsButtonsStyle = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.green500,
    borderWidth: 2,
    minWidth: 100,
    minHeight: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  buttonText: {
    fontSize: 13,
    paddingHorizontal: 5,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  isFilledContent: {
    backgroundColor: Colors.green500,
  },
  isFilledText: {
    color: Colors.white,
  },
});
