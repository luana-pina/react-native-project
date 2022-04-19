import { StyleSheet } from "react-native";

export const AccountStyles = StyleSheet.create({
  imageContainer: { width: 150, height: 150, overflow: "hidden" },
  editIconContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  inputsContainer: {
    paddingTop: 15,
    width: "100%",
  },
  betsContainer: {
    marginTop: 10,
    maxHeight: 250,
  },
  betsTitle: {
    width: "90.5%",
    marginTop: 20,
  },
});
