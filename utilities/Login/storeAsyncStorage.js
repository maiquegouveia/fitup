import AsyncStorage from '@react-native-async-storage/async-storage';

export default async (data) => {
  try {
    await AsyncStorage.setItem('fitupData', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
