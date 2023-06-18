import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import AppContext from './AppContext';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './contexts/ThemeProvider';

export default function DrawerContent() {
  const { userObject, activeScreen, setActiveScreen } = useContext(AppContext);
  const { theme, isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  const onNavigate = (screen) => {
    setActiveScreen(screen);
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView contentContainerStyle={{ backgroundColor: theme.drawer.backgroundColor, flex: 1 }}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: `https://i.ibb.co/${userObject.profilePicture}`,
            }}
            size={100}
          />
          <Title style={[styles.title, { color: theme.drawer.fontColor }]}>{userObject.name}</Title>
          <Caption style={[styles.caption, { color: theme.drawer.fontColor }]}>@{userObject.name}</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption, { color: theme.drawer.fontColor }]}>
                {userObject.favoriteFoods.length}
              </Paragraph>
              <Caption style={[styles.caption, { color: theme.drawer.fontColor }]}>Alimentos Favoritos</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption, { color: theme.drawer.fontColor }]}>
                {userObject.dishes.length}
              </Paragraph>
              <Caption style={[styles.caption, { color: theme.drawer.fontColor }]}>Pratos</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <Drawer.Item
            active={activeScreen === 'Home'}
            theme={{
              colors: {
                onSecondaryContainer: theme.drawer.itemActive.fontColor,
                secondaryContainer: theme.drawer.itemActive.backgroundColor,
                onSurfaceVariant: theme.drawer.itemInactive.fontColor,
              },
            }}
            icon={({ size }) => <MaterialCommunityIcons name="home" color={theme.drawer.iconColor} size={size} />}
            label="Home"
            onPress={() => onNavigate('Home')}
            style={[styles.drawerItem]}
          />
          <Drawer.Item
            active={activeScreen === 'Profile'}
            theme={{
              colors: {
                onSecondaryContainer: theme.drawer.itemActive.fontColor,
                secondaryContainer: theme.drawer.itemActive.backgroundColor,
                onSurfaceVariant: theme.drawer.itemInactive.fontColor,
              },
            }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="account-outline" color={theme.drawer.iconColor} size={size} />
            )}
            label="Perfil"
            onPress={() => onNavigate('Profile')}
            style={[styles.drawerItem]}
          />
          <Drawer.Item
            active={activeScreen === 'SearchFood'}
            theme={{
              colors: {
                onSecondaryContainer: theme.drawer.itemActive.fontColor,
                secondaryContainer: theme.drawer.itemActive.backgroundColor,
                onSurfaceVariant: theme.drawer.itemInactive.fontColor,
              },
            }}
            icon={({ color, size }) => <Feather name="search" color={theme.drawer.iconColor} size={size} />}
            label="Buscar Alimentos"
            onPress={() => onNavigate('SearchFood')}
            style={[styles.drawerItem]}
          />
          <Drawer.Item
            active={activeScreen === 'FavoriteFoods'}
            theme={{
              colors: {
                onSecondaryContainer: theme.drawer.itemActive.fontColor,
                secondaryContainer: theme.drawer.itemActive.backgroundColor,
                onSurfaceVariant: theme.drawer.itemInactive.fontColor,
              },
            }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="food" color={theme.drawer.iconColor} size={size} />
            )}
            label="Alimentos Favoritos"
            onPress={() => onNavigate('FavoriteFoods')}
            style={[styles.drawerItem]}
          />
          <Drawer.Item
            active={activeScreen === 'FavoriteDishes'}
            theme={{
              colors: {
                onSecondaryContainer: theme.drawer.itemActive.fontColor,
                secondaryContainer: theme.drawer.itemActive.backgroundColor,
                onSurfaceVariant: theme.drawer.itemInactive.fontColor,
              },
            }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="food-fork-drink" color={theme.drawer.iconColor} size={size} />
            )}
            label="Pratos Favoritos"
            onPress={() => onNavigate('FavoriteDishes')}
            style={[styles.drawerItem]}
          />
          <Drawer.Item
            active={activeScreen === 'WaterAmount'}
            theme={{
              colors: {
                onSecondaryContainer: theme.drawer.itemActive.fontColor,
                secondaryContainer: theme.drawer.itemActive.backgroundColor,
                onSurfaceVariant: theme.drawer.itemInactive.fontColor,
              },
            }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="cup-water" color={theme.drawer.iconColor} size={size} />
            )}
            label="Água Diária"
            onPress={() => onNavigate('WaterAmount')}
            style={[styles.drawerItem]}
          />
          <Drawer.Item
            active={activeScreen === 'Settings'}
            theme={{
              colors: {
                onSecondaryContainer: theme.drawer.itemActive.fontColor,
                secondaryContainer: theme.drawer.itemActive.backgroundColor,
                onSurfaceVariant: theme.drawer.itemInactive.fontColor,
              },
            }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={theme.drawer.iconColor} size={size} />
            )}
            label="Configurações"
            onPress={() => onNavigate('Settings')}
            style={[styles.drawerItem]}
          />
        </Drawer.Section>
        <Drawer.Section
          title="Preferências"
          showDivider={false}
          theme={{ colors: { onSurfaceVariant: theme.drawer.fontColor } }}
        >
          <TouchableRipple onPress={() => setIsDarkMode((prev) => !prev)}>
            <View style={styles.preference}>
              <Text style={{ color: theme.drawer.fontColor, fontWeight: 'bold' }}>Dark Mode</Text>
              <View pointerEvents="none">
                <Switch value={isDarkMode} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    borderRadius: 5,
    height: 50,
  },
  userInfoSection: {
    marginTop: 20,
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
});
