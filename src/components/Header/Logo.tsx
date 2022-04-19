import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../shared/constants/colors";
import { AntDesign } from "@expo/vector-icons";

const Logo: React.FC = () => {
  return (
    <>
      <View style={style.logoContainer}>
        <Text style={style.text}>TGL</Text>
        <View style={style.line} />
      </View>
    </>
  );
};

export default Logo;

const style = StyleSheet.create({
  logoContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    backgroundColor: Colors.green400,
    width: 55,
    height: 4,
    borderRadius: 2,
  },
  text: {
    fontWeight: "bold",
    color: Colors.gray800,
    fontSize: 25,
  },
});
