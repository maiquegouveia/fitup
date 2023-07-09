import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import DishCardInfo from './components/DishCardInfo';
import { Ionicons } from '@expo/vector-icons';

const DishInfo = ({ dish, theme }) => {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <View style={styles.dishCardInfoContainer}>
      <DishCardInfo label="Carboidratos" value={dish.carbohydrates} suffix="g" />
      <DishCardInfo label="Proteínas" value={dish.protein} suffix="g" />
      <DishCardInfo label="Calorias" value={dish.kcal} suffix="kcal" />
      <DishCardInfo label="Sódio" value={dish.sodium} suffix="mg" />
      {seeMore && (
        <>
          <DishCardInfo label="Ferro" value={dish.iron} suffix="mg" />
          <DishCardInfo label="Cálcio" value={dish.calcium} suffix="mg" />
          <DishCardInfo label="Potássio" value={dish.potassium} suffix="mg" />
          <DishCardInfo label="Magnésio" value={dish.magnesium} suffix="mg" />
          <DishCardInfo label="Zinco" value={dish.zinc} suffix="mg" />
          <DishCardInfo label="Vitamina C" value={dish.vitaminC} suffix="mg" />
          <DishCardInfo label="Gordura Saturada" value={dish.saturated} suffix="g" />
          <DishCardInfo label="Gordura Monoinsaturada" value={dish.monounsaturated} suffix="g" />
          <DishCardInfo label="Gordura Poli-insaturada" value={dish.polyunsaturated} suffix="g" />
        </>
      )}
      <TouchableOpacity style={styles.seeMoreContainer} activeOpacity={1} onPress={() => setSeeMore((prev) => !prev)}>
        <Text style={[styles.seeMore, { fontFamily: theme.font.semiBold }]}>
          {!seeMore ? 'Ver Mais...' : 'Ver Menos...'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DishCard = ({ dish, theme }) => {
  return (
    <View style={styles.dishContainer}>
      <View style={styles.dishNameContainer}>
        <View style={{ width: '80%' }}>
          <Text style={[styles.dishName, { fontFamily: theme.font.bold }]}>{dish.name}</Text>
          <Text style={[styles.dishCategory, { fontFamily: theme.font.semiBold }]}>
            Categoria: <Text style={{ fontFamily: theme.font.regular }}>{dish.category.name}</Text>
          </Text>
          <Text style={[styles.dishCategory, { fontFamily: theme.font.semiBold }]}>
            Qtd. Alimentos: <Text style={{ fontFamily: theme.font.regular }}>{dish.dishItems.length}</Text>
          </Text>
          <Text style={[styles.dishCategory, { fontFamily: theme.font.semiBold }]}>
            Comentários: <Text style={{ fontFamily: theme.font.regular }}>{dish.dishComments.length}</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.chatIconContainer} activeOpacity={0.5} onPress={() => {}}>
          <Ionicons name="chatbox" size={30} color="#FF7900" />
        </TouchableOpacity>
      </View>
      <DishInfo dish={dish} theme={theme} />
    </View>
  );
};

const FoodItem = ({ theme, item, style }) => {
  const [seeMore, setSeeMore] = useState(false);
  const { food } = item;

  return (
    <View style={[styles.foodContainer, style]}>
      <View style={{ width: '100%' }}>
        <View style={{ marginVertical: 5 }}>
          <Text style={[styles.foodName, { fontFamily: theme.font.bold }]}>{food.name}</Text>
          <Text style={[styles.foodCategory, { fontFamily: theme.font.semiBold }]}>{food.FoodCategory.name}</Text>
        </View>
        <View style={{ backgroundColor: '#ccc', padding: 10, borderRadius: 5 }}>
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

          <TouchableOpacity activeOpacity={1} onPress={() => setSeeMore((prev) => !prev)}>
            <Text style={[styles.seeMore, { fontFamily: theme.font.semiBold }]}>
              {!seeMore ? 'Ver Mais...' : 'Ver Menos...'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ChatScreen = ({ route, navigation }) => {
  const { dish } = route.params;
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView persistentScrollbar={true} contentContainerStyle={styles.mainContainer} nestedScrollEnabled={true}>
      <DishCard dish={dish} theme={theme} />
      <View style={{ maxHeight: 400, marginTop: 15 }}>
        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
          {dish.dishItems.map((item, index) => (
            <FoodItem
              key={index}
              style={{ marginBottom: index === dish.dishItems.length - 1 ? 0 : 10 }}
              theme={theme}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
  },
  dishContainer: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  dishNameContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '100%',
  },
  dishName: {
    fontSize: 24,
    lineHeight: 25,
  },
  dishCategory: {
    fontSize: 14,
    lineHeight: 20,
  },
  dishCardInfoContainer: {
    backgroundColor: '#FF7900',
    padding: 10,
    borderRadius: 5,
  },
  chatIconContainer: {},

  foodContainer: {
    backgroundColor: '#FF7900',
    borderRadius: 5,
    padding: 10,
  },
  topicTitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  foodName: {
    fontSize: 16,
    lineHeight: 20,
  },
  foodCategory: {
    fontSize: 14,
    lineHeight: 20,
  },
});
