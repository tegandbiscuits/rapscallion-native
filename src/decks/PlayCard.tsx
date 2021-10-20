import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import Potion from '../icons/Potion';
import Shield from '../icons/Shield';
import Dragon from '../icons/Dragon';

type CardTypes = 'potion' | 'shield' | 'enemy';

export interface IPlayCard {
  suite: 'joker' | 'jack' | 'spades' | 'hearts' | 'clubs' | 'diamonds',
  number: number
};

interface Props extends IPlayCard {
  onPress: (hpChange: number) => void;
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    marginHorizontal: 5,
  },
});

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

const PlayCard = ({ onPress, suite, number }: Props) => {
  let cardType: CardTypes;
  let cardLabel: string; // TODO: this could just be an i18n key

  if (suite === 'hearts') {
    cardType = 'potion';
    cardLabel = 'Potion';
  } else if (suite === 'diamonds') {
    cardType = 'shield';
    cardLabel = 'Shield';
  } else {
    cardType = 'enemy';
    cardLabel = 'Demon';
  }

  let pointModification = number;
  if (cardType === 'enemy') {
    pointModification = -pointModification;
  }

  const handlePress = () => {
    const hpChange = cardType !== 'shield' ? pointModification : 0;
    onPress(hpChange);
  };

  return (
    <TouchableRipple
      onPress={handlePress}
      accessible
      accessibilityLabel={`${cardLabel} card, ${pointModification} points`} // TODO: i18n to have the 's' or not
    >
      <Surface style={styles.card}>
        <View>
          <Text>{pointModification}</Text>
          <Text>{suite}</Text>
        </View>
        {CenterImage(cardType)}
        <Text>{cardLabel}</Text>
      </Surface>
    </TouchableRipple>
  );
};

export default PlayCard;
