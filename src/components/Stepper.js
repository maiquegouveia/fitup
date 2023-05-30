import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TextInput, Text } from 'react-native';
import checkNumericInput from '../../utilities/checkNumericInput';

const Stepper = ({ amount, dishIndex, dishesData, foodIndex, onChangeDishesData }) => {
  let dishesUpdated = [...dishesData];

  const onIncrement = () => {
    dishesUpdated[dishIndex].foods[foodIndex].qnt += 1;
    onChangeDishesData(dishesUpdated);
  };

  const onDecrement = () => {
    dishesUpdated[dishIndex].foods[foodIndex].qnt -= 1;
    onChangeDishesData(dishesUpdated);
  };

  const onChange = text => {
    if (text.length === 0 || text[0] === ',' || text[0] === '-' || text[0] === ' ' || text[0] === '.') {
      dishesUpdated[dishIndex].foods[foodIndex].qnt = '';
      onChangeDishesData(dishesUpdated);
      return;
    }
    if (checkNumericInput(text)) {
      dishesUpdated[dishIndex].foods[foodIndex].qnt = text;
      onChangeDishesData(dishesUpdated);
    } else {
      const newText = text.slice(0, text.length - 1);
      dishesUpdated[dishIndex].foods[foodIndex].qnt = newText;
      onChangeDishesData(dishesUpdated);
    }
  };

  return (
    <View style={styles.stepperContainer}>
      <AntDesign onPress={onDecrement} name="minussquareo" size={34} color="black" />
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2.2,
          marginHorizontal: 3,
          borderColor: 'black',
          width: 50,
          height: 30,
          backgroundColor: '#E57A44',
        }}
      >
        {/* <TextInput
          inputMode="numeric"
          style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'white' }}
          value={`${dishesData[dishIndex].foods[foodIndex].qnt}`}
          onChangeText={onChange}
        /> */}
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 14, color: 'white' }}>
          {dishesData[dishIndex].foods[foodIndex].qnt}
        </Text>
      </View>
      <AntDesign onPress={onIncrement} name="plussquareo" size={34} color="black" />
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
