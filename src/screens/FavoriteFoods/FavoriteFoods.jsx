import { StyleSheet, Text, View, SafeAreaView, RefreshControl, ScrollView } from 'react-native';
import { useContext, useState, useCallback, useEffect } from 'react';
import AppContext from '../../../AppContext';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Provider, Button } from 'react-native-paper';
import DeleteDialog from './components/DeleteDialog';
import changeFavoriteStatus from '../../../utilities/changeFavoriteStatus';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import FoodItem from './components/FoodItem';
import SearchBar from '../../components/SearchBar';

const FavoriteFoods = () => {
  const navigation = useNavigation();
  const { userObject, setUserObject, setActiveScreen } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showRemoveConfirmationModal, setShowRemoveConfirmationModal] = useState(false);
  const [foodDelete, setFoodDelete] = useState('');
  const [filteredFoodsData, setFilteredFoodsData] = useState([]);
  const { theme } = useContext(ThemeContext);
  const isFocused = useIsFocused();

  const onChangeInput = (text) => {
    if (text.length === 0) {
      setFilteredFoodsData(userObject.favoriteFoods);
    } else {
      const data = userObject.favoriteFoods.filter((food) => food.name.startsWith(text));
      setFilteredFoodsData(data);
    }
  };

  const showRemoveConfirmationModalHandler = (foodId, foodName, favoriteFoodId) => {
    setFoodDelete({
      name: foodName,
      foodId: foodId,
      favoriteFoodId,
    });
    setShowRemoveConfirmationModal(true);
  };

  const onDeleteFoodHandler = async () => {
    const result = await changeFavoriteStatus(
      userObject.id,
      foodDelete.foodId,
      foodDelete.favoriteFoodId,
      (operation = 'remove')
    );
    if (result?.error) {
      hideRemoveConfirmationModalHandler();
      return;
    } else {
      hideRemoveConfirmationModalHandler();
      setIsLoading(true);
      getData();
    }
  };

  const hideRemoveConfirmationModalHandler = () => {
    setShowRemoveConfirmationModal(false);
  };

  const getData = async () => {
    setIsLoading(true);
    await userObject.getFavoriteFoods();
    const updatedUserObject = userObject.clone();
    setFilteredFoodsData(updatedUserObject.favoriteFoods);
    setUserObject(updatedUserObject);
    setIsLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 0);
  }, []);

  const onPressNavigate = (screen) => {
    setActiveScreen(screen);
    navigation.navigate(screen);
  };

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  return (
    <Provider>
      <SafeAreaView style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
        <DeleteDialog
          title={`Deseja deletar o alimento (${foodDelete.name})?`}
          visible={showRemoveConfirmationModal}
          hideDialog={hideRemoveConfirmationModalHandler}
          onDeleteFoodHandler={onDeleteFoodHandler}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <SearchBar placeholder="Busque um alimento aqui..." iconName="food" onChange={onChangeInput} />
          <Button
            textColor="white"
            style={{ backgroundColor: '#256D1B', borderRadius: 5, marginTop: 10 }}
            onPress={() => onPressNavigate('SearchFood')}
          >
            Adicionar Alimentos
          </Button>
          <View style={styles.listContainer}>
            {!isLoading && filteredFoodsData.length > 0 && (
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: 'white' }}>
                {`Alimentos Favoritos (${filteredFoodsData.length})`}
              </Text>
            )}
            {isLoading && <ActivityIndicator animating={true} color="white" />}

            {!isLoading && (filteredFoodsData.length === 0 || filteredFoodsData.error) && (
              <Text style={styles.textError}>Nenhum alimento encontrado!</Text>
            )}

            {!isLoading &&
              !filteredFoodsData.error &&
              filteredFoodsData.map((food) => (
                <FoodItem
                  key={food.id}
                  food={food}
                  showRemoveConfirmationModalHandler={showRemoveConfirmationModalHandler}
                />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default FavoriteFoods;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
  },
  listContainer: {
    backgroundColor: '#256D1B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textError: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
