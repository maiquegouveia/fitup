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

      foods: [
        { name: 'Arroz, tipo 1, cozido', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão fradinho', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango, tipo 2, grelhado', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
      ],
    },
    {
      id: 2,
      name: 'Meu Café da Manhã',
      category: 'Café da Manhã',

      foods: [
        { name: 'Arroz, tipo 1, cozido', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão fradinho', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango, tipo 2, grelhado', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
      ],
    },
    {
      id: 3,
      name: 'Meu Café da Manhã',
      category: 'Café da Manhã',

      foods: [
        { name: 'Arroz, tipo 1, cozido', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão fradinho', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango, tipo 2, grelhado', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
      ],
    },
    {
      id: 4,
      name: 'Meu Café da Manhã',
      category: 'Café da Manhã',

      foods: [
        { name: 'Arroz, tipo 1, cozido', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão fradinho', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango, tipo 2, grelhado', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
      ],
    },
    {
      id: 5,
      name: 'Meu Café da Manhã',
      category: 'Café da Manhã',

      foods: [
        { name: 'Arroz, tipo 1, cozido', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão fradinho', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango, tipo 2, grelhado', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
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
          placeholder="Busque um prato aqui..."
          placeholderTextColor="black"
          mode="outlined"
          activeOutlineColor="#256D1B"
          right={<TextInput.Icon icon="food-fork-drink" iconColor="#256D1B" />}
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
              dishIndex={index}
              key={index}
              dishName={dish.name}
              dishCategory={dish.category}
              style={{ marginTop: 10 }}
              foods={dish.foods}
              dishesData={dishesData}
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
    backgroundColor: '#256D1B',
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
