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
    borderWidth: 1,
    borderColor: 'black',
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'white',
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
    fontSize: 20,
    flexWrap: 'wrap',
  },
  dishesContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  waterContainer: {
    width: '50%',
  },
  subWaterContainer: {
    width: '50%',
    justifyContent: 'center',
  },
  subWaterContainerTitle: {
    fontSize: 24,
    lineHeight: 30,
  },
});
