import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    width: '100%',
    alignItems: 'center',
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
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 50,
  },
  statsWaterContainer: {
    width: '50%',
    alignItems: 'center',
  },
  statsWaterController: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 10,
  },
});
