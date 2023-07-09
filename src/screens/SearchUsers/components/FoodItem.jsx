import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const FoodItem = ({ food, style, theme }) => {
  const [seeMore, setSeeMore] = useState(false);

  const handlerSeeMore = () => setSeeMore((prev) => !prev);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }, style]}>
      <View style={styles.subContainer}>
        <View style={{ marginVertical: 5 }}>
          <Text style={[styles.foodName, { color: theme.fontColor.text, fontFamily: theme.font.bold }]}>
            {food.name}
          </Text>
          <Text style={[styles.foodCategory, { color: theme.fontColor.text, fontFamily: theme.font.semiBold }]}>
            {food.category}{' '}
          </Text>
        </View>
        <View style={styles.mainDetailsContainer}>
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
                  Cálcio: <Text style={{ fontFamily: theme.font.regular }}>{food.calcium}mg</Text>
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
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>Gordura Saturada: </Text>
                <Text style={{ fontFamily: theme.font.regular }}>{food.saturated}g</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>Gordura Monoinsaturada: </Text>
                <Text style={{ fontFamily: theme.font.regular }}>{food.monounsaturated}g</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={[styles.topicTitle, { fontFamily: theme.font.semiBold }]}>Gordura Poli-insaturada: </Text>
                <Text style={{ fontFamily: theme.font.regular }}>{food.polyunsaturated}g</Text>
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
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    width: '100%',
  },
  foodName: {
    fontSize: 18,
    lineHeight: 20,
  },
  foodCategory: {
    lineHeight: 20,
    fontSize: 14,
  },
  mainDetailsContainer: {
    backgroundColor: 'skyblue',
    padding: 10,

    borderRadius: 5,
  },
  detailContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  topicTitle: {
    lineHeight: 20,
  },
  seeMore: {
    fontSize: 16,
    lineHeight: 20,
  },
});
