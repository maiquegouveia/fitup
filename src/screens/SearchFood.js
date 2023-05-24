import { StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Provider } from 'react-native-paper';
import { useEffect, useState, useCallback } from 'react';
import SearchFoodListItem from '../components/SearchFoodListItem';
import { useFocusEffect } from '@react-navigation/native';
import getFoodByName from '../../utilities/getFoodByName';
import FoodDetailsModal from '../components/FoodDetailsModal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MenuCategory from '../components/MenuCategory';

const SearchFood = () => {
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

  const handleCategoryPress = value => {
    setSelectedCategory(value);
    setCategoryModalVisible(false);
    if (value === 'Todas') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(curr => curr.categoria === value));
    }
  };

  const resetStates = () => {
    setInputValue('');
    setShowResults('');
    setResults([]);
  };

  useFocusEffect(useCallback(resetStates, []));

  const onChangeInputHandler = text => {
    setInputValue(text);
  };

  const onSubmitInputHandler = async () => {
    setIsLoading(true);
    const data = await getFoodByName(inputValue);
    setIsLoading(false);
    setResults(data);
    setFilteredResults(data);

    const categories = [...new Set(data.map(curr => curr.categoria))];
    setCategories(
      categories.map(curr => {
        return { name: curr, active: false };
      })
    );

    setShowResults(true);
  };

  const onShowModalDetails = food => {
    setModalDetails({
      ...food,
    });
    setShowFoodDetailsModal(true);
  };

  const onDismissModal = () => {
    setShowFoodDetailsModal(false);
  };

  return (
    <Provider>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <FoodDetailsModal food={modalDetails} visible={showFoodDetailsModal} onDismiss={onDismissModal} />
          <Text style={styles.inputLabel}>Buscar Alimento</Text>
          <TextInput
            onChangeText={onChangeInputHandler}
            value={inputValue}
            placeholder="Digite o nome do alimento..."
            mode="outlined"
            style={styles.input}
          />
          <Button loading={isLoading} textColor="white" style={styles.inputBtn} onPress={onSubmitInputHandler}>
            Buscar
          </Button>
          {showResults && results?.error_message && <Text>{results.error_message}</Text>}
          {showResults && results?.length > 0 && (
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
                  {filteredResults.length > 1 ? `Resultados (${filteredResults.length})` : `Resultado (1)`}
                </Text>
                <MenuCategory
                  categories={categories}
                  handleCategoryPress={handleCategoryPress}
                  selectedCategory={selectedCategory}
                  setCategoryModalVisible={setCategoryModalVisible}
                  categoryModalVisible={categoryModalVisible}
                />
              </View>

              {filteredResults.map(food => (
                <SearchFoodListItem key={food.alimento_id} food={food} onPress={onShowModalDetails} />
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
});
