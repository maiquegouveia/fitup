import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Text } from 'native-base';
import React from 'react';

const FormInput = (props) => {
  const { label, placeholder, onChange, iconName, autoCapitalize, value, keyboardType } = props;

  return (
    <View style={[styles.container, props.styles]}>
      <Text fontWeight="semibold" fontSize="md">
        {label}
      </Text>
      <TextInput
        keyboardType={keyboardType}
        value={value}
        autoCapitalize={autoCapitalize}
        left={<TextInput.Icon icon={iconName} size={24} />}
        placeholder={placeholder}
        mode="outlined"
        onChangeText={onChange}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {},
});
