import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {screens} from './configs/routes.config';
import AuthProvider from './providers/auth.provider';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="home"
          screenOptions={{
            header: () => <SafeAreaView />,
          }}>
          {screens.map(screen => (
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
    </AuthProvider>
  );
};

export default App;