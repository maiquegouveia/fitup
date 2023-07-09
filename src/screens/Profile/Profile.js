import { View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Provider, Text, Button } from 'react-native-paper';
import { useState, useContext, useEffect } from 'react';
import { useNavigation, useIsFocused, StackActions } from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';
import EditProfileContainer from './components/EditProfileContainer';
import styles from './Profile.style';
import AppContext from '../../../AppContext';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import getImageAndPermissions from '../../../utilities/getImageAndPermissions';
import removeAsyncStorage from '../../../utilities/removeAsyncStorage';
import changeProfilePicture from '../../../utilities/Profile/changeProfilePicture';
import postImage from '../../../utilities/Cadastro/postImage';
import { ActivityIndicator } from 'react-native-paper';

const ProfileScreen = () => {
  const { setUserIsAuthenticated, userObject, setUserObject, setActiveScreen } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const isFocused = useIsFocused();

  const [waterProgress, setWaterProgress] = useState(0);
  const [showEditContainer, setShowEditContainer] = useState(false);
  const [changingPicture, setChangingPicture] = useState(false);
  const [image, setImage] = useState({
    uri: '',
    base64: '',
  });

  const navigation = useNavigation();

  const handleShowContainer = () => {
    setShowEditContainer((prev) => !prev);
  };

  const onLogoutHandler = () => {
    setUserIsAuthenticated(false);
    removeAsyncStorage();

    const stackNavigation = navigation.getParent();
    const routes = stackNavigation.getState().routes;
    if (routes.length > 1) {
      navigation.dispatch(StackActions.popToTop());
    } else {
      navigation.replace('InitialScreen');
    }
  };

  const handlerProfilePicture = async () => {
    const base64 = await getImageAndPermissions(setImage);
    setChangingPicture(true);
    if (base64) {
      let url = await postImage(base64);
      const response = await changeProfilePicture(userObject.id, url);
      if (response?.error) {
        console.log('ERROR');
      } else {
        userObject.profilePicture = url;
        const updatedUserObject = userObject.clone();
        setUserObject(updatedUserObject);
      }
    }
    setChangingPicture(false);
  };

  useEffect(() => {
    if (isFocused) {
      setActiveScreen('Profile');
      const progress = userObject.consumedWater.getDailyProgress(userObject.totalWater);
      setWaterProgress(progress);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
      <Provider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.profileImageContainer}>
              <TouchableOpacity disabled={!showEditContainer} onPress={handlerProfilePicture}>
                {changingPicture && (
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ActivityIndicator animating={true} color="black" />
                  </View>
                )}
                {!changingPicture && (
                  <Image source={{ uri: `${userObject.profilePicture}` }} resizeMode="contain" style={styles.image} />
                )}
              </TouchableOpacity>
            </View>
            {!showEditContainer && (
              <>
                <Text style={[styles.nameText, { color: theme.fontColor.title, fontFamily: theme.font.bold }]}>
                  {userObject.name}
                </Text>
                <Text style={[styles.usernameText, { color: theme.fontColor.title, fontFamily: theme.font.semiBold }]}>
                  {userObject.username}
                </Text>
              </>
            )}
          </View>
          {!showEditContainer && (
            <View style={{ paddingHorizontal: 20 }}>
              <View style={[styles.statsContainer, { backgroundColor: theme.profile.card.backgroundColor }]}>
                <View style={{ width: '100%', marginBottom: 20, alignItems: 'center' }}>
                  <Text style={{ fontSize: 21, fontFamily: theme.font.bold, color: theme.profile.card.fontColor }}>
                    Estatísticas
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.statsWaterContainer}
                    onPress={() => navigation.navigate('WaterAmount')}
                  >
                    <CircularProgress
                      value={waterProgress}
                      radius={60}
                      progressValueColor={theme.profile.card.fontColor}
                      activeStrokeColor={'#16B6E9'}
                      inActiveStrokeColor={'#D9D9D9'}
                      inActiveStrokeOpacity={0.5}
                      inActiveStrokeWidth={10}
                      activeStrokeWidth={10}
                      valueSuffix="%"
                      duration={400}
                    />
                  </TouchableOpacity>
                  <View style={styles.statsWaterController}>
                    <Text style={{ fontFamily: theme.font.bold }}>Água Consumida</Text>
                    <Button
                      labelStyle={{ fontFamily: theme.font.semiBold, fontSize: 12, color: 'black' }}
                      style={{ backgroundColor: '#00F0FF', borderRadius: 5, marginTop: 5 }}
                      onPress={() => navigation.navigate('WaterAmount')}
                    >
                      Consumir Água
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          )}
          <View style={{ alignItems: 'center' }}>
            {!showEditContainer && (
              <>
                <View
                  style={{
                    width: '70%',
                    alignItems: 'center',
                    marginBottom: 40,
                  }}
                ></View>
                <Button
                  labelStyle={[styles.btnText, { fontFamily: theme.font.semiBold }]}
                  style={[styles.btn, { marginBottom: 10 }]}
                  onPress={() => setShowEditContainer(true)}
                >
                  Editar Perfil
                </Button>
                <Button
                  labelStyle={[styles.btnText, { fontFamily: theme.font.semiBold }]}
                  style={styles.btn}
                  onPress={onLogoutHandler}
                >
                  Sair
                </Button>
              </>
            )}
            {showEditContainer && (
              <EditProfileContainer showEditContainer={showEditContainer} handleShowContainer={handleShowContainer} />
            )}
          </View>
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
};

export default ProfileScreen;
