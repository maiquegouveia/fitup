import { useState } from 'react';
import { CheckIcon, Select } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const FoodSelect = ({ foodList, onSelectFood }) => {
  const [selectedFood, setSelectedFood] = useState('');

  return (
    <Select
    borderWidth={2}
      minWidth="2/3"
      borderColor="black"
      placeholderTextColor="black"
      dropdownIcon={<MaterialIcons style={{ marginRight: 5 }} name="arrow-drop-down" size={24} color="black" />}
      selectedValue={selectedFood}
      accessibilityLabel="Adicione um alimento"
      placeholder="Adicione um alimento"
      marginRight={1}
      _selectedItem={{
        bg: '#ccc',
        endIcon: <CheckIcon size={5} />,
      }}
      onValueChange={(itemValue) => onSelectFood(itemValue)}
    >
      {foodList.map((food) => (
        <Select.Item key={food.foodId} label={food.foodName} value={food.foodId} />
      ))}
    </Select>
  );
};

export default FoodSelect;
