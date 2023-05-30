import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingVertical: 30,
    flexDirection: 'row',
    backgroundColor: 'red',
    width: '100%',
    height: 200,
  },
  profileImageContainer: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginTop: 22,
    marginLeft: 22,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
});
