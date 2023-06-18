import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import React from 'react';

const SearchBar = ({
  onChange,
  placeholder,
  placeholderTextColor = 'black',
  inputMode = 'outlined',
  activeOutlineColor = '#256D1B',
  iconName,
  iconColor = '#256D1B',
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        mode={inputMode}
        activeOutlineColor={activeOutlineColor}
        right={<TextInput.Icon icon={iconName} iconColor={iconColor} />}
        onChangeText={onChange}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
