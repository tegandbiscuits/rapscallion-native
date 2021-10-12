import React, { useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { decks, Card } from './decks';

const state = {
    dungeon: [],
    dungeonType: 'nohearts',
    regenerate: 0,
    room: [],
    hp: 21,
    xp: 0,
    shield: 0,
    shieldRank: 0,
    potionDrank: false,
    potionLimit: true,
    breakableShield: true,
    progress: 52,
    retreat: false,
    isRoomComplete: false,
    modal: false,
    gameState: '',
    gameVariant: ''
  }

type Room = [Card?, Card?, Card?, Card?];

const shuffleNewRoom = (currentDungeon: Card[], currentRoom: Room) => {
  const gatherCards = [...currentDungeon, ...currentRoom];
  let counter: number = gatherCards.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = gatherCards[counter];
    gatherCards[counter] = gatherCards[index];
    gatherCards[index] = temp;
  }

  const dungeonRoom: any[] = gatherCards.splice(-4, gatherCards.length);
  return {
    dungeon: gatherCards,
    room: dungeonRoom,
    progress: gatherCards.length,
    isRoomComplete: false,
  };
}

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Done" onPress={() => shuffleNewRoom(decks.standard, [])} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
