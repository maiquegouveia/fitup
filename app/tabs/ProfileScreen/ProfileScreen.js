import { StyleSheet, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ProfileScreen.style';
import EditProfileContainer from '../../components/EditProfileContainer';
import { useState } from 'react';
import ButtonComponent from '../../components/UI/ButtonComponent';

const ProfileScreen = () => {
  const router = useRouter();
  const params = useSearchParams();
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const [showEditContainer, setShowEditContainer] = useState(false);
  const onCancelEdit = () => {
    setShowEditContainer(prev => !prev);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitle: 'Meu Perfil',
          headerBackVisible: false,
          gestureEnabled: false,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
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
          <View style={{ width: '70%', alignItems: 'center', marginBottom: 40 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', flexWrap: 'wrap' }}>Maique Gouveia de Souza</Text>
          </View>
          {showEditContainer && (
            <View style={{ width: '100%', backgroundColor: '#ccc', padding: 20 }}>
              <EditProfileContainer userData={{ ...params }} />
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ButtonComponent styles={{ marginRight: 20 }} btnText="Salvar" onPress={() => {}} />
                <ButtonComponent btnText="Cancelar" onPress={onCancelEdit} />
              </View>
            </View>
          )}

          {!showEditContainer && (
            <>
              <ButtonComponent
                styles={{ marginBottom: 20 }}
                btnText="Editar Perfil"
                onPress={() => setShowEditContainer(prev => !prev)}
              />
              <ButtonComponent btnText="Sair" onPress={removeData} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
