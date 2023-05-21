import { StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useEffect, useState, useCallback } from 'react';
import SearchFoodListItem from '../components/SearchFoodListItem';
import { useFocusEffect } from '@react-navigation/native';
import getFoodByName from '../../utilities/getFoodByName';

const SearchFood = () => {
  const [inputValue, setInputValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setShowResults(true);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView style={styles.searchContainer} behavior="padding">
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
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: 'white' }}>
                {results.length > 1 ? `Resultados (${results.length})` : `Resultado (1)`}
              </Text>
            </View>
            {results.map(food => (
              <SearchFoodListItem key={food.alimento_id} foodName={food.nome} category={food.categoria} />
            ))}
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchFood;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
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
