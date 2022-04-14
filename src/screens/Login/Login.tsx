import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Base from "../../../components/Base/Base";
import Input from "../../../components/Input/Input";
import AuthLayout from "../../../components/Layout/AuthLayout";
import PressableFeedback from "../../../components/UI/PressableFeedback";
import AuthButton from "../../../components/UI/Butons/AuthButton";
import { Colors } from "../../shared/constants/colors";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";
import { isValidInputs } from "../../shared/utils/isValidInpus";
import { auth } from "../../shared/providers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login: React.FunctionComponent<IStackScreenProps> = ({ navigation }) => {
  const { login } = auth();
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

  async function loginHandler() {
    const validEmail = isValidInputs({
      value: enteredEmail.value,
      type: "email",
    });
    const validPassword = isValidInputs({
      value: enteredPassword.value,
      type: "password",
    });

    if (validEmail.isValid && validPassword.isValid) {
      await login({
        email: enteredEmail.value,
        password: enteredPassword.value,
      })
        .then(({ data }) => {
          AsyncStorage.setItem("token", data.token.token);
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
          navigation.navigate("Drawer");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setEnteredEmail((curEmail) => {
        return {
          value: curEmail.value,
          isValid: validEmail.isValid,
          invalidText: validEmail.text,
        };
      });
      setEnteredPassword((curPassword) => {
        return {
          value: curPassword.value,
          isValid: validPassword.isValid,
          invalidText: validPassword.text,
        };
      });
    }
  }

  return (
    <Base>
      <AuthLayout
        title="Authentication"
        onPress={() => {
          navigation.navigate("Register");
        }}
        noBack={true}
      >
        <View style={styles.container}>
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
            noPaddingTop
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
          <View style={styles.forgotContainer}>
            <PressableFeedback
              onPress={() => {
                navigation.navigate("ResetPassword");
              }}
            >
              <Text style={styles.forgotText}>I forgot my password</Text>
            </PressableFeedback>
          </View>
          <AuthButton text="Log In" onPress={loginHandler} />
        </View>
      </AuthLayout>
    </Base>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: 300,
    alignItems: "center",
  },
  forgotContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 5,
  },
  forgotText: {
    fontSize: 10,
    color: Colors.gray600,
    fontStyle: "italic",
  },
});
