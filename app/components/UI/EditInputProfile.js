import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TextInput, Text } from 'react-native-paper';

const EditInputProfile = props => {
  return (
    <View style={{ marginBottom: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{props.label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          onChange={props.onChange}
          secureTextEntry={props?.showText}
          style={{ width: '100%' }}
          mode="outlined"
          value={props.value}
          disabled={false}
          right={
            <TextInput.Icon icon="square-edit-outline" iconColor="black" size={20} disabled={props?.valueChanged} />
          }
        ></TextInput>
      </View>
    </View>
  );
};

export default EditInputProfile;

const styles = StyleSheet.create({});
