import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SearchFoodListItem = props => {
  const { food } = props;

  const onShowModalDetails = () => {
    props.onPress(food);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onShowModalDetails}
      style={{ marginVertical: 5, backgroundColor: 'white', width: '100%', padding: 10, borderRadius: 10 }}
    >
      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>{food.nome}</Text>
      <Text style={{ color: 'black', fontSize: 14 }}>{food.categoria} </Text>
    </TouchableOpacity>
  );
};

export default SearchFoodListItem;

const styles = StyleSheet.create({});
