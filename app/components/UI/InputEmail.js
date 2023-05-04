import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const isValidEmail = function (email) {
  const regex =
    /^(?=.{1,254}$)[A-Za-z0-9._%+-]+@(?!.*\.{2})[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return regex.test(email);
};

const InputEmail = (props) => {
  const onChangeEmailHandler = function (text) {
    if (!isValidEmail(text)) {
      props.setState({
        value: text,
        valid: false,
      });
    } else {
      props.setState({
        value: text,
        valid: true,
      });
    }
  };

  return (
    <TextInput
      keyboardType="email-address"
      value={props.state.value}
      contentStyle={{
        borderBottomColor: props.state.valid ? "rgba(81, 242, 5, 1)" : "red",
        borderBottomWidth: 1.3,
      }}
      underlineStyle={styles.underlineStyle}
      mode="flat"
      label="E-mail"
      style={styles.input}
      onChangeText={onChangeEmailHandler}
    />
  );
};

export default InputEmail;

const styles = StyleSheet.create({
  input: {
    width: 250,
    marginTop: 20,
  },

  underlineStyle: {
    width: 0,
  },
});
