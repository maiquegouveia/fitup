import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import DishCard from '../components/DishCard';

const FavoriteDishes = () => {
  const [searchInput, setSearchInput] = useState('');

  const onChangeSearchInput = text => setSearchInput(text);
  const dishesData = [
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
    {
      name: 'Nome do Prato',
      category: 'Categoria do Prato',
      dishTotalCarbo: 100,
      dishTotalProtein: 100,
      dishTotalFat: 100,
    },
  ];

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
              key={index}
              dishName={dish.name}
              dishCategory={dish.category}
              dishTotalCarbo={dish.dishTotalCarbo}
              dishTotalProtein={dish.dishTotalProtein}
              dishTotalFat={dish.dishTotalFat}
              style={{ marginTop: 10 }}
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
