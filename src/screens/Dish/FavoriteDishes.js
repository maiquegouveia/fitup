import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { Button, ActivityIndicator } from 'react-native-paper';
import DishCard from './components/DishCard';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import deleteDish from '../../../utilities/Dish/deleteDish';
import SearchBar from '../../components/SearchBar';

const FavoriteDishes = ({ navigation }) => {
  const { userObject, setUserObject } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const onChangeSearchInput = (text) => {
    if (text.length === 0) {
      setFilteredData(userObject.dishes);
      return;
    }
    setFilteredData(userObject.dishes.filter((dish) => dish.name.startsWith(text)));
  };

  const getDishesData = async () => {
    setIsLoading(true);
    await userObject.getDishes();
    const updatedUserObject = userObject.clone();
    setUserObject(updatedUserObject);
    setFilteredData(updatedUserObject.dishes);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getDishesData();
    }
  }, [isFocused]);

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
        <SearchBar
          placeholder="Busque um prato aqui..."
          placeholderTextColor="black"
          iconName="food-fork-drink"
          onChange={onChangeSearchInput}
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
            <DishCard key={index} dish={dish} style={{ marginTop: 10 }} onDeleteDish={onDeleteDish} />
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
