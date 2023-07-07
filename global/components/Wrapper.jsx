import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Wrapper = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

export default Wrapper;
