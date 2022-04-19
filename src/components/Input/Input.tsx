import { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../shared/constants/colors";

const Input: React.FunctionComponent<{
  label: string;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  onUpdateValue: (e: string) => void;
  value: string;
  invalidText: string;
  isInvalid?: boolean;
  noPaddingTop?: boolean;
  labelSize?: number;
  inputTextSize?: number;
  disabled?: boolean;
  bottomLine?: boolean;
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
  invalidText,
  bottomLine,
}) => {
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);
  const [onFocusStyle, setOnFocusStyle] = useState<boolean>(false);
  return (
    <View style={styles.container}>
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
            (bottomLine || onFocusStyle) && !isInvalid && styles.bottomLine,
          ]}
          autoCapitalize="none"
          autoCompleteType="off"
          textContentType="oneTimeCode"
          autoCorrect={false}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={(v) => setCurrentValue(v)}
          enablesReturnKeyAutomatically
          onEndEditing={() => onUpdateValue(currentValue)}
          onFocus={() => setOnFocusStyle(true)}
          value={currentValue}
          editable={!disabled}
        />
      </View>
      {isInvalid && <Text style={styles.invalidText}>{invalidText}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  container: {
    paddingBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
    alignItems: "flex-end",
    borderBottomColor: Colors.background600,
    borderBottomWidth: 2,
  },
  label: {
    color: Colors.gray800,
    fontWeight: "bold",
    marginRight: 8,
    width: 70,
  },
  labelInvalid: {
    color: Colors.error400,
  },
  input: {
    flex: 1,
    color: Colors.gray800,
    paddingLeft: 5,
  },
  inputInvalid: {
    borderBottomColor: Colors.error100,
    borderBottomWidth: 2,
  },
  bottomLine: { borderBottomWidth: 2, borderBottomColor: Colors.background700 },
  invalidText: {
    fontSize: 12,
    color: Colors.error100,
    textAlign: "center",
    width: "70%",
  },
});
