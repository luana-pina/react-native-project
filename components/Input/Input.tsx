import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../src/shared/constants/colors";

const Input: React.FunctionComponent<{
  label: string;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  onUpdateValue: (text: string) => void;
  value: string;
  isInvalid: boolean;
  noPaddingTop?: boolean;
}> = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  noPaddingTop,
}) => {
  return (
    <View
      style={
        noPaddingTop
          ? styles.inputContainer
          : [styles.inputContainer, { paddingTop: 15 }]
      }
    >
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
    alignItems: "center",
    borderBottomColor: Colors.background600,
    borderBottomWidth: 2,
  },
  label: {
    color: Colors.gray800,
    fontWeight: "bold",
    marginRight: 8,
    maxWidth: 70,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
