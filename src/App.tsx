import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {privateScreens, publicScreens} from './configs/routes.config';
import {useAuthContext} from './contexts/auth.context';

const Tab = createBottomTabNavigator();
const App = () => {
  const {user} = useAuthContext();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={user ? 'Home' : 'Login'}
        screenOptions={{
          header: () => <SafeAreaView />,
        }}>
        {/* {[...privateScreens, ...publicScreens].map(screen => (
            <Tab.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
              options={{
                tabBarIcon: screen.icon,
              }}
            />
          ))} */}
        {!user
          ? publicScreens.map(screen => (
              <Tab.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                options={{
                  tabBarIcon: screen.icon,
                }}
              />
            ))
          : privateScreens.map(screen => (
              <Tab.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                options={{
                  tabBarIcon: screen.icon,
                }}
              />
            ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
