import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

const Base: React.FC = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      contentContainerStyle={styles.keyboardContainer}
    >
      <ScrollView
        contentContainerStyle={styles.pageContainer}
        style={styles.container}
      >
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
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default Base;
