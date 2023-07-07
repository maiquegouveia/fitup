import { ImageBackground, View } from 'react-native';
import background from '../../assets/home-img-1.png';
import Logo from '../components/Logo';
import styles from '../styles/InitialScreen.style';
import getUserCredentials from '../../utilities/getUserCredentials';
import { useEffect, useContext, useState } from 'react';
import AppContext from '../../AppContext';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Button } from 'react-native-paper';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserIsAuthenticated, userObject, setUserObject } = useContext(AppContext);
  const navigation = useNavigation();

  const getData = async () => {
    setIsLoading(true);
    const userData = await getUserCredentials();
    if (!userData?.error) {
      userObject.id = userData.user_id;
      userObject.name = userData.name;
      userObject.email = userData.email;
      userObject.password = userData.password;
      userObject.height = userData.height;
      userObject.weight = userData.weight;
      userObject.phone = userData.phone;
      userObject.username = userData.username;
      userObject.type = userData.type;
      userObject.createdAt = userData.createdAt;
      userObject.profilePicture = userData.profile_picture;
      const updatedUserObject = userObject.clone();
      setUserObject(updatedUserObject);
      setUserIsAuthenticated(true);
      navigation.replace('DrawerStack', { screen: 'Home' });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlerLoginBtn = () => navigation.navigate('Login');
  const handlerRegisterBtn = () => navigation.navigate('NewCadastro');

  return (
    <ImageBackground style={styles.mainContainer} source={background}>
      <Logo />
      <View style={styles.container}>
        {isLoading && <ActivityIndicator animating={true} color="white" size={50} />}
        {!isLoading && (
          <>
            <Button onPress={handlerLoginBtn} labelStyle={styles.btnLabel} style={styles.btn}>
              Fazer Login
            </Button>
            <Button onPress={handlerRegisterBtn} labelStyle={styles.btnLabel} style={[styles.btn, { marginTop: 10 }]}>
              Cadastrar-se
            </Button>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default HomePage;
