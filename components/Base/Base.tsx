import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const Base: React.FC = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      contentContainerStyle={styles.keyboardContainer}
    >
      <ScrollView contentContainerStyle={styles.pageContainer}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  pageContainer: {
    alignItems: "center",
    paddingVertical: "20%",
  },
});

export default Base;
