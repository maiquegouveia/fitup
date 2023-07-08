import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Text } from 'native-base';

const FoodItem = ({ food, showRemoveConfirmationModalHandler, theme }) => {
  const [seeMore, setSeeMore] = useState(false);

  const handlerSeeMore = () => setSeeMore((prev) => !prev);

  const handlerDelete = () => showRemoveConfirmationModalHandler(food.id, food.name, food.favoriteFoodId);

  return (
    <View style={styles.container}>
      <View style={{ width: '80%' }}>
        <Text style={[styles.foodName, { fontFamily: theme.font.bold }]}>{food.name}</Text>
        <Text style={[styles.foodCategory, { fontFamily: theme.font.semiBold }]}>{food.category}</Text>
        <View style={{ backgroundColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 10 }}>
          <View style={styles.detailContainer}>
            <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
              Calorias: <Text style={{ fontFamily: theme.font.regular }}>{food.kcal}kcal</Text>
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
              Carboidratos: <Text style={{ fontFamily: theme.font.regular }}>{food.carbohydrates}g</Text>
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
              Proteínas: <Text style={{ fontFamily: theme.font.regular }}>{food.protein}g</Text>
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
              Sódio: <Text style={{ fontFamily: theme.font.regular }}>{food.sodium}mg</Text>
            </Text>
          </View>

          {seeMore && (
            <>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
                  Ferro: <Text style={{ fontFamily: theme.font.regular }}>{food.iron}mg</Text>
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
                  Cálcio: <Text style={{ fontFamily: theme.font.regular }}>{food.calcium}mg</Text>{' '}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
                  Magnésio: <Text style={{ fontFamily: theme.font.regular }}>{food.magnesium}mg</Text>
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
                  Potássio: <Text style={{ fontFamily: theme.font.regular }}>{food.potassium}mg</Text>
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
                  Vitamina C: <Text style={{ fontFamily: theme.font.regular }}>{food.vitaminC}mg</Text>
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
                  Zinco: <Text style={{ fontFamily: theme.font.regular }}>{food.zinc}mg</Text>
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
                  Gordura Saturada: <Text style={{ fontFamily: theme.font.regular }}>{food.saturated}g</Text>
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
                  Gordura Monoinsaturada:{' '}
                  <Text style={{ fontFamily: theme.font.regular }}>{food.monounsaturated}g</Text>
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>
                  Gordura Poli-insaturada:{' '}
                  <Text style={{ fontFamily: theme.font.regular }}>{food.polyunsaturated}g</Text>
                </Text>
              </View>
            </>
          )}

          <TouchableOpacity activeOpacity={1} onPress={handlerSeeMore}>
            <Text style={[styles.seeMore, { fontFamily: theme.font.semiBold }]}>
              {!seeMore ? 'Ver Mais...' : 'Ver Menos...'}
            </Text>
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
    fontSize: 18,
  },
  foodCategory: {
    fontSize: 14,
  },
  detailContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  topicTitle: {},
  seeMore: {
    fontSize: 16,
  },
});
