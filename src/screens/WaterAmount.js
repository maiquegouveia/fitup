import { StyleSheet, Text, View, Animated, useRef, useEffect, Button } from 'react-native';
import React from 'react';

//https://www.youtube.com/watch?v=PfC5Phrueww
const changeWater = props => {};
const WaterAmount = () => {
  // const movement = useRef(new Animated.Value(0)).current;
  // useEffect(() => {
  //   Animated.timing(movement, { toValue: 1, useNativeDriver: true }).start();
  //   Animated.timing(scale, { toValue: 2, useNativeDriver: true }).start();
  // }, []);
  return (
    <View style={styles.screen}>
      <View style={styles.bucket}>
        <View style={styles.water}>
          <Text>teste</Text>
        </View>
      </View>

      {/* <Animated.View style={[styles.water, { opacity: movement, transform: [{ scale }] }]} /> */}
      <Text>alguma coisa</Text>
    </View>
  );
};

export default WaterAmount;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bucket: {
    borderTopWidth: 260,
    borderBottonWidth: 80,
    borderLeftWidth: 80,
    borderRightWidth: 80,
    borderBottomLeftRadius: 130,
    borderBottomRightRadius: 130,
    backgroundColor: 'blue',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    justifyContent: 'flex-start',
    position: 'absolute',
  },
  water: {
    backgroundColor: 'rgba(117, 241, 255, 1)',
    borderTopWidth: 260,
    borderBottonWidth: 80,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderLeftWidth: 80,
    borderRightWidth: 80,
    borderBottomLeftRadius: 130,
    borderBottomRightRadius: 130,
  },

  copoContainer: {
    width: 150,
    height: 200,
    borderRadius: 75,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copoContent: {
    width: 100,
    height: 150,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});
