import { StyleSheet, View, ScrollView } from 'react-native';
import { React, useState } from 'react';
import UserItem from './UserItem';
import { Text } from 'native-base';

const UsersList = ({ usersList, theme }) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text fontFamily={theme.font.bold} fontSize={18}>
          {usersList.length > 1 ? `Resultados (${usersList.length})` : `Resultado (${usersList.length})`}
        </Text>
      </View>
      <ScrollView persistentScrollbar={true} contentContainerStyle={{ marginRight: 10 }}>
        {usersList?.map((user, index) => (
          <UserItem style={{ marginBottom: index === usersList.length - 1 ? 0 : 10 }} key={index} user={user} />
        ))}
      </ScrollView>
    </View>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    maxHeight: 520,
    padding: 10,
    marginTop: 30,
  },
});
