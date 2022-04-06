import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Base from "../../../components/Base/Base";
import Input from "../../../components/Input/Input";
import AuthLayout from "../../../components/Layout/AuthLayout";
import AuthButton from "../../../components/UI/Butons/AuthButton";
import { Colors } from "../../shared/constants/colors";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";

const Login: React.FunctionComponent<IStackScreenProps> = ({ navigation }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  function loginHandler() {
    console.log(enteredEmail, enteredPassword);
    setEnteredEmail("");
    setEnteredPassword("");
    navigation.navigate("Drawer");
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
            value={enteredEmail}
            isInvalid={false}
            keyboardType="email-address"
            onUpdateValue={(enteredValue: string) => {
              setEnteredEmail(enteredValue);
            }}
            noPaddingTop
          />
          <Input
            label="Password"
            value={enteredPassword}
            secure
            isInvalid={false}
            onUpdateValue={(enteredValue: string) => {
              setEnteredPassword(enteredValue);
            }}
          />
          <View style={styles.forgotContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate("ResetPassword");
              }}
            >
              <Text style={styles.forgotText}>I forgot my password</Text>
            </Pressable>
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
    width: 250,
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
