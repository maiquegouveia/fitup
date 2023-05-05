import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const InputNumber = (props) => {
  const onChangeTextHandler = function (text) {
    if (text.length < props.allowedLength) {
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
      keyboardType="numeric"
      value={props.state.value}
      contentStyle={{
        borderBottomColor: props.state.valid ? "rgba(81, 242, 5, 1)" : "red",
        borderBottomWidth: 1.3,
      }}
      underlineStyle={styles.underlineStyle}
      mode="flat"
      label={props.label}
      style={styles.input}
      onChangeText={props.onChangeHandler || onChangeTextHandler}
      right={<TextInput.Icon icon={props.icon} />}
    />
  );
};

export default InputNumber;

const styles = StyleSheet.create({
  input: {
    width: 250,
    marginTop: 20,
    backgroundColor: "white",
  },

  underlineStyle: {
    width: 0,
  },
});
