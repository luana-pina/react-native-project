import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  AuthButton,
  AuthLayout,
  Base,
  Input,
  PressableFeedback,
} from "@components/index";
import { Colors } from "@constants/colors";
import { IStackScreenProps } from "@interfaces/index";
import { isValidInputs, showToast } from "@utils/index";
import { auth, games } from "@providers/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cartActions, gamesActions } from "@store/index";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { LoginStyles } from "./styles";

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
  const { getGamesTypes } = games();
  const dispatch = useDispatch();

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
      const toast = Toast.show("Loading...", {
        position: 60,
        duration: 100000,
        animation: true,
        backgroundColor: Colors.background700,
        textColor: Colors.gray800,
        textStyle: { fontWeight: "bold" },
      });
      await login({
        email: enteredEmail.value,
        password: enteredPassword.value,
      })
        .then(({ data }) => {
          async function saveToken() {
            await AsyncStorage.setItem("token", data.token.token);
          }
          saveToken();
          Toast.hide(toast);
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
          showToast("User logged successfully", "success");
          navigation.navigate("Drawer");
        })
        .catch((err) => {
          Toast.hide(toast);
          showToast(err.message, "error");
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

  useEffect(() => {
    async function gamesType() {
      await getGamesTypes()
        .then(({ data }) => {
          dispatch(cartActions.getMinCartValue(data.min_cart_value));
          dispatch(
            gamesActions.getSelectedGame({
              requestData: data.types,
              gameId: data.types[0].id,
            })
          );
        })
        .catch((err) => showToast(err.message, "error"));
    }
    gamesType();
  }, []);

  useFocusEffect(
    useCallback(() => {
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
        title="Authentication"
        onPress={() => {
          navigation.navigate("Register");
        }}
        noBack={true}
      >
        <View style={LoginStyles.container}>
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
          <View style={LoginStyles.forgotContainer}>
            <PressableFeedback
              onPress={() => {
                navigation.navigate("ResetPassword");
              }}
            >
              <Text style={LoginStyles.forgotText}>I forgot my password</Text>
            </PressableFeedback>
          </View>
          <AuthButton text="Log In" onPress={loginHandler} />
        </View>
      </AuthLayout>
    </Base>
  );
};

export default Login;

