import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import { AuthButton, AuthLayout, Base, Input } from "@components/index";
import { Colors } from "@constants/colors";
import { IStackScreenProps } from "@interfaces/index";
import { auth } from "@providers/index";
import { isValidInputs, showToast } from "@utils/index";
import { RegisterStyles } from "./styles";

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
      const toast = Toast.show("Loading...", {
        position: 60,
        duration: 100000,
        animation: true,
        backgroundColor: Colors.background700,
        textColor: Colors.gray800,
        textStyle: { fontWeight: "bold" },
      });
      await registerUser({
        name: enteredName.value,
        email: enteredEmail.value,
        password: enteredPassword.value,
      })
        .then((res) => {
          Toast.hide(toast);
          showToast("User created successfully!", "success");
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
          Toast.hide(toast);
          showToast(err.error.message, "error");
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

  useFocusEffect(
    useCallback(() => {
      setEnteredName({
        value: "",
        isValid: true,
        invalidText: "",
      });
      setEnteredEmail({
        value: "",
        isValid: true,
        invalidText: "",
      });
      setEnteredPassword({
        value: "",
        isValid: true,
        invalidText: "",
      });
    }, [])
  );

  return (
    <Base>
      <AuthLayout
        title="Registration"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View style={RegisterStyles.container}>
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

