import { StyleSheet } from "react-native";
import { Colors } from "@constants/colors";

export const gameTableStyle = StyleSheet.create({
  tableConatiner: {
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 50,
    margin: 3,
  },
  buttonText: {
    fontSize: 16,
    paddingHorizontal: 5,
    fontStyle: "italic",
    fontWeight: "bold",
    color: Colors.white,
  },
});
