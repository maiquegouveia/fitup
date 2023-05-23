import AsyncStorage from '@react-native-async-storage/async-storage';

export default async () => {
  try {
    await AsyncStorage.removeItem('fitUpUserId');
  } catch (error) {
    console.log(error);
  }
};
