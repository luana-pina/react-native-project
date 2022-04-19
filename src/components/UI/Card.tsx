import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../shared/constants/colors";

const Card: React.FC<{
  borderRadiusTopNone?: boolean;
  borderRadiusBottomNone?: boolean;
  style?: Object;
}> = ({ children, borderRadiusTopNone, borderRadiusBottomNone, style }) => {
  const styleProp: Object[] = [styles.container];
  if (!borderRadiusBottomNone) {
    styleProp.push(styles.borderRadiusBottom);
  }
  if (!borderRadiusTopNone) {
    styleProp.push(styles.borderRadiusTop);
  }
  if (style) {
    styleProp.push(style);
  } else {
    styleProp.push({ backgroundColor: Colors.white, margin: 15 });
  }

  return <View style={styleProp}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    alignItems: "center",
    paddingVertical: 15,
    minWidth: 150,
    minHeight: 50,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 3,
  },
  borderRadiusTop: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  borderRadiusBottom: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
});

export default Card;
