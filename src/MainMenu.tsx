import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import Knot from './icons/Knot';

interface Props {
  onGameStart: () => void;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

const MainMenu = ({ onGameStart }: Props) => (
  <View style={styles.container}>
    <Knot width={150} height={150} />
    <Button mode="outlined" onPress={onGameStart}>
      Standard
    </Button>
  </View>
);

export default MainMenu;
