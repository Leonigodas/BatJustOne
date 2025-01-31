console.log("Bienvenu Monsieur Wayne ! \nVous êtes venu vous détendre avec une partie de Just One ?");

const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Combien serez vous à jouer Monsieur ?`, nb_player => {
  console.log(`Très bien ! Je prépare la table`);
  rl.close();
});

for (var i =0;i<nb_player; i++){
rl.question(`Combien serez vous à jouer Monsieur ?`, name => {
    console.log(`Hi ${name}!`);
    rl.close();
  });
}
var ListWords = ["Europe","chocolat","feuille","chemise","guerre","virus","neige","vert","cadeau","planète","poubelle","Barcelone","jardin","grenouille","bleu","Seine","judo","papillon","cadeau","nuage","coeur","Paris","orange","cirque","crocodile","Terre","coq","noir","lion","mercredi","vacances","football","oiseau","ogre","princesse","soleil","Champignon","lampe","film","Noël","château","concert","sucre","rose","masque","fleur","Bordeaux","yoga","roi","verre","papier","Paris","pain","docteur","lunettes","César","cochon","livre","marron","zoo"]
