import { useState, useEffect, useRef } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import DishCard from './components/DishCard';
import Dish from '../../../models/Dish';
import DishCategory from '../../../models/DishCategory';
import { useIsFocused } from '@react-navigation/native';
import DishCreateCard from './components/DishCreateCard';
import TouchableScrollContainer from '../../../global/components/TouchableScrollContainer';
import Title from '../../../global/components/Title';
import InputWithLabelAndPlaceholder from '../../../global/components/InputWithLabelAndPlaceholder';
import Picker from '../../../global/components/Picker';
import FoodItem from './components/FoodItem';

const CreateDish = ({ theme, userObject }) => {
  const [dishName, setDishName] = useState('');
  const [selectedDishCategory, setSelectedDishCategory] = useState();
  const [selectedFavoriteFood, setSelectedFavoriteFood] = useState();
  const [dishCategories, setDishCategories] = useState([]);
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [addedFoods, setAddedFoods] = useState([]);
  const isFocused = useIsFocused();
  const inputRef = useRef(null);

  const getCategories = async () => {
    const categories = await DishCategory.getCategories();
    setDishCategories(categories);
    setSelectedDishCategory(categories[0].id);
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const resetStates = () => {
    setFavoriteFoods([]);
    setAddedFoods([]);
    setSelectedDishCategory();
    setSelectedFavoriteFood();
    setDishName('');
  };

  useEffect(() => {
    if (isFocused) {
      getCategories();
      setFavoriteFoods(userObject.favoriteFoods);
      setSelectedFavoriteFood(userObject.favoriteFoods[0].id);
    } else {
      resetStates();
    }
  }, [isFocused]);

  const handlerSelectFood = (foodId) => {
    setSelectedFavoriteFood(foodId);
  };

  const handlerSelectCategory = (categoryId) => {
    setSelectedDishCategory(categoryId);
  };

  const handlerAddFood = () => {
    if (selectedFavoriteFood) {
      const updatedFavoriteFoods = [...favoriteFoods];
      const index = updatedFavoriteFoods.findIndex((food) => food.id === selectedFavoriteFood);
      const food = updatedFavoriteFoods[index];
      food.amount = 100;
      const updatedAddedFoods = [...addedFoods];
      updatedAddedFoods.push(food);
      updatedFavoriteFoods.splice(index, 1);
      setFavoriteFoods(updatedFavoriteFoods);
      setAddedFoods(updatedAddedFoods);
      setSelectedFavoriteFood(updatedFavoriteFoods[0]?.id);
    } else {
      showAlert('Nenhum alimento!', 'Você não tem nenhum alimento restante para adicionar no prato!');
    }
  };

  const handlerRemoveFood = (foodId) => {
    const updatedAddedFoods = [...addedFoods];
    const index = updatedAddedFoods.findIndex((food) => (food.id = foodId));
    const food = updatedAddedFoods[index];
    updatedAddedFoods.splice(index, 1);
    const updatedFavoriteFoods = [...favoriteFoods];
    updatedFavoriteFoods.push(food);
    setFavoriteFoods(updatedFavoriteFoods);
    setAddedFoods(updatedAddedFoods);
  };

  const handlerChangeInput = (text) => {
    setDishName(text);
  };

  const handlerCreateDish = () => {
    const name = dishName.trim();
    if (!name) {
      showAlert('Nome do prato inválido!', 'Por favor dê um nome para criar o prato.');
      return;
    } else if (name.length < 6) {
      showAlert('Nome do prato inválido!', 'Por favor dê um nome de pelo menos 6 caracteres para o prato.');
      return;
    }
    const foods = addedFoods.map((food) => {
      return {
        favorite_food_id: food.favoriteFoodId,
        amount: food.amount,
      };
    });

    const dish = {
      name,
      category_id: selectedDishCategory,
      user_id: userObject.id,
      foods,
    };

    console.log(dish);
  };

  return (
    <TouchableScrollContainer onPress={() => inputRef.current.blur()} style={styles.mainContainer} theme={theme}>
      <Title containerStyles={styles.titleContainer} titleStyles={styles.title} theme={theme}>
        Criar Prato
      </Title>
      <DishCreateCard theme={theme} />
      <InputWithLabelAndPlaceholder
        handlerChange={handlerChangeInput}
        value={dishName}
        ref={inputRef}
        theme={theme}
        wrapperStyle={styles.wrapper}
        labelStyle={styles.label}
        label="Nome do Prato"
        placeholder="Digite o nome do prato..."
        variant="outline"
      />
      <Picker
        handlerSelect={handlerSelectCategory}
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
        handlerSelect={handlerSelectFood}
        setSelectedValue={setSelectedFavoriteFood}
        selectedValue={selectedFavoriteFood}
        theme={theme}
        label="Escolha um alimento"
        labelStyle={[styles.label]}
        itemStyle={{ fontSize: 16, color: 'red' }}
        mode="dialog"
        style={{ marginTop: 10 }}
        options={favoriteFoods}
      />
      <Button
        onPress={handlerAddFood}
        labelStyle={{ fontFamily: theme.font.semiBold }}
        textColor="white"
        style={styles.btn}
      >
        Adicionar
      </Button>
      <View style={styles.scrollContainer}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={styles.foodsContainer}>
          {addedFoods?.map((food, index) => (
            <FoodItem
              key={index}
              theme={theme}
              food={food}
              style={{ marginRight: index === addedFoods.length - 1 ? 0 : 10 }}
              handlerRemove={handlerRemoveFood}
            />
          ))}
        </ScrollView>
      </View>
      {addedFoods.length > 0 && (
        <Button
          onPress={handlerCreateDish}
          labelStyle={{ fontFamily: theme.font.semiBold }}
          textColor="white"
          style={styles.btn}
        >
          Criar Prato
        </Button>
      )}
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
  btn: {
    marginTop: 15,
    backgroundColor: '#FF7900',
    borderRadius: 5,
  },
  foodsContainer: {},
  scrollContainer: {
    width: '100%',
    marginTop: 15,
  },
});
