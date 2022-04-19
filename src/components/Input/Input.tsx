import { useState } from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { inputStyles } from "./styles";

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
    <View style={inputStyles.container}>
      <View
        style={
          noPaddingTop
            ? inputStyles.inputContainer
            : [inputStyles.inputContainer, { paddingTop: 15 }]
        }
      >
        <Text
          style={[
            inputStyles.label,
            isInvalid && inputStyles.labelInvalid,
            labelSize ? { fontSize: labelSize } : {},
          ]}
        >
          {label}
        </Text>
        <TextInput
          style={[
            inputStyles.input,
            isInvalid && inputStyles.inputInvalid,
            { fontSize: inputTextSize ? inputTextSize : 16 },
            (bottomLine || onFocusStyle) &&
              !isInvalid &&
              inputStyles.bottomLine,
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
      {isInvalid && <Text style={inputStyles.invalidText}>{invalidText}</Text>}
    </View>
  );
};

export default Input;
