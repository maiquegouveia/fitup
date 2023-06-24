import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from 'native-base';
import { Avatar } from 'react-native-paper';

const UserItem = ({ name, username, profilePicture, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, style]}>
      <View>
        <Avatar.Image style={{ marginRight: 10 }} size={44} source={{ uri: profilePicture }} />
      </View>
      <View style={{ maxWidth: '86%' }}>
        <Text fontSize={18} fontWeight="bold">
          {name}
        </Text>
        <Text fontSize={14} fontWeight="semibold" marginTop={0}>
          {username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
