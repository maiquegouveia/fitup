import React from 'react';
import { Button, Modal, FormControl, NativeBaseProvider } from 'native-base';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { View } from 'react-native';
import WarningCreateDish from '../../Dish/components/WarningCreateDish';

export default ({ showModal, setShowModal, onPressAddWaterButton }) => {
  const [inputValue, setInputValue] = useState(100);
  const [errorMessage, setErrorMessage] = useState('');

  const addWater = () => {
    const value = +inputValue;
    if (inputValue === '') {
      setErrorMessage('Preencha o campo acima!');
      return;
    } else if (value < 100 || value > 1000) {
      setErrorMessage('Informe um valor entre 100 e 1000mLs!');
      return;
    }
    onPressAddWaterButton(value);
    setShowModal(false);
  };

  const handlerChangeText = (text) => {
    const char = text[text.length - 1];
    if (char === ' ' || char === '.' || char === ',' || char === '-') return;
    setInputValue(text);
  };

  const handlerClose = () => {
    setErrorMessage('');
    setInputValue(100);
    setShowModal(false);
  };

  return (
    <NativeBaseProvider>
      <Modal isOpen={showModal} onClose={handlerClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Body>
            <FormControl marginTop={5}>
              <FormControl.Label>Digite a quantidade de água</FormControl.Label>
              <TextInput
                autoFocus={true}
                keyboardType="numeric"
                onChangeText={handlerChangeText}
                mode="outlined"
                activeOutlineColor="gray"
                value={`${inputValue}`}
              />
              {errorMessage !== '' && (
                <View>
                  <WarningCreateDish message={errorMessage} />
                </View>
              )}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={handlerClose}>
                Cancelar
              </Button>
              <Button onPress={addWater}>Adicionar</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
};
