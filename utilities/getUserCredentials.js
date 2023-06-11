import AsyncStorage from '@react-native-async-storage/async-storage';
import updateUserCredentials from './updateUserCredentials';

export default async () => {
  try {
    const userId = await AsyncStorage.getItem('fitUpUserId');

    if (userId !== null) {
      const updatedCredentials = await updateUserCredentials(JSON.parse(userId));
      return updatedCredentials;
    } else {
      return { error: 404 };
    }
  } catch (error) {
    console.log(error);
  }
};
