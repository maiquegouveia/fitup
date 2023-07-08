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
              <Text style={styles.topicTitle}>
                Categoria: <Text>{food.category}</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Calorias: <Text>{food.kcal}kcal</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Carboidratos: <Text>{food.carbohydrates}g</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Proteínas: <Text>{food.protein}g</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Sódio: <Text>{food.sodium}mg</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Ferro: <Text>{food.iron}mg</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Cálcio: <Text>{food.calcium}mg</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Magnésio: <Text>{food.magnesium}mg</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Potássio: <Text>{food.potassium}mg</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Vitamina C: <Text>{food.vitaminC}mg</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Zinco: <Text>{food.zinc}mg</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Gordura Saturada: <Text>{food.saturated}g</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Gordura Monoinsaturada: <Text>{food.monounsaturated}g</Text>
              </Text>
            </View>
            <View style={styles.contentTopic}>
              <Text style={styles.topicTitle}>
                Gordura Poli-insaturada: <Text>{food.polyunsaturated}g</Text>
              </Text>
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
