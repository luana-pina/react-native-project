import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Base: React.FC = ({ children }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.pageContainer}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    height: "100%",
  },
  pageContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    height: "90%",
  },
});

export default Base;
