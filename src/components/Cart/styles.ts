import { StyleSheet } from "react-native";
import { Colors } from "@constants/colors";

export const cartStyle = StyleSheet.create({
  totalCart: {
    fontSize: 18,
    fontStyle: "italic",
    color: Colors.gray800,
    marginLeft: 4,
  },
  modalView: {
    width: 300,
    paddingHorizontal: 20,
  },
  saveCartButton: {
    backgroundColor: Colors.background500,
    borderTopColor: Colors.background700,
    borderTopWidth: 1,
    paddingBottom: 30,
  },
  titleCartView: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  betsContainer: {
    marginVertical: 20,
    maxHeight: 300,
    width: "100%",
  },
});
