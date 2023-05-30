import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const Stepper = ({ amount, dishIndex, dishesData, foodIndex, onChangeDishesData }) => {
  const [value, setValue] = useState(amount);
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
    text = text.replaceAll(',', '.').replaceAll('..', '.').replaceAll('-', '').replaceAll(' ', '');
    if (text.at(0) === ',' || text.at(0) === '.' || text.at(0) === ' ' || text.at(0) === '-') {
      dishesUpdated[dishIndex].foods[foodIndex].qnt = text;
      onChangeDishesData(dishesUpdated);
      return;
    }
    dishesUpdated[dishIndex].foods[foodIndex].qnt = text;
    onChangeDishesData(dishesUpdated);
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
        <TextInput
          inputMode="numeric"
          style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'white' }}
          value={`${dishesData[dishIndex].foods[foodIndex].qnt}`}
          onChangeText={onChange}
        />
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
