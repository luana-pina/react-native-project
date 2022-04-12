import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../src/shared/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import Card from "../UI/Card";
import Title from "../UI/Title";
import PressableFeedback from "../PressableFeedback";

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
        <Title text={title} />
        <View style={styles.pageContainer}>
          <Card>{children}</Card>
        </View>
        <PressableFeedback onPress={onPress}>
          <View style={styles.buttonContainer}>
            {!noBack && (
              <AntDesign name="arrowleft" size={28} color={Colors.gray800} />
            )}
            <Title
              style={styles.buttonText}
              text={!noBack ? "Back" : "Sign Up"}
            />
            {noBack && (
              <AntDesign name="arrowright" size={28} color={Colors.gray800} />
            )}
          </View>
        </PressableFeedback>
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
    paddingVertical: "20%",
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
  buttonText: {
    paddingHorizontal: 5,
  },
});
