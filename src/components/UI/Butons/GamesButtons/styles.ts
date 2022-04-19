import { StyleSheet } from "react-native";

export const gameButtonStyle = StyleSheet.create({
  container: {
    width: 100,
    height: 35,
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonContainer: {
    borderWidth: 3,
    overflow: "hidden",
    borderRadius: 50,
    marginRight: 20,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
