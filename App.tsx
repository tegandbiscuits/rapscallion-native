import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Game from './src/App';

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
    <PaperProvider theme={theme}>
      <Game />
    </PaperProvider>
  );
}
