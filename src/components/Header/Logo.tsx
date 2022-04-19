import { Text, View } from "react-native";
import { logoStyles } from "./styles";

const Logo: React.FC = () => {
  return (
    <>
      <View style={logoStyles.logoContainer}>
        <Text style={logoStyles.text}>TGL</Text>
        <View style={logoStyles.line} />
      </View>
    </>
  );
};

export default Logo;
