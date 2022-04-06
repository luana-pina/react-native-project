import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Base from "../../../components/Base/Base";
import Input from "../../../components/Input/Input";
import AuthLayout from "../../../components/Layout/AuthLayout";
import AuthButton from "../../../components/UI/Butons/AuthButton";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";

const ResetPassword: React.FunctionComponent<IStackScreenProps> = ({
  navigation,
}) => {
  const [enteredEmail, setEnteredEmail] = useState("");

  function sendLinkHandler() {
    console.log(enteredEmail);
    setEnteredEmail("");
    navigation.navigate("ChangePassword");
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
            value={enteredEmail}
            isInvalid={false}
            keyboardType="email-address"
            onUpdateValue={(enteredValue: string) => {
              setEnteredEmail(enteredValue);
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
    width: 250,
    alignItems: "center",
  },
});
