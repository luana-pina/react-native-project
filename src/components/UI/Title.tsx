import { StyleSheet, Text } from "react-native";
import { Colors } from "../../shared/constants/colors";

const Title: React.FunctionComponent<{
  text: string;
  size?: number;
  style?: Object;
  color?: string;
}> = ({ text, size, style, color }) => {
  return (
    <Text
      style={[
        styles.title,
        { fontSize: size ? size : 25 },
        style,
        { color: color ? color : Colors.gray800 },
      ]}
    >
      {text}
    </Text>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
