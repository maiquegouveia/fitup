import { View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Provider, Text, Button } from 'react-native-paper';
import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';
import EditProfileContainer from './components/EditProfileContainer';
import ButtonComponent from '../../components/ButtonComponent';
import EditProfileModal from './components/EditProfileModal';
import styles from './Profile.style';
import AppContext from '../../../AppContext';
import { EditProfileContext } from '../../../EditProfileContext';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import getImageAndPermissions from '../../../utilities/getImageAndPermissions';
import removeUserCredentialsFromStorage from '../../../utilities/removeUserCredentialsFromStorage';
import editUserCredentials from '../../../utilities/editUserCredentials';
import changeProfilePicture from '../../../utilities/Profile/changeProfilePicture';
import postImage from '../../../utilities/Cadastro/postImage';
import { ActivityIndicator } from 'react-native-paper';

const ProfileScreen = () => {
  const { setUserIsAuthenticated, userObject, setUserObject } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const { modalContent } = useContext(EditProfileContext);
  const [showEditContainer, setShowEditContainer] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [changingPicture, setChangingPicture] = useState(false);
  const [image, setImage] = useState({
    uri: '',
    base64: '',
  });

  const navigation = useNavigation();

  const onShowEditModal = () => {
    setErrorMessage('');
    setShowEditModal(true);
  };

  const onCloseEditModal = () => {
    setShowEditModal(false);
  };

  const onSaveEditModal = async () => {
    setIsLoading(true);
    const response = await editUserCredentials(
      userObject.id,
      modalContent.field.name,
      modalContent.field.type,
      modalContent.value
    );
    setIsLoading(false);
    if (response.status === 204) {
      userObject[`${modalContent.field.userObject}`] = modalContent.value;
      const updatedUserObject = userObject.clone();

      updatedUserObject.setTotalWater();

      setUserObject(updatedUserObject);
      setShowEditModal(false);
    } else if (response.status === 500 && response?.errorCode === 'ER_DUP_ENTRY') {
      setErrorMessage(`${modalContent.inputLabel} já cadastrado!`);
    }
  };

  const onCloseEditHandler = () => {
    setShowEditContainer((prev) => !prev);
  };

  const onLogoutHandler = () => {
    setUserIsAuthenticated(false);
    removeUserCredentialsFromStorage();
    navigation.replace('InitialScreen');
  };

  const getWaterProgress = () => {
    if (userObject.consumedWater > 0) {
      const progress = (userObject.consumedWater / userObject.totalWater) * 100;
      if (progress > 100) return 100;
    }
    return 0;
  };

  const handlerProfilePicture = async () => {
    const base64 = await getImageAndPermissions(setImage);
    setChangingPicture(true);
    if (base64) {
      let url = await postImage(base64);
      url = url.replace('https://i.ibb.co/', '');
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
                  <Image
                    source={{ uri: `https://i.ibb.co/${userObject.profilePicture}` }}
                    resizeMode="contain"
                    style={styles.image}
                  />
                )}
              </TouchableOpacity>
            </View>
            {!showEditContainer && (
              <Text style={[styles.nameText, { color: theme.fontColor.title }]}>{userObject.name}</Text>
            )}
          </View>
          {!showEditContainer && (
            <View style={{ paddingHorizontal: 20 }}>
              <View style={styles.statsContainer}>
                <View style={{ width: '100%', marginBottom: 40, alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Estatísticas</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.statsWaterContainer}
                    onPress={() => navigation.navigate('WaterAmount')}
                  >
                    <CircularProgress
                      value={getWaterProgress()}
                      radius={60}
                      progressValueColor={'black'}
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
                    <Text>Água Consumida</Text>
                    <Button
                      textColor="black"
                      style={{ backgroundColor: '#00F0FF', borderRadius: 5, marginTop: 5 }}
                      onPress={() => navigation.navigate('WaterAmount')}
                    >
                      Adicionar Água
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
                <ButtonComponent
                  styles={{ marginBottom: 10 }}
                  btnText="Editar Perfil"
                  onPress={() => setShowEditContainer(true)}
                />
                <ButtonComponent btnText="Sair" onPress={onLogoutHandler} />
              </>
            )}
            {showEditContainer && (
              <View style={{ width: '100%', padding: 20 }}>
                <EditProfileModal
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  showEditModal={showEditModal}
                  onCloseEditModal={onCloseEditModal}
                  onSaveEditModal={onSaveEditModal}
                />
                <EditProfileContainer onCloseEditHandler={onCloseEditHandler} onShowEditModal={onShowEditModal} />
              </View>
            )}
          </View>
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
};

export default ProfileScreen;
