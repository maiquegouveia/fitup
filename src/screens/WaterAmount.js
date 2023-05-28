import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const WaterAmount = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.bucket}>
        <Text>some text</Text>
      </View>
    </View>
  );
};

export default WaterAmount;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'white',
  },
  bucket: {
    backgroundColor: 'red',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 70,
    marginLeft: '40%',
  },
});
