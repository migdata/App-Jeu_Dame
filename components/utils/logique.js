// utils/logique.js

// 1. Fonction pour valider un mouvement spécifique (quand on relâche le clic)
export const estDeplacementValide = (depart, arrivee, plateau, tour) => {
  const [rDep, cDep] = depart;
  const [rArr, cArr] = arrivee;
  
  // La case d'arrivée doit être vide
  if (plateau[rArr][cArr] !== null) return false;

  const diffRow = rArr - rDep;
  const diffCol = Math.abs(cArr - cDep);
  const direction = tour === 'blanc' ? -1 : 1;

  // --- A. MOUVEMENT SIMPLE (1 case) ---
  if (diffCol === 1 && diffRow === direction) {
    return true;
  }

  // --- B. PRISE (Manger un pion : 2 cases) ---
  if (diffCol === 2 && (diffRow === 2 * direction)) {
    // On vérifie la case du milieu
    const rMilieu = (rDep + rArr) / 2;
    const cMilieu = (cDep + cArr) / 2;
    const pieceMilieu = plateau[rMilieu][cMilieu];

    // Il faut qu'il y ait un ennemi au milieu
    if (pieceMilieu !== null && pieceMilieu !== tour) {
      return true;
    }
  }

  return false;
}; // <--- IL MANQUAIT CETTE ACCOLADE FERMANTE ICI !


// 2. Fonction pour calculer les indices visuels (points verts)
export const calculerDeplacementsPossibles = (board, row, col, tour) => {
  const moves = [];
  const direction = tour === 'blanc' ? -1 : 1; 
  const taille = board.length;

  const estDansLeDamier = (r, c) => r >= 0 && r < taille && c >= 0 && c < taille;

  // --- 1. MOUVEMENTS SIMPLES ---
  const simpleMoves = [
    { r: row + direction, c: col - 1 }, // Avant Gauche
    { r: row + direction, c: col + 1 }  // Avant Droite
  ];

  simpleMoves.forEach(m => {
    if (estDansLeDamier(m.r, m.c) && board[m.r][m.c] === null) {
      moves.push(m);
    }
  });

  // --- 2. PRISES (Manger un pion) ---
  const captureDirections = [
    { r: 2 * direction, c: -2, midR: direction, midC: -1 }, // Saut Gauche
    { r: 2 * direction, c: 2, midR: direction, midC: 1 }    // Saut Droite
  ];

  captureDirections.forEach(d => {
    const destR = row + d.r;
    const destC = col + d.c;
    const midR = row + d.midR; 
    const midC = col + d.midC;

    if (estDansLeDamier(destR, destC) && board[destR][destC] === null) {
      const ennemi = board[midR][midC];
      // Si la case du milieu contient un pion ADVERSE
      if (ennemi !== null && ennemi !== tour) {
        moves.push({ r: destR, c: destC });
      }
    }
  });

  return moves;
};