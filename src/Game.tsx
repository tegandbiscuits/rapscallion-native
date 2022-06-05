import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import PlayCard, { IPlayCard } from './decks/PlayCard';
import Stat from './Stat';
import {
  dealRoom,
  playCard,
  addHealth,
  dealGame,
} from './state/gameSlice';
import { RootState } from './state/store';

export enum GameModes {
  Standard = 'Standard',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  cardContainer: {
    position: 'absolute',
    zIndex: -1,
  },
  progress: {
    textAlign: 'center',
    marginBottom: 10,
  },
  roomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  roomAction: {
    width: '48%',
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
    hp,
    shield,
    xp,
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

  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const cardContainerDynamicStyles = {
    top: insets.top,
    height: dimensions.height - insets.top - insets.bottom,
    width: dimensions.width - insets.left - insets.right,
  };

  const showShield = shield.blocking && !room.find((c) => (
    c?.suit === 'diamonds' && c?.rank === shield.blocking
  ));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* <Text style={styles.progress}>
        Progress: {progress}
      </Text> */}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ flexDirection: 'row' }}>
          <Stat points={hp} label="HP" />
          <Stat points={xp} label="XP" />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Stat points={shield.blocking} label="BP" />
          <Stat points={shield.rank} label="SR" />
        </View>
      </View>
      {/* <View>

        <View style={styles.stats}>
          <Text>
             Potions sickness: {potionSickness}
          </Text>
        </View>
      </View> */}

      <View
        style={[styles.cardContainer, cardContainerDynamicStyles]}
        accessible={false}
        accessibilityLabel="Delt cards"
      >
        {showShield ? (
          <PlayCard
            active
            suit="diamonds"
            rank={shield.blocking}
            onPress={() => { }}
            index={-1}
          />
        ) : null}

        {room.map((card, i) => {
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
              index={i}
            />
          );
        })}
      </View>

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
    </SafeAreaView>
  );
};

export default Game;
