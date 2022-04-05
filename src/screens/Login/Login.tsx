import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, StyleSheet, Text, View } from "react-native";
import Layout from "../../../components/Layout/Layout";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";

const Login: React.FunctionComponent<IStackScreenProps> = (props) => {
  const navigate = useNavigation();

  return (
    <Layout>
      <Text>Login page</Text>
      <Button
        title="Register"
        onPress={() => {
          props.navigation.navigate("Register");
        }}
      />
      <Button
        title="Change"
        onPress={() => {
          props.navigation.navigate("ChangePassword");
        }}
      />
      <Button
        title="Drawer"
        onPress={() => {
          props.navigation.navigate("Drawer");
        }}
      />
    </Layout>
  );
};

export default Login;
