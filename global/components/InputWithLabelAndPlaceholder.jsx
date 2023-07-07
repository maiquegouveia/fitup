import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'native-base';
import Wrapper from './Wrapper';

export default InputWithLabelAndPlaceholder = forwardRef((props, ref) => {
  const { label, placeholder, variant, wrapperStyle, labelStyle, inputStyle, theme } = props;
  return (
    <Wrapper style={wrapperStyle}>
      <Text style={[labelStyle, { fontFamily: theme.font.bold, color: theme.fontColor.text }]}>{label}</Text>
      <Input ref={ref} variant={variant} placeholder={placeholder} color="red.500" />
    </Wrapper>
  );
});
