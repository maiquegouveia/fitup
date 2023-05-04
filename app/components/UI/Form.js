import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Form = (props) => {
  return (
    <View style={styles.formContainer}>
      <View style={[styles.form, props.style]}>{props.children}</View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: 315,
    height: 336,
    backgroundColor: "rgba(255, 255, 255, 0.34)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
