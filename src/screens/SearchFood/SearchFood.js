import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, Provider } from 'react-native-paper';
import { useState, useCallback, useContext } from 'react';
import SearchFoodListItem from './components/SearchFoodListItem';
import { useFocusEffect } from '@react-navigation/native';
import getFoodByName from '../../../utilities/SearchFood/getFoodByName';
import FoodDetailsModal from './components/FoodDetailsModal';
import AppContext from '../../../AppContext';
import MenuCategory from './components/MenuCategory';
import changeFavoriteStatus from '../../../utilities/changeFavoriteStatus';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import Food from '../../../models/Food';

const SearchFood = () => {
  const { userObject } = useContext(AppContext);
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
  const { theme } = useContext(ThemeContext);

  const handleCategoryPress = (value) => {
    setSelectedCategory(value);
    setCategoryModalVisible(false);
    if (value === 'Todas') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter((curr) => curr.categoria === value));
    }
  };

  const resetStates = () => {
    setInputValue('');
    setShowResults('');
    setFilteredResults([]);
  };

  useFocusEffect(useCallback(resetStates, []));

  const onChangeInputHandler = (text) => {
    setInputValue(text);
  };

  const onSubmitInputHandler = async () => {
    setErrorMessage(null);
    const favoriteFoodsId = userObject.getFavoriteFoodsId();

    setIsLoading(true);
    const data = await getFoodByName(inputValue);
    setIsLoading(false);

    if (data.error_message) {
      setErrorMessage(data.error_message);
    } else {
      const dataWithFavoriteStatus = data.map(
        (food) =>
          new Food(
            food.alimento_id,
            food.categoria,
            food.nome,
            food.kcal,
            food.carboidrato,
            food.proteina,
            food.calcio,
            food.ferro,
            food.gordura_saturada,
            food.gordura_monoinsaturada,
            food.gordura_poli_insaturada,
            food.magnesio,
            food.sodio,
            food.zinco,
            food.potassio,
            food.vitaminaC,
            favoriteFoodsId?.includes(food.alimento_id)
          )
      );

      setResults([...dataWithFavoriteStatus]);
      setFilteredResults([...dataWithFavoriteStatus]);

      const categories = [...new Set(data.map((curr) => curr.categoria))];
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
        const result = await changeFavoriteStatus(userObject.id, modalDetails.id, (operation = 'remove'));
        if (!result?.error) {
          updatedFilteredResults[currentFoodIndex].isFavorite = modalDetails.isFavorite;
          setFilteredResults(updatedFilteredResults);
        }
      }
    }
  };

  return (
    <Provider>
      <SafeAreaView style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.searchContainer}>
          <FoodDetailsModal
            setModalDetails={setModalDetails}
            food={modalDetails}
            visible={showFoodDetailsModal}
            onDismiss={onDismissModal}
          />
          <Text style={[styles.inputLabel, { color: theme.fontColor.title }]}>Buscar Alimento</Text>
          <TextInput
            cursorColor="green"
            activeOutlineColor="green"
            onChangeText={onChangeInputHandler}
            value={inputValue}
            placeholder="Digite o nome do alimento..."
            mode="outlined"
            style={styles.input}
          />
          <Button loading={isLoading} textColor="white" style={styles.inputBtn} onPress={onSubmitInputHandler}>
            Buscar
          </Button>
          {showResults && errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          {showResults && !errorMessage && filteredResults?.length > 0 && (
            <ScrollView
              style={{
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: 'orange',
                width: '100%',
                height: 250,
                paddingHorizontal: 10,
              }}
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: 'white' }}>
                  {filteredResults?.length > 1 ? `Resultados (${filteredResults?.length})` : `Resultado (1)`}
                </Text>
                <MenuCategory
                  categories={categories}
                  handleCategoryPress={handleCategoryPress}
                  selectedCategory={selectedCategory}
                  setCategoryModalVisible={setCategoryModalVisible}
                  categoryModalVisible={categoryModalVisible}
                />
              </View>

              {!errorMessage &&
                filteredResults?.map((food) => (
                  <SearchFoodListItem key={food.id} food={food} onPress={onShowModalDetails} />
                ))}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default SearchFood;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  searchContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputBtn: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
