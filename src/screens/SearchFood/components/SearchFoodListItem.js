import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { memo } from 'react';

const SearchFoodListItem = ({ food, style, onPress, theme }) => {
  const onShowModalDetails = () => {
    onPress(food);
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onShowModalDetails} style={[styles.container, style]}>
      <View>
        <Text style={[styles.foodName, { fontFamily: theme.font.semiBold }]}>{food.name}</Text>
        <Text style={[styles.foodCategory, { fontFamily: theme.font.regular }]}>{food.category} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(SearchFoodListItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minWidth: '100%',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 16,
    lineHeight: 20,
  },
  foodCategory: {
    fontSize: 12,
  },
});
