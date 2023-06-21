import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

const CustomHelpButtonHeader = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Entypo name="help-with-circle" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default CustomHelpButtonHeader;

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
});
