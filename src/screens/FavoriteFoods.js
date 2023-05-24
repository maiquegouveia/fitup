import { StyleSheet, Text, View, SafeAreaView, RefreshControl, ScrollView } from 'react-native';
import { useContext, useState, useCallback } from 'react';
import getUserFavoriteFoods from '../../utilities/getUserFavoriteFoods';
import AppContext from '../../AppContext';
import { useFocusEffect } from '@react-navigation/native';
import SearchFoodListItem from '../components/SearchFoodListItem';
import { ActivityIndicator } from 'react-native-paper';

const FavoriteFoods = () => {
  const { params, setParams } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    const data = await getUserFavoriteFoods(params.usuario_id);
    setParams(prev => {
      return {
        ...prev,
        favoriteList: data,
      };
    });
    setIsLoading(false);
  };

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 0);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.listContainer}>
          {!isLoading && params.favoriteList?.length > 0 && (
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: 'white' }}>
              {`Alimentos Favoritos (${params.favoriteList.length})`}
            </Text>
          )}
          {isLoading && <ActivityIndicator animating={true} color="white" />}
          {params.favoriteList.error && <Text>{params.favoriteList.error}</Text>}
          {!isLoading && params.favoriteList.map(food => <SearchFoodListItem key={food.alimento_id} food={food} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoriteFoods;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
