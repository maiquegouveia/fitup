import { StyleSheet, Text, View, Animated, SafeAreaView } from 'react-native';
import React from 'react';
import Cup from '../components/Cup';
import AddWaterButton from '../components/AddWaterButton';
import { useState } from 'react';

const WaterAmount = () => {
  const totalWater = 5000;
  const [consumedWater, setConsumedWater] = useState(0);
  const [animation] = useState(new Animated.Value(0));
  const [animationWidth] = useState(new Animated.Value(90));

  const resetWater = () => {
    setConsumedWater(0);
    startAnimation(0);
    startAnimationWidth(90);
  };

  const startAnimation = (value) => {
    Animated.timing(animation, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const startAnimationWidth = (value) => {
    Animated.timing(animationWidth, {
      toValue: value,
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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.cupContainer}>
        <Cup consumedWater={consumedWater} animation={animation} animationWidth={animationWidth} />
      </View>
      <View style={styles.btnsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Opções Rápidas</Text>
        </View>
        <View style={styles.btnContainer}>
          <AddWaterButton amount="100" showIcon={true} onChangeConsume={() => onChangeConsume(100)} />
          <AddWaterButton amount="200" showIcon={true} onChangeConsume={() => onChangeConsume(200)} />
        </View>
        <View style={[styles.btnContainer, { marginTop: 15 }]}>
          <AddWaterButton amount="300" showIcon={true} onChangeConsume={() => onChangeConsume(300)} />
          <AddWaterButton amount="400" showIcon={true} onChangeConsume={() => onChangeConsume(400)} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <AddWaterButton amount="Outros" onChangeConsume={resetWater} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WaterAmount;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  cupContainer: {
    alignItems: 'center',
    padding: 30,
  },
  btnsContainer: {
    width: '100%',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
