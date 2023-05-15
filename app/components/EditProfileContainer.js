import { Text, View } from 'react-native';
import { useState } from 'react';
import EditInputProfile from './UI/EditInputProfile';
import styles from './EditProfileContainer.style';

const EditProfileContainer = props => {
  const [nome, setNome] = useState({
    value: props.userData.nome,
    notChanged: true,
  });
  const [telefone, setTelefone] = useState({
    value: props.userData.telefone,
    notChanged: true,
  });
  const [peso, setPeso] = useState({
    value: props.userData.peso,
    notChanged: true,
  });
  const [altura, setAltura] = useState({
    value: props.userData.altura,
    notChanged: true,
  });
  const [email, setEmail] = useState({
    value: props.userData.email,
    notChanged: true,
  });
  const [senha, setSenha] = useState({
    value: props.userData.senha,
    notChanged: true,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <EditInputProfile
        label="Nome Completo"
        value={nome.value}
        valueChanged={nome.notChanged}
        onChange={text => setNome(text)}
      />
      <EditInputProfile
        label="Telefone"
        value={telefone.value}
        valueChanged={telefone.notChanged}
        onChange={text => setTelefone(text)}
      />
      <EditInputProfile
        label="Peso"
        value={peso.value}
        valueChanged={peso.notChanged}
        onChange={text => setPeso(text)}
      />
      <EditInputProfile
        label="Altura"
        value={altura.value}
        valueChanged={altura.notChanged}
        onChange={text => setAltura(text)}
      />
      <EditInputProfile
        label="Email"
        value={email.value}
        valueChanged={email.notChanged}
        onChange={text => setEmail(text)}
      />
      <EditInputProfile
        label="Senha"
        value={senha.value}
        valueChanged={senha.notChanged}
        showText={true}
        onChange={text => setSenha(text)}
      />
    </View>
  );
};

export default EditProfileContainer;
