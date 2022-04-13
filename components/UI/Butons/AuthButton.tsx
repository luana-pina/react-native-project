import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../src/shared/constants/colors";
import PressableFeedback from "../PressableFeedback";

const AuthButton: React.FunctionComponent<{
  text: string;
  onPress: () => void;
  color?: string;
}> = ({ text, onPress, color }) => {
  return (
    <PressableFeedback onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text
          style={[
            styles.buttonText,
            { color: color ? color : Colors.green400 },
          ]}
        >
          {text}
        </Text>
        <AntDesign
          name="arrowright"
          size={28}
          color={color ? color : Colors.green400}
        />
      </View>
    </PressableFeedback>
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
    paddingHorizontal: 5,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  pressed: { opacity: 0.5 },
});
