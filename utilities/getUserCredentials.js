import AsyncStorage from '@react-native-async-storage/async-storage';

export default async (setParams, setUserIsAuthenticated, navigation) => {
  try {
    const data = await AsyncStorage.getItem('userCredentials');
    if (data !== null) {
      const userData = JSON.parse(data);
      setParams(userData);
      setUserIsAuthenticated(true);
      navigation.replace('DrawerStack', { screen: 'Home' });
    }
  } catch (error) {
    console.log(error);
  }
  return {};
};
