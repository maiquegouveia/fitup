import { StyleSheet, View, FlatList } from 'react-native';
import UserItem from './UserItem';
import { Text } from 'native-base';

const UsersList = ({ usersList, theme }) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text color="white" fontFamily={theme.font.bold} fontSize={18}>
          {usersList.length > 1 ? `Resultados (${usersList.length})` : `Resultado (${usersList.length})`}
        </Text>
      </View>
      <FlatList
        data={usersList}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <UserItem user={item} style={{ marginBottom: index === usersList.length - 1 ? 0 : 10 }} />
        )}
      />
    </View>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF7900',
    maxHeight: 500,
    minHeight: 300,
    padding: 10,
    marginTop: 30,
    borderRadius: 5,
  },
});
