import { Text, View } from 'react-native';
import { useState, useContext } from 'react';
import EditInputProfile from '../../../components/EditInputProfile';
import styles from '../../../components/EditProfileContainer.style';
import ButtonComponent from '../../../components/ButtonComponent';
import AppContext from '../../../../AppContext';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const EditProfileContainer = (props) => {
  const { params } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.title, { color: theme.fontColor.title }]}>Editar Perfil</Text>
      </View>
      <View style={styles.container}>
        <EditInputProfile
          label="Nome Completo"
          value={params.nome || ''}
          onShowEditModal={props.onShowEditModal}
          fieldName="nome"
          fieldType="string"
        />
        <EditInputProfile
          keyboardType="numeric"
          label="Telefone"
          value={params.telefone || ''}
          onShowEditModal={props.onShowEditModal}
          fieldName="telefone"
          fieldType="string"
        />
        <EditInputProfile
          keyboardType="numeric"
          label="Peso"
          value={params.peso || ''}
          onShowEditModal={props.onShowEditModal}
          fieldName="peso"
          fieldType="numeric"
        />
        <EditInputProfile
          keyboardType="numeric"
          label="Altura"
          value={params.altura || ''}
          onShowEditModal={props.onShowEditModal}
          fieldName="altura"
          fieldType="numeric"
        />
        <EditInputProfile
          keyboardType="email-address"
          label="Email"
          value={params.email}
          onShowEditModal={props.onShowEditModal}
          fieldName="email"
          fieldType="string"
        />
        <EditInputProfile
          label="Senha"
          value={params.senha}
          hideText={true}
          onShowEditModal={props.onShowEditModal}
          fieldName="senha"
          fieldType="string"
        />

        <ButtonComponent btnText="Fechar" onPress={props.onCloseEditHandler} />
      </View>
    </>
  );
};

export default EditProfileContainer;
