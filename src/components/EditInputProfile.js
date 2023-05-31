import { StyleSheet, View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { EditProfileContext } from '../../EditProfileContext';
import { useContext } from 'react';

const EditInputProfile = (props) => {
  const { setModalContent } = useContext(EditProfileContext);

  const onPress = () => {
    setModalContent({
      keyboardType: props?.keyboardType,
      inputLabel: props?.label,
      value: props?.value,
      field: {
        name: props?.fieldName,
        type: props?.fieldType,
      },
    });
    props.onShowEditModal();
  };

  return (
    <View style={{ marginBottom: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{props?.label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          disabled={true}
          keyboardType={props?.keyboardType}
          secureTextEntry={props?.hideText}
          style={{ width: '100%' }}
          mode="outlined"
          value={`${props?.value}`}
          right={<TextInput.Icon icon="square-edit-outline" iconColor="black" size={20} onPress={onPress} />}
        ></TextInput>
      </View>
    </View>
  );
};

export default EditInputProfile;

const styles = StyleSheet.create({});
