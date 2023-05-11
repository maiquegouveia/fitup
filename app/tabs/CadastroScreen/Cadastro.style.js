import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 100,
    marginTop: 30,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  onFocusStyle: {
    borderWidth: 2,
    borderColor: 'rgba(81, 242, 5, 1)',
  },
  nextBtn: {
    borderRadius: 100,
    backgroundColor: 'rgba(81, 242, 5, 1)',
    padding: 5,
  },
  radioContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  termoText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  btn: {
    width: 250,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 10,
  },
  btnText: {
    color: 'rgba(29, 29, 41, 0.6)',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
