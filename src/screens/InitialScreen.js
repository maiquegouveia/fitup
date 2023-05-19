import { SafeAreaView, ImageBackground } from 'react-native';
import image from '../../assets/home-img-1.png';
import Logo from '../components/Logo';
import HomeButtons from '../components/HomeButtons';
import { useHeaderHeight } from '@react-navigation/elements';
import styles from '../styles/InitialScreen.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useContext } from 'react';
import AppContext from '../../AppContext';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Logo style={{ marginTop: headerHeight + 100 }} />
        <HomeButtons />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomePage;
