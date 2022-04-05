import React from "react";
import { StyleSheet, View } from "react-native";

const Layout: React.FC = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    backgroundColor: "#F7F7F7",
  },
});

export default Layout;
