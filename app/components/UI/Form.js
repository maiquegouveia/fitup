import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Form = props => {
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  form: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
