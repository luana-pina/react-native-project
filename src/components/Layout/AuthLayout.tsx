import { Text, View } from "react-native";
import { Colors } from "../../shared/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import Card from "../UI/Card/Card";
import Title from "../UI/Titile/Title";
import PressableFeedback from "../UI/PressableFeedback/PressableFeedback";
import { layoutStyles } from "./styles";

const AuthLayout: React.FunctionComponent<{
  title: string;
  noBack?: boolean;
  onPress: () => void;
}> = ({ title, noBack, children, onPress }) => {
  return (
    <View style={layoutStyles.container}>
      <View style={layoutStyles.logoContainer}>
        <Text style={[layoutStyles.upperText, layoutStyles.font]}>
          The Greatest App
        </Text>
        <View style={layoutStyles.middleTextContainer}>
          <Text style={[layoutStyles.middleText, layoutStyles.font]}>for</Text>
        </View>
        <Text style={[layoutStyles.bottomText, layoutStyles.font]}>
          LOTTERY
        </Text>
      </View>
      <View style={layoutStyles.bottomContainer}>
        <Title text={title} />
        <View style={layoutStyles.pageContainer}>
          <Card>{children}</Card>
        </View>
        <PressableFeedback onPress={onPress}>
          <View style={layoutStyles.buttonContainer}>
            {!noBack && (
              <AntDesign name="arrowleft" size={28} color={Colors.gray800} />
            )}
            <Title
              style={layoutStyles.buttonText}
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
