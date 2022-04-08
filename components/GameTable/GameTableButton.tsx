import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../src/shared/constants/colors";

const GameTableButton: React.FunctionComponent<{
  text: string;
  onPress: () => void;
  isSelected?: boolean;
}> = ({ text, onPress, isSelected }) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[styles.buttonContainer, isSelected && styles.isFilledContent]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default GameTableButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.green500,
    borderWidth: 2,
    width: 50,
    height: 50,
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
