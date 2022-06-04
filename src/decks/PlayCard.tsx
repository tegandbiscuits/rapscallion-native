import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Potion from '../icons/Potion';
import Shield from '../icons/Shield';
import Dragon from '../icons/Dragon';

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
      accessibilityLabel={suit}
      // @ts-expect-error unable to ensure name is set more specific than string
      name={suitName}
    />
  );
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

  const handlePress = () => {
    const hpChange = cardType !== 'shield' ? pointModification : 0;
    const card = { suit, rank };
    onPress({ hpChange, card });
  };

  // TODO: i18n to have the 's' or not
  let a11yLabel: string;
  if (cardType === 'shield') {
    a11yLabel = `${cardLabel} card, ${pointModification} blocking points`;
  } else {
    a11yLabel = `${cardLabel} card, ${pointModification} points`;
  }

  if (active) {
    a11yLabel = `(Active) ${a11yLabel}`;
  }

  let positionStyles: ViewStyle;
  switch (index) {
    case 0:
      positionStyles = { bottom: 10, right: 10 };
      break;
    case 1:
      positionStyles = { bottom: 10, left: 10 };
      break;
    case 2:
      positionStyles = { top: 10, right: 10 };
      break;
    case 3:
      positionStyles = { top: 10, left: 10 };
      break;
    default:
      positionStyles = {};
      break;
  }

  // TODO: should active shield have selected accessbility state?
  return (
    <TouchableRipple
      onPress={handlePress}
      accessible
      accessibilityLabel={a11yLabel}
      disabled={played}
      style={[{ position: 'absolute' }, positionStyles]}
    >
      <Surface style={styles.card}>
        <Text style={[styles.points, { color }]}>{pointModification}</Text>
        {/* <SuitImage style={[styles.cardSuit, { color }]} suit={suit} /> */}

        <CenterImage cardType={cardType} color={color} />

        <Text style={[styles.cardLabel, { color }]}>{cardLabel}</Text>
      </Surface>
    </TouchableRipple>
  );
};

PlayCard.defaultProps = {
  active: false,
  index: undefined,
};

export default PlayCard;
