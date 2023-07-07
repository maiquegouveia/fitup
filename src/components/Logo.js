import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { logo } from '../../constants/images';

export default function Logo() {
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.image} source={logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: 156,
    height: 156,
    marginBottom: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
