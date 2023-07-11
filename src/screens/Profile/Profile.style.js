import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    height: 300,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
  },
  statsWaterContainer: {
    width: '40%',
    alignItems: 'center',
  },
  statsWaterController: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 24,
    flexWrap: 'wrap',
  },
  usernameText: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  btn: {
    width: '40%',
    borderRadius: 5,
    backgroundColor: '#262626',
  },
  btnText: {
    fontSize: 16,
    color: 'white',
  },
});
