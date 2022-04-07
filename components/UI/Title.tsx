import { StyleSheet, Text } from "react-native";
import { Colors } from "../../src/shared/constants/colors";

const Title: React.FunctionComponent<{
  text: string;
  size?: number;
  style?: Object;
}> = ({ text, size, style }) => {
  return (
    <Text style={[styles.title, { fontSize: size ? size : 25 }, style]}>
      {text}
    </Text>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: Colors.gray800,
  },
});
