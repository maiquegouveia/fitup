import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const SearchFoodListItem = props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {}}
      style={{ marginVertical: 5, backgroundColor: 'white', width: '100%', padding: 10, borderRadius: 10 }}
    >
      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>{props.foodName}</Text>
      <Text style={{ color: 'black', fontSize: 14 }}>{props.category} </Text>
    </TouchableOpacity>
  );
};

export default SearchFoodListItem;

const styles = StyleSheet.create({});
