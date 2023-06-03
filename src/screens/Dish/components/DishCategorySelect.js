import { useState } from 'react';
import { CheckIcon, Select, WarningOutlineIcon, FormControl } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const DishCategorySelect = () => {
  const [category, setCategory] = useState('');
  return (
    <Select
      placeholderTextColor="black"
      borderColor="black"
      dropdownIcon={<MaterialIcons style={{ marginRight: 5 }} name="arrow-drop-down" size={24} color="black" />}
      selectedValue={category}
      minWidth="1/3"
      accessibilityLabel="Escolha uma categoria"
      placeholder="Escolha uma categoria"
      _selectedItem={{
        bg: '#ccc',
        endIcon: <CheckIcon size={5} />,
      }}
      onValueChange={(itemValue) => setCategory(itemValue)}
    >
      <Select.Item label="Café da Manhã" value="cafe_manha" />
      <Select.Item label="Almoço" value="almoco" />
      <Select.Item label="Janta" value="janta" />
    </Select>
  );
};

export default DishCategorySelect;
