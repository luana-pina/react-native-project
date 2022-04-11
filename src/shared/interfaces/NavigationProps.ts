import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface IStackScreenProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<ParamListBase, any>;
}
export interface IDrawerScreenProps {
  navigation: DrawerNavigationProp<any>;
  route: RouteProp<ParamListBase, any>;
}
export interface IRouteProps {
  name: string;
  component: React.FunctionComponent<IStackScreenProps>;
}
