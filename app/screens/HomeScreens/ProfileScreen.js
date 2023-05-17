import { StyleSheet, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { useSearchParams } from 'expo-router';
import { Button, Provider, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ProfileScreen.style';
import EditProfileContainer from '../../components/EditProfileContainer';
import { useState } from 'react';
import ButtonComponent from '../../components/UI/ButtonComponent';
import Dialog from '../../components/UI/Dialog';
import { useNavigation } from 'expo-router';

const ProfileScreen = () => {
  const params = useSearchParams();
  const navigation = useNavigation();
  // const removeData = async () => {
  //   try {
  //     await AsyncStorage.removeItem('userData');
  //     router.back();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [showEditContainer, setShowEditContainer] = useState(false);

  const onCancelEditHandler = () => {
    setShowEditContainer(prev => !prev);
  };

  const onSaveEditHandler = data => {
    setShowEditContainer(prev => !prev);
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Provider>
        <Dialog
          visible={visibleDialog}
          hideDialog={() => setVisibleDialog(false)}
          title="Dados alterados com sucesso!"
          content="Suas informações cadastradas foram alteradas com sucesso."
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.container]}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: `https://i.ibb.co/${params.foto_perfil}` }}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          </View>
          <View style={{ flex: 0.5, alignItems: 'center' }}>
            {!showEditContainer && (
              <>
                <View style={{ width: '70%', alignItems: 'center', marginBottom: 40 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', flexWrap: 'wrap' }}>Maique Gouveia de Souza</Text>
                </View>
                <ButtonComponent
                  styles={{ marginBottom: 20 }}
                  btnText="Editar Perfil"
                  onPress={() => setShowEditContainer(true)}
                />
                <ButtonComponent btnText="Sair" onPress={() => {}} />
              </>
            )}
            {showEditContainer && (
              <View style={{ width: '100%', padding: 20 }}>
                <EditProfileContainer
                  userData={{ ...params }}
                  onCancelEdit={onCancelEditHandler}
                  onSaveEdit={onSaveEditHandler}
                  setVisibleDialog={setVisibleDialog}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
};

export default ProfileScreen;
