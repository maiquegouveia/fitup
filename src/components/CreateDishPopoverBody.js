import { StyleSheet, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { Input, FormControl, Text } from 'native-base';
import WarningCreateDish from './WarningCreateDish';
import FoodSelect from '../screens/Dish/components/FoodSelect';
import FoodListItem from '../screens/Dish/components/FoodListItem';

const CreateDishPopoverBody = () => {
  return (
    <View style={{ padding: 0 }}>
      <View style={styles.foodContainer}>
        {/* <FormControl.Label>Alimentos</FormControl.Label> */}
        <FoodSelect foodList={foodList} foodAddedList={foodAddedList} onSelectFood={onSelectFood} />

        <View style={styles.addedFoodContainer}>
          <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={true}>
            <FoodListItem style={{ marginBottom: 10 }} />
            <FoodListItem style={{ marginBottom: 10 }} />
            <FoodListItem style={{ marginBottom: 10 }} />
            <FoodListItem style={{ marginBottom: 10 }} />
            <FoodListItem style={{ marginBottom: 10 }} />
            <FoodListItem style={{ marginBottom: 10 }} />
            <FoodListItem style={{ marginBottom: 10 }} />
            <FoodListItem />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default CreateDishPopoverBody;

const styles = StyleSheet.create({
  foodContainer: {},
  addedFoodContainer: {
    width: '100%',
    height: 150,
  },
});
