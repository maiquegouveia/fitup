import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Stepper from './Stepper';

const DishCard = ({ dishIndex, dishName, dishCategory, style, foods, onChangeDishesData, dishesData }) => {
  const [showController, setShowController] = useState(false);
  const onShowController = () => setShowController((prev) => !prev);

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
            {/* {foods.reduce((acc, curr) => acc + (curr.qnt * curr.kcal100) / 100, 0).toFixed(2)}kcal */}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Carboidratos: </Text>
          <Text style={styles.dishDescription}>
            {/* {foods.reduce((acc, curr) => acc + (curr.qnt * curr.carb100) / 100, 0).toFixed(2)}g */}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Proteínas: </Text>
          <Text style={styles.dishDescription}>
            {/* {foods.reduce((acc, curr) => acc + (curr.qnt * curr.pro100) / 100, 0).toFixed(2)}g */}
          </Text>
        </View>
      </View>
      {/* {showController && (
        <View style={styles.dishControllerContainer}>
          {foods.map((food, index) => (
            <View
              style={{
                backgroundColor: '#DFD9E2',
                marginBottom: 10,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              key={index}
            >
              <View style={{ backgroundColor: '#E57A44', width: '50%', padding: 5, borderRadius: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{food.name}</Text>
              </View>
              <Stepper
                foodName={food.name}
                dishesData={dishesData}
                dishIndex={dishIndex}
                amount={food.qnt}
                foodIndex={index}
                onChangeDishesData={onChangeDishesData}
              />
            </View>
          ))}
        </View>
      )} */}
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
    backgroundColor: '#DFD9E2',
  },
  dishControllerContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
});
