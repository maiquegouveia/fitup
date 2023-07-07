import AsyncStorage from '@react-native-async-storage/async-storage';
import updateUserCredentials from './updateUserCredentials';

export default async () => {
  try {
    const data = await AsyncStorage.getItem('fitupData');
    if (data !== null) {
      const { userId } = JSON.parse(data);
      const updatedCredentials = await updateUserCredentials(userId);
      return updatedCredentials;
    } else {
      return { error: 404 };
    }
  } catch (error) {
    console.log(error);
  }
};
