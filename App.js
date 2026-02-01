import React from 'react';
import { StyleSheet, View } from 'react-native';
import Damier from './components/monDamier';
import { COULEURS } from './mesConstantes';

export default function App() {
  return (
    <View style={styles.container}>
      <Damier />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COULEURS.FOND,
    alignItems: 'center',
    justifyContent: 'center',
  },
});