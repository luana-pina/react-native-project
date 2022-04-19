import { StyleSheet } from "react-native";
import { Colors } from "../../shared/constants/colors";

export const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  container: {
    paddingBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
    alignItems: "flex-end",
    borderBottomColor: Colors.background600,
    borderBottomWidth: 2,
  },
  label: {
    color: Colors.gray800,
    fontWeight: "bold",
    marginRight: 8,
    width: 70,
  },
  labelInvalid: {
    color: Colors.error400,
  },
  input: {
    flex: 1,
    color: Colors.gray800,
    paddingLeft: 5,
  },
  inputInvalid: {
    borderBottomColor: Colors.error100,
    borderBottomWidth: 2,
  },
  bottomLine: { borderBottomWidth: 2, borderBottomColor: Colors.background700 },
  invalidText: {
    fontSize: 12,
    color: Colors.error100,
    textAlign: "center",
    width: "70%",
  },
});
