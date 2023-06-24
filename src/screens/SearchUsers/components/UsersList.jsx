import { StyleSheet, View, ScrollView } from 'react-native';
import { React, useState } from 'react';
import UserItem from './UserItem';
import { Text } from 'native-base';

const UsersList = ({ usersList }) => {
  const data = [
    {
      name: 'Meu nome',
      username: 'meuusername',
      profilePicture: 'https://i.ibb.co/zP5SYw3/ac75d208d73e.jpg',
    },
    {
      name: 'Meu nome',
      username: 'meuusername',
      profilePicture: 'https://i.ibb.co/zP5SYw3/ac75d208d73e.jpg',
    },
    {
      name: 'Meu nome',
      username: 'meuusername',
      profilePicture: 'https://i.ibb.co/zP5SYw3/ac75d208d73e.jpg',
    },
    {
      name: 'Meu nome',
      username: 'meuusername',
      profilePicture: 'https://i.ibb.co/zP5SYw3/ac75d208d73e.jpg',
    },
    {
      name: 'Meu nome',
      username: 'meuusername',
      profilePicture: 'https://i.ibb.co/zP5SYw3/ac75d208d73e.jpg',
    },
    {
      name: 'Meu nome',
      username: 'meuusername',
      profilePicture: 'https://i.ibb.co/zP5SYw3/ac75d208d73e.jpg',
    },
    {
      name: 'Meu nome',
      username: 'meuusername',
      profilePicture: 'https://i.ibb.co/zP5SYw3/ac75d208d73e.jpg',
    },
    {
      name: 'Meu nome',
      username: 'meuusername',
      profilePicture: 'https://i.ibb.co/zP5SYw3/ac75d208d73e.jpg',
    },
    {
      name: 'Meu nome',
      username: 'meuusername',
      profilePicture: 'https://i.ibb.co/zP5SYw3/ac75d208d73e.jpg',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text fontWeight="semibold" fontSize={18}>
          {usersList.length > 1 ? `Resultados (${usersList.length})` : `Resultado (${usersList.length})`}
        </Text>
      </View>
      <ScrollView persistentScrollbar={true} contentContainerStyle={{ marginRight: 10 }}>
        {usersList?.map((user, index) => (
          <UserItem
            style={{ marginBottom: index === usersList.length - 1 ? 0 : 10 }}
            key={index}
            name={user.name}
            username={user.username}
            profilePicture={user.profilePicture}
          />
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
