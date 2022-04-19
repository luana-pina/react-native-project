import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  container: {
    elevation: 4,
    alignItems: "center",
    paddingVertical: 15,
    minWidth: 150,
    minHeight: 50,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 3,
  },
  borderRadiusTop: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  borderRadiusBottom: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
});
