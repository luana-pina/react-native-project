import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../src/shared/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import Card from "../UI/Card";

const AuthLayout: React.FunctionComponent<{
  title: string;
  noBack?: boolean;
  onPress: () => void;
}> = ({ title, noBack, children, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={[styles.upperText, styles.font]}>The Greatest App</Text>
        <View style={styles.middleTextContainer}>
          <Text style={[styles.middleText, styles.font]}>for</Text>
        </View>
        <Text style={[styles.bottomText, styles.font]}>LOTTERY</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={[styles.title, styles.font]}>{title}</Text>
        <View style={styles.pageContainer}>
          <Card>{children}</Card>
        </View>
        <Pressable onPress={onPress}>
          <View style={styles.buttonContainer}>
            {!noBack && (
              <AntDesign name="arrowleft" size={28} color={Colors.gray800} />
            )}
            <Text style={[styles.title, styles.font, styles.buttonText]}>
              {!noBack ? "Back" : "Sign Up"}
            </Text>
            {noBack && (
              <AntDesign name="arrowright" size={28} color={Colors.gray800} />
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    paddingBottom: "15%",
  },
  bottomContainer: {
    alignItems: "center",
  },
  pageContainer: {
    alignItems: "center",
  },
  font: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
  upperText: {
    textAlign: "center",
    fontSize: 40,
    maxWidth: 240,
    color: Colors.gray800,
  },
  bottomText: {
    fontSize: 45,
    color: Colors.gray800,
  },
  middleTextContainer: {
    backgroundColor: Colors.green400,
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 10,
    width: 90,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  middleText: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.white,
  },
  title: {
    fontSize: 25,
    color: Colors.gray800,
  },
  buttonText: {
    paddingHorizontal: 5,
  },
});
