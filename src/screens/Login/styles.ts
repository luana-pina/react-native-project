import { StyleSheet } from "react-native";
import { Colors } from "../../shared/constants/colors";

export const LoginStyles = StyleSheet.create({
    container: {
      width: 300,
      alignItems: "center",
    },
    forgotContainer: {
      width: "100%",
      alignItems: "flex-end",
      paddingHorizontal: 15,
      paddingTop: 20,
      paddingBottom: 5,
    },
    forgotText: {
      fontSize: 10,
      color: Colors.gray600,
      fontStyle: "italic",
    },
  });