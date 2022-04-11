import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../src/shared/constants/colors";
import React from "react";

const ActionsButton: React.FunctionComponent<{
  text: string;
  onPress: () => void;
  filledBackground?: boolean;
}> = ({ text, onPress, children, filledBackground }) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.buttonContainer,
          filledBackground && styles.isFilledContent,
        ]}
      >
        {children}
        <Text
          style={[
            styles.buttonText,
            filledBackground ? styles.isFilledText : { color: Colors.green500 },
          ]}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default ActionsButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.green500,
    borderWidth: 2,
    minWidth: 100,
    minHeight: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  buttonText: {
    fontSize: 13,
    paddingHorizontal: 5,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  isFilledContent: {
    backgroundColor: Colors.green500,
  },
  isFilledText: {
    color: Colors.white,
  },
});