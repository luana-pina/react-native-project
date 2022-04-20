import React from "react";
import { View } from "react-native";
import { Colors } from "@constants/colors";
import { cardStyles } from "./styles";

const Card: React.FC<{
  borderRadiusTopNone?: boolean;
  borderRadiusBottomNone?: boolean;
  style?: Object;
}> = ({ children, borderRadiusTopNone, borderRadiusBottomNone, style }) => {
  const styleProp: Object[] = [cardStyles.container];
  if (!borderRadiusBottomNone) {
    styleProp.push(cardStyles.borderRadiusBottom);
  }
  if (!borderRadiusTopNone) {
    styleProp.push(cardStyles.borderRadiusTop);
  }
  if (style) {
    styleProp.push(style);
  } else {
    styleProp.push({ backgroundColor: Colors.white, margin: 15 });
  }

  return <View style={styleProp}>{children}</View>;
};

export default Card;
