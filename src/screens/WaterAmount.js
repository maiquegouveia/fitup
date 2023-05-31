import { StyleSheet, Text, View, Animated, useRef, useEffect, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import Cup from '../components/Cup';
import AddWaterButton from '../components/AddWaterButton';
import { useState } from 'react';

//https://www.youtube.com/watch?v=PfC5Phrueww
// const changeWater = props => {};
const WaterAmount = () => {
  // const movement = useRef(new Animated.Value(0)).current;
  // useEffect(() => {
  //   Animated.timing(movement, { toValue: 1, useNativeDriver: true }).start();
  //   Animated.timing(scale, { toValue: 2, useNativeDriver: true }).start();
  // }, []);
  const totalWater = 2000;
  const [consumedWater, setConsumedWater] = useState(0);
  const [animation] = useState(new Animated.Value(0));
  const [animationWidth] = useState(new Animated.Value(90));

  const startAnimation = (value) => {
    Animated.timing(animation, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const startAnimationWidth = (value) => {
    Animated.timing(animationWidth, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const onChangeConsume = (amount) => {
    const newConsumed = consumedWater + amount;
    if (newConsumed > totalWater) return;
    const newHeight = ((amount + consumedWater) * 195) / totalWater;
    console.log(newHeight);
    setConsumedWater((prev) => prev + amount);
    startAnimation(newHeight);
    if (newHeight > 9.75) {
      startAnimationWidth(110);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', padding: 30 }}>
        <Cup consumedWater={consumedWater} animation={animation} animationWidth={animationWidth} />
      </View>
      <View style={{ width: '100%', padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Opções Rápidas</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AddWaterButton amount="100" showIcon={true} onChangeConsume={() => onChangeConsume(100)} />
          <AddWaterButton amount="200" showIcon={true} onChangeConsume={() => onChangeConsume(200)} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
          <AddWaterButton amount="300" showIcon={true} onChangeConsume={() => onChangeConsume(300)} />
          <AddWaterButton amount="400" showIcon={true} onChangeConsume={() => onChangeConsume(400)} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <AddWaterButton amount="Outros" onChangeConsume={() => console.log('teste')} />
        </View>
      </View>
    </SafeAreaView>
  );

  // <View style={styles.screen}>
  //   <View style={styles.bucket}>
  //     <View style={styles.water}>
  //       <Text>teste</Text>
  //     </View>
  //   </View>

  {
    /* <Animated.View style={[styles.water, { opacity: movement, transform: [{ scale }] }]} /> */
  }
  {
    /* <Text>alguma coisa</Text></View> */
  }
};

export default WaterAmount;

const styles = StyleSheet.create({
  // screen: {
  //   height: '100%',
  //   backgroundColor: 'white',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // bucket: {
  //   borderTopWidth: 260,
  //   borderBottonWidth: 80,
  //   borderLeftWidth: 80,
  //   borderRightWidth: 80,
  //   borderBottomLeftRadius: 130,
  //   borderBottomRightRadius: 130,
  //   backgroundColor: 'blue',
  //   borderRightColor: 'transparent',
  //   borderLeftColor: 'transparent',
  //   justifyContent: 'flex-start',
  //   position: 'absolute',
  // },
  // water: {
  //   backgroundColor: 'rgba(117, 241, 255, 1)',
  //   borderTopWidth: 260,
  //   borderBottonWidth: 80,
  //   borderRightColor: 'transparent',
  //   borderLeftColor: 'transparent',
  //   borderLeftWidth: 80,
  //   borderRightWidth: 80,
  //   borderBottomLeftRadius: 130,
  //   borderBottomRightRadius: 130,
  // },
  // copoContainer: {
  //   width: 150,
  //   height: 200,
  //   borderRadius: 75,
  //   backgroundColor: 'blue',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // copoContent: {
  //   width: 100,
  //   height: 150,
  //   borderRadius: 50,
  //   backgroundColor: 'white',
  // },
});
