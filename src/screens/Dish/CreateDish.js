import { StyleSheet, View, ScrollView } from 'react-native';
import { useState, useContext, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Input, NativeBaseProvider, Text, Button } from 'native-base';
import WarningCreateDish from '../../components/WarningCreateDish';
import DishCategorySelect from './components/DishCategorySelect';
import FoodSelect from './components/FoodSelect';
import FoodListItem from './components/FoodListItem';
import FoodCategorySelect from './components/FoodCategorySelect';
import AppContext from '../../../AppContext';
import { useFocusEffect } from '@react-navigation/native';
import createDish from '../../../utilities/Dish/createDish';

const CreateDish = () => {
  const { params } = useContext(AppContext);
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showWarningCategory, setShowWarningCategory] = useState(true);
  const [showWarningFood, setShowWarningFood] = useState(true);
  const [foodAddedList, setFoodAddedList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    value: '',
    isValid: false,
  });
  const [dishCategory, setDishCategory] = useState('');

  const onChangeInput = (text) => {
    if (text.length > 3) {
      return setInput({
        isValid: true,
        value: text,
      });
    } else {
      return setInput({
        isValid: false,
        value: text,
      });
    }
  };

  const setCategory = (value) => {
    setSelectedCategory(value);
  };

  const resetStates = () => {
    setFoodAddedList([]);
    setDishCategory('');
    setSelectedCategory('Todos');
    setShowWarningCategory(true);
    setShowWarningFood(true);
    setInput({
      value: '',
      isValid: false,
    });
  };

  useFocusEffect(
    useCallback(() => {
      resetStates();
      const foodList = [...params.favoriteList];
      setFoodList(
        foodList.map((food) => {
          return {
            foodName: food.nome,
            foodId: food.alimento_id,
            amount: 100,
            category: food.categoria,
          };
        })
      );
    }, [])
  );

  const onSelectFood = (foodId) => {
    const updatedFoodList = [...foodList];
    const foodAddedIndex = updatedFoodList.findIndex((food) => food.foodId === foodId);
    const updatedFoodAddedList = [...foodAddedList];
    updatedFoodAddedList.push(updatedFoodList[foodAddedIndex]);
    updatedFoodList.splice(foodAddedIndex, 1);
    setFoodAddedList(updatedFoodAddedList);
    setFoodList(updatedFoodList);
    setShowWarningFood(false);
  };

  const onRemove = (foodId) => {
    const updatedFoodList = [...foodList];
    const updatedFoodAddedList = [...foodAddedList];
    const foodIndex = updatedFoodAddedList.findIndex((food) => food.foodId === foodId);
    updatedFoodList.push(updatedFoodAddedList[foodIndex]);
    updatedFoodAddedList.splice(foodIndex, 1);
    setFoodAddedList(updatedFoodAddedList);
    setFoodList(updatedFoodList);
    if (!updatedFoodAddedList.length > 0) {
      setShowWarningFood(true);
    }
  };

  const getAllCategories = () => {
    let categories = [...new Set([...foodList.map((food) => food.category)])];
    return categories.map((cat) => {
      return { nome: cat };
    });
  };

  const getFilteredFood = () => {
    if (selectedCategory === 'Todos') {
      return foodList;
    }
    return foodList.filter((food) => food.category === selectedCategory);
  };

  const onCreateDish = async () => {
    if (!input.isValid || showWarningCategory || showWarningFood) return;
    setIsLoading(true);
    const dish = {
      userId: params.usuario_id,
      dishName: input.value,
      foods: foodAddedList,
      dishCategory: dishCategory,
    };
    const result = await createDish(dish);
    console.log(result);
    if (!result?.error) navigation.navigate('FavoriteDishes');
    setIsLoading(false);
  };

  const onSelectDishCategory = (value) => {
    setDishCategory(value);
    setShowWarningCategory(false);
  };

  const getNameError = () => {
    if (input.value.length === 0) return 'Por favor digite um nome para o prato';
    if (input.value.length > 0 && input.value.length <= 3) return 'Digite um nome maior que 3 caracteres';
  };

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.mainContainer}>
          <Text fontSize={24} fontWeight="bold">
            Criar Prato
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.formControl}>
              <Text fontWeight="semibold">Nome do Prato</Text>
              <Input
                onChangeText={onChangeInput}
                value={input.value}
                borderWidth={2}
                focusOutlineColor="black"
                variant="outline"
                placeholder="Digite o nome do prato"
                placeholderTextColor="black"
                borderColor="black"
                invalidOutlineColor="red"
              />
              {!input.isValid && <WarningCreateDish message={getNameError()} />}
            </View>
            <View style={styles.formControl}>
              <Text fontWeight="semibold">Categoria</Text>
              <DishCategorySelect category={dishCategory} onSelectDishCategory={onSelectDishCategory} />
              {showWarningCategory && <WarningCreateDish message="Selecione uma categoria para o prato" />}
            </View>
            <View style={styles.formControl}>
              <Text fontWeight="semibold">Alimentos</Text>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <FoodSelect foodList={getFilteredFood()} onSelectFood={onSelectFood} />
                <FoodCategorySelect
                  categories={getAllCategories()}
                  selectedValue={selectedCategory}
                  setCategory={setCategory}
                />
              </View>
              {showWarningFood && <WarningCreateDish message="Adicione pelo menos 1 Alimento" />}
            </View>
            {foodAddedList.length > 0 && (
              <View style={{ marginTop: 10, height: '40%', backgroundColor: '#ccc' }}>
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                  {foodAddedList.map((food, index) => (
                    <FoodListItem
                      onRemove={onRemove}
                      foodId={food.foodId}
                      key={index}
                      foodName={food.foodName}
                      amount={food.amount}
                      style={{ marginBottom: index === foodAddedList.length - 1 ? 0 : 10 }}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
            <Button
              isLoading={isLoading}
              disabled={false}
              marginTop={foodAddedList.length > 0 ? 5 : 10}
              onPress={onCreateDish}
            >
              Criar
            </Button>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default CreateDish;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    padding: 10,
  },
  formContainer: {
    width: '100%',
    padding: 10,
  },
  prats: {
    fontSize: 15,
  },
  formControl: {
    marginTop: 10,
  },
});
