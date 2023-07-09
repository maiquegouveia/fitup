import { forwardRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text } from 'native-base';
import { Modalize } from 'react-native-modalize';
import { useHeaderHeight } from '@react-navigation/elements';
import Chat from './Chat';

export default forwardRef((props, ref) => {
  const { dish, theme } = props;
  const headerHeight = useHeaderHeight();
  const windowHeight = Dimensions.get('window').height;
  const maxModalizeHeight = windowHeight - headerHeight;

  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.subHeader}>
          <View style={styles.dishNameContainer}>
            <Text style={[styles.dishName, { fontFamily: theme.font.bold }]}>{dish?.name}</Text>
            <Text style={[styles.dishDetailsText, { fontFamily: theme.font.semiBold }]}>{dish?.category?.name}</Text>
          </View>
          <View style={styles.dishDetailsContainer}>
            <Text style={[styles.dishDetailsText, { fontFamily: theme.font.semiBold }]}>
              Qtd. Alimentos: {dish?.dishItems?.length}
            </Text>
            <Text style={[styles.dishDetailsText, { fontFamily: theme.font.semiBold }]}>
              Criado em: {dish?.getCreatedAt()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const ContentHeader = () => {
    return (
      <View style={styles.contentHeader}>
        <Text style={[styles.contentHeaderText, { fontFamily: theme.font.bold }]}>
          Comentários ({dish.dishComments.length})
        </Text>
      </View>
    );
  };

  return (
    <Modalize
      ref={ref}
      snapPoint={maxModalizeHeight / 2}
      modalHeight={maxModalizeHeight}
      avoidKeyboardLikeIOS={true}
      HeaderComponent={Header}
    >
      <ContentHeader />
      <Chat />
    </Modalize>
  );
});

const styles = StyleSheet.create({
  contentHeader: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  contentHeaderText: {
    fontSize: 18,
    color: '#FF7900',
  },
  header: {
    width: '100%',
    backgroundColor: '#FF7900',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  dishName: {
    fontSize: 20,
    color: 'white',
  },
  dishNameContainer: {
    width: '50%',
    padding: 10,
    justifyContent: 'center',
  },
  dishDetailsText: {
    fontSize: 12,
    color: 'white',
  },
  dishDetailsContainer: {
    width: '45%',
    alignItems: 'flex-end',
    padding: 10,
  },
});
