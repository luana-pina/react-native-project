import { useState } from "react";
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
  onUpdateValue: (e: string) => void;
  value: string;
  isInvalid?: boolean;
  noPaddingTop?: boolean;
  labelSize?: number;
  inputTextSize?: number;
  disabled?: boolean;
}> = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  noPaddingTop,
  labelSize,
  inputTextSize,
  disabled,
}) => {
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);
  return (
    <View
      style={
        noPaddingTop
          ? styles.inputContainer
          : [styles.inputContainer, { paddingTop: 15 }]
      }
    >
      <Text
        style={[
          styles.label,
          isInvalid && styles.labelInvalid,
          labelSize ? { fontSize: labelSize } : {},
        ]}
      >
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          isInvalid && styles.inputInvalid,
          { fontSize: inputTextSize ? inputTextSize : 16 },
        ]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={(v) => setCurrentValue(v)}
        onEndEditing={() => onUpdateValue(currentValue)}
        value={currentValue}
        editable={!disabled}
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
    color: Colors.gray800,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
