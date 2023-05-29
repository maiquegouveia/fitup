import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Stepper from './Stepper';

const DishCard = ({ dishId, dishName, dishCategory, style, foods, onChangeDishesData }) => {
  const [showController, setShowController] = useState(false);
  const onShowController = () => setShowController(prev => !prev);

  return (
    <TouchableOpacity onPress={onShowController} activeOpacity={1} style={[styles.dishContainer, style]}>
      <View style={{ paddingLeft: 5, paddingBottom: 5 }}>
        <Text style={styles.dishName}>{dishName}</Text>
      </View>
      <View style={styles.dishDetails}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Categoria: </Text>
          <Text style={styles.dishDescription}>{dishCategory}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Calorias: </Text>
          <Text style={styles.dishDescription}>
            {' '}
            {foods.reduce((acc, curr) => acc + (curr.qnt * curr.kcal100) / 100, 0).toFixed(2)}kcal
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Carboidratos: </Text>
          <Text style={styles.dishDescription}>
            {foods.reduce((acc, curr) => acc + (curr.qnt * curr.carb100) / 100, 0).toFixed(2)}g
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Proteínas: </Text>
          <Text style={styles.dishDescription}>
            {foods.reduce((acc, curr) => acc + (curr.qnt * curr.pro100) / 100, 0).toFixed(2)}g
          </Text>
        </View>
      </View>
      {showController && (
        <View style={styles.dishControllerContainer}>
          <Text>{foods[0].name}</Text>
          <Stepper amount={foods[0].qnt} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default DishCard;

const styles = StyleSheet.create({
  dishContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dishProperties: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dishDescription: {
    fontSize: 14,
  },
  dishDetails: {
    padding: 10,
    backgroundColor: '#ccc',
  },
  dishControllerContainer: {
    marginTop: 10,
    backgroundColor: '#ccc',
    height: 100,
  },
});
