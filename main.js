//Question pour du JS -> MDN
//Question pour les modules de JS -> npm

console.log("Bienvenu Monsieur Wayne ! \nVous êtes venu vous détendre avec une partie de Just One ?");

const { log } = require('node:console');
const { randomInt } = require('node:crypto');
const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});//Module Question

async function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer));
  });
}

async function main() {

  var nb_player=-5;
  while (isNaN(nb_player) || nb_player <= 0){ //Is Not A Number
    var nb_player = await askQuestion("Avec combien d'invités jouerez vous ? "); //pas await then  ; await remplacé par async
  }
  console.log(`Très bien ! Je prépare la table de suite.`);

  var ListWords = ["Europe","chocolat","feuille","chemise","guerre","virus","neige","vert","cadeau","planète","poubelle","Barcelone","jardin","grenouille","bleu","Seine","judo","papillon","cadeau","nuage","coeur","Paris","orange","cirque","crocodile","Terre","coq","noir","lion","mercredi","vacances","football","oiseau","ogre","princesse","soleil","Champignon","lampe","film","Noël","château","concert","sucre","rose","masque","fleur","Bordeaux","yoga","roi","verre","papier","Paris","pain","docteur","lunettes","César","cochon","livre","marron","zoo"];
  //Selection du mot aléatoirement
  console.log("Attention, la carte des mots va s'afficher");

  var carte = []
  for (var i =0;i<5; i++){
    Wort = randomInt(0, ListWords.length);
    carte.push(ListWords[Wort]); //push est l'équivalent du .append en python
  }
  console.log(`La Carte est ${carte} `);
  
  var ChosenWord = -5;
  if ((ChosenWord >5)||(ChosenWord <0)) {
    //                                  On récupère les indices
    const ChosenWord = await askQuestion("Demandez au joueur, qui doit deviner le mot, de donner un numéro entre 0 et 4 ")
    if (isNaN(ChosenWord)||ChosenWord<0||ChosenWord>5){ //On s'assure d'avoir un entier adéquat
      ChosenWord = 0;
    }  
    console.log(`Vous devez donc lui faire deviner le mot ${carte[ChosenWord]} `);
    let clues = []
    for (var i =0;i<nb_player; i++){//Chaque joueur renseigne son indice 
      await askQuestion(`Entrez l'indice que vous avez choisi\n`)
      clues.push();
      console.log(`ok !`); 
    }
    
    };
    ////Demandez au joueur qui doit deviner le mot de donner un numéro entre 1 et 5
    //                      Fin de la récupération des indices

    //                    Faut maintenant s'assurer que les indices ne soient pas identiques


    //                      On affiche les indices qui sont uniques

    
    //                On demande à celui qui doit deviner de faire une prosition


  rl.close();
  //Combien serez vous à jouer Monsieur ?
}


main();