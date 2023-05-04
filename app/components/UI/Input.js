import { StyleSheet, TextInput, View } from "react-native";
import { useState, forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const [onFocus, setOnFocus] = useState(false);

  const onFocusHandler = function () {
    setOnFocus(true);
  };
  const onBlurHandler = function () {
    setOnFocus(false);
  };

  return (
    <View
      style={[
        styles.inputContainer,
        props.style,
        onFocus ? props.onFocusStyle : "",
      ]}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          ref={ref}
          style={[styles.input, { marginLeft: 10, color: props.placeColor }]}
          placeholder={props.place}
          placeholderTextColor={props.placeColor}
          secureTextEntry={props.hidePassword}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChangeText={props.onChangeHandler}
          selectionColor={props.selectionColor}
        ></TextInput>
      </View>
      {props.children}
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    flex: 1,
  },
});
