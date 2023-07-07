import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default ({ children, theme, containerStyles, titleStyles }) => {
  return (
    <View style={containerStyles}>
      <Text style={[titleStyles, { fontFamily: theme.font.bold, color: theme.fontColor.title }]}>{children}</Text>
    </View>
  );
};
