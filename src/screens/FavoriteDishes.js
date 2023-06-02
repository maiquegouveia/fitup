import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import DishCard from '../components/DishCard';
import CreateDishPopover from '../components/CreateDishPopover';
import { NativeBaseProvider } from 'native-base';

const FavoriteDishes = () => {
  const [searchInput, setSearchInput] = useState('');

  const [dishesData, setDishesData] = useState([
    {
      id: 1,
      name: 'Almoço',
      category: 'Almoço',

      foods: [
        { name: 'Arroz, tipo 1, cozido', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão fradinho', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango, tipo 2, grelhado', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
      ],
    },
    {
      id: 2,
      name: 'Café da Manhã',
      category: 'Café da Manhã',

      foods: [
        { name: 'Arroz, tipo 1, cozido', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão fradinho', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango, tipo 2, grelhado', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
      ],
    },
    {
      id: 3,
      name: 'Café da Manhã',
      category: 'Café da Manhã',

      foods: [
        { name: 'Arroz, tipo 1, cozido', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão fradinho', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango, tipo 2, grelhado', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
      ],
    },
    {
      id: 4,
      name: 'Café da Manhã',
      category: 'Café da Manhã',

      foods: [
        { name: 'Arroz, tipo 1, cozido', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão fradinho', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango, tipo 2, grelhado', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
      ],
    },
    {
      id: 5,
      name: 'Janta',
      category: 'Janta',

      foods: [
        { name: 'Arroz, tipo 1, cozido', carb100: 28.1, pro100: 2.5, qnt: 100, kcal100: 1000 },
        { name: 'Feijão fradinho', carb100: 28.1, pro100: 2.5, qnt: 20, kcal100: 1000 },
        { name: 'Frango, tipo 2, grelhado', carb100: 0, pro100: 23.9, qnt: 100, kcal100: 243 },
      ],
    },
  ]);

  const [filteredData, setFilteredData] = useState([...dishesData]);

  const onChangeSearchInput = (text) => {
    if (text.length === 0) {
      setSearchInput(text);
      setFilteredData([...dishesData]);
      return;
    }
    setSearchInput(text);
    setFilteredData(dishesData.filter((dish) => dish.name.startsWith(text)));
  };

  const onSaveChanges = () => {};

  const showAlert = () => {
    Alert.alert(
      'Deseja Salvar as alterações?'[
        ({ text: 'Sim', onPress: () => console.log('teste') },
        { text: 'Cancelar', onPress: () => console.log('teste') })
      ]
    );
  };

  const onChangeDishesData = (data) => {
    setDishesData(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Busque um prato aqui..."
          placeholderTextColor="black"
          mode="outlined"
          activeOutlineColor="#256D1B"
          right={<TextInput.Icon icon="food-fork-drink" iconColor="#256D1B" />}
          onChangeText={onChangeSearchInput}
        />
        <CreateDishPopover />
      </View>

      <ScrollView contentContainerStyle={styles.dishesScrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.dishesTitleContainer}>
          {filteredData.length > 0 ? (
            <Text style={styles.dishesTitle}>Pratos ({filteredData.length})</Text>
          ) : (
            <Text style={styles.dishesTitle}>Nenhum prato encontrado!</Text>
          )}
        </View>
        {filteredData.map((dish, index) => (
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
        {filteredData.length > 0 && (
          <View style={{ alignItems: 'center' }}>
            <Button onPress={onSaveChanges} labelStyle={{ color: 'black', fontWeight: 'bold' }} style={styles.saveBtn}>
              Salvar
            </Button>
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default FavoriteDishes;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
  },
  searchBarContainer: {
    width: '100%',
    marginBottom: 20,
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
  saveBtn: {
    backgroundColor: 'white',
    width: '50%',
    borderRadius: 5,
    marginTop: 15,
  },
  addDishBtn: {
    backgroundColor: 'green',
    borderRadius: 5,
  },
});
