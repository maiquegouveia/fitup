import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

export default ({ visible, title, content, hideDialog, onDeleteFoodHandler }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
        <Dialog.Title>
          <Text style={styles.dialogTitle}>{title}</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogContent}>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableOpacity activeOpacity={0.8} style={styles.deleteBtn} onPress={onDeleteFoodHandler}>
            <Text style={styles.textBtn}>Deletar</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.cancelBtn} onPress={hideDialog}>
            <Text style={styles.textBtn}>Cancelar</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  dialogTitle: {
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
  },
  cancelBtn: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
  },
  textBtn: {
    color: 'white',
    fontWeight: 'bold',
  },
});
