import { StyleSheet } from "react-native";
import { Colors } from "../../shared/constants/colors";

export const BetsStyle = StyleSheet.create({
  titleContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontStyle: "italic",
    color: Colors.gray800,
    marginLeft: 4,
  },
  cartItemsNumberText: {
    fontSize: 10,
    fontStyle: "italic",
    fontWeight: "bold",
    color: Colors.white,
  },
  cartItemsNumberView: {
    backgroundColor: Colors.green500,
    borderRadius: 50,
    width: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 15,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    color: Colors.gray800,
    paddingTop: 30,
    paddingBottom: 10,
  },
  description: {
    fontSize: 14,
    fontStyle: "italic",
    color: Colors.gray800,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
