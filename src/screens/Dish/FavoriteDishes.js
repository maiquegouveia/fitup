import { StyleSheet, Text, View, ScrollView, Alert, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import { TextInput, Button, ActivityIndicator, MD2Colors } from 'react-native-paper';
import DishCard from './components/DishCard';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import { useContext } from 'react';
import getDishes from '../../../utilities/Dish/getDishes';
import AppContext from '../../../AppContext';
import deleteDish from '../../../utilities/Dish/deleteDish';

const FavoriteDishes = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigation = useNavigation();
  const { params } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const [dishesData, setDishesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onChangeSearchInput = (text) => {
    if (text.length === 0) {
      setSearchInput(text);
      setFilteredData([...dishesData]);
      return;
    }
    setSearchInput(text);
    setFilteredData(dishesData.filter((dish) => dish.nome.startsWith(text)));
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

  const getDishesData = async () => {
    setIsLoading(true);
    const data = await getDishes(params.usuario_id);
    setDishesData(data);
    setFilteredData(data);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getDishesData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDishesData();
    setTimeout(() => {
      setRefreshing(false);
    }, 0);
  }, []);

  const onDeleteDish = async (dishId) => {
    const response = await deleteDish(dishId);
    getDishesData();
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Busque um prato aqui..."
          placeholderTextColor="black"
          mode="outlined"
          activeOutlineColor="#256D1B"
          right={<TextInput.Icon icon="food-fork-drink" iconColor="#256D1B" />}
          onChangeText={onChangeSearchInput}
        />
        <Button
          textColor="white"
          style={{ backgroundColor: '#256D1B', borderRadius: 5, marginTop: 10 }}
          onPress={() => navigation.navigate('CreateDish')}
        >
          Criar Prato
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.dishesScrollView} showsVerticalScrollIndicator={false}>
        {isLoading && <ActivityIndicator animating={isLoading} color="white" />}
        {!isLoading && (
          <View style={styles.dishesTitleContainer}>
            {filteredData?.length > 0 ? (
              <Text style={styles.dishesTitle}>Pratos ({filteredData?.length})</Text>
            ) : (
              <Text style={styles.dishesTitle}>Nenhum prato encontrado!</Text>
            )}
          </View>
        )}

        {!isLoading &&
          filteredData?.length > 0 &&
          filteredData?.map((dish, index) => (
            <DishCard
              key={index}
              dishId={dish.prato_id}
              dishName={dish.nome}
              dishCarbo={dish.carboidratos}
              dishKcal={dish.calorias}
              dishProtein={dish.proteinas}
              dishCategory={dish.categoria}
              style={{ marginTop: 10 }}
              onDeleteDish={onDeleteDish}
            />
          ))}
      </ScrollView>
    </ScrollView>
  );
};

export default FavoriteDishes;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
    flex: 1,
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
