import { StyleSheet, Text, View, ScrollView, RefreshControl, FlatList } from 'react-native';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Button, ActivityIndicator } from 'react-native-paper';
import DishCard from './components/DishCard';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import deleteDish from '../../../utilities/Dish/deleteDish';
import SearchBar from '../../components/SearchBar';
import Modalize from './components/Modalize';

const FavoriteDishes = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dishChat, setDishChat] = useState(null);
  const [showModalize, setShowModalize] = useState(false);
  const { userObject, setUserObject } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
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
    await userObject.setDishes();
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

  const handlerOpenModalize = (dish) => {
    setDishChat(dish);
    setShowModalize(true);
  };

  return (
    <>
      {showModalize && (
        <Modalize showModalize={showModalize} setShowModalize={setShowModalize} theme={theme} dish={dishChat} />
      )}
      <View style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            placeholder="Busque um prato aqui..."
            placeholderTextColor="black"
            iconName="food-fork-drink"
            onChange={onChangeSearchInput}
          />
          <Button
            labelStyle={{ color: 'white', fontFamily: theme.font.semiBold }}
            style={styles.btn}
            onPress={() => navigation.navigate('CreateDish')}
          >
            Criar Prato
          </Button>
        </View>

        <View style={styles.dishesScrollView}>
          {isLoading && <ActivityIndicator animating={isLoading} color="white" />}
          {!isLoading && (
            <View style={styles.dishesTitleContainer}>
              {filteredData?.length > 0 ? (
                <Text style={[styles.dishesTitle, { fontFamily: theme.font.bold }]}>
                  Pratos ({filteredData?.length})
                </Text>
              ) : (
                <Text style={[styles.dishesTitle, { fontFamily: theme.font.bold }]}>Nenhum prato encontrado!</Text>
              )}
            </View>
          )}

          {!isLoading && (
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <DishCard
                  onDeleteDish={onDeleteDish}
                  handlerOpenModalize={handlerOpenModalize}
                  dish={item}
                  style={{ marginBottom: index === filteredData.length - 1 ? 0 : 10 }}
                />
              )}
            />
          )}
        </View>
      </View>
    </>
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
    backgroundColor: '#FF7900',
    padding: 10,
    borderRadius: 5,
  },
  dishesTitle: {
    fontSize: 18,
    color: 'white',
  },
  dishesTitleContainer: {
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#FF7900',
    borderRadius: 5,
    marginTop: 10,
  },
});
