import { useState } from 'react';
import { CheckIcon, Select } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../../../contexts/ThemeProvider';
import { useContext } from 'react';
const FoodSelect = ({ foodList, onSelectFood }) => {
  const [selectedFood, setSelectedFood] = useState('');
  const { theme } = useContext(ThemeContext);

  return (
    <Select
      borderWidth={2}
      minWidth="2/3"
      borderColor={theme.backgroundLine}
      placeholderTextColor={theme.fontColor.text}
      dropdownIcon={
        <MaterialIcons style={{ marginRight: 5 }} name="arrow-drop-down" size={24} color={theme.iconColor} />
      }
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
