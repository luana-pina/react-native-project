import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../../shared/constants/colors";
import PressableFeedback from "../../PressableFeedback/PressableFeedback";
import { authButtonStyles } from "./styles";

const AuthButton: React.FunctionComponent<{
  text: string;
  onPress: () => void;
  color?: string;
}> = ({ text, onPress, color }) => {
  return (
    <PressableFeedback onPress={onPress}>
      <View style={authButtonStyles.buttonContainer}>
        <Text
          style={[
            authButtonStyles.buttonText,
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
