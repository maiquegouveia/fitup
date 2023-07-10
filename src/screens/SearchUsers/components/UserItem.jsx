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
    <TouchableOpacity onPress={handlerOnPress} activeOpacity={0.8} style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Avatar.Image size={50} source={{ uri: user.profilePicture }} />
      </View>
      <View style={styles.mainDetailsContainer}>
        <View style={styles.detailsContainer}>
          <Text
            flexWrap="wrap"
            lineHeight="sm"
            fontSize={16}
            color={user.type === 3 ? 'red.600' : 'black'}
            fontFamily={theme.font.bold}
          >
            {user.name}
          </Text>
          <Text lineHeight="sm" fontSize={12} fontFamily={theme.font.regular}>
            {user.username}
          </Text>
          <Text lineHeight="sm" fontSize={12} fontFamily={theme.font.regular}>
            Membro desde: {user.getCreatedAt()}
          </Text>
          {user.type === 2 && (
            <Text lineHeight="sm" fontSize={12} fontFamily={theme.font.semiBold}>
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
    backgroundColor: 'white',
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
});
