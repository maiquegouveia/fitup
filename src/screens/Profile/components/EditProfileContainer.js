import { Text, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useContext, useEffect } from 'react';
import styles from '../../../components/EditProfileContainer.style';
import AppContext from '../../../../AppContext';
import { ThemeContext } from '../../../../contexts/ThemeProvider';
import Input from './Input';
import { useFormik } from 'formik';
import profileEdit from '../../../../schemas/profileEdit';
import updateUser from '../../../../utilities/Profile/updateUser';

const EditProfileContainer = ({ handleShowContainer, showEditContainer }) => {
  const { userObject, setUserObject } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);

  const showAlert = (title, message) => Alert.alert(title, message);

  const onSubmit = async () => {
    if (isValid) {
      const result = await updateUser({
        ...values,
        id: userObject.id,
      });
      if (result?.code === 409 || result?.code === 500) {
        showAlert('ERRO', result.message);
      } else {
        userObject.name = values.name;
        userObject.email = values.email;
        userObject.phone = values.phone || null;
        userObject.weight = +values.weight || null;
        userObject.height = +values.height || null;
        const updatedUser = userObject.clone();
        setUserObject(updatedUser);
        showAlert('SUCESSO!', 'Dados alterados com sucesso!');
      }
    } else {
      showAlert('ERRO', 'Confira todos os campos e tente novamente!');
      return;
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    isSubmitting,
    isValid,
    resetForm,
  } = useFormik({
    initialValues: {
      email: userObject.email,
      name: userObject.name,
      phone: userObject.phone || '',
      password: '',
      confirmPassword: '',
      weight: userObject.weight.toString() || '',
      height: userObject.height.toString() || '',
    },
    validationSchema: profileEdit,
    onSubmit,
  });

  useEffect(() => {
    resetForm({
      values: {
        email: userObject.email,
        name: userObject.name,
        phone: userObject.phone || '',
        password: '',
        confirmPassword: '',
        weight: userObject.weight.toString() || '',
        height: userObject.height.toString() || '',
      },
    });
  }, [showEditContainer]);

  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.title, { color: theme.fontColor.title, fontFamily: theme.font.bold }]}>Editar Perfil</Text>
      </View>
      <View style={styles.container}>
        <Input
          maxLength={100}
          autoCapitalize="words"
          handleBlur={handleBlur('name')}
          label="Nome Completo *"
          value={values.name}
          handleChange={handleChange('name')}
          error={errors.name && touched.name ? `${errors.name}` : ''}
        />
        <Input
          maxLength={11}
          keyboardType="numeric"
          handleBlur={handleBlur('phone')}
          label="Telefone"
          value={values.phone}
          handleChange={handleChange('phone')}
          error={errors.phone && touched.phone ? `${errors.phone}` : ''}
        />
        <Input
          keyboardType="numeric"
          handleBlur={handleBlur('weight')}
          label="Peso"
          value={values.weight}
          handleChange={handleChange('weight')}
          error={errors.weight && touched.weight ? `${errors.weight}` : ''}
        />
        <Input
          keyboardType="numeric"
          handleBlur={handleBlur('height')}
          label="Altura"
          value={values.height}
          handleChange={handleChange('height')}
          error={errors.height && touched.height ? `${errors.height}` : ''}
        />
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          handleBlur={handleBlur('email')}
          label="Email *"
          value={values.email}
          handleChange={handleChange('email')}
          error={errors.email && touched.email ? `${errors.email}` : ''}
        />
        <Input
          autoCapitalize="none"
          secureTextEntry={true}
          handleBlur={handleBlur('password')}
          label="Senha"
          value={values.password}
          handleChange={handleChange('password')}
          error={errors.password && touched.password ? `${errors.password}` : ''}
        />
        <Input
          autoCapitalize="none"
          secureTextEntry={true}
          handleBlur={handleBlur('confirmPassword')}
          label="Confirmar Senha"
          value={values.confirmPassword}
          handleChange={handleChange('confirmPassword')}
          error={errors.confirmPassword && touched.confirmPassword ? `${errors.confirmPassword}` : ''}
        />
        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          labelStyle={styles.btnText}
          style={styles.btn}
          onPress={handleSubmit}
        >
          Salvar
        </Button>
        <Button labelStyle={styles.btnText} style={styles.btnClose} onPress={handleShowContainer}>
          Fechar
        </Button>
      </View>
    </View>
  );
};

export default EditProfileContainer;
