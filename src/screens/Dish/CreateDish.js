import { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import DishCard from './components/DishCard';
import Dish from '../../../models/Dish';
import DishCategory from '../../../models/DishCategory';
import { useIsFocused } from '@react-navigation/native';
import DishCreateCard from './components/DishCreateCard';
import TouchableContainer from '../../../global/components/TouchableContainer';
import TouchableScrollContainer from '../../../global/components/TouchableScrollContainer';
import Title from '../../../global/components/Title';
import InputWithLabelAndPlaceholder from '../../../global/components/InputWithLabelAndPlaceholder';
import Picker from '../../../global/components/Picker';

const CreateDish = ({ theme, userObject }) => {
  const [selectedDishCategory, setSelectedDishCategory] = useState();
  const [selectedFavoriteFood, setSelectedFavoriteFood] = useState();
  const [dishCategories, setDishCategories] = useState([]);
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const isFocused = useIsFocused();
  const inputRef = useRef(null);

  const getCategories = async () => {
    const categories = await DishCategory.getCategories();
    setDishCategories(categories);
  };

  useEffect(() => {
    if (isFocused) {
      getCategories();
    }
  }, [isFocused]);

  return (
    <TouchableScrollContainer onPress={() => inputRef.current.blur()} style={styles.mainContainer} theme={theme}>
      <Title containerStyles={styles.titleContainer} titleStyles={styles.title} theme={theme}>
        Criar Prato
      </Title>
      <DishCreateCard theme={theme} />
      <InputWithLabelAndPlaceholder
        ref={inputRef}
        theme={theme}
        wrapperStyle={styles.wrapper}
        labelStyle={styles.label}
        label="Nome do Prato"
        placeholder="Digite o nome do prato..."
        variant="outline"
      />
      <Picker
        setSelectedValue={setSelectedDishCategory}
        selectedValue={selectedDishCategory}
        theme={theme}
        label="Categoria do Prato"
        labelStyle={[styles.label]}
        itemStyle={{ fontSize: 16, color: 'red' }}
        mode="dropdown"
        style={{ marginTop: 10 }}
        options={dishCategories}
      />
      <Picker
        setSelectedValue={setSelectedFavoriteFood}
        selectedValue={selectedFavoriteFood}
        theme={theme}
        label="Escolha um alimento"
        labelStyle={[styles.label]}
        itemStyle={{ fontSize: 16, color: 'red' }}
        mode="dialog"
        style={{ marginTop: 10 }}
        options={userObject.favoriteFoods}
      />
    </TouchableScrollContainer>
  );
};

export default CreateDish;

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: '100%',
    padding: 15,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
  },
  wrapper: {
    marginTop: 15,
  },
  label: {
    fontSize: 18,
  },
});
