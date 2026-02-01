import { COULEURS } from './mesConstantes';

export const deplacement = (row, col) => {
  const deplacement_estPair = (row + col) % 2 === 0;
  return deplacement_estPair ? COULEURS.CLAIR : COULEURS.FONCE;
}