import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import Game from './src/App';
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

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <Game />
        <StatusBar style="light" />
      </PaperProvider>
    </ReduxProvider>
  );
}
