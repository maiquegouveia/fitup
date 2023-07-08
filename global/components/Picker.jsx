import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker, PickerIOS } from '@react-native-picker/picker';

export default ({
  itemStyle,
  mode,
  prompt,
  label,
  labelStyle,
  pickerStyle,
  style,
  theme,
  options,
  selectedValue,
  handlerSelect,
}) => {
  return (
    <View style={style}>
      <Text style={[labelStyle, { fontFamily: theme.font.bold, color: theme.fontColor.text }]}>{label}</Text>
      <View style={[{ borderWidth: 1, borderColor: theme.fontColor.text, borderRadius: 5 }, pickerStyle]}>
        <Picker
          selectedValue={selectedValue}
          dropdownIconColor={theme.fontColor.text}
          prompt={prompt}
          mode={mode}
          onValueChange={(itemValue, itemIndex) => handlerSelect(itemValue)}
        >
          {options?.map((option, index) => (
            <Picker.Item key={index} style={itemStyle} label={option.name} value={option.id} />
          ))}
        </Picker>
      </View>
    </View>
  );
};
