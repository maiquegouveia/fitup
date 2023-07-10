import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TextInput, Button, Provider } from 'react-native-paper';
import { useState, useContext } from 'react';
import SearchFoodListItem from './components/SearchFoodListItem';
import { useIsFocused } from '@react-navigation/native';
import getFoodByName from '../../../utilities/SearchFood/getFoodByName';
import FoodDetailsModal from './components/FoodDetailsModal';
import AppContext from '../../../AppContext';
import MenuCategory from './components/MenuCategory';
import changeFavoriteStatus from '../../../utilities/changeFavoriteStatus';
import Food from '../../../models/Food';
import { useEffect } from 'react';

const SearchFood = ({ theme }) => {
  const isFocused = useIsFocused();
  const { userObject, setUserObject, setActiveScreen } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFoodDetailsModal, setShowFoodDetailsModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [favoriteFoodsId, setFavoriteFoodsId] = useState([]);

  const updateFavoriteFoodsList = async () => {
    await userObject.setFavoriteFoods();
    const updatedUserObject = userObject.clone();
    setUserObject(updatedUserObject);
  };

  const resetStates = () => {
    setInputValue('');
    setShowResults('');
    setFilteredResults([]);
  };

  useEffect(() => {
    if (!isFocused) {
      resetStates();
      updateFavoriteFoodsList();
    } else {
      setActiveScreen('SearchFood');
      setFavoriteFoodsId(userObject.getFavoriteFoodsId());
    }
  }, [isFocused]);

  const handleCategoryPress = (value) => {
    setSelectedCategory(value);
    setCategoryModalVisible(false);
    if (value === 'Todas') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter((food) => food.category === value));
    }
  };

  const onChangeInputHandler = (text) => {
    setInputValue(text);
  };

  const onSubmitInputHandler = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const data = await getFoodByName(inputValue);
    setIsLoading(false);

    if (data.error_message) {
      setErrorMessage(data.error_message);
    } else {
      setSelectedCategory('Todas');
      const dataWithFavoriteStatus = data.map((food) => {
        const index = favoriteFoodsId.findIndex((curr) => curr.foodId === food.food_id);

        return new Food(
          food.food_id,
          food.FoodCategory.name,
          food.name,
          food.kcal,
          food.carbohydrates,
          food.protein,
          food.calcium,
          food.iron,
          food.saturated,
          food.monounsaturated,
          food.polyunsaturated,
          food.magnesium,
          food.sodium,
          food.zinc,
          food.potassium,
          food.vitaminC,
          index !== -1 ? favoriteFoodsId[index].favoriteId : 0,
          index !== -1
        );
      });

      setResults(dataWithFavoriteStatus);
      setFilteredResults(dataWithFavoriteStatus);

      const categories = [...new Set(data.map((food) => food.FoodCategory.name))];
      setCategories(
        categories.map((curr) => {
          return { name: curr, active: false };
        })
      );
    }

    setShowResults(true);
  };

  const onShowModalDetails = (food) => {
    setModalDetails({
      ...food,
    });

    setShowFoodDetailsModal(true);
  };

  const onDismissModal = async () => {
    setShowFoodDetailsModal(false);
    const updatedFilteredResults = [...filteredResults];
    const currentFoodIndex = updatedFilteredResults.findIndex((curr) => curr.id === modalDetails.id);
    if (modalDetails.isFavorite !== updatedFilteredResults[currentFoodIndex].isFavorite) {
      if (modalDetails.isFavorite) {
        const result = await changeFavoriteStatus(userObject.id, modalDetails.id);
        if (!result?.error) {
          updatedFilteredResults[currentFoodIndex].isFavorite = modalDetails.isFavorite;
          setFilteredResults(updatedFilteredResults);
        }
      } else {
        const result = await changeFavoriteStatus(
          userObject.id,
          modalDetails.id,
          modalDetails.favoriteFoodId,
          (operation = 'remove')
        );
        if (!result?.error) {
          updatedFilteredResults[currentFoodIndex].isFavorite = modalDetails.isFavorite;
          setFilteredResults(updatedFilteredResults);
        }
      }
    }
  };

  const _renderItem = ({ item, index }) => (
    <SearchFoodListItem
      theme={theme}
      style={{ marginBottom: index !== filteredResults.length - 1 ? 10 : 0 }}
      food={item}
      onPress={onShowModalDetails}
    />
  );

  return (
    <Provider>
      <View style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.searchContainer}>
          <FoodDetailsModal
            setModalDetails={setModalDetails}
            food={modalDetails}
            visible={showFoodDetailsModal}
            onDismiss={onDismissModal}
          />
          <Text style={[styles.inputLabel, { color: theme.fontColor.title, fontFamily: theme.font.bold }]}>
            Buscar Alimento
          </Text>
          <TextInput
            cursorColor="green"
            activeOutlineColor="green"
            onChangeText={onChangeInputHandler}
            value={inputValue}
            placeholder="Digite o nome do alimento..."
            mode="outlined"
            style={styles.input}
          />
          <Button
            loading={isLoading}
            disabled={isLoading}
            textColor="white"
            labelStyle={[styles.btnLabel, { fontFamily: theme.font.semiBold }]}
            style={styles.inputBtn}
            onPress={onSubmitInputHandler}
          >
            Buscar
          </Button>
          {showResults && errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          {showResults && !errorMessage && filteredResults?.length > 0 && (
            <View style={styles.mainResultsContainer}>
              <View style={styles.resultsTitleContainer}>
                <Text style={[styles.resultsTitle, { fontFamily: theme.font.bold }]}>
                  Resultados ({filteredResults?.length})
                </Text>
                <MenuCategory
                  categories={categories}
                  handleCategoryPress={handleCategoryPress}
                  selectedCategory={selectedCategory}
                  setCategoryModalVisible={setCategoryModalVisible}
                  categoryModalVisible={categoryModalVisible}
                />
              </View>
              <View style={styles.subResultsContainer}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={filteredResults}
                  keyExtractor={(item, index) => index}
                  renderItem={_renderItem}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Provider>
  );
};

export default SearchFood;

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: '100%',
    padding: 15,
  },
  searchContainer: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 24,
  },
  inputBtn: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
  mainResultsContainer: {
    alignItems: 'center',
    backgroundColor: 'green',
    width: '100%',
    borderRadius: 5,
  },
  subResultsContainer: {
    maxHeight: 400,
    minHeight: 300,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  resultsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  resultsTitle: {
    fontSize: 20,
    color: 'white',
    lineHeight: 30,
  },
});
