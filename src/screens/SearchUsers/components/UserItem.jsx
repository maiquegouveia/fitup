import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from 'native-base';
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import AppContext from '../../../../AppContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

const UserItem = ({ user, style }) => {
  const navigation = useNavigation();
  const { userObject } = useContext(AppContext);

  const handlerOnPress = async () => {
    if (user.id === userObject.id) {
      navigation.navigate('Profile');
    } else {
      await Promise.allSettled(
        new Promise.resolve(await user.getFavoriteFoods()),
        new Promise.resolve(await user.getDishes()),
        new Promise.resolve(await user.getDailyWaterConsume())
      );
      user.setTotalWater();
      const updatedUser = user.clone();
      navigation.navigate('ProfileSearch', { user: updatedUser });
    }
  };

  return (
    <TouchableOpacity onPress={handlerOnPress} activeOpacity={0.8} style={[styles.container, style]}>
      <View style={{ marginRight: 10 }}>
        <Avatar.Image size={50} source={{ uri: user.profilePicture }} />
      </View>
      <View style={{ width: '60%' }}>
        <Text
          flexWrap="wrap"
          lineHeight="xs"
          fontSize={20}
          fontWeight="bold"
          color={user.type === 3 ? 'red.600' : 'black'}
        >
          {user.name}
        </Text>
        <Text lineHeight="xs" fontSize={14} fontWeight="semibold" marginTop={0}>
          {user.username}
        </Text>
      </View>
      {user.type !== 1 && (
        <View style={{ marginLeft: 10 }}>
          <MaterialIcons name="verified" size={30} color={user.type === 2 ? 'green' : 'red'} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
