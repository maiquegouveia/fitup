import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const Input = (props) => {
  return (
    <View style={[styles.inputContainer, props.style]}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, { marginLeft: 10, color: props.placeColor }]}
          placeholder={props.place}
          placeholderTextColor={props.placeColor}
          secureTextEntry={props.hidePassword}
        ></TextInput>
      </View>
      {props.children}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "rgba(255, 255, 255, 1)",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    flex: 1,
  },
});
