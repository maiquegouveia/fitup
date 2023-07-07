import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default ({ theme, style, children }) => {
  return <View style={[style, { backgroundColor: theme.backgroundColor }]}>{children}</View>;
};
