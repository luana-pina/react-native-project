import { Text, View } from "react-native";
import { Colors } from "@constants/colors";
import React from "react";
import PressableFeedback from "../../PressableFeedback/PressableFeedback";
import { actionsButtonsStyle } from "./styles";

const ActionsButton: React.FunctionComponent<{
  text: string;
  onPress: () => void;
  filledBackground?: boolean;
}> = ({ text, onPress, children, filledBackground }) => {
  return (
    <View style={{ borderRadius: 8, overflow: "hidden" }}>
      <PressableFeedback color={Colors.green500} onPress={onPress}>
        <View
          style={[
            actionsButtonsStyle.buttonContainer,
            filledBackground && actionsButtonsStyle.isFilledContent,
          ]}
        >
          {children}
          <Text
            style={[
              actionsButtonsStyle.buttonText,
              filledBackground
                ? actionsButtonsStyle.isFilledText
                : { color: Colors.green500 },
            ]}
          >
            {text}
          </Text>
        </View>
      </PressableFeedback>
    </View>
  );
};

export default ActionsButton;
