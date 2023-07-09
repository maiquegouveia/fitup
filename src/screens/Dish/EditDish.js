import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { NativeBaseProvider, Button } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import FoodSelect from './components/FoodSelect';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import AppContext from '../../../AppContext';
import updateDish from '../../../utilities/Dish/updateDish';
import deleteDish from '../../../utilities/Dish/deleteDish';
import DishCardInfo from './components/DishCardInfo';
import FoodItem from '../Dish/components/FoodItem';

const EditDish = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { userObject } = useContext(AppContext);
  const [saving, setSaving] = useState(false);
  const [foodAddedList, setFoodAddedList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const { dish } = route.params;
  const isFocused = useIsFocused();

  const handlerSeeMore = () => setSeeMore((prev) => !prev);

  const resetStates = () => {
    setSeeMore(false);
    setSaving(false);
  };

  useEffect(() => {
    if (!isFocused) {
      resetStates();
    } else {
      const foodIds = dish.dishItems.map((item) => item.food.food_id);
      const dishFoods = dish.dishItems.map((item) => {
        return {
          ...item.food,
          category: item.food.FoodCategory.name,
          amount: item.amount,
          favoriteFoodId: item.favoriteFoodId,
          id: item.food.food_id,
        };
      });
      setFoodAddedList(dishFoods);
      const userFoods = userObject.favoriteFoods.filter((food) => !foodIds.includes(food.id));

      setFoodList(userFoods);
    }
  }, [isFocused]);

  const handleOnSave = async () => {
    setSaving(true);
    const foods = {};
    foods.foods = foodAddedList.map((food) => {
      return {
        favorite_food_id: food.favoriteFoodId,
        amount: food.amount,
      };
    });
    const response = await updateDish(dish.id, foods);
    if (response.status === 204) {
      navigation.navigate('FavoriteDishes');
    }
    setSaving(false);
  };

  const onSelectFood = (foodId) => {
    const updatedFoodList = foodList.slice();
    const foodAddedIndex = updatedFoodList.findIndex((food) => food.id === foodId);
    const updatedFoodAddedList = foodAddedList.slice();
    updatedFoodList[foodAddedIndex].amount = 100;
    updatedFoodAddedList.unshift(updatedFoodList[foodAddedIndex]);
    updatedFoodList.splice(foodAddedIndex, 1);
    setFoodAddedList(updatedFoodAddedList);
    setFoodList(updatedFoodList);
  };

  const onRemove = (foodId) => {
    const updatedFoodList = foodList.slice();
    const updatedFoodAddedList = foodAddedList.slice();
    const foodIndex = updatedFoodAddedList.findIndex((food) => food.id === foodId);
    const food = updatedFoodAddedList[foodIndex];
    updatedFoodList.push(food);
    updatedFoodAddedList.splice(foodIndex, 1);
    setFoodAddedList(updatedFoodAddedList);
    setFoodList(updatedFoodList);
  };

  const onDeleteDish = async () => {
    const response = await deleteDish(dish.dish_id);
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

  const getTotal = (info) => {
    try {
      const total = foodAddedList.reduce((acc, food) => {
        return acc + (food[info] * food.amount) / 100;
      }, 0);
      return total.toFixed(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={[styles.background]}>
          <View style={styles.dishCard}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ width: '80%' }}>
                <Text style={[styles.dishName, { fontFamily: theme.font.bold }]}>{dish.name}</Text>
              </View>
              <TouchableOpacity onPress={alertShow} activeOpacity={0.7}>
                <FontAwesome5 name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'white', marginBottom: 10, padding: 10, borderRadius: 5 }}>
              <DishCardInfo label="Categoria" value={dish.category.name} />
              <DishCardInfo label="Carboidratos" value={getTotal('carbohydrates')} suffix="g" />
              <DishCardInfo label="Proteínas" value={getTotal('protein')} suffix="g" />
              <DishCardInfo label="Calorias" value={getTotal('kcal')} suffix="kcal" />

              {seeMore && (
                <>
                  <DishCardInfo label="Sódio" value={getTotal('sodium')} suffix="mg" />
                  <DishCardInfo label="Ferro" value={getTotal('iron')} suffix="mg" />
                  <DishCardInfo label="Cálcio" value={getTotal('calcium')} suffix="mg" />
                  <DishCardInfo label="Potássio" value={getTotal('potassium')} suffix="mg" />
                  <DishCardInfo label="Magnésio" value={getTotal('magnesium')} suffix="mg" />
                  <DishCardInfo label="Zinco" value={getTotal('zinc')} suffix="mg" />
                  <DishCardInfo label="Vitamina C" value={getTotal('vitaminC')} suffix="mg" />
                  <DishCardInfo label="Gordura Saturada" value={getTotal('saturated')} suffix="g" />
                  <DishCardInfo label="Gordura Monosaturada" value={getTotal('monounsaturated')} suffix="g" />
                  <DishCardInfo label="Gordura Poli-insaturada" value={getTotal('polyunsaturated')} suffix="g" />
                </>
              )}
              <TouchableOpacity style={styles.seeMoreContainer} activeOpacity={1} onPress={handlerSeeMore}>
                <Text style={[styles.seeMore, { fontFamily: theme.font.semiBold }]}>
                  {!seeMore ? 'Ver Mais...' : 'Ver Menos...'}
                </Text>
              </TouchableOpacity>
            </View>
            <FoodSelect foodList={foodList} onSelectFood={onSelectFood} />
            <View style={styles.subContainer}>
              <View style={styles.subTitleContainer}>
                <Text style={[styles.subTitle, { fontFamily: theme.font.bold }]}>
                  Alimentos ({foodAddedList.length})
                </Text>
              </View>
              <FlatList
                horizontal
                contentContainerStyle={styles.scrollContainer}
                showsHorizontalScrollIndicator={false}
                data={foodAddedList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <FoodItem
                    theme={theme}
                    food={item}
                    handlerRemove={onRemove}
                    addedFoods={foodAddedList}
                    setAddedFoods={setFoodAddedList}
                    style={{ marginRight: index === foodAddedList.length - 1 ? 0 : 10 }}
                  />
                )}
              />
            </View>
            {foodAddedList.length > 0 && (
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Button isLoading={saving} disabled={saving} style={styles.button} onPress={handleOnSave}>
                  Salvar
                </Button>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default EditDish;

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
  },
  dishCard: {
    marginVertical: 20,
    backgroundColor: '#ccc',
    padding: 10,
    width: '90%',
    borderRadius: 10,
  },
  dishCategory: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dishName: {
    fontSize: 24,
    color: 'black',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    width: 150,
    marginTop: 20,
  },
  subTitleContainer: {
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 20,
    color: 'white',
  },
  subContainer: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#256D1B',
    padding: 10,
  },
  seeMoreContainer: {
    flex: 1,
    alignSelf: 'flex-start',
  },
});
