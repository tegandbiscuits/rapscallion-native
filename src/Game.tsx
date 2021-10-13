import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import useDeck from './decks/useDeck';

export enum GameModes {
  Standard = 'Standard',
}

interface Props {
  mode: keyof typeof GameModes;
}

const Game = ({ mode }: Props) => {
  const { deck, dealt, deal } = useDeck(mode);

  console.log('here is a card', dealt[0], deck[0]);

  return (
    <View>
      <Text>The Game</Text>
      <Button mode="outlined" onPress={() => deal()}>
        Run
      </Button>
    </View>
  );
};

export default Game;
