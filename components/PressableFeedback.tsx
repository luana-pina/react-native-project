import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../src/shared/constants/colors";

const PressableFeedback: React.FC<{ onPress: () => void; color?: string }> = ({
  children,
  color,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: color ? color : Colors.background700 }}
      style={({ pressed }) => (pressed ? styles.pressed : {})}
    >
      {children}
    </Pressable>
  );
};

export default PressableFeedback;

const styles = StyleSheet.create({
  pressed: { opacity: 0.5 },
});
