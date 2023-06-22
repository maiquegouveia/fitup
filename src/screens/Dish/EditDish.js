import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useContext, useState, useEffect, useCallback } from 'react';
import { NativeBaseProvider, Button } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import getDishItens from '../../../utilities/Dish/getDishItens';
import FoodListItem from './components/FoodListItem';
import FoodSelect from './components/FoodSelect';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import AppContext from '../../../AppContext';
import updateDish from '../../../utilities/Dish/updateDish';
import deleteDish from '../../../utilities/Dish/deleteDish';

const EditDish = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { userObject } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [foodAddedList, setFoodAddedList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const getData = async () => {
    const data = await getDishItens(route.params.dishId);
    const itensId = data.map((food) => food.alimento_id);
    const cleanFavoriteList = userObject.favoriteFoods.filter((food) => {
      if (!itensId.includes(food.id)) {
        return food;
      }
    });

    setFoodAddedList(
      data.map((food) => {
        return {
          foodName: food.nome,
          foodId: food.alimento_id,
          amount: food.quantidade,
          carbo: food.carboidrato,
          kcal: food.kcal,
          protein: food.proteina,
          category: food.categoria,
        };
      })
    );

    setFoodList(
      cleanFavoriteList.map((food) => {
        console.log(food);
        return {
          foodName: food.name,
          foodId: food.id,
          amount: 100,
          carbo: food.carbohydrates,
          kcal: food.kcal,
          protein: food.protein,
          category: food.category,
        };
      })
    );
    setIsLoading(false);
  };

  const resetStates = () => {
    setIsLoading(true);
    setFoodAddedList([]);
    setFoodList([]);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    resetStates();
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 0);
  }, []);

  useEffect(() => {
    if (!isFocused) {
      resetStates();
    } else {
      getData();
    }
  }, [isFocused]);

  const getTotalKcal = () => {
    const total = foodAddedList.reduce((acc, food) => acc + (food.kcal * food.amount) / 100, 0);
    return total.toFixed(2);
  };
  const getTotalCarbo = () => {
    const total = foodAddedList.reduce((acc, food) => acc + (food.carbo * food.amount) / 100, 0);
    return total.toFixed(2);
  };
  const getTotalProtein = () => {
    const total = foodAddedList.reduce((acc, food) => acc + (food.protein * food.amount) / 100, 0);
    return total.toFixed(2);
  };

  const handleOnSave = async () => {
    setSaving(true);
    const dish = {
      dishId: route.params.dishId,
      totalCarbo: +getTotalCarbo(),
      totalKcal: +getTotalKcal(),
      totalProtein: +getTotalProtein(),
      foods: [...foodAddedList],
    };
    const response = await updateDish(dish);
    if (response.status === 204) {
      navigation.navigate('FavoriteDishes');
      setSaving(false);
    }
  };

  const onSelectFood = (foodId) => {
    const updatedFoodList = [...foodList];
    const foodAddedIndex = updatedFoodList.findIndex((food) => food.foodId === foodId);
    const updatedFoodAddedList = [...foodAddedList];
    updatedFoodAddedList.push(updatedFoodList[foodAddedIndex]);
    updatedFoodList.splice(foodAddedIndex, 1);
    setFoodAddedList(updatedFoodAddedList);
    setFoodList(updatedFoodList);
  };

  const onRemove = (foodId) => {
    const updatedFoodList = [...foodList];
    const updatedFoodAddedList = [...foodAddedList];
    const foodIndex = updatedFoodAddedList.findIndex((food) => food.foodId === foodId);
    updatedFoodList.push(updatedFoodAddedList[foodIndex]);
    updatedFoodAddedList.splice(foodIndex, 1);
    setFoodAddedList(updatedFoodAddedList);
    setFoodList(updatedFoodList);
  };

  const onDeleteDish = async () => {
    const response = await deleteDish(route.params.dishId);
    if (response) {
      navigation.navigate('FavoriteDishes');
    }
  };

  const alertShow = () => {
    Alert.alert('', `Deseja deletar o prato (${route.params.dishName})?`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },

      {
        text: 'Deletar',
        onPress: () => onDeleteDish(),
      },
    ]);
  };

  return (
    <NativeBaseProvider>
      <ScrollView
        nestedScrollEnabled={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={[styles.background, { backgroundColor: theme.backgroundColor }]}
      >
        <View style={styles.dishCard}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ width: '80%' }}>
              <Text style={[styles.dishName]}>{route.params.dishName}</Text>
            </View>
            <TouchableOpacity onPress={alertShow} activeOpacity={0.7}>
              <FontAwesome5 name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: '#CD853F', marginVertical: 10, padding: 10, borderRadius: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: theme.fontColor.text }}>Categoria: </Text>
              <Text style={{ color: theme.fontColor.text }}>{route.params.dishCategory}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: theme.fontColor.text }}>Calorias: </Text>
              <Text style={{ color: theme.fontColor.text }}>{getTotalKcal()}kcal</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: theme.fontColor.text }}>Carboidratos: </Text>
              <Text style={{ color: theme.fontColor.text }}>{getTotalCarbo()}g</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: theme.fontColor.text }}>Proteínas: </Text>
              <Text style={{ color: theme.fontColor.text }}>{getTotalProtein()}g</Text>
            </View>
          </View>
          {!isLoading && <FoodSelect foodList={foodList} onSelectFood={onSelectFood} />}

          <View style={{ marginTop: 10, maxHeight: '50%', borderRadius: 5, backgroundColor: '#256D1B' }}>
            {!isLoading && (
              <View style={{ alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                  Alimentos ({foodAddedList.length})
                </Text>
              </View>
            )}
            <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.foodScroll} indicatorStyle="white">
              {isLoading && <ActivityIndicator animating={isLoading} color="white" />}
              {foodAddedList.length > 0 &&
                foodAddedList.map((food, index) => (
                  <FoodListItem
                    index={index}
                    key={index}
                    foodName={food.foodName}
                    amount={food.amount}
                    onRemove={onRemove}
                    foodId={food.foodId}
                    style={{ marginBottom: index === foodAddedList.length - 1 ? 0 : 10 }}
                    foodKcal={food.kcal}
                    foodCarbo={food.carbo}
                    foodProtein={food.protein}
                    foodCategory={food.category}
                    foodAddedList={foodAddedList}
                    setFoodAddedList={setFoodAddedList}
                  />
                ))}
            </ScrollView>
          </View>
          {foodAddedList.length > 0 && (
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Button style={styles.button} onPress={handleOnSave} isLoading={saving}>
                Salvar
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default EditDish;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  dishCard: {
    backgroundColor: '#ccc',
    padding: 10,
    width: '90%',
    marginTop: 50,
    borderRadius: 10,
  },
  dishCategory: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodScroll: {
    padding: 10,
  },
  dishName: {
    // top: '15%',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    width: 150,
    marginTop: 20,
  },
});
