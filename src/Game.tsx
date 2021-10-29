import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import PlayCard from './decks/PlayCard';
import useDeck from './decks/useDeck';
import { addHealth } from './state/playerSlice';
import { RootState } from './state/store';

export enum GameModes {
  Standard = 'Standard',
}

interface Props {
  mode: keyof typeof GameModes;
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  progress: {
    textAlign: 'center',
    marginBottom: 10,
  },
  roomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  roomAction: {
    width: '49%',
  },
  stats: {
    alignItems: 'center',
    marginBottom: 16,
  },
});

const Game = ({ mode }: Props) => {
  const theme = useTheme();
  const { dealt, deal } = useDeck(mode);
  const {
    progress,
    hp,
    shield,
    shieldRank,
    xp,
    potionSickness,
  } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  const handleCardPress = (hpChange: number) => {
    dispatch(addHealth(hpChange));
  };

  return (
    <View>
      <View>
        <Text style={styles.progress}>
          Progress: {progress}
        </Text>

        <View style={styles.roomActions}>
          <Button mode="outlined" disabled style={styles.roomAction}>
            Next Room
          </Button>

          <Button mode="outlined" onPress={() => deal()} style={styles.roomAction}>
            Run
          </Button>
        </View>

        <View style={styles.stats}>
          <Text style={{ color: theme.colors.primary }}>
            HP: {hp} • Shield: {shield}/{shieldRank}
          </Text>
          <Text>
            XP: {xp} • Potions sickness: {potionSickness}
          </Text>
        </View>

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
          );
        })}
      </View>
    </View>
  );
};

export default Game;
