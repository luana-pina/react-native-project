import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Base from "../../../components/Base/Base";
import Input from "../../../components/Input/Input";
import AuthLayout from "../../../components/Layout/AuthLayout";
import AuthButton from "../../../components/UI/Butons/AuthButton";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";

const ChangePassword: React.FunctionComponent<IStackScreenProps> = ({
  navigation,
}) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  function changePasswordHandler() {
    console.log(enteredPassword, enteredConfirmPassword);
    setEnteredConfirmPassword("");
    setEnteredPassword("");
    navigation.navigate("Login");
  }

  return (
    <Base>
      <AuthLayout
        title="Reset Password"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.container}>
          <Input
            label="Password"
            value={enteredPassword}
            secure
            isInvalid={false}
            onUpdateValue={(enteredValue: string) => {
              setEnteredPassword(enteredValue);
            }}
            noPaddingTop
          />
          <Input
            label="Confirm password"
            value={enteredConfirmPassword}
            secure
            isInvalid={false}
            onUpdateValue={(enteredValue: string) => {
              setEnteredConfirmPassword(enteredValue);
            }}
          />
          <AuthButton text="Change" onPress={changePasswordHandler} />
        </View>
      </AuthLayout>
    </Base>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    width: 250,
    alignItems: "center",
  },
});
