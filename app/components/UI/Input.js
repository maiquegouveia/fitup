import { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

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

const styles = StyleSheet.create({
  input: {
    width: 270,
    marginTop: 20,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderRadius: 100,
    backgroundColor: "transparent",
    paddingBottom: 5,
  },
});
