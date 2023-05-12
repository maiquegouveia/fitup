import { Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { leftArrow } from '../../../constants/icons';
import Form from '../../components/UI/Form';
import Input from '../../components/UI/Input';
import { Button, RadioButton, Provider } from 'react-native-paper';
import ProfileImage from '../../components/UI/ProfileImage';
import isValidEmail from '../../../utilities/isValidEmail';
import postImage from '../../../utilities/postImage';
import postUserFirebase from '../../../utilities/postUserFirebase';
import Dialog from '../../components/UI/Dialog';
import styles from './Cadastro.style';

const Cadastro = () => {
  const router = useRouter();
  const [termoStatus, setTermoStatus] = useState('unchecked');

  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState({
    title: '',
    content: '',
  });
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const termoStatusHandler = function () {
    if (termoStatus === 'unchecked') setTermoStatus('checked');
    else setTermoStatus('unchecked');
  };

  const [email, setEmail] = useState({
    value: '',
    isValid: false,
  });

  const [senha, setSenha] = useState({
    value: '',
    isValid: false,
  });

  const [confSenha, setConfSenha] = useState({
    value: '',
    isValid: false,
  });

  const [image, setImage] = useState({
    uri: 'https://i.ibb.co/tJBC4C4/default-profile.png',
    base64: '',
  });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    /// Este useEffect será executado toda vez que "email.value" sofrer alteração
    /// Define se "email.value" é uma valor válido
    if (isValidEmail(email.value)) {
      setEmail(prev => {
        return {
          ...prev,
          isValid: true,
        };
      });
    } else {
      setEmail(prev => {
        return {
          ...prev,
          isValid: false,
        };
      });
    }
  }, [email.value]);

  useEffect(() => {
    /// Este useEffect será executado toda vez que "senha.value" sofrer alteração
    /// Define se "senha.value" é uma valor válido
    if (senha.value.length > 8) {
      setSenha(prev => {
        return {
          ...prev,
          isValid: true,
        };
      });
    } else {
      setSenha(prev => {
        return {
          ...prev,
          isValid: false,
        };
      });
    }
  }, [senha.value]);

  useEffect(() => {
    /// Este useEffect será executado toda vez que "confSenha.value" sofrer alteração
    /// Define se "confSenha.value" é uma valor válido
    if (confSenha.value === senha.value) {
      setConfSenha(prev => {
        return {
          ...prev,
          isValid: true,
        };
      });
    } else {
      setConfSenha(prev => {
        return {
          ...prev,
          isValid: false,
        };
      });
    }
  }, [confSenha.value]);

  useEffect(() => {
    /// Este useEffect será executado toda vez que "email.isValid","senha.isValid","confSenha.isValid" ou "termoStatus" sofrer alteração
    /// Define se o formulário é válido
    setFormIsValid(email.isValid && senha.isValid && confSenha.isValid && termoStatus === 'checked');
  }, [email.isValid, senha.isValid, confSenha.isValid, termoStatus]);

  const onChangeEmailHandler = function (text) {
    setEmail(prev => {
      return {
        ...prev,
        value: text,
      };
    });
  };

  const onChangeSenhaHandler = function (text) {
    setSenha(prev => {
      return {
        ...prev,
        value: text,
      };
    });
  };

  const onChangeConfSenhaHandler = function (text) {
    setConfSenha(prev => {
      return {
        ...prev,
        value: text,
      };
    });
  };

  //Botão de registro
  const registerBtnHandler = async function () {
    if (formIsValid) {
      const profileImageURL = await postImage(image.base64);
      const imageUrl = profileImageURL.replace('https://i.ibb.co/', '');

      await postUserFirebase({
        email: email.value,
        senha: senha.value,
        profileImage: imageUrl,
      });
      router.replace('/tabs/LoginScreen/Login');
    } else {
      if (email.isValid === false && senha.isValid === false && confSenha.isValid === false) {
        setDialog({
          title: 'Campos inválidos!',
          content:
            'Digite um email válido, uma senha maior que 8 digitos, repita senha para confirmação e aceite os termos e condições de uso.',
        });
      } else if (!email.isValid) {
        setDialog({
          title: 'Email inválido!',
          content: 'Digite um email válido para fazer o cadastro.',
        });
      } else if (!senha.isValid) {
        setDialog({
          title: 'Senha inválida!',
          content: 'A senha deve ser maior que 8 digitos.',
        });
      } else if (!confSenha.isValid) {
        setDialog({
          title: 'Confirmação de senha inválida!',
          content: 'A confirmação de senha deve ser igual a senha digitada anteriormente.',
        });
      } else {
        setDialog({
          title: 'Aceitação de Termos & Condições!',
          content: 'Você precisa concordar com os temos e condições de uso para criar uma conta.',
        });
      }
      showDialog();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerBackImageSource: leftArrow,
          headerTintColor: 'rgba(81, 242, 5, 1)',
        }}
      />
      <Provider>
        <Dialog visible={visible} title={dialog.title} content={dialog.content} hideDialog={hideDialog} />
        <ProfileImage image={image} setImage={setImage} />

        <Form style={{ backgroundColor: '#ccc' }}>
          <Input label="Email" state={email.value} icon="email" onChangeTextHandler={onChangeEmailHandler} />
          <Input
            label="Senha"
            state={senha.value}
            icon="key"
            onChangeTextHandler={onChangeSenhaHandler}
            secureTextEntry={true}
          />
          <Input
            label="Confirmação de Senha"
            state={confSenha.value}
            icon="lock"
            onChangeTextHandler={onChangeConfSenhaHandler}
            secureTextEntry={true}
          />
          <View style={styles.radioContainer}>
            <RadioButton status={termoStatus} onPress={termoStatusHandler} color="#0094E6" />
            <Text style={styles.termoText}>Eu concordo com os Termos & Condições</Text>
          </View>

          <Button style={styles.btn} labelStyle={styles.btnText} onPress={registerBtnHandler}>
            Registrar
          </Button>
        </Form>
      </Provider>
    </SafeAreaView>
  );
};

export default Cadastro;
