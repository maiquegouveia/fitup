import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

const DialogEditInput = props => {
  const showDialog = () => props.setVisible(true);

  const hideDialog = () => props.setVisible(false);

  return (
    <View>
      <Portal>
        <Dialog visible={props.visible} onDismiss={hideDialog}>
          <Dialog.Title>{props.title}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">This is simple dialog</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={props.saveDialog}>Salvar</Button>
            <Button onPress={hideDialog}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogEditInput;
