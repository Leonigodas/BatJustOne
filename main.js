console.log("Bienvenu Monsieur Wayne ! \nVous êtes venu vous détendre avec une partie de Just One ?");

const { log } = require('node:console');
const { randomInt } = require('node:crypto');
const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer));
  });
}

function normalizing_words(word) {
  return(word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
}

async function main() {

  var nb_player=-5;
  while (isNaN(nb_player) || nb_player <= 0){ //Is Not A Number
    var nb_player = await askQuestion("Avec combien d'invités jouerez vous ? ");
  }
  console.log(`Très bien ! Je prépare la table de suite.`);

  /*
  for (var i =0;i<nb_player; i++){
  rl.question(`Combien serez vous à jouer Monsieur ?`, name => {
      console.log(`Bien le bonjour ${name}!`);
    });
  }
  */

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
  if ((ChosenWord >4)||(ChosenWord <0)) {
    //                                  On récupère les indices
    ChosenWord = await askQuestion("Demandez au joueur, qui doit deviner le mot, de donner un numéro entre 0 et 4 ")
    if (isNaN(ChosenWord)||ChosenWord<0||ChosenWord>5){ //On s'assure d'avoir un entier adéquat A CORRIGER
      ChosenWord = 0;
    }  
    console.log(`Vous devez donc lui faire deviner le mot ${carte[ChosenWord]} `);
    var clues = [];
    var clues_normalized = [];
    for (var i =0;i<nb_player; i++){//Chaque joueur renseigne son indice 


      var clue_word = await askQuestion(`Entrez l'indice que vous avez choisi (attention, vous pouvez mettre des accents et des majuscules, ils ne seront pas pris en compte, mais pas de pluriel !\n`)
      var clue_word_normalized = clue_word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      clues.push(clue_word); 
      clues_normalized.push(clue_word_normalized)
      console.log(`ok !`); 
    }
    }
    //                      Fin de la récupération des indices
    //                    Faut maintenant s'assurer que les indices ne soient pas identiques
    var valid_clues = [];
    clues_normalized.forEach((mot) => {
      if (!valid_clues.includes(mot)) {
        valid_clues.push(mot);
      }
    });
    
    //                      On affiche les indices qui sont uniques

    console.log ("C'est désormais à nouveau au tour du joueur qui devine le mot !");
    console.log (`Voici les différents indices que vous avez à votre disposition : ${valid_clues}`);
    
    //                On demande à celui qui doit deviner de faire une proposition
    var input_word = await askQuestion ("Veuillez entrer le mot que vous avez deviné grâce aux indices (attention à bien orthographier le mot, les accents, les majuscules et le pluriel ne sont pas un problème.): ");
    var mot_carte = carte[ChosenWord].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    var normalize_input_word = input_word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (normalize_input_word == mot_carte){
      console.log(`Bien joué ! Vous avez trouvé le mot qui était ${carte[ChosenWord]}! On espère que vous avez aimé jouer à notre jeu !`);
    }else{
      console.log(`Aïe ! Vous vous êtes trompés ! Le mot à trouver était ${carte[ChosenWord]}`);
    }
  rl.close();
}

main();