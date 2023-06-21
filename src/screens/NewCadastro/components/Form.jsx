import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Text, Button } from 'native-base';
import { TextInput } from 'react-native-paper';
import FormInput from './FormInput';
import FormInputPassword from './FormInputPassword';

const Form = (props) => {
  const {
    finalStage,
    setNameInput,
    setEmailInput,
    codeValue,
    nameValue,
    emailValue,
    passwordValue,
    confPasswordValue,
    setCodeInput,
    setPasswordInput,
    setConfPasswordInput,
    hidePassword,
    handlerShowPassword,
  } = props;

  const handlerChangeCodeText = (text) => {
    const char = text[text.length - 1];
    if (char !== '.' && char !== ',' && char !== ' ' && char !== '-') {
      setCodeInput(text);
    }
  };
  return (
    <View style={styles.container}>
      {finalStage === 1 && (
        <>
          <FormInput
            autoCapitalize="words"
            value={nameValue}
            iconName="account"
            label="Nome Completo"
            placeholder="Ex: Carlos Pedro"
            onChange={(text) => setNameInput(text)}
          />
          <FormInput
            value={emailValue}
            autoCapitalize="none"
            iconName="email"
            styles={{ marginTop: 10 }}
            label="Email"
            placeholder="Ex: meuemail@gmail.com"
            onChange={(text) => setEmailInput(text)}
          />
        </>
      )}
      {finalStage === 2 && (
        <FormInput
          keyboardType="numeric"
          value={codeValue}
          iconName="key"
          label="Código de Verificação"
          placeholder="Ex: 400289"
          onChange={handlerChangeCodeText}
        />
      )}
      {finalStage === 3 && (
        <>
          <FormInputPassword
            value={passwordValue}
            iconName="eye"
            label="Senha"
            placeholder="Senha"
            onChange={(text) => setPasswordInput(text)}
            hidePassword={hidePassword}
          />
          <FormInputPassword
            value={confPasswordValue}
            styles={{ marginTop: 10 }}
            label="Confirmar Senha"
            placeholder="Confirmar Senha"
            onChange={(text) => setConfPasswordInput(text)}
            hidePassword={hidePassword}
          />
          <TouchableOpacity style={{ alignItems: 'flex-start' }} onPress={handlerShowPassword}>
            <Text marginTop={2} fontWeight="semibold">
              {hidePassword ? 'Mostrar senha' : 'Esconder senha'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 5,
  },
});
