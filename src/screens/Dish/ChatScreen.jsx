import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import MessageItem from './components/MessageItem';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);
  const { dish } = route.params;

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { id: messages.length.toString(), text: inputText };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
      scrollFlatListToEnd();
    }
  };

  const scrollFlatListToEnd = () => {
    if (messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
    >
      <TouchableOpacity style={{ padding: 5 }}>
        <Ionicons name="caret-back" size={40} color="black" />
      </TouchableOpacity>
      <View style={styles.dishInformationContainer}>
        <View style={styles.dishTitleContainer}>
          <Text style={styles.dishTitle}>{dish.name}</Text>
          <Text style={styles.dishCategory}>{dish.category.name}</Text>
          <View style={styles.dishNutrientsContainer}>
            <Text style={styles.dishNutrientText}>Calorias: {dish.kcal}g</Text>
            <Text style={styles.dishNutrientText}>Carboidratos: {dish.carbohydrates}g</Text>
            <Text style={styles.dishNutrientText}>Proteínas: {dish.protein}g</Text>
          </View>
        </View>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={scrollFlatListToEnd}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite um comentário..."
          multiline
        />
        <TouchableOpacity style={styles.sendBtnContainer} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dishInformationContainer: {
    padding: 10,
  },
  dishTitle: {
    fontSize: 32,
    fontWeight: '600',
  },
  dishTitleContainer: {
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
    width: '100%',
    padding: 10,
  },
  dishNutrientsContainer: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  dishNutrientText: {
    color: 'white',
  },
  dishCategory: {
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
  messageList: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  sendBtnContainer: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default ChatScreen;
