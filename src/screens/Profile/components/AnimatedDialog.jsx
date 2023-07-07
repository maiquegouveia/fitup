import React, { useState, useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const App = ({ placeholder, value, handlerSave, error, handlerBlur, handlerChange }) => {
  const { theme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonCloseContainer}>
              <FontAwesome onPress={() => setModalVisible(false)} name="window-close" size={30} color="red" />
            </View>
            <Text style={[styles.modalText, { fontFamily: theme.font.bold }]}>{placeholder}</Text>
            <TextInput
              onChangeText={handlerChange}
              mode="outlined"
              value={value}
              onBlur={handlerBlur}
              outlineColor={error ? 'red' : 'black'}
            />
            <Text style={[styles.errorText, { fontFamily: theme.font.regular }]}>{error}</Text>
            <Button
              onPress={handlerSave}
              labelStyle={[styles.buttonText, { fontFamily: theme.font.semiBold }]}
              style={[styles.button, styles.buttonSave]}
            >
              Salvar
            </Button>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
  },
  buttonSave: {
    marginTop: 10,
    backgroundColor: 'green',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonCloseContainer: {
    alignItems: 'flex-end',
  },
  buttonText: {
    color: 'white',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 21,
  },
  errorText: {
    marginTop: 3,
    fontSize: 12,
    color: 'red',
  },
});

export default App;
