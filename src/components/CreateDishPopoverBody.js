import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Input, FormControl, Text, WarningOutlineIcon } from 'native-base';
import DishCategorySelect from './DishCategorySelect';
import WarningCreateDish from './WarningCreateDish';

const CreateDishPopoverBody = () => {
  const [showWarningName, setShowWarningName] = useState(false);
  const [showWarningCategory, setShowWarningCategory] = useState(false);
  return (
    <View style={{ padding: 10 }}>
      <FormControl>
        <FormControl.Label>Nome do Prato</FormControl.Label>
        <Input variant="outline" />
        {showWarningName && <WarningCreateDish message="Por favor digite um nome" />}
      </FormControl>
      <View>
        <FormControl.Label>Categoria</FormControl.Label>
        <DishCategorySelect />
        {showWarningCategory && <WarningCreateDish message="Por favor escolha uma categoria" />}
      </View>
    </View>
  );
};

export default CreateDishPopoverBody;
