import AsyncStorage from '@react-native-async-storage/async-storage';

export default async (bool) => {
  try {
    const data = await AsyncStorage.getItem('fitupData');
    const { userId } = JSON.parse(data);
    const updatedData = {
      userId,
      isDarkMode: bool,
    };
    await AsyncStorage.setItem('fitupData', JSON.stringify(updatedData));
  } catch (error) {
    console.log(error);
  }
};
