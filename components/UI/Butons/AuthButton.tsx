import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../src/shared/constants/colors";

const AuthButton: React.FunctionComponent<{
  text: string;
  onPress: () => void;
}> = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{text}</Text>
        <AntDesign name="arrowright" size={28} color={Colors.green400} />
      </View>
    </Pressable>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    color: Colors.green400,
    paddingHorizontal: 5,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
