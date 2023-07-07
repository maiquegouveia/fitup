import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MyDropdownMenu = ({
  categories,
  categoryModalVisible,
  handleCategoryPress,
  selectedCategory,
  setCategoryModalVisible,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setCategoryModalVisible(true)}>
        <FontAwesome name="filter" size={24} color="white" />
      </TouchableOpacity>
      <Modal visible={categoryModalVisible} animationType="fade" transparent>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setCategoryModalVisible(false)}>
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleCategoryPress('Todas')}>
              <MaterialCommunityIcons
                name={'Todas' === selectedCategory ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
                size={24}
                color="black"
              />
              <Text>Todas</Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.name}
                style={styles.categoryButton}
                onPress={() => handleCategoryPress(category.name)}
              >
                <MaterialCommunityIcons
                  name={category.name === selectedCategory ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
                  size={24}
                  color="black"
                />
                <Text>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    overflow: 'hidden',
    marginLeft: '5%',
  },
  dropdownButton: {},
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  optionButton: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
});

export default MyDropdownMenu;
