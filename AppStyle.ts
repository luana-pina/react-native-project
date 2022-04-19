import { StyleSheet } from "react-native";
import { Colors } from "./src/shared/constants/colors";

export const AppStyle = StyleSheet.create({
    header: {
      backgroundColor: Colors.background400,
      height: 110,
    },
    rightHeaderConainer: {
      flex: 1,
      height: "100%",
      paddingHorizontal: 30,
      justifyContent: "center",
    },
    drawerConainer: {
      flex: 1,
      marginTop: 70,
      marginBottom: 30,
      height: "100%",
      justifyContent: "space-between",
    },
  });