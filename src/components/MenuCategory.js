import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Menu, Divider } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Menu
        anchorPosition="bottom"
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <FontAwesome5 name="filter" size={20} color="white" style={{ marginLeft: 20 }} />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </View>
  );
};

export default MyComponent;
