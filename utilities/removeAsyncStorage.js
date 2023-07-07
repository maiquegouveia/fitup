import AsyncStorage from '@react-native-async-storage/async-storage';

export default async () => {
  try {
    await AsyncStorage.removeItem('fitupData');
  } catch (error) {
    console.log(error);
  }
};
