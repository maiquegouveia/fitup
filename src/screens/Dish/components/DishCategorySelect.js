import { CheckIcon, Select } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const DishCategorySelect = ({ category, onSelectDishCategory }) => {
  return (
    <Select
      borderWidth={2}
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
