import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Base from "../../../components/Base/Base";
import Input from "../../../components/Input/Input";
import AuthLayout from "../../../components/Layout/AuthLayout";
import AuthButton from "../../../components/UI/Butons/AuthButton";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";
import { auth } from "../../shared/providers";
import { isValidInputs } from "../../shared/utils/isValidInpus";

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
      await resetPassword({ email: enteredEmail.value })
        .then(({ data }) => {
          setEnteredEmail({
            value: "",
            isValid: true,
            invalidText: "",
          });
          const token = data.token;
          navigation.navigate("ChangePassword", token);
        })
        .catch((err) => {
          //error pop up
          console.error(err.message);
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
