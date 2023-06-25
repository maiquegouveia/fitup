import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeProvider';
import { useContext } from 'react';

const FoodItem = ({ food, style }) => {
  const [seeMore, setSeeMore] = useState(false);
  const { theme } = useContext(ThemeContext);
  const handlerSeeMore = () => setSeeMore((prev) => !prev);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }, style]}>
      <View style={{ width: '100%' }}>
        <Text style={[styles.foodName, { color: theme.fontColor.text }]}>{food.name}</Text>
        <Text style={[styles.foodCategory, { color: theme.fontColor.text }]}>{food.category} </Text>
        <View style={{ backgroundColor: 'skyblue', padding: 10, marginVertical: 5 }}>
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
                <Text>{food.monounsaturated}g</Text>
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
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
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
