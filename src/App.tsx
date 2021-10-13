import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Headline, useTheme } from 'react-native-paper';
import MainMenu from './MainMenu';
import Game, { GameModes } from './Game';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 30,
  },
});

export default function App() {
  const theme = useTheme();
  const [gameMode, setGameMode] = useState<GameModes | null>(null);
  const inGame = !!gameMode;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Headline style={[styles.title, { color: theme.colors.primary }]}>
        rapscallion
      </Headline>

      {!inGame && (
        <MainMenu onGameStart={() => setGameMode(GameModes.Standard)} />
      )}

      {inGame && <Game mode={gameMode} />}
    </View>
  );
}
