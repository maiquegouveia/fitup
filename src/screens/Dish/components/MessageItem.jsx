import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MessageItem = ({ item }) => {
  return (
    <View style={styles.messageContainer}>
      <View style={styles.messageBubble}>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  messageBubble: {
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    padding: 10,
  },
});
