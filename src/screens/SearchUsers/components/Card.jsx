import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { ThemeContext } from '../../../../contexts/ThemeProvider';
import { useContext } from 'react';

const Card = ({ title, children, style }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, style, { backgroundColor: theme.profile.card.backgroundColor }]}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderColor: theme.profile.card.fontColor,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.profile.card.fontColor }}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
});
