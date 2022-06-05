import { useCallback } from 'react';
import { useWindowDimensions, ViewStyle } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CardLayout = [ViewStyle, () => void];

const useCardLayout = (
  index: number,
  cardHeight: number,
  cardWidth: number,
): CardLayout => {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const viewHeight = dimensions.height - insets.top - insets.bottom;
  const viewWidth = dimensions.width - insets.left - insets.right;

  let calcY: number;
  if (index === 2 || index === 3) {
    calcY = (viewHeight / 2) + 4;
  } else {
    calcY = (viewHeight / 2) - cardHeight - 4;
  }

  let calcX: number;
  if (index === 1 || index === 3) {
    calcX = (viewWidth / 2) + 4;
  } else {
    calcX = ((viewWidth / 2) - cardWidth) - 4;
  }

  const posY = useSharedValue(calcY);
  const posX = useSharedValue(calcX);
  const animatedStyles = useAnimatedStyle(() => ({ top: posY.value, left: posX.value }));

  const onActivation = useCallback(() => {
    posY.value = withTiming(0, { duration: 500 });
    posX.value = withTiming((viewWidth - cardWidth) / 2, { duration: 500 });
  }, [posY, posX, viewWidth, cardWidth]);

  return [animatedStyles, onActivation];
};

export default useCardLayout;
