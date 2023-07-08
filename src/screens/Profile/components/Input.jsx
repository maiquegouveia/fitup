import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const Input = ({
  label,
  value,
  handleChange,
  handleBlur,
  error,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  maxLength,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { fontFamily: theme.font.semiBold }]}>{label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        keyboardType={keyboardType}
        onBlur={handleBlur}
        outlineColor={error ? 'red' : 'gray'}
        onChangeText={handleChange}
        activeOutlineColor="gray"
        style={styles.input}
        value={value}
        mode="outlined"
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  label: {},
});
