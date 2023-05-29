import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import DishCard from '../components/DishCard';

const FavoriteDishes = () => {
  const [searchInput, setSearchInput] = useState('');

  const onChangeSearchInput = text => setSearchInput(text);

  const [dishesData, setDishesData] = useState([
    {
      id: 1,
      name: 'Meu Almoço',
      category: 'Almoço',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
      dishTotalCalories: 1000,
      foods: [
        { name: 'Arroz', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
      ],
    },
  ]);

  const onChangeDishesData = data => {
    setDishesData(data);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Digite o nome do prato aqui..."
          placeholderTextColor="black"
          mode="outlined"
          activeOutlineColor="black"
          right={<TextInput.Icon icon="food-fork-drink" iconColor="purple" />}
          onChangeText={onChangeSearchInput}
        />
      </View>
      <View style={styles.dishesContainer}>
        <ScrollView contentContainerStyle={styles.dishesScrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.dishesTitleContainer}>
            <Text style={styles.dishesTitle}>Pratos ({dishesData.length})</Text>
          </View>
          {dishesData.map((dish, index) => (
            <DishCard
              onChangeDishesData={onChangeDishesData}
              id={dish.id}
              key={index}
              dishName={dish.name}
              dishCategory={dish.category}
              style={{ marginTop: 10 }}
              foods={dish.foods}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FavoriteDishes;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  searchBarContainer: {
    width: '100%',
    padding: 15,
    marginTop: 10,
  },
  dishesContainer: {
    padding: 15,
    height: '80%',
  },
  dishesScrollView: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
  },
  dishesTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  dishesTitleContainer: {
    alignItems: 'center',
  },
});
