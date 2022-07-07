import React from 'react';
import { StyleSheet } from 'react-native';
import {
  useTheme,
  Modal,
  Headline,
  Button,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Decks from './decks/decks';
import { dealGame } from './state/gameSlice';

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
  },
  textStyles: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

interface Props {
  visible: boolean;
}

const GameOverModal = ({ visible }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const startNewGame = () => {
    dispatch(dealGame({ deck: Decks.Standard, shuffle: true }));
  };

  return (
    <Modal
      visible={visible}
      dismissable={false}
      contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}
    >
      <Headline style={[styles.textStyles, { color: theme.colors.fightable }]}>
        You are dead.
      </Headline>
      <Button mode="contained" color={theme.colors.accent} onPress={startNewGame}>
        New Game
      </Button>
    </Modal>
  );
};

export default GameOverModal;
