import { Text } from "react-native";
import { Colors } from "@constants/colors";
import { titleStyles } from "./styles";

const Title: React.FunctionComponent<{
  text: string;
  size?: number;
  style?: Object;
  color?: string;
}> = ({ text, size, style, color }) => {
  return (
    <Text
      style={[
        titleStyles.title,
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
