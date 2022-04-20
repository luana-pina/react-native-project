import { StyleSheet } from "react-native";
import { Colors } from "@constants/colors";

export const logoStyles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    backgroundColor: Colors.green400,
    width: 55,
    height: 4,
    borderRadius: 2,
  },
  text: {
    fontWeight: "bold",
    color: Colors.gray800,
    fontSize: 25,
  },
});
