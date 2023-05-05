import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const InputNome = (props) => {
  const onChangeTextHandler = function (text) {
    if (text.length === 0) {
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
      value={props.state.value}
      contentStyle={{
        borderBottomColor: props.state.valid ? "rgba(81, 242, 5, 1)" : "red",
        borderBottomWidth: 1.3,
      }}
      underlineStyle={styles.underlineStyle}
      mode="flat"
      label={props.label}
      style={styles.input}
      onChangeText={onChangeTextHandler}
    />
  );
};

export default InputNome;

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
