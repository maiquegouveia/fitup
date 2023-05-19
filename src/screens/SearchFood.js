import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useEffect, useState, useCallback } from 'react';
import SearchFoodListItem from '../components/SearchFoodListItem';
import { useFocusEffect } from '@react-navigation/native';
import requestFoodInfo from '../../utilities/RequestFatsecret';

const SearchFood = () => {
  const [inputValue, setInputValue] = useState('');
  const [showResults, setShowResults] = useState(false);

  const resetStates = () => {
    setInputValue('');
    setShowResults('');
  };

  useFocusEffect(useCallback(resetStates, []));

  const onChangeInputHandler = text => {
    setInputValue(text);
  };

  const onSubmitInputHandler = async () => {
    const data = await requestFoodInfo(inputValue);
    console.log(data);
    setShowResults(true);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <Text style={styles.inputLabel}>Buscar Alimento</Text>
        <TextInput
          onChangeText={onChangeInputHandler}
          value={inputValue}
          placeholder="Digite o nome do alimento..."
          mode="outlined"
          style={styles.input}
        />
        <Button textColor="white" style={styles.inputBtn} onPress={onSubmitInputHandler}>
          Buscar
        </Button>
        {showResults && (
          <ScrollView
            style={{
              borderRadius: 10,
              backgroundColor: 'green',
              width: '100%',
              height: 300,
              padding: 10,
              marginVertical: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: 'white' }}>Resultado</Text>
            </View>
            <SearchFoodListItem foodName={inputValue} />
            <SearchFoodListItem foodName={inputValue} />
            <SearchFoodListItem foodName={inputValue} />
            <SearchFoodListItem foodName={inputValue} />
            <SearchFoodListItem foodName={inputValue} />
            <SearchFoodListItem foodName={inputValue} />
            <SearchFoodListItem foodName={inputValue} />
            <SearchFoodListItem foodName={inputValue} />
            <SearchFoodListItem foodName={inputValue} />
          </ScrollView>
        )}
      </View>
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
    backgroundColor: '#ccc',
    width: '90%',
    padding: 20,
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
