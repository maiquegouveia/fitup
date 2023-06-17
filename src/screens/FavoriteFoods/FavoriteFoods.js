import { StyleSheet, Text, View, SafeAreaView, RefreshControl, ScrollView } from 'react-native';
import { useContext, useState, useCallback } from 'react';
import AppContext from '../../../AppContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SearchFoodListItem from '../SearchFood/components/SearchFoodListItem';
import { ActivityIndicator, Provider, Button } from 'react-native-paper';
import DeleteDialog from './components/DeleteDialog';
import changeFavoriteStatus from '../../../utilities/changeFavoriteStatus';
import { ThemeContext } from '../../../contexts/ThemeProvider';

const FavoriteFoods = () => {
  const navigation = useNavigation();
  const { userObject, setUserObject } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showRemoveConfirmationModal, setShowRemoveConfirmationModal] = useState(false);
  const [foodDelete, setFoodDelete] = useState('');
  const { theme } = useContext(ThemeContext);

  const showRemoveConfirmationModalHandler = (foodId, foodName) => {
    setFoodDelete({
      name: foodName,
      foodId: foodId,
    });
    setShowRemoveConfirmationModal(true);
  };

  const onDeleteFoodHandler = async () => {
    const result = await changeFavoriteStatus(userObject.id, foodDelete.foodId, (operation = 'remove'));
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
    await userObject.getFavoriteFoods();
    const updatedUserObject = userObject.clone();
    setUserObject(updatedUserObject);
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
          <View style={styles.listContainer}>
            {!isLoading && userObject.favoriteFoods.length > 0 && (
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: 'white' }}>
                {`Alimentos Favoritos (${userObject.favoriteFoods.length})`}
              </Text>
            )}
            {isLoading && <ActivityIndicator animating={true} color="white" />}
            {!isLoading && userObject.favoriteFoods.error && (
              <>
                <Text style={styles.textError}>{userObject.favoriteFoods.error}</Text>
                <Button
                  textColor="black"
                  style={{ marginVertical: 10, backgroundColor: 'white', borderRadius: 10 }}
                  onPress={() => navigation.navigate('SearchFood')}
                >
                  Adicionar Alimentos
                </Button>
              </>
            )}
            {!isLoading &&
              !userObject.favoriteFoods.error &&
              userObject.favoriteFoods.map((food) => (
                <SearchFoodListItem
                  isFavorite={true}
                  key={food.alimento_id}
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
    padding: 10,
  },
  listContainer: {
    backgroundColor: '#256D1B',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textError: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
