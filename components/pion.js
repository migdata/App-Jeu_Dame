import React from 'react';
import { View, StyleSheet } from 'react-native';
// IMPORTANT : On importe la taille de la case pour calculer la taille du pion
import { CELL_SIZE } from '../mesConstantes'; 

// On calcule la taille du pion (80% de la case)
const PION_SIZE = CELL_SIZE * 0.8;

const Pion = ({ couleur }) => {
  // couleur sera 'blanc' ou 'noir'
  const couleurStyle = couleur === 'blanc' ? '#FFF' : '#222'; // Un noir un peu moins intense est plus joli
  
  return (
    <View style={styles.container}>
      <View style={[styles.cercle, { backgroundColor: couleurStyle }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // On enlève flex: 1 qui pose souvent problème ici
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cercle: {
    width: PION_SIZE,  // Taille FIXE
    height: PION_SIZE, // Taille FIXE
    borderRadius: PION_SIZE / 2, // La moitié de la taille pour un rond parfait
    borderWidth: 2, // Bordure un peu plus épaisse
    borderColor: 'rgba(0,0,0,0.2)', // Bordure légèrement transparente pour l'esthétique
    // Petit effet d'ombre pour le volume (optionnel)
    shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default Pion;