import Base from "../../../components/Base/Base";
import AuthLayout from "../../../components/Layout/AuthLayout";
import { IStackScreenProps } from "../../shared/interfaces/NavigationProps";

const Login: React.FunctionComponent<IStackScreenProps> = ({ navigation }) => {
  return (
    <Base>
      <AuthLayout
        title="Authentication"
        onPress={() => {
          navigation.navigate("Register");
        }}
        noBack={true}
      ></AuthLayout>
    </Base>
  );
};

export default Login;
