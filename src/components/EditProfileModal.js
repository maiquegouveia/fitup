import React from 'react';
import { Button, Modal, FormControl, Center, NativeBaseProvider, Text } from 'native-base';
import { useContext } from 'react';
import { TextInput } from 'react-native-paper';
import { EditProfileContext } from '../../EditProfileContext';

export default ({ isLoading, showEditModal, onCloseEditModal, onSaveEditModal, errorMessage }) => {
  const { modalContent, setModalContent } = useContext(EditProfileContext);
  const onChange = (text) => {
    setModalContent((prev) => {
      return {
        ...prev,
        value: text,
      };
    });
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Modal isOpen={showEditModal} onClose={onCloseEditModal}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Editar Informações</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>{modalContent.inputLabel}</FormControl.Label>
                <TextInput
                  mode="outlined"
                  keyboardType={modalContent.keyboardType}
                  value={`${modalContent.value}`}
                  onChangeText={onChange}
                  activeOutlineColor="gray"
                />

                <Text color="red.500" fontWeight="semibold">
                  {errorMessage}
                </Text>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={onCloseEditModal}>
                  Cancelar
                </Button>
                <Button
                  isLoading={isLoading}
                  isPressed={isLoading}
                  backgroundColor="green.700"
                  onPress={onSaveEditModal}
                >
                  Salvar
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </NativeBaseProvider>
  );
};
