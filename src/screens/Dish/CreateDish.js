import { StyleSheet, View, ScrollView } from 'react-native';
import { useState, useContext, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Input, NativeBaseProvider, FormControl, Text, Button } from 'native-base';
import WarningCreateDish from '../../components/WarningCreateDish';
import DishCategorySelect from './components/DishCategorySelect';
import FoodSelect from './components/FoodSelect';
import FoodListItem from './components/FoodListItem';
import FoodCategorySelect from './components/FoodCategorySelect';
import AppContext from '../../../AppContext';
import { useFocusEffect } from '@react-navigation/native';

const CreateDish = () => {
  const { params } = useContext(AppContext);
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showWarningName, setShowWarningName] = useState(false);
  const [showWarningCategory, setShowWarningCategory] = useState(false);
  const [showWarningFood, setShowWarningFood] = useState(false);

  const [foodList, setFoodList] = useState([]);

  const setCategory = (value) => {
    setSelectedCategory(value);
  };

  useFocusEffect(
    useCallback(() => {
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

  const [foodAddedList, setFoodAddList] = useState([]);

  const onSelectFood = (foodId) => {
    const updatedFoodList = [...foodList];
    const foodAddedIndex = updatedFoodList.findIndex((food) => food.foodId === foodId);
    const updatedFoodAddedList = [...foodAddedList];
    updatedFoodAddedList.push(updatedFoodList[foodAddedIndex]);
    updatedFoodList.splice(foodAddedIndex, 1);
    setFoodAddList(updatedFoodAddedList);
    setFoodList(updatedFoodList);
  };
  const onRemove = (foodId) => {
    const updatedFoodList = [...foodList];
    const updatedFoodAddedList = [...foodAddedList];
    const foodIndex = updatedFoodAddedList.findIndex((food) => food.foodId === foodId);
    updatedFoodList.push(updatedFoodAddedList[foodIndex]);
    updatedFoodAddedList.splice(foodIndex, 1);
    setFoodAddList(updatedFoodAddedList);
    setFoodList(updatedFoodList);
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

  return (
    <NativeBaseProvider>
      <View style={styles.mainContainer}>
        <Text fontSize={24} fontWeight="bold">
          Criar Prato
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.formControl}>
            <Text fontWeight="semibold">Nome do Prato</Text>
            <Input
              focusOutlineColor="black"
              variant="outline"
              placeholder="Digite o nome do prato"
              placeholderTextColor="black"
              borderColor="black"
              invalidOutlineColor="red"
            />
            {showWarningName && <WarningCreateDish message="Por favor digite um nome" />}
          </View>
          <View style={styles.formControl}>
            <Text fontWeight="semibold">Categoria</Text>
            <DishCategorySelect />
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
            <View style={{ marginTop: 10, height: '40%' }}>
              <ScrollView contentContainerStyle={{ padding: 10, backgroundColor: '#ccc' }}>
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
          <Button disabled={false} marginTop={10} onPress={() => console.log('CLEAR')}>
            Criar
          </Button>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default CreateDish;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
