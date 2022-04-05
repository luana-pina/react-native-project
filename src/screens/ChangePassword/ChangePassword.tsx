import { StyleSheet, Text, View } from "react-native";
import Base from "../../../components/Base/Base";
import AuthLayout from "../../../components/Layout/AuthLayout";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";

const ChangePassword: React.FunctionComponent<IStackScreenProps> = ({
  navigation,
}) => {
  return (
    <Base>
      <AuthLayout
        title="Reset Password"
        onPress={() => {
          navigation.goBack();
        }}
      ></AuthLayout>
    </Base>
  );
};

export default ChangePassword;
