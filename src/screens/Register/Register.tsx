import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Base from "../../../components/Base/Base";
import Input from "../../../components/Input/Input";
import AuthLayout from "../../../components/Layout/AuthLayout";
import AuthButton from "../../../components/UI/Butons/AuthButton";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";

const Register: React.FunctionComponent<IStackScreenProps> = ({
  navigation,
}) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  function registerHandler() {
    console.log(enteredEmail, enteredPassword);
    setEnteredEmail("");
    setEnteredPassword("");
    navigation.navigate("Login");
  }

  return (
    <Base>
      <AuthLayout
        title="Registration"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.container}>
          <Input
            label="Name"
            value={enteredName}
            isInvalid={false}
            onUpdateValue={(enteredValue: string) => {
              setEnteredName(enteredValue);
            }}
            noPaddingTop
          />
          <Input
            label="Email"
            value={enteredEmail}
            isInvalid={false}
            keyboardType="email-address"
            onUpdateValue={(enteredValue: string) => {
              setEnteredEmail(enteredValue);
            }}
          />
          <Input
            label="Password"
            value={enteredPassword}
            secure
            isInvalid={false}
            onUpdateValue={(enteredValue: string) => {
              setEnteredPassword(enteredValue);
            }}
          />
          <AuthButton text="Register" onPress={registerHandler} />
        </View>
      </AuthLayout>
    </Base>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: 250,
    alignItems: "center",
  },
});
