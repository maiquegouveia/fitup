import { View } from "react-native";
import React from "react";
import styles from "../styles/Form.style";

const Form = (props) => {
  return (
    <View style={styles.formContainer}>
      <View style={[styles.form, props.style]}>{props.children}</View>
    </View>
  );
};

export default Form;
