import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Base from "../../../components/Base/Base";
import Input from "../../../components/Input/Input";
import AuthLayout from "../../../components/Layout/AuthLayout";
import AuthButton from "../../../components/UI/Butons/AuthButton";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";
import { auth } from "../../shared/providers";
import { isValidInputs } from "../../shared/utils/isValidInpus";

const Register: React.FunctionComponent<IStackScreenProps> = ({
  navigation,
}) => {
  const [enteredName, setEnteredName] = useState({
    value: "",
    isValid: true,
    invalidText: "",
  });
  const [enteredEmail, setEnteredEmail] = useState({
    value: "",
    isValid: true,
    invalidText: "",
  });
  const [enteredPassword, setEnteredPassword] = useState({
    value: "",
    isValid: true,
    invalidText: "",
  });
  const { registerUser } = auth();

  async function registerHandler() {
    const emailValid = isValidInputs({
      value: enteredEmail.value,
      type: "email",
    });
    const nameValid = isValidInputs({ value: enteredName.value, type: "name" });
    const passwordValid = isValidInputs({
      value: enteredPassword.value,
      type: "password",
    });
    if (emailValid.isValid && nameValid.isValid && passwordValid.isValid) {
      await registerUser({
        name: enteredName.value,
        email: enteredEmail.value,
        password: enteredPassword.value,
      })
        .then((res) => {
          //success popup
          setEnteredEmail({
            value: "",
            isValid: true,
            invalidText: "",
          });
          setEnteredName({
            value: "",
            isValid: true,
            invalidText: "",
          });
          setEnteredPassword({
            value: "",
            isValid: true,
            invalidText: "",
          });
          navigation.navigate("Login");
        })
        .catch((err) => {
          Alert.alert("Failed!", `${err.error.message}.`);
        });
    } else {
      setEnteredName((curName) => {
        return {
          value: curName.value,
          isValid: nameValid.isValid,
          invalidText: nameValid.text,
        };
      });
      setEnteredEmail((curEmail) => {
        return {
          value: curEmail.value,
          isValid: emailValid.isValid,
          invalidText: emailValid.text,
        };
      });
      setEnteredPassword((curPassword) => {
        return {
          value: curPassword.value,
          isValid: passwordValid.isValid,
          invalidText: passwordValid.text,
        };
      });
    }
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
            value={enteredName.value}
            isInvalid={!enteredName.isValid}
            invalidText={enteredName.invalidText}
            onUpdateValue={(enteredValue: string) => {
              setEnteredName({
                value: enteredValue,
                isValid: true,
                invalidText: "",
              });
            }}
            noPaddingTop
          />
          <Input
            label="Email"
            value={enteredEmail.value}
            isInvalid={!enteredEmail.isValid}
            invalidText={enteredEmail.invalidText}
            keyboardType="email-address"
            onUpdateValue={(enteredValue: string) => {
              setEnteredEmail({
                value: enteredValue,
                isValid: true,
                invalidText: "",
              });
            }}
          />
          <Input
            label="Password"
            value={enteredPassword.value}
            secure
            isInvalid={!enteredPassword.isValid}
            invalidText={enteredPassword.invalidText}
            onUpdateValue={(enteredValue: string) => {
              setEnteredPassword({
                value: enteredValue,
                isValid: true,
                invalidText: "",
              });
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
    width: 300,
    alignItems: "center",
  },
});
