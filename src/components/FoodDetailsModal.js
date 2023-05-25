import { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import changeFavoriteStatus from '../../utilities/changeFavoriteStatus';
import AppContext from '../../AppContext';

const FoodDetailsModal = props => {
  const { params } = useContext(AppContext);

  const onPressFavorite = () => {
    const updatedResults = props.filteredResults;
    const index = updatedResults.findIndex(curr => curr.alimento_id === props.food.alimento_id);
    if (index === -1) return;
    if (index !== -1) updatedResults[index].isFavorite = !updatedResults[index].isFavorite;
    props.setFilteredResults(updatedResults);
  };

  const onDismiss = () => {
    props.onDismiss();
    if (props.food.isFavorite) {
      // changeFavoriteStatus(params.usuario_id, props.food.alimento_id);
    }
  };

  return (
    <Portal>
      <Dialog style={styles.dialog} visible={props.visible} onDismiss={onDismiss}>
        <Dialog.Title style={styles.title}>{props.food.nome}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Categoria: </Text>
            <Text>{props.food.categoria}</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Calorias: </Text>
            <Text>{props.food.kcal}kcal</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Carboidratos: </Text>
            <Text>{props.food.carboidrato}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Proteínas: </Text>
            <Text>{props.food.proteina}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Sódio: </Text>
            <Text>{props.food.sodio}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Ferro: </Text>
            <Text>{props.food.ferro}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Cálcio: </Text>
            <Text>{props.food.calcio}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Magnésio: </Text>
            <Text>{props.food.magnesio}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Potássio: </Text>
            <Text>{props.food.potassio}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Vitamina C: </Text>
            <Text>{props.food.vitaminaC}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Zinco: </Text>
            <Text>{props.food.zinco}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Gordura Saturada: </Text>
            <Text>{props.food.gordura_saturada}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Gordura Monoinsaturada: </Text>
            <Text>{props.food.gordura_monoinsaturada}g</Text>
          </View>
          <View style={styles.contentTopic}>
            <Text style={styles.topicTitle}>Gordura Poli-insaturada: </Text>
            <Text>{props.food.gordura_poli_insaturada}g</Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              textColor="white"
              style={{ backgroundColor: 'green', borderRadius: 5, width: '85%' }}
              onPress={onDismiss}
            >
              Fechar
            </Button>
            <TouchableOpacity activeOpacity={0.7} onPress={onPressFavorite}>
              <MaterialIcons
                name="favorite"
                size={24}
                color={props.food.isFavorite ? 'black' : 'white'}
                style={{
                  padding: 5,
                  backgroundColor: 'green',
                  borderRadius: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default FoodDetailsModal;

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentTopic: {
    flexDirection: 'row',
  },
  topicTitle: {
    fontWeight: 'bold',
  },
});
