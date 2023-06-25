import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Text, NativeBaseProvider } from 'native-base';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import { useContext } from 'react';
import UsersList from './components/UsersList';
import searchUsers from '../../../utilities/SearchUsers/searchUsers';
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
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
    const result = await searchUsers(inputValue);
    if (result?.result) {
      setErrorMessage(result.result.message);
      setShowError(true);
    } else {
      setData(
        result.data.map(
          (user) =>
            new User(
              user.id,
              user.name,
              null,
              null,
              null,
              user.weight,
              null,
              user.username,
              user.type,
              user.profilePicture
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

  return (
    <NativeBaseProvider>
      <View style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.container}></View>
        <TextInput
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
