import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const Stepper = ({ amount }) => {
  const [value, setValue] = useState(amount);
  const onIncrement = () => setValue(prev => prev + 1);
  const onDecrement = () => {
    if (value > 0) setValue(prev => prev - 1);
  };
  const onChange = text => {
    if (text.at(0) === ',' || text.at(0) === '.' || text.at(0) === ' ' || text.at(0) === '-') {
      setValue(0);
      return;
    }
    text = text.replaceAll(',', '.').replaceAll('..', '.').replaceAll('-', '').replaceAll(' ', '');
    setValue(text);
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
          borderWidth: 2,
          borderColor: 'black',
        }}
      >
        <TextInput
          inputMode="numeric"
          style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}
          value={`${value}`}
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
