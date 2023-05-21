import AsyncStorage from '@react-native-async-storage/async-storage';

export default async () => {
  try {
    await AsyncStorage.removeItem('userCredentials');
  } catch (error) {
    console.log(error);
  }
};
