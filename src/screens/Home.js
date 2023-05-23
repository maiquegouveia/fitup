import { useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native';
import AppContext from '../../AppContext';
import CardFeature from '../components/CardFeature';
import { cardAguaFeature, cardAliments, cardPratos } from '../../constants/images';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const Home = () => {
  const { params, userIsAuthenticated } = useContext(AppContext);
  return (
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Olá, {params.nome}!</Text>
        <View style={styles.registrationProgressContainer}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Complete o seu cadastro...</Text>
          <ProgressBar progress={0.5} color="orange" />
        </View>
      </View>
      <CardFeature title="Alimentos Favoritos" cardBackground={cardAliments} />
      <CardFeature title="Água Diária" cardBackground={cardAguaFeature} />
      <CardFeature title="Pratos Favoritos" cardBackground={cardPratos} />
      <Button title="Teste" onPress={() => console.log('Clean...')} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  welcomeContainer: {
    padding: 5,
    marginBottom: '10%',
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  nutriContainer: {
    backgroundColor: 'green',
  },
  registrationProgressContainer: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: '5%',
  },
});
