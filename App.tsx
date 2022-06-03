import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/Home';
import Game from './src/Game';
import { store } from './src/state/store';

const fontConfig: Parameters<typeof configureFonts>[0] = {
  web: {
    regular: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
    medium: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
    light: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
    thin: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
  },
  ios: {
    regular: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
    medium: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
    light: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
    thin: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
  },
  android: {
    regular: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
    medium: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
    light: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
    thin: { fontFamily: 'Simonetta-Regular', fontWeight: 'normal' },
  },
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    interface ThemeColors {
      consumable: string;
      fightable: string;
    }
  }
}

const theme = {
  ...DefaultTheme,
  mode: 'adaptive',
  dark: true,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    background: '#152624',
    text: '#777',
    consumable: '#ba123a',
    fightable: '#000000',
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
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Home"
              component={Home}
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
        </SafeAreaProvider>

        {/* <Game /> */}
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
      </PaperProvider>
    </ReduxProvider>
  </NavigationContainer>
);

export default App;
