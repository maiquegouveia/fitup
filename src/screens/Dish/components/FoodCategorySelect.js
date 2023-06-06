import { useState } from 'react';
import { CheckIcon, Select, WarningOutlineIcon, FormControl } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../../../contexts/ThemeProvider';
import { useContext } from 'react';
const FoodCategorySelect = ({ categories, setCategory, selectedValue }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Select
      color={theme.fontColor.text}
      borderWidth={2}
      borderColor={theme.backgroundLine}
      dropdownIcon={
        <MaterialIcons style={{ marginRight: 5 }} name="arrow-drop-down" size={24} color={theme.iconColor} />
      }
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
