import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(29, 29, 41, 0.5)',
  },
  image: {
    flex: 1,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#FFFFFF',
    width: '60%',
    borderRadius: 5,
  },
  btnLabel: {
    color: 'rgba(29, 29, 41, 0.6)',
    fontSize: 18,
    fontFamily: 'DMBold',
  },
});
