import { Text, View } from 'react-native';
import { useState, useContext } from 'react';
import EditInputProfile from '../../../components/EditInputProfile';
import styles from '../../../components/EditProfileContainer.style';
import ButtonComponent from '../../../components/ButtonComponent';
import AppContext from '../../../../AppContext';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const EditProfileContainer = (props) => {
  const { userObject } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.title, { color: theme.fontColor.title }]}>Editar Perfil</Text>
      </View>
      <View style={styles.container}>
        <EditInputProfile
          label="Nome Completo"
          value={userObject.name || ''}
          onShowEditModal={props.onShowEditModal}
          fieldName="nome"
          fieldUserObject="name"
          fieldType="string"
        />
        <EditInputProfile
          keyboardType="numeric"
          label="Telefone"
          value={userObject.phone || ''}
          onShowEditModal={props.onShowEditModal}
          fieldName="telefone"
          fieldUserObject="phone"
          fieldType="string"
        />
        <EditInputProfile
          keyboardType="numeric"
          label="Peso"
          value={userObject.weight || ''}
          onShowEditModal={props.onShowEditModal}
          fieldName="peso"
          fieldUserObject="weight"
          fieldType="numeric"
        />
        <EditInputProfile
          keyboardType="numeric"
          label="Altura"
          value={userObject.height || ''}
          onShowEditModal={props.onShowEditModal}
          fieldName="altura"
          fieldUserObject="height"
          fieldType="numeric"
        />
        <EditInputProfile
          keyboardType="email-address"
          label="Email"
          value={userObject.email}
          onShowEditModal={props.onShowEditModal}
          fieldName="email"
          fieldUserObject="email"
          fieldType="string"
        />
        <EditInputProfile
          label="Senha"
          value={userObject.password}
          hideText={true}
          onShowEditModal={props.onShowEditModal}
          fieldName="senha"
          fieldUserObject="password"
          fieldType="string"
        />

        <ButtonComponent btnText="Fechar" onPress={props.onCloseEditHandler} />
      </View>
    </>
  );
};

export default EditProfileContainer;
