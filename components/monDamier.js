import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Case from './case';
import Pion from './pion'; 
import { taille_damier, COULEURS } from '../mesConstantes';
import { deplacement } from '../deplacement';
// NOUVEAU : On importe la nouvelle fonction
import { estDeplacementValide, calculerDeplacementsPossibles } from './utils/logique'; 

export default function Damier() {

  // ... (Ton initGame ne change pas)
  const initGame = () => {
    /* ... ton code existant ... */
    const newBoard = [];
    for (let row = 0; row < taille_damier; row++) {
        const rowData = [];
        for (let col = 0; col < taille_damier; col++) {
          const isBlackCell = (row + col) % 2 !== 0;
          if (isBlackCell) {
            if (row < 3) rowData.push('noir');
            else if (row > 4) rowData.push('blanc');
            else rowData.push(null);
          } else {
            rowData.push(null);
          }
        }
        newBoard.push(rowData);
      }
      return newBoard;
  };

  const [board, setBoard] = useState(initGame());
  const [selectedPos, setSelectedPos] = useState(null); 
  const [tour, setTour] = useState('blanc'); 
  
  // NOUVEAU : State pour stocker les cases où on peut aller
  const [validMoves, setValidMoves] = useState([]); 

  const handlePress = (row, col) => {
    const contenuCase = board[row][col];

    // --- PHASE 1 : SÉLECTION ---
    if (contenuCase !== null) {
      if (contenuCase === tour) {
        setSelectedPos({ row, col });
        
        // NOUVEAU : On calcule et stocke les mouvements possibles
        const moves = calculerDeplacementsPossibles(board, row, col, tour);
        setValidMoves(moves);
      } else {
        console.log(`Pas touche ! C'est au tour des ${tour}s.`);
      }
      return;
    }

    // --- PHASE 2 : DÉPLACEMENT ---
    if (selectedPos && contenuCase === null) {
      const depart = [selectedPos.row, selectedPos.col];
      const arrivee = [row, col];

      if (estDeplacementValide(depart, arrivee, board, tour)) {
        
        const nextBoard = board.map(row => [...row]);
        const pionBouge = nextBoard[selectedPos.row][selectedPos.col];

        nextBoard[selectedPos.row][selectedPos.col] = null;
        nextBoard[row][col] = pionBouge;

        if (Math.abs(row - selectedPos.row) === 2) {
          const rMilieu = (selectedPos.row + row) / 2;
          const cMilieu = (selectedPos.col + col) / 2;
          nextBoard[rMilieu][cMilieu] = null;
        }

        setBoard(nextBoard);
        setSelectedPos(null);
        setValidMoves([]); // NOUVEAU : On efface les indicateurs après le coup
        setTour(tour === 'blanc' ? 'noir' : 'blanc');

      } else {
        // Optionnel : Désélectionner si on clique ailleurs
        setSelectedPos(null);
        setValidMoves([]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoTour}>Tour : {tour.toUpperCase()}</Text>

      <View style={styles.board}>
        {board.map((rowData, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {rowData.map((cellContent, colIndex) => {
              
              const isSelected = selectedPos?.row === rowIndex && selectedPos?.col === colIndex;

              // NOUVEAU : On vérifie si cette case fait partie des mouvements valides
              const isPossibleMove = validMoves.some(
                move => move.r === rowIndex && move.c === colIndex
              );

              return (
                <Case
                  key={`cell-${rowIndex}-${colIndex}`}
                  couleur={deplacement(rowIndex, colIndex)} 
                  onPress={() => handlePress(rowIndex, colIndex)}
                >
                  {/* Affichage du pion */}
                  <View style={isSelected ? styles.selected : null}>
                     {cellContent && <Pion couleur={cellContent} />}
                  </View>

                  {/* NOUVEAU : Indicateur de déplacement possible (un point vert) */}
                  {isPossibleMove && <View style={styles.indicator} />}
                </Case>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... tes styles existants ...
  container: { alignItems: 'center' },
  infoTour: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  board: { borderWidth: 5, borderColor: COULEURS.BORDURE },
  row: { flexDirection: 'row' },
  selected: {
    width: '100%', height: '100%',
    borderColor: 'gold', borderWidth: 3, borderRadius: 50,
    justifyContent: 'center', alignItems: 'center'
  },
  
  // NOUVEAU STYLE : Le petit point vert
  indicator: {
    position: 'absolute', // Pour se mettre par-dessus la case
    width: 15,
    height: 15,
    backgroundColor: '#32CD32', // Vert "Lime Green"
    borderRadius: 7.5,
    opacity: 0.8 // Un peu transparent
  }
});