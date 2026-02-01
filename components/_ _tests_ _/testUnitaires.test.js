// __tests__/logique.test.js
import { estDeplacementValide } from '../utils/logique'; // Ajuste le chemin selon tes dossiers

// Fonction utilitaire pour créer un plateau vide pour les tests
const createEmptyBoard = () => {
  return Array(8).fill(null).map(() => Array(8).fill(null));
};

describe('Règles du Jeu de Dames', () => {

  test('Un pion Blanc doit pouvoir avancer en diagonale (Mouvement Simple)', () => {
    const board = createEmptyBoard();
    // On place un pion blanc en (5, 2)
    board[5][2] = 'blanc'; 

    // Scénario : Blanc veut aller en (4, 1) -> Diagonale Haut-Gauche
    const depart = [5, 2];
    const arrivee = [4, 1];
    const tour = 'blanc';

    const resultat = estDeplacementValide(depart, arrivee, board, tour);
    
    // On s'attend à ce que ce soit VRAI
    expect(resultat).toBe(true);
  });

  test('Un pion Blanc ne DOIT PAS pouvoir reculer', () => {
    const board = createEmptyBoard();
    board[5][2] = 'blanc';

    // Scénario : Blanc veut aller en (6, 1) -> Diagonale Bas-Gauche (Reculer)
    const depart = [5, 2];
    const arrivee = [6, 1];
    const tour = 'blanc';

    const resultat = estDeplacementValide(depart, arrivee, board, tour);

    // On s'attend à ce que ce soit FAUX
    expect(resultat).toBe(false);
  });

  test('Un pion Noir doit pouvoir manger un Blanc', () => {
    const board = createEmptyBoard();
    board[2][1] = 'noir';  // Pion Noir
    board[3][2] = 'blanc'; // Pion Blanc (victime)

    // Scénario : Noir saute par dessus Blanc vers (4, 3)
    const depart = [2, 1];
    const arrivee = [4, 3];
    const tour = 'noir';

    const resultat = estDeplacementValide(depart, arrivee, board, tour);

    expect(resultat).toBe(true);
  });

});