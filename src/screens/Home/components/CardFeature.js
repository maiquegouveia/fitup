import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const CardFeature = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity style={styles.cardFeature} activeOpacity={0.8} onPress={props.onPress}>
      <ImageBackground resizeMode="cover" source={props.cardBackground} style={styles.image}>
        <View style={styles.cardInside}>
          <Text style={[styles.title, { fontFamily: theme.font.bold }]}>{props.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CardFeature;

const styles = StyleSheet.create({
  cardFeature: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    borderColor: '#256D1B',
    borderWidth: 3,
    borderRadius: 10,
    margin: 5,
  },
  cardInside: {
    backgroundColor: 'rgba(223, 217, 226, 0.9)',
    paddingHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#0B5563',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
