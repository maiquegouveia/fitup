import { useState } from "react";
import { TextInput } from "react-native-paper";
import styles from "../styles/Input.style";

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      onFocus={() => {
        setIsFocused((prev) => {
          return !prev;
        });
      }}
      onBlur={() => {
        setIsFocused((prev) => {
          return !prev;
        });
      }}
      keyboardType={props.keyboardType}
      value={props.state}
      contentStyle={{}}
      activeUnderlineColor="#0094E6"
      mode="flat"
      label={props.label}
      style={styles.input}
      onChangeText={props.onChangeTextHandler}
      left={
        <TextInput.Icon
          icon={props.icon}
          iconColor={isFocused ? "#0094E6" : "black"}
        />
      }
      secureTextEntry={props.secureTextEntry}
    />
  );
};

export default Input;
