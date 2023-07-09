import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import MessageItem from '../components/MessageItem';

const Chat = ({ data }) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <MessageItem item={{ text: 'Teste mensagem', createdAt: '01/11/2002', name: 'Maique Gouveia' }} />
        <MessageItem item={{ text: 'Teste mensagem', createdAt: '01/11/2002', name: 'Victor Menezes' }} />
        <MessageItem
          item={{
            text:
              'Teste mensagemTeste mensagemTeste e mensagemTeste mensagemTeste mensagemTeste mensagemTeste mensagemTeste mensagemTeste mensagemTeste e mensagemTeste mensagemTeste mensagemTeste mensagemTeste mensagemTeste mensagemTeste mensagemTeste e mensagemTeste mensagemTeste mensagemTeste mensagemTeste mensagemTeste mensagemTeste mensagemTeste e mensagemTeste mensagemTeste mensagemTeste mensagemTeste mensagem',
            createdAt: '01/11/2002',
            name: 'Pedro Henrique',
          }}
        />
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
