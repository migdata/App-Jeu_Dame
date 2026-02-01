# Jeu de Dames - React Native

Projet de développement mobile 
Il s'agit d'une application de jeu de dames respectant les règles standards, avec une séparation stricte entre la logique métier et l'interface graphique.

## 📋 Fonctionnalités

- **Plateau dynamique** : Génération d'un damier 8x8 (ou 10x10).
- **Gestion des tours** : Alternance automatique entre les Blancs et les Noirs.
- **Mouvements valides** :
  - Déplacement simple en diagonale.
  - Interdiction de reculer pour les pions simples.
  - Gestion des collisions (ne pas aller sur une case occupée).
- **Prise de pion** : Gestion de la capture (sauter par-dessus un adversaire élimine le pion).
- **Architecture** : Séparation MVC (Modèle-Vue) avec logique déportée.
- **Tests Unitaires** : Validation de la logique de jeu via Jest.

## 🛠 Technologies utilisées

- **Langage** : JavaScript (ES6+)
- **Framework** : React Native / Expo (SDK 52)
- **Tests** : Jest
- **IDE** : Visual Studio Code

## 🚀 Installation et Lancement

1. **Cloner le projet :**
   ```bash
   git clone https://github.com/migdata/App-Jeu_Dame.git
   
   cd JeuDeDames

   yarn install

  yarn start

   yarn test // dans _ _tests _ _ 

   