console.log("Bienvenu Monsieur Wayne ! \nVous êtes venu vous détendre avec une partie de Just One ?");

const { log } = require('node:console');
const { randomInt } = require('node:crypto');
const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Combien serez vous à jouer Monsieur ?`, nb_player => {
  if (isNaN(nb_player) || nb_player <= 0) { //Is Not A Number
    console.log("Veuillez entrer un nombre valide.");
  }else {
    console.log(`Très bien ! Je prépare la table de suite.`);
  
    /*
    for (var i =0;i<nb_player; i++){
    rl.question(`Combien serez vous à jouer Monsieur ?`, name => {
        console.log(`Hi ${name}!`);
        rl.close();
      });
    }
    */

    var ListWords = ["Europe","chocolat","feuille","chemise","guerre","virus","neige","vert","cadeau","planète","poubelle","Barcelone","jardin","grenouille","bleu","Seine","judo","papillon","cadeau","nuage","coeur","Paris","orange","cirque","crocodile","Terre","coq","noir","lion","mercredi","vacances","football","oiseau","ogre","princesse","soleil","Champignon","lampe","film","Noël","château","concert","sucre","rose","masque","fleur","Bordeaux","yoga","roi","verre","papier","Paris","pain","docteur","lunettes","César","cochon","livre","marron","zoo"];

    //Selection du mot aléatoirement
    console.log("Attention, la carte des mots va s'afficher");

    var carte = []
    for (var i =0;i<5; i++){
      Wort = randomInt(0, ListWords.length);
      carte.push(ListWords[Wort]);
    }
    console.log(`La Carte est ${carte}`);
    
    var ChosenWord = -5;
    if ((ChosenWord >5)||(ChosenWord <0)) {
      //                                  On récupère les indices
      rl.question(`Demandez au joueur, qui doit deviner le mot, de donner un numéro entre 1 et 5`, ChosenWord => {
        if (isNaN(ChosenWord)||ChosenWord<0||ChosenWord>5){ //On s'assure d'avoir un entier
          ChosenWord = 0;
        }  
        console.log(`Vous devez donc lui faire deviner le mot ${carte[ChosenWord]}`);
        let clues = []
        for (var i =0;i<nb_player; i++){
          rl.question(`Entrez l'indice que vous avez choisi`, indice => {
            clues.push()
            console.log(`ok !`); 
          });
          //rl.close();//Entrez l'indice que vous avez choisi
        }
        
        });
      //rl.close();//Demandez au joueur qui doit deviner le mot de donner un numéro entre 1 et 5
      //                      Fin de la récupération des indices

      //                    Faut maintenant s'assurer que les indices ne soient pas identiques


      //                      On affiche les indices qui sont uniques

      
      //                On demande à celui qui doit deviner de faire une prosition

      }
    }
  rl.close();
});//Combien serez vous à jouer Monsieur ?
