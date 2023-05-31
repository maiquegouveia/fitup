import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const AddWaterButton = ({ amount, showIcon, onChangeConsume }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onChangeConsume}>
      <Text style={styles.buttonText}>
        {amount}
        {showIcon && 'mL'}
      </Text>
      {showIcon && <Ionicons name="water" size={24} color="white" />}
    </TouchableOpacity>
  );
};

export default AddWaterButton;

const styles = StyleSheet.create({
  button: {
    width: '48%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D87F0',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
