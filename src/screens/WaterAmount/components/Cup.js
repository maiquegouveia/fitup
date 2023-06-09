import { StyleSheet, View, Animated, Text } from 'react-native';
import { ThemeContext } from '../../../../contexts/ThemeProvider';
import { useContext } from 'react';

const Cup = ({ animation, consumedWater, animationWidth, totalWater }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View
        style={{
          width: 120,
          height: 200,
          backgroundColor: '#B0C4DE',
          borderBottomEndRadius: 30,
          borderBottomLeftRadius: 30,
          borderTopStartRadius: 5,
          borderTopEndRadius: 5,
          padding: 3,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ borderWidth: 1, borderColor: 'white', width: '90%' }}></View>

        <Animated.View
          style={{
            opacity: 0.5,
            backgroundColor: 'blue',
            width: animationWidth,
            height: animation,
            borderBottomEndRadius: 30,
            borderBottomLeftRadius: 30,
          }}
        ></Animated.View>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: theme.fontColor.text,
          marginLeft: 10,
        }}
      >
        {consumedWater}/{totalWater}mL
      </Text>
    </View>
  );
};

export default Cup;

const styles = StyleSheet.create({});
