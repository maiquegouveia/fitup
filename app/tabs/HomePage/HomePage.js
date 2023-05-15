import { StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { Stack } from 'expo-router';
import image from '../../../assets/home-img-1.png';
import Logo from '../../components/UI/Logo';
import { useHeaderHeight } from '@react-navigation/elements';
import HomeButtons from '../../components/HomeButtons';
import styles from './HomePage.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

const HomePage = () => {
  const headerHeight = useHeaderHeight();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data !== null) {
          router.push({ pathname: '/tabs/ProfileScreen/ProfileScreen', params: JSON.parse(data) });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerBackVisible: false,
        }}
      />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Logo style={{ marginTop: headerHeight + 100 }} />
        <HomeButtons />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomePage;
