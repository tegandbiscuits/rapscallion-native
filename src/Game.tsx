import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import PlayCard, { IPlayCard } from './decks/PlayCard';
import { dealRoom, playCard, addHealth, shuffleDeck, dealGame } from './state/gameSlice';
import { RootState } from './state/store';

export enum GameModes {
  Standard = 'Standard',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
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

const Game = () => {
  const theme = useTheme();
  const {
    room,
    justRan,
    progress,
    hp,
    shield,
    shieldRank,
    xp,
    potionSickness,
  } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const cardsPlayedCount = room.reduce((count, card) => {
    if (card?.played) {
      return count + 1;
    }

    return count;
  }, 0);

  const { params } = useRoute<RouteProp<{ params: { deck?: string } }>>();

  useEffect(() => {
    if (!params?.deck) {
      return;
    }

    const parsedDeck = JSON.parse(params.deck);
    dispatch(dealGame({ deck: parsedDeck, shuffle: false }));
  }, [params, dispatch]);

  const handleCardPress = (event: { hpChange: number, card: IPlayCard }) => {
    dispatch(playCard(event.card));
    dispatch(addHealth(event.hpChange));
  };

  const unableToRun = justRan || cardsPlayedCount !== 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View>
        <Text style={styles.progress}>
          {/* eslint-disable react/jsx-one-expression-per-line */}
          Progress: {progress}
        </Text>

        <View style={styles.roomActions}>
          <Button
            mode="outlined"
            disabled={cardsPlayedCount < 3}
            style={styles.roomAction}
            onPress={() => dispatch(dealRoom({ didRun: false }))}
          >
            Next Room
          </Button>

          <Button
            mode="outlined"
            disabled={unableToRun}
            onPress={() => dispatch(dealRoom({ didRun: true }))}
            style={styles.roomAction}
          >
            Run
          </Button>
        </View>

        <View style={styles.stats}>
          <Text style={{ color: theme.colors.primary }}>HP: {hp}</Text>

          <Text style={{ color: theme.colors.primary }}>
            {/* eslint-disable react/jsx-one-expression-per-line */}
            Shield: {shield}/{shieldRank}
          </Text>
          <Text>
            {/* eslint-disable react/jsx-one-expression-per-line */}
            XP: {xp} • Potions sickness: {potionSickness}
          </Text>
        </View>
      </View>

      <View style={styles.cardContainer} accessible={false} accessibilityLabel="Delt cards">
        {room.map((card) => {
          if (!card) {
            return null;
          }

          return (
            <PlayCard
              key={`${card.rank}-${card.suit}`}
              onPress={handleCardPress}
              suit={card.suit}
              rank={card.rank}
              played={card.played}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Game;
