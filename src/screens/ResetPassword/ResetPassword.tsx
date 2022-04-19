import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-root-toast";
import { AuthButton, AuthLayout, Base, Input } from "../../components";
import { Colors } from "../../shared/constants/colors";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";
import { auth } from "../../shared/providers";
import { isValidInputs, showToast } from "../../shared/utils";

const ResetPassword: React.FunctionComponent<IStackScreenProps> = ({
  navigation,
}) => {
  const [enteredEmail, setEnteredEmail] = useState({
    value: "",
    isValid: true,
    invalidText: "",
  });

  const { resetPassword } = auth();

  async function sendLinkHandler() {
    const validEmail = isValidInputs({
      value: enteredEmail.value,
      type: "email",
    });

    if (validEmail.isValid) {
      const toast = Toast.show("Loading...", {
        position: 60,
        duration: 100000,
        animation: true,
        backgroundColor: Colors.background700,
        textColor: Colors.gray800,
        textStyle: { fontWeight: "bold" },
      });
      await resetPassword({ email: enteredEmail.value })
        .then(({ data }) => {
          Toast.hide(toast);
          setEnteredEmail({
            value: "",
            isValid: true,
            invalidText: "",
          });
          const token = data.token;
          navigation.navigate("ChangePassword", token);
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
    }
  }

  useFocusEffect(
    useCallback(() => {
      setEnteredEmail({
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
          <AuthButton text="Send Link" onPress={sendLinkHandler} />
        </View>
      </AuthLayout>
    </Base>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    width: 300,
    alignItems: "center",
  },
});
