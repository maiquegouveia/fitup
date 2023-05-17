import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import EditInputProfile from './UI/EditInputProfile';
import styles from './EditProfileContainer.style';
import ButtonComponent from './UI/ButtonComponent';

const EditProfileContainer = props => {
  const [name, setName] = useState({
    value: props.userData.nome,
    notChanged: true,
  });
  const [phone, setPhone] = useState({
    value: props.userData.telefone,
    notChanged: true,
  });
  const [bodyWeight, setBodyWeight] = useState({
    value: props.userData.peso,
    notChanged: true,
  });
  const [height, setHeight] = useState({
    value: props.userData.altura,
    notChanged: true,
  });
  const [email, setEmail] = useState({
    value: props.userData.email,
    notChanged: true,
  });
  const [password, setPassword] = useState({
    value: props.userData.senha,
    notChanged: true,
  });

  const onChangeNameHandler = text => {
    if (text !== props.userData.nome) {
      setName({
        value: text,
        notChanged: false,
      });
    } else {
      setName({
        value: text,
        notChanged: true,
      });
    }
  };

  const onChangePhoneHandler = text => {
    if (text !== props.userData.telefone) {
      setPhone({
        value: text,
        notChanged: false,
      });
    } else {
      setPhone({
        value: text,
        notChanged: true,
      });
    }
  };

  const onChangeBodyWeightHandler = text => {
    if (text !== props.userData.peso) {
      setBodyWeight({
        value: text,
        notChanged: false,
      });
    } else {
      setBodyWeight({
        value: text,
        notChanged: true,
      });
    }
  };

  const onChangeHeightHandler = text => {
    if (text !== props.userData.altura) {
      setHeight({
        value: text,
        notChanged: false,
      });
    } else {
      setHeight({
        value: text,
        notChanged: true,
      });
    }
  };

  const onChangeEmailHandler = text => {
    if (text !== props.userData.email) {
      setEmail({
        value: text,
        notChanged: false,
      });
    } else {
      setEmail({
        value: text,
        notChanged: true,
      });
    }
  };

  const onChangePasswordHandler = text => {
    if (text !== props.userData.senha) {
      setPassword({
        value: text,
        notChanged: false,
      });
    } else {
      setPassword({
        value: text,
        notChanged: true,
      });
    }
  };

  const onSaveHandler = () => {
    props.setVisibleDialog(true);
    props.onSaveEdit({
      name: name,
      phone: phone,
      bodyWeight: bodyWeight,
      height: height,
      email: email,
      password: password,
    });
  };

  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>
      <View style={styles.container}>
        <EditInputProfile
          label="Nome Completo"
          value={name.value}
          valueChanged={name.notChanged}
          onChange={onChangeNameHandler}
        />
        <EditInputProfile
          keyboardType="numeric"
          label="Telefone"
          value={phone.value}
          valueChanged={phone.notChanged}
          onChange={onChangePhoneHandler}
        />
        <EditInputProfile
          keyboardType="numeric"
          label="Peso"
          value={bodyWeight.value}
          valueChanged={bodyWeight.notChanged}
          onChange={onChangeBodyWeightHandler}
        />
        <EditInputProfile
          keyboardType="numeric"
          label="Altura"
          value={height.value}
          valueChanged={height.notChanged}
          onChange={onChangeHeightHandler}
        />
        <EditInputProfile
          keyboardType="email-address"
          label="Email"
          value={email.value}
          valueChanged={email.notChanged}
          onChange={onChangeEmailHandler}
        />
        <EditInputProfile
          label="Senha"
          value={password.value}
          valueChanged={password.notChanged}
          hideText={true}
          onChange={onChangePasswordHandler}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <ButtonComponent styles={{ marginRight: 20 }} btnText="Salvar" onPress={onSaveHandler} />
          <ButtonComponent btnText="Cancelar" onPress={props.onCancelEdit} />
        </View>
      </View>
    </>
  );
};

export default EditProfileContainer;
