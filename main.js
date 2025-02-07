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
  if ((ChosenWord >5)||(ChosenWord <0)) {
    //                                  On récupère les indices
    ChosenWord = await askQuestion("Demandez au joueur, qui doit deviner le mot, de donner un numéro entre 0 et 4 ")
    if (isNaN(ChosenWord)||ChosenWord<0||ChosenWord>5){ //On s'assure d'avoir un entier adéquat
      ChosenWord = 0;
    }  
    console.log(`Vous devez donc lui faire deviner le mot ${carte[ChosenWord]} `);
    var clues = [];
    for (var i =0;i<nb_player; i++){//Chaque joueur renseigne son indice 
      clues.push(await askQuestion(`Entrez l'indice que vous avez choisi\n`));
      console.log(`ok !`); 
    }
    }
    //                      Fin de la récupération des indices
    //                    Faut maintenant s'assurer que les indices ne soient pas identiques
    var valid_clues = [];
    var valid_word = 0;
    for (let i = 0; i < clues.length; i++) {
      valid_word = 0;
      for (let j = 0; j < clues.length; j++) {
        if (i!=j){
          if (clues[i] == clues[j]) {
            valid_word = 1;
          }
        }
      }
    if (valid_word == 0){
      valid_clues.push(clues[i]);
    }
    }
    
    //                      On affiche les indices qui sont uniques

    console.log ("C'est désormais à nouveau au tour du joueur qui devine le mot !");
    console.log (`Voici les différents indices que vous avez à votre disposition : ${valid_clues}`);
    
    //                On demande à celui qui doit deviner de faire une proposition
    const input_word = await askQuestion ("Veuillez entrer le mot que vous avez deviné grâce aux indices (attention, au singulier, sans majuscule et bien orthographié, sinon ce sera compté comme faux !): ")
    if (input_word == carte[ChosenWord]){
      console.log(`Bien joué ! Vous avez trouvé le mot qui était ${carte[ChosenWord]}! On espère que vous avez aimé jouer à notre jeu !`);
    }else{
      console.log(`Aïe ! Vous vous êtes trompés ! Le mot à trouver était ${carte[ChosenWord]}`);
    }
  rl.close();
  //Combien serez vous à jouer Monsieur ?
}


main();