import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { Surface, Text, TouchableRipple, Colors } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Potion from '../icons/Potion';
import Shield from '../icons/Shield';

type CardTypes = 'potion' | 'shield' | 'enemy';

export interface IPlayCard {
  suit: 'joker' | 'jack' | 'spades' | 'hearts' | 'clubs' | 'diamonds',
  rank: number
}

interface Props extends IPlayCard {
  onPress: (hpChange: number) => void;
}

const cardImageSize = 120;
const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    margin: 5,
    position: 'relative',
  },
  cardInfo: {
    position: 'absolute',
    alignItems: 'center',
    top: '5%',
    left: '5%',
  },
  cardImage: {
    position: 'absolute',
    height: cardImageSize,
    width: cardImageSize,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -(cardImageSize / 2) }, { translateY: -(cardImageSize / 2) }],
    zIndex: -1,
  },
  cardLabel: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  points: {
    fontSize: 21,
  },
  cardSuit: {
    fontSize: 20,
  },
});

const CenterImage = ({ cardType, color }: { cardType: CardTypes, color: string }) => {
  switch (cardType) {
    case 'potion':
      return <Potion style={styles.cardImage} fill={color} />;
    case 'shield':
      return <Shield style={styles.cardImage} fill={color} />;
    default:
      return <Text style={[styles.cardImage, { color }]}>(dragon was jank)</Text>;
  }
};

const suitIcons: Record<IPlayCard['suit'], string | null> = {
  clubs: 'cards-club',
  diamonds: 'cards-diamond',
  hearts: 'cards-heart',
  jack: null,
  joker: null,
  spades: 'cards-spade',
};

const SuitImage = ({
  suit,
  style,
}: {
  suit: IPlayCard['suit'],
  style: StyleProp<TextStyle>,
}) => {
  const suitName = suitIcons[suit];

  if (!suitIcons) {
    return null;
  }

  return (
    <MaterialCommunityIcons
      style={style}
      // @ts-expect-error unable to ensure name is set more specific than string
      name={suitName}
    />
  );
};

const PlayCard = ({ onPress, suit, rank }: Props) => {
  let cardType: CardTypes;
  let cardLabel: string; // TODO: this could just be an i18n key

  if (suit === 'hearts') {
    cardType = 'potion';
    cardLabel = 'Potion';
  } else if (suit === 'diamonds') {
    cardType = 'shield';
    cardLabel = 'Shield';
  } else {
    cardType = 'enemy';
    cardLabel = 'Demon';
  }

  let pointModification = rank;
  if (cardType === 'enemy') {
    pointModification = -pointModification;
  }

  const color = cardType === 'enemy' ? Colors.black : Colors.red500;

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
        <View style={styles.cardInfo}>
          <Text style={[styles.points, { color }]}>{pointModification}</Text>
          <SuitImage style={[styles.cardSuit, { color }]} suit={suit} />
        </View>

        <CenterImage cardType={cardType} color={color} />

        <Text style={[styles.cardLabel, { color }]}>{cardLabel}</Text>
      </Surface>
    </TouchableRipple>
  );
};

export default PlayCard;
