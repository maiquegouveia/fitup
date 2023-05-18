import * as React from "react";
import { Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import styles from "../styles/Dialog.style";

export default ({ visible, title, content, hideDialog }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          <Text style={styles.dialogTitle}>{title}</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogContent}>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Fechar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
