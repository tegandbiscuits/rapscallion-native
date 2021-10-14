import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Card from './decks/Card';
import useDeck from './decks/useDeck';

export enum GameModes {
  Standard = 'Standard',
}

interface Props {
  mode: keyof typeof GameModes;
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
  },
});

const Game = ({ mode }: Props) => {
  const { deck, dealt, deal } = useDeck(mode);

  console.log('here is a card', dealt[0], deck[0]);

  return (
    <View>
      <View>
        <Text>The Game</Text>
        <Button mode="outlined" onPress={() => deal()}>
          Run
        </Button>
      </View>

      <View style={styles.cardContainer}>
        {dealt.map((card) => {
          if (!card) {
            return null;
          }

          return (
            <Card
              key={`${card.number}-${card.suite}`}
              onPress={() => { console.log('activated a card') }}
              suite={card.suite}
              number={card.number}
            />
          )
        })}
      </View>
    </View>
  );
};

export default Game;
