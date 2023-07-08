import React from 'react';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';

export default TouchableScrollContainer = ({ theme, style, children, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ScrollView
        persistentScrollbar={true}
        contentContainerStyle={[style, { backgroundColor: theme.backgroundColor }]}
      >
        {children}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
