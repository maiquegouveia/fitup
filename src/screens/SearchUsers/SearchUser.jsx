import { StyleSheet, View, Alert, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Text, NativeBaseProvider } from 'native-base';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import { useContext } from 'react';
import UsersList from './components/UsersList';
import searchUsers from '../../../utilities/SearchUsers/searchUsers';
import { useState, useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import User from '../../../models/User';

const SearchUser = () => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isFocused = useIsFocused();
  const inputRef = useRef(null);

  const resetStates = () => {
    setShowList(false);
    setIsLoading(false);
    setShowError(false);
    setInputValue('');
    setData([]);
  };

  const handlerSearch = async () => {
    setShowList(false);
    setData([]);
    if (inputValue.length === 0) {
      setErrorMessage('Digite um nome de usuário para buscar!');
      setShowError(true);
      return;
    }
    setIsLoading(true);
    const users = await searchUsers(inputValue);
    if (users?.message) {
      setErrorMessage(users.message);
      setShowError(true);
    } else {
      setData(
        users.result.map(
          (user) =>
            new User(
              user.user_id,
              user.name,
              user.email,
              user.password,
              user.height,
              user.weight,
              user.phone,
              user.username,
              user.type,
              user.createdAt,
              user.profile_picture
            )
        )
      );
      setShowList(true);
      setShowError(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isFocused) {
      resetStates();
    }
  }, [isFocused]);

  const handlerBlurInput = () => {
    if (inputRef) {
      inputRef.current.blur();
    }
  };

  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={handlerBlurInput}>
        <View style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
          <View style={styles.container}></View>
          <TextInput
            ref={inputRef}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
            right={<TextInput.Icon icon="account-search" size={24} color="black" />}
            style={styles.textInput}
            mode="outlined"
            activeOutlineColor="gray"
            placeholder="Digite o nome do usuário"
          />
          <Button loading={isLoading} onPress={handlerSearch} textColor="white" style={styles.btn}>
            Buscar
          </Button>
          {showError && (
            <View style={{ alignItems: 'center' }}>
              <Text fontWeight="semibold" marginTop={5} color="red.600">
                {errorMessage}
              </Text>
            </View>
          )}
          {showList && <UsersList usersList={data} />}
        </View>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
};

export default SearchUser;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    marginVertical: 20,
  },
  btn: {
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'green',
  },
});
