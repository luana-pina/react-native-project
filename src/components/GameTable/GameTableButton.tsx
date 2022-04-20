import { Pressable, Text, View } from "react-native";
import React from "react";
import { Colors } from "@constants/colors";
import { gameTableStyle } from "./styles";

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
          gameTableStyle.buttonContainer,
          { backgroundColor: isSelected ? color : Colors.grayBlue },
        ]}
      >
        <Text style={gameTableStyle.buttonText}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default GameTableButton;
