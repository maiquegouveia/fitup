import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Text } from 'native-base';
import UsersList from './components/UsersList';
import searchUsers from '../../../utilities/SearchUsers/searchUsers';
import { useState, useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import User from '../../../models/User';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SearchUser = ({ theme }) => {
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
    <TouchableWithoutFeedback onPress={handlerBlurInput}>
      <View style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.inputLabelContainer}>
          <Text style={[styles.inputLabel, { fontFamily: theme.font.bold, color: theme.fontColor.text }]}>
            Encontrar Usuários
          </Text>
        </View>
        <TextInput
          ref={inputRef}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
          right={<TextInput.Icon icon={() => <FontAwesome name="search" size={24} color="#FF7900" />} />}
          style={styles.textInput}
          mode="outlined"
          activeOutlineColor="gray"
          placeholder="Digite o nome do usuário"
        />
        {showError && (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error" size={18} color="red" />
            <Text fontSize={12} marginLeft={2} fontFamily={theme.font.semiBold} color="red.600">
              {errorMessage}
            </Text>
          </View>
        )}
        <Button
          loading={isLoading}
          onPress={handlerSearch}
          labelStyle={[styles.btnLabel, { fontFamily: theme.font.semiBold }]}
          style={styles.btn}
        >
          Buscar
        </Button>

        {showList && <UsersList theme={theme} usersList={data} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchUser;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  textInput: {},
  btn: {
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#FF7900',
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 28,
    lineHeight: 35,
  },
  inputLabelContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  btnLabel: {
    color: 'white',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
