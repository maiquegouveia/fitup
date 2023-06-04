import { useState } from 'react';
import { CheckIcon, Select, WarningOutlineIcon, FormControl } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const FoodCategorySelect = ({ categories, setCategory, selectedValue }) => {
  return (
    <Select
    borderWidth={2}
      placeholderTextColor="black"
      borderColor="black"
      dropdownIcon={<MaterialIcons style={{ marginRight: 5 }} name="arrow-drop-down" size={24} color="black" />}
      selectedValue={selectedValue}
      minWidth="1/3"
      accessibilityLabel="Escolha uma categoria"
      placeholder="Escolha uma categoria"
      _selectedItem={{
        bg: '#ccc',
        endIcon: <CheckIcon size={5} />,
      }}
      onValueChange={(itemValue) => setCategory(itemValue)}
    >
      <Select.Item label="Todos" value="Todos" />
      {categories.map((cat, index) => (
        <Select.Item key={index} label={cat.nome} value={cat.nome} />
      ))}
    </Select>
  );
};

export default FoodCategorySelect;
