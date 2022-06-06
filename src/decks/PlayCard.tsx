import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import Potion from '../icons/Potion';
import Shield from '../icons/Shield';
import Dragon from '../icons/Dragon';
import useCardLayout from './useCardLayout';

type CardTypes = 'potion' | 'shield' | 'enemy';

export interface IPlayCard {
  suit: 'joker' | 'jack' | 'spades' | 'hearts' | 'clubs' | 'diamonds';
  rank: number;
  played?: boolean;
}

interface Props extends IPlayCard {
  onPress: (event: { hpChange: number, card: IPlayCard }) => void;
  active?: boolean;
  index?: number;
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImage: {
    height: '60%',
    width: '60%',
  },
  cardLabel: {
    fontSize: 25,
  },
  points: {
    fontSize: 25,
    width: '100%',
  },
});

const CenterImage = ({ cardType, color }: { cardType: CardTypes, color: string }) => {
  switch (cardType) {
    case 'potion':
      return <Potion style={styles.cardImage} fill={color} />;
    case 'shield':
      return <Shield style={styles.cardImage} fill={color} />;
    default:
      return <Dragon style={styles.cardImage} fill={color} />;
  }
};

const PlayCard = ({
  onPress,
  suit,
  rank,
  played,
  active,
  index,
}: Props) => {
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

  const theme = useTheme();
  const color = cardType === 'enemy' ? theme.colors.fightable : theme.colors.consumable;

  // TODO: i18n to have the 's' or not
  let a11yLabel: string;
  if (cardType === 'shield') {
    a11yLabel = `${cardLabel} card, ${pointModification} blocking points`;
  } else {
    a11yLabel = `${cardLabel} card, ${pointModification} points`;
  }

  const [layoutStyles] = useCardLayout(
    index ?? 0,
    styles.card.height,
    styles.card.width,
  );

  if (active) {
    a11yLabel = `(Active) ${a11yLabel}`;
  }

  const handlePress = () => {
    // if (cardType === 'shield') {
    //   onActivation();
    // }

    const hpChange = cardType !== 'shield' ? pointModification : 0;
    const card = { suit, rank };
    onPress({ hpChange, card });
  };

  // TODO: should active shield have selected accessbility state?
  return (
    <View
      style={[{ position: 'absolute' }, layoutStyles]}
      accessible
      accessibilityLabel={a11yLabel}
    >
      <TouchableRipple onPress={handlePress} disabled={played}>
        <Surface style={styles.card}>
          <Text style={[styles.points, { color }]}>{pointModification}</Text>
          <CenterImage cardType={cardType} color={color} />

          <Text style={[styles.cardLabel, { color }]}>{cardLabel}</Text>
        </Surface>
      </TouchableRipple>
    </View>
  );
};

PlayCard.defaultProps = {
  active: false,
  index: undefined,
};

export default PlayCard;
