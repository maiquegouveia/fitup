import { SafeAreaView, ImageBackground, View } from 'react-native';
import image from '../../assets/home-img-1.png';
import Logo from '../components/Logo';
import HomeButtons from '../components/HomeButtons';
import { useHeaderHeight } from '@react-navigation/elements';
import styles from '../styles/InitialScreen.style';
import getUserCredentials from '../../utilities/getUserCredentials';
import { useEffect, useContext, useState } from 'react';
import AppContext from '../../AppContext';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import User from '../../models/User';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const headerHeight = useHeaderHeight();
  const { setParams, setUserIsAuthenticated, userObject, setUserObject } = useContext(AppContext);
  const navigation = useNavigation();

  const getData = async () => {
    setIsLoading(true);
    const data = await getUserCredentials();
    if (!data?.error) {
      const updatedUserObject = new User(
        data.usuario_id,
        data.nome,
        data.email,
        data.senha,
        data.altura,
        data.peso,
        data.telefone,
        data.username,
        data.foto_perfil
      );
      setUserObject(updatedUserObject);
      setParams(data);
      setUserIsAuthenticated(true);
      navigation.replace('DrawerStack', { screen: 'Home' });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Logo style={{ marginTop: headerHeight }} />
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
          {isLoading && <ActivityIndicator animating={true} color="white" size={58} />}
          {!isLoading && <HomeButtons />}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomePage;
