import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import Potion from '../icons/Potion';
import Shield from '../icons/Shield';
import Dragon from '../icons/Dragon';

type CardTypes = 'potion' | 'shield' | 'enemy';

export interface ICard {
  suite: 'joker' | 'jack' | 'spades' | 'hearts' | 'clubs' | 'diamonds',
  number: number
};

interface Props extends ICard {
  onPress: () => void;
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    marginHorizontal: 5,
  },
});

const cardLabel = (suit: ICard['suite']): string => {
  switch (suit) {
    case 'hearts':
      return 'Potion';
    case 'diamonds':
      return 'Shield';
    default:
      return 'Demon';
  }
}

const CenterImage = (cardType: CardTypes) => {
  switch (cardType) {
    case 'potion':
      return <Potion />;
    case 'shield':
      return <Shield />;
    default:
      return <Text>(dragon was jank)</Text>;
  }
}

const Card = ({ onPress, suite, number }: Props) => {
  let cardType: CardTypes;

  switch (suite) {
    case 'hearts':
      cardType = 'potion';
      break;
    case 'diamonds':
      cardType = 'shield';
      break;
    default:
      cardType = 'enemy';
      break;
  }

  return (
    <TouchableRipple onPress={onPress}>
      <Surface style={styles.card}>
        <View>
          <Text>{`${cardType === 'enemy' ? '-' : ''}${number}`}</Text>
          <Text>{suite}</Text>
        </View>
        {CenterImage(cardType)}
        <Text>{cardLabel(suite)}</Text>
      </Surface>
    </TouchableRipple>
  );
};

export default Card;
