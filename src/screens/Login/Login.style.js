import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: 315,
    height: 336,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  esqueceuContainer: {
    marginTop: 5,
    marginBottom: 30,
    alignItems: 'flex-start',
    width: 250,
  },
  esqueceuText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
  },
  input: {
    width: 250,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomEndRadius: 5,
  },
  btn: {
    width: 250,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 5,
  },
  btnText: {
    color: 'rgba(29, 29, 41, 0.6)',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
