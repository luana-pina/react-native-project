import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ReactType } from "react";

export interface IStackScreenProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<ParamListBase, any>;
}
export interface IRouteProps {
  name: string;
  component: React.FunctionComponent<IStackScreenProps>;
}
