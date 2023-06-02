import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { CheckIcon, Select, WarningOutlineIcon, FormControl } from 'native-base';

const DishCategorySelect = () => {
  const [category, setCategory] = useState('');
  return (
    // <FormControl w="3/4" maxW="300" isRequired isInvalid>
    //   <FormControl.Label>Choose service</FormControl.Label>
    <Select
      selectedValue={category}
      minWidth="200"
      accessibilityLabel="Escolha uma categoria"
      placeholder="Escolha uma categoria"
      _selectedItem={{
        bg: '#ccc',
        endIcon: <CheckIcon size={5} />,
      }}
      mt="1"
      onValueChange={(itemValue) => setCategory(itemValue)}
    >
      <Select.Item label="Café da Manhã" value="cafe_manha" />
      <Select.Item label="Almoço" value="almoco" />
      <Select.Item label="Janta" value="janta" />
    </Select>
    //   <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
    //     Please make a selection!
    //   </FormControl.ErrorMessage>
    // </FormControl>
  );
};

export default DishCategorySelect;

const styles = StyleSheet.create({});
