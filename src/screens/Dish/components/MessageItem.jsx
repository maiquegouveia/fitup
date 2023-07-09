import { StyleSheet, View, Image } from 'react-native';
import { useContext } from 'react';
import { Text } from 'native-base';
import { ThemeContext } from '../../../../contexts/ThemeProvider';
import timestampToDateTime from '../../../../utilities/timestampToDateTime';

const MessageItem = ({ item, user, createdAt }) => {
  const { theme } = useContext(ThemeContext);

  const renderWrappedText = (text) => {
    return Array.from(text).map((char, index) => (
      <View key={index}>
        <Text fontFamily={theme.font.regular}>{char}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.messageContainer}>
      <View style={styles.imageContainer}>
        <Image style={{ width: 30, height: 30 }} resizeMode="contain" source={{ uri: item.user.profilePicture }} />
      </View>
      <View style={styles.triangleMessage}></View>
      <View style={styles.messageBubble}>
        <View style={styles.userName}>
          <Text fontFamily={theme.font.bold}>{item.user.name}</Text>
        </View>
        <Text lineBreakMode="head">{renderWrappedText(item.text)}</Text>
        <View style={styles.dateContainer}>
          <Text fontSize={12} fontFamily={theme.font.semiBold}>
            {timestampToDateTime(item.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default MessageItem;

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
    flexDirection: 'row',
    width: '100%',
  },
  messageBubble: {
    backgroundColor: '#ccc',
    padding: 10,
    maxWidth: '80%',
    borderRadius: 12,
    borderTopLeftRadius: 0,
  },
  imageContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#ccc',
  },
  dateContainer: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
  userName: {
    alignItems: 'flex-start',
  },
  triangleMessage: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderTopWidth: 10,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderStartColor: 'transparent',
    // transform: [{ rotate: '180deg' }],
  },
});
