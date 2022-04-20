import { StyleSheet } from "react-native";
import { Colors } from "@constants/colors";

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "20%",
  },
  logoContainer: {
    alignItems: "center",
    paddingBottom: "15%",
  },
  bottomContainer: {
    alignItems: "center",
  },
  pageContainer: {
    alignItems: "center",
  },
  font: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
  upperText: {
    textAlign: "center",
    fontSize: 40,
    maxWidth: 240,
    color: Colors.gray800,
  },
  bottomText: {
    fontSize: 45,
    color: Colors.gray800,
  },
  middleTextContainer: {
    backgroundColor: Colors.green400,
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 10,
    width: 90,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  middleText: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.white,
  },
  buttonText: {
    paddingHorizontal: 5,
  },
});
