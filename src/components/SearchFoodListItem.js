import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
const SearchFoodListItem = props => {
  const { food } = props;

  const onPressDelete = () => {
    props.showRemoveConfirmationModalHandler(food.alimento_id, food.nome);
  };

  const onShowModalDetails = () => {
    props.onPress(food);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onShowModalDetails}
      style={{
        marginVertical: 5,
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ width: '80%' }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>{food.nome}</Text>
        <Text style={{ color: 'black', fontSize: 14 }}>{food.categoria} </Text>
      </View>
      {props.isFavorite && (
        <TouchableOpacity onPress={onPressDelete} activeOpacity={0.7} style={{ padding: 10 }}>
          <FontAwesome name="window-close" size={26} color="red" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SearchFoodListItem;

const styles = StyleSheet.create({});
