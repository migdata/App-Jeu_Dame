import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CELL_SIZE } from '../mesConstantes'; // Assure-toi d'avoir cette constante

const Case = ({ couleur, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.cell, { backgroundColor: couleur }]}>
      {/* C'est ici que le Pion va s'afficher s'il existe */}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: CELL_SIZE,  // Important : définir une taille fixe (ex: 35 ou 40)
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(Case);