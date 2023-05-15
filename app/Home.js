import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { useEffect } from 'react';
import { useNavigation, useRouter, useSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { Button } from 'react-native-paper';
import { useHeaderHeight } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const router = useRouter();
  const params = useSearchParams();
  const headerHeight = useHeaderHeight();

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerBackVisible: false,
          gestureEnabled: false,
          headerTransparent: true,
        }}
      />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: `https://i.ibb.co/${params.foto_perfil}` }} resizeMode="contain" style={styles.image} />
        </View>
      </View>
      <View style={{ flex: 0.5, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Olá,</Text>
        <Text>{params.email}</Text>
        <Button textColor="white" style={{ width: 100, backgroundColor: 'green', marginTop: 20 }} onPress={removeData}>
          Sair
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 0.5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  image: {
    width: '100%',
    height: '100%',

    borderRadius: 100,
  },
});
