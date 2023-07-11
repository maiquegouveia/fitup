import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from 'native-base';
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import AppContext from '../../../../AppContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const UserItem = ({ user, style }) => {
  const navigation = useNavigation();
  const { userObject } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);

  const handlerOnPress = async () => {
    if (user.id === userObject.id) {
      navigation.navigate('Profile');
    } else {
      await Promise.allSettled(
        new Promise.resolve(await user.setFavoriteFoods()),
        new Promise.resolve(await user.setDishes()),
        new Promise.resolve(await user.setWaterConsume())
      );
      user.setTotalWater();
      const updatedUser = user.clone();
      navigation.navigate('ProfileSearch', { user: updatedUser });
    }
  };

  return (
    <TouchableOpacity
      onPress={handlerOnPress}
      activeOpacity={0.8}
      style={[styles.container, style, { backgroundColor: theme.fontColor.textBlack }]}
    >
      <View style={styles.imageContainer}>
        <Avatar.Image size={50} source={{ uri: user.profilePicture }} />
      </View>
      <View style={styles.mainDetailsContainer}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.name, { fontFamily: theme.font.bold, color: theme.fontColor.text }]}>{user.name}</Text>
          <Text style={[styles.userName, { fontFamily: theme.font.regular, color: theme.fontColor.text }]}>
            {user.username}
          </Text>
          <Text style={[styles.userName, { fontFamily: theme.font.regular, color: theme.fontColor.text }]}>
            Membro desde: {user.getCreatedAt()}
          </Text>
          {user.type === 2 && (
            <Text style={[styles.userName, { fontFamily: theme.font.semiBold, color: theme.fontColor.text }]}>
              NUTRICIONISTA
            </Text>
          )}
        </View>
        {user.type !== 1 && (
          <View style={styles.verifiedContainer}>
            <MaterialIcons name="verified" size={30} color={user.type === 2 ? 'green' : 'red'} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  mainDetailsContainer: {
    width: '78%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    width: '20%',
    alignItems: 'center',
  },
  detailsContainer: {
    width: '77%',
  },
  verifiedContainer: {
    width: '20%',
    alignItems: 'center',
  },
  name: {
    flexWrap: 'wrap',
    fontSize: 16,
  },
  userName: {
    fontSize: 12,
  },
});
