import { Pressable } from "react-native";
import { Colors } from "../../../shared/constants/colors";
import { pressableStyle } from "./styles";

const PressableFeedback: React.FC<{ onPress: () => void; color?: string }> = ({
  children,
  color,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: color ? color : Colors.background700 }}
      style={({ pressed }) => (pressed ? pressableStyle.pressed : {})}
    >
      {children}
    </Pressable>
  );
};

export default PressableFeedback;
