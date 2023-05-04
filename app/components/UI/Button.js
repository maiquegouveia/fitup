import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = (props) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={props.onPress}>
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 250,
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 24,
    color: "rgba(29, 29, 41, 0.6)",
    fontWeight: "bold",
  },
});
