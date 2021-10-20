import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import PlayCard from './decks/PlayCard';
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

type UseHealth = () => { hp: number, addHealth: (hpChange: number) => void };
const useHealth: UseHealth = () => {
  const [hp, setHp] = useState<number>(21);

  const addHealth = useCallback((hpChange: number) => {
    const desiredHp = hp + hpChange;
    let newHp = desiredHp;

    if (desiredHp > 21) {
      newHp = 21;
    } else if (desiredHp < 0) {
      newHp = 0;
    }

    setHp(newHp);
  }, [hp, setHp]);

  return {
    hp,
    addHealth,
  };
};

const Game = ({ mode }: Props) => {
  const theme = useTheme();
  const { dealt, deal } = useDeck(mode);
  const { hp, addHealth } = useHealth();

  const handleCardPress = (hpChange: number) => {
    console.log('pressed a card');
    addHealth(hpChange);
  };

  return (
    <View>
      <View>
        <Text>The Game</Text>
        <Button mode="outlined" onPress={() => deal()}>
          Run
        </Button>

        <Text style={{ color: theme.colors.primary }}>
          HP: {hp}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {dealt.map((card) => {
          if (!card) {
            return null;
          }

          return (
            <PlayCard
              key={`${card.rank}-${card.suit}`}
              onPress={handleCardPress}
              suit={card.suit}
              rank={card.rank}
            />
          )
        })}
      </View>
    </View>
  );
};

export default Game;
