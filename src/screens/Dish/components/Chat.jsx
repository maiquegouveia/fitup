import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import MessageItem from '../components/MessageItem';

const Chat = ({ data }) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyle}>
        {data.map((item, index) => (
          <MessageItem key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainContainer: {
    maxHeight: '100%',
  },
  scrollStyle: {
    padding: 10,
  },
});
