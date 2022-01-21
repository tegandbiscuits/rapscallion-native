import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Headline, useTheme, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Knot from './icons/Knot';
import { shuffleDeck } from './state/gameSlice';
import Decks from './decks/decks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  mainContent: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 30,
  },
});

const App = () => {
  const theme = useTheme();
  // const [gameMode, setGameMode] = useState<GameModes | null>(null);
  // const inGame = !!gameMode;
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const startGame = () => {
    dispatch(shuffleDeck(Decks.Standard));
    navigation.navigate('Game');
    // setGameMode(GameModes.Standard);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Headline style={[styles.title, { color: theme.colors.primary }]}>
        rapscallion
      </Headline>

      <View style={styles.mainContent}>
        <Knot width={150} height={150} />
        <Button mode="outlined" onPress={startGame}>
          Standard
        </Button>
      </View>
    </View>
  );
};

export default App;
