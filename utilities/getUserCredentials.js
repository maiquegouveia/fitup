import AsyncStorage from '@react-native-async-storage/async-storage';
import updateUserCredentials from './updateUserCredentials';

export default async (setParams, setUserIsAuthenticated, navigation) => {
  try {
    const userId = await AsyncStorage.getItem('fitUpUserId');
    if (userId !== null) {
      const updatedCredentials = await updateUserCredentials(JSON.parse(userId));
      setParams(updatedCredentials);
      setUserIsAuthenticated(true);
      navigation.replace('DrawerStack', { screen: 'Home' });
    }
  } catch (error) {
    console.log(error);
  }
  return {};
};
