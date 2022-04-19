import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../../shared/constants/colors";

const GameTableButton: React.FunctionComponent<{
  text: string;
  onPress: () => void;
  isSelected?: boolean | { isSelected: boolean; index: number };
  color?: string;
}> = ({ text, onPress, isSelected, color }) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: isSelected ? color : Colors.grayBlue },
        ]}
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
    width: 55,
    height: 55,
    borderRadius: 50,
    margin: 3,
  },
  buttonText: {
    fontSize: 16,
    paddingHorizontal: 5,
    fontStyle: "italic",
    fontWeight: "bold",
    color: Colors.white,
  },
});
