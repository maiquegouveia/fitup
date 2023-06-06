import { CheckIcon, Select } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../../../contexts/ThemeProvider';
import { useContext } from 'react';

const DishCategorySelect = ({ category, onSelectDishCategory }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Select
      borderWidth={2}
      placeholderTextColor={theme.fontColor.text}
      color={theme.fontColor.text}
      borderColor={theme.backgroundLine}
      dropdownIcon={
        <MaterialIcons style={{ marginRight: 5 }} name="arrow-drop-down" size={24} color={theme.iconColor} />
      }
      selectedValue={category}
      minWidth="1/3"
      accessibilityLabel="Escolha uma categoria"
      placeholder="Escolha uma categoria"
      _selectedItem={{
        bg: '#ccc',
        endIcon: <CheckIcon size={5} />,
      }}
      onValueChange={(itemValue) => onSelectDishCategory(itemValue)}
    >
      <Select.Item label="Café da Manhã" value="Café da Manhã" />
      <Select.Item label="Lanche da Manhã" value="Lanche da Manhã" />
      <Select.Item label="Almoço" value="Almoço" />
      <Select.Item label="Lanche da Tarde" value="Lanche da Tarde" />
      <Select.Item label="Janta" value="Janta" />
    </Select>
  );
};

export default DishCategorySelect;
