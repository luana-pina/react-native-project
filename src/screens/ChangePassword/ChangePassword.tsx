import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-root-toast";
import Base from "../../../components/Base/Base";
import Input from "../../../components/Input/Input";
import AuthLayout from "../../../components/Layout/AuthLayout";
import AuthButton from "../../../components/UI/Butons/AuthButton";
import { Colors } from "../../shared/constants/colors";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";
import { auth } from "../../shared/providers";
import { isValidInputs } from "../../shared/utils/isValidInpus";
import { showToast } from "../../shared/utils/showToast";

const ChangePassword: React.FunctionComponent<IStackScreenProps> = ({
  navigation,
  route,
}) => {
  const [enteredPassword, setEnteredPassword] = useState({
    value: "",
    isValid: true,
    invalidText: "",
  });
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState({
    value: "",
    isValid: true,
    invalidText: "",
  });
  const token: any = route.params;
  const { changePassword } = auth();

  async function changePasswordHandler() {
    const isValidPassword = isValidInputs({
      value: enteredPassword.value,
      type: "password",
    });
    const isValidConfirmPassword =
      enteredConfirmPassword.value.length > 0 &&
      enteredPassword.value === enteredConfirmPassword.value;

    if (isValidConfirmPassword && isValidPassword) {
      const toast = Toast.show("Loading...", {
        position: 60,
        duration: 100000,
        animation: true,
        backgroundColor: Colors.background700,
        textColor: Colors.gray800,
        textStyle: { fontWeight: "bold" },
      });
      await changePassword(token, { password: enteredPassword.value })
        .then((res) => {
          showToast("Password changed successfully!", "success");
          setEnteredConfirmPassword({
            value: "",
            isValid: true,
            invalidText: "",
          });
          setEnteredPassword({
            value: "",
            isValid: true,
            invalidText: "",
          });
          Toast.hide(toast);
          navigation.navigate("Login");
        })
        .catch((err) => {
          Toast.hide(toast);
          showToast(err.message, "error");
        });
    } else {
      setEnteredPassword((curChangePassword) => {
        return {
          value: curChangePassword.value,
          isValid: isValidPassword.isValid,
          invalidText: isValidPassword.text,
        };
      });
      setEnteredConfirmPassword((curPassword) => {
        return {
          value: curPassword.value,
          isValid: isValidConfirmPassword,
          invalidText:
            enteredConfirmPassword.value.length === 0
              ? "This field is required!"
              : "Passwords do not match",
        };
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      setEnteredConfirmPassword({
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
        title="Reset Password"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.container}>
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
            noPaddingTop
          />
          <Input
            label="Confirm password"
            value={enteredConfirmPassword.value}
            secure
            isInvalid={!enteredConfirmPassword.isValid}
            invalidText={enteredConfirmPassword.invalidText}
            onUpdateValue={(enteredValue: string) => {
              setEnteredConfirmPassword({
                value: enteredValue,
                isValid: true,
                invalidText: "",
              });
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
    width: 300,
    alignItems: "center",
  },
});
