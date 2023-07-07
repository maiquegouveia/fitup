import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Text } from 'native-base';
import React from 'react';

const FormInput = (props) => {
  const { label, placeholder, onChange, iconName, value, hidePassword } = props;

  return (
    <View style={[styles.container, props.styles]}>
      <Text fontWeight="semibold" fontSize="md">
        {label}
      </Text>
      <TextInput
        secureTextEntry={hidePassword}
        autoCapitalize="none"
        value={value}
        placeholder={placeholder}
        mode="outlined"
        onChangeText={onChange}
        activeUnderlineColor="#FF7900"
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {},
});
