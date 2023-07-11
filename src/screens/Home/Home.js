import { useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import AppContext from '../../../AppContext';
import CardFeature from './components/CardFeature';
import { cardAguaFeature, cardAliments, cardBuscar, cardPratos } from '../../../constants/images';
import { ProgressBar } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import { useState } from 'react';

const Home = () => {
  const { userObject, setUserObject, setActiveScreen } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const isFocused = useIsFocused();

  const progressBar = userObject.getRegistrationProgress();
  const navigation = useNavigation();

  const onPressCard = (screen) => {
    navigation.navigate(screen);
  };

  const getData = async () => {
    await userObject.setWaterConsume();
    await userObject.setFavoriteFoods();
    await userObject.setDishes();
    const updatedUserObject = userObject.clone();
    updatedUserObject.setTotalWater();
    setUserObject(updatedUserObject);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setActiveScreen('Home');
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.welcomeContainer]}>
          {progressBar !== 1 && (
            <View style={[styles.news, { height: 25, backgroundColor: theme.backgroundNews }]}>
              <Text style={[styles.newsText, { color: theme.fontColor.textBlack, fontFamily: theme.font.bold }]}>
                Novidades
              </Text>
            </View>
          )}
          {progressBar == 1 && (
            <View style={[styles.news, { height: '75%', backgroundColor: theme.backgroundNews, marginTop: 15 }]}>
              <Text
                style={[
                  styles.newsText,
                  { color: theme.fontColor.textBlack, fontFamily: theme.font.bold, fontSize: 20 },
                ]}
              >
                Novidades
              </Text>
            </View>
          )}
          {progressBar !== 1 && (
            <View style={styles.registrationProgressContainer}>
              <Text style={[styles.progressBarText, { fontFamily: theme.font.bold }]}>Complete o seu cadastro...</Text>
              <ProgressBar progress={progressBar} color="#05F26C" style={{ height: 5 }} />
            </View>
          )}
        </View>
        <CardFeature title="Buscar Alimentos" cardBackground={cardBuscar} onPress={() => onPressCard('SearchFood')} />
        <CardFeature title="Água Diária" cardBackground={cardAguaFeature} onPress={() => onPressCard('WaterAmount')} />
        <CardFeature
          title="Alimentos Favoritos"
          cardBackground={cardAliments}
          onPress={() => onPressCard('FavoriteFoods')}
        />
        <CardFeature
          title="Pratos Favoritos"
          cardBackground={cardPratos}
          onPress={() => onPressCard('FavoriteDishes')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  welcomeContainer: {
    padding: 5,
    marginBottom: 2,
    height: 100,
    borderRadius: 12,
  },
  nutriContainer: {
    backgroundColor: 'green',
  },
  registrationProgressContainer: {
    backgroundColor: '#DFD9E2',
    padding: 10,
    borderRadius: 5,
    marginTop: 35,
    width: 355,
    position: 'absolute',
    marginLeft: 5,
  },
  progressBarText: {
    fontSize: 18,
    color: 'white',
  },
  news: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'white',
  },
  newsText: {
    color: 'black',
  },
  newsImage: {
    flex: 1,
  },
});
