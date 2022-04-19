import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AuthButton,
  AuthLayout,
  Base,
  Input,
  PressableFeedback,
} from "../../components";
import { Colors } from "../../shared/constants/colors";
import { IStackScreenProps } from "../../shared/interfaces";
import { isValidInputs, showToast } from "../../shared/utils";
import { auth, games } from "../../shared/providers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cartActions, gamesActions } from "../../shared/store";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-root-toast";

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
