import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { baseStyle } from "./styles";

const Base: React.FC = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={baseStyle.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      contentContainerStyle={baseStyle.keyboardContainer}
    >
      <ScrollView
        contentContainerStyle={baseStyle.pageContainer}
        style={baseStyle.container}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Base;
