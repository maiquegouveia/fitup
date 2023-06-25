import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const FoodDetailsModal = ({ food, onDismiss, setModalDetails, visible }) => {
  const onPressFavorite = () => {
    setModalDetails((prev) => {
      return {
        ...prev,
        isFavorite: !prev.isFavorite,
      };
    });
  };

  return (
    <Portal>
      <Dialog style={styles.dialog} visible={visible} onDismiss={onDismiss}>
        <Dialog.Title style={styles.title}>{food.name}</Dialog.Title>
        <Dialog.Content>
          <View style={{ width: '80%' }}>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Categoria: </Text>
              <Text>{food.category}</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Calorias: </Text>
              <Text>{food.kcal}kcal</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Carboidratos: </Text>
              <Text>{food.carbohydrates}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Proteínas: </Text>
              <Text>{food.protein}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Sódio: </Text>
              <Text>{food.sodium}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Ferro: </Text>
              <Text>{food.iron}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Cálcio: </Text>
              <Text>{food.calcium}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Magnésio: </Text>
              <Text>{food.magnesium}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Potássio: </Text>
              <Text>{food.potassium}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Vitamina C: </Text>
              <Text>{food.vitaminC}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Zinco: </Text>
              <Text>{food.zinc}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Gordura Saturada: </Text>
              <Text>{food.saturared}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Gordura Monoinsaturada: </Text>
              <Text>{food.monounsaturated}g</Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>Gordura Poli-insaturada: </Text>
              <Text>{food.polyunsaturared}g</Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                size={28}
                color={food.isFavorite ? 'black' : 'white'}
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
