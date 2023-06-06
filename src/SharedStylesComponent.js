import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import AppContext from '../AppContext';

const SharedStylesComponent = () => {
  const { styleMode, setStyleMode } = useContext(AppContext);

  const styles = StyleSheet.create({
    themeBackground: {
      backgroundColor: styleMode === 'white' ? 'white' : 'green',
    },
  });

  return styles;
};

export default SharedStylesComponent;
