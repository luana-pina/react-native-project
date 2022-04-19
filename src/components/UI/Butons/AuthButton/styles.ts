import { StyleSheet } from "react-native";

export const authButtonStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    paddingHorizontal: 5,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  pressed: { opacity: 0.5 },
});
