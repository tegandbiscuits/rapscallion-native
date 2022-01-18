import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Headline, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import MainMenu from './MainMenu';
import Game, { GameModes } from './Game';
import { shuffleDeck } from './state/gameSlice';
import Decks from './decks/decks';

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

const App = () => {
  const theme = useTheme();
  const [gameMode, setGameMode] = useState<GameModes | null>(null);
  const inGame = !!gameMode;
  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(shuffleDeck(Decks.Standard));
    setGameMode(GameModes.Standard);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Headline style={[styles.title, { color: theme.colors.primary }]}>
        rapscallion
      </Headline>

      {!inGame && (
        <MainMenu onGameStart={startGame} />
      )}

      {(inGame && gameMode != null) && <Game />}
    </View>
  );
};

export default App;
