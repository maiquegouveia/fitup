import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import { useContext, useState, useEffect, useCallback } from 'react';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import FoodListItem from './components/FoodListItem';
import { NativeBaseProvider } from 'native-base';
import getDishItens from '../../../utilities/Dish/getDishItens';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const EditDish = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { params } = route;
  const [isLoading, setIsLoading] = useState(true);
  const [foodAddedList, setFoodAddedList] = useState([]);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    const data = await getDishItens(params.dishId);

    setFoodAddedList(
      data.map((food) => {
        return {
          foodName: food.alimento_nome,
          foodId: food.alimento_id,
          amount: food.quantidade,
          carbo: food.carboidrato,
          kcal: food.kcal,
          protein: food.proteina,
        };
      })
    );
    setIsLoading(false);
  };

  const resetStates = () => {
    setIsLoading(true);
    setFoodAddedList([]);
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
    return `${total.toFixed(2)}kcal`;
  };
  const getTotalCarbo = () => {
    const total = foodAddedList.reduce((acc, food) => acc + (food.carbo * food.amount) / 100, 0);
    return `${total.toFixed(2)}g`;
  };
  const getTotalProtein = () => {
    const total = foodAddedList.reduce((acc, food) => acc + (food.protein * food.amount) / 100, 0);
    return `${total.toFixed(2)}g`;
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
              <Text style={[styles.dishName]}>{params.dishName}</Text>
            </View>
            <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
              <FontAwesome5 name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: '#CD853F', marginVertical: 10, padding: 10, borderRadius: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: theme.fontColor.text }}>Categoria: </Text>
              <Text style={{ color: theme.fontColor.text }}>{params.dishCategory}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: theme.fontColor.text }}>Calorias: </Text>
              <Text style={{ color: theme.fontColor.text }}>{getTotalKcal()}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: theme.fontColor.text }}>Carboidratos: </Text>
              <Text style={{ color: theme.fontColor.text }}>{getTotalCarbo()}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: theme.fontColor.text }}>Proteínas: </Text>
              <Text style={{ color: theme.fontColor.text }}>{getTotalProtein()}</Text>
            </View>
          </View>
          <View style={{ maxHeight: '60%', borderRadius: 5, backgroundColor: '#256D1B' }}>
            {foodAddedList.length > 0 && (
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
                    onRemove={() => {}}
                    foodId={food.foodId}
                    style={{ marginBottom: index === foodAddedList.length - 1 ? 0 : 10 }}
                    foodKcal={food.kcal}
                    foodCarbo={food.carbo}
                    foodProtein={food.protein}
                    foodAddedList={foodAddedList}
                    setFoodAddedList={setFoodAddedList}
                  />
                ))}
            </ScrollView>
          </View>
          {foodAddedList.length > 0 && (
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Button textColor="white" style={styles.button} onPress={() => {}}>
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
