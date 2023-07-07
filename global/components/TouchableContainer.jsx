import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

export default ({ theme, style, children, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[style, { backgroundColor: theme.backgroundColor }]}>{children}</View>
    </TouchableWithoutFeedback>
  );
};
