import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

const FoodItem = ({ food, showRemoveConfirmationModalHandler }) => {
  const [seeMore, setSeeMore] = useState(false);

  const handlerSeeMore = () => setSeeMore((prev) => !prev);

  const handlerDelete = () => showRemoveConfirmationModalHandler(food.id, food.name);

  return (
    <View style={styles.container}>
      <View style={{ width: '80%' }}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.foodCategory}>{food.category} </Text>
        <View style={{ backgroundColor: '#ccc', padding: 10, marginVertical: 5 }}>
          <View style={styles.detailContainer}>
            <Text style={styles.topicTitle}>Calorias: </Text>
            <Text>{food.kcal}kcal</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.topicTitle}>Carboidratos: </Text>
            <Text>{food.carbohydrates}g</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.topicTitle}>Proteínas: </Text>
            <Text>{food.protein}g</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.topicTitle}>Sódio: </Text>
            <Text>{food.sodium}g</Text>
          </View>

          {seeMore && (
            <>
              <View style={styles.detailContainer}>
                <Text style={styles.topicTitle}>Ferro: </Text>
                <Text>{food.iron}g</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.topicTitle}>Cálcio: </Text>
                <Text>{food.calcium}g</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.topicTitle}>Magnésio: </Text>
                <Text>{food.magnesium}g</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.topicTitle}>Potássio: </Text>
                <Text>{food.potassium}g</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.topicTitle}>Vitamina C: </Text>
                <Text>{food.vitaminC}g</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.topicTitle}>Zinco: </Text>
                <Text>{food.zinc}g</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.topicTitle}>Gordura Saturada: </Text>
                <Text>{food.saturared}g</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.topicTitle}>Gordura Monoinsaturada: </Text>
                <Text>{food.monoinsaturared}g</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.topicTitle}>Gordura Poli-insaturada: </Text>
                <Text>{food.polyunsaturared}g</Text>
              </View>
            </>
          )}

          <TouchableOpacity activeOpacity={1} onPress={handlerSeeMore}>
            <Text style={styles.seeMore}>{!seeMore ? 'Ver Mais...' : 'Ver Menos...'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handlerDelete} activeOpacity={0.7} style={{ padding: 10 }}>
        <FontAwesome name="window-close" size={26} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  foodCategory: {
    color: 'black',
    fontSize: 14,
  },
  detailContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  topicTitle: {
    fontWeight: 'bold',
  },
  seeMore: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
