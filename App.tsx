import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import Home from './src/Home';
import Game from './src/Game';
import { store } from './src/state/store';

const theme: typeof DefaultTheme = {
  ...DefaultTheme,
  mode: 'adaptive',
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    background: '#152624',
    text: '#777',
  },
};

const linking = {
  config: {
    screens: {
      Home: 'home',
      Game: 'game',
    },
  },
  prefixes: ['rapscallion://'],
};

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer linking={linking}>
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Game"
            component={Game}
            options={{
              presentation: 'fullScreenModal',
              animation: 'fade',
            }}
          />
        </Stack.Navigator>

        {/* <Game /> */}
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
      </PaperProvider>
    </ReduxProvider>
  </NavigationContainer>
);

export default App;
