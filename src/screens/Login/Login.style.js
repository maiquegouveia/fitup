import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  esqueceuContainer: {
    marginTop: 5,
    alignItems: 'flex-start',
    width: 250,
  },
  esqueceuText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    fontFamily: 'PoppinsMedium',
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
    backgroundColor: '#FF7900',
    borderRadius: 5,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PoppinsSemiBold',
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 46,
    color: '#FF7900',
    fontFamily: 'PoppinsBold',
  },
});

export default styles;
