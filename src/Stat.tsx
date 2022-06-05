import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  points: {
    fontSize: 24,
  },
  label: {
    fontSize: 20,
  },
});

interface Props {
  points: number;
  label: string;
}

const Stat = ({ points, label }: Props) => (
  <View style={styles.container}>
    <Text style={styles.points}>{points}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default Stat;
