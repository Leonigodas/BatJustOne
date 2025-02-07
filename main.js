const { log } = require('node:console');
const { randomInt } = require('node:crypto');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fonction pour poser une question et retourner une promesse
function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer));
  });
}

// Fonction pour normaliser les mots (supprime accents, majuscules)
function normalizing_words(word) {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Demande le nombre de joueurs
function askPlayers() {
  return askQuestion("Avec combien d'invités jouerez-vous ? ")
    .then(answer => {
      let nb_player = parseInt(answer, 10);
      if (isNaN(nb_player) || nb_player <= 0) {
        console.log("Veuillez entrer un nombre valide !");
        return askPlayers(); // Reposer la question si la réponse est invalide
      }
      console.log(`Vous m'avez dit ${nb_player}`);
      return nb_player;
    });
}

// Sélection du mot à deviner
function askChosenWord(carte) {
  return askQuestion("Demandez au joueur qui doit deviner le mot de donner un numéro entre 0 et 4 : ")
    .then(answer => {
      let choice = parseInt(answer, 10);
      if (isNaN(choice) || choice < 0 || choice > 4) {
        console.log("Nombre invalide, sélection par défaut à 0.");
        choice = 0;
      }
      console.log(`Vous devez donc lui faire deviner le mot : "${carte[choice]}"`);
      return choice; // On retourne la valeur correcte
    });
}

// Récupération des indices des joueurs
function askClues(nb_player) {
  let clues = [];
  let collectClue = (index) => {
    if (index >= nb_player) return Promise.resolve(clues);

    return askQuestion(`Joueur ${index + 1}, entrez votre indice (attention, vous pouvez mettre des accents et des majuscules, ils ne seront pas pris en compte, mais pas de pluriel !) : `)
      .then(answer => {
        let normalized_clue = normalizing_words(answer);
        clues.push(normalized_clue);
        console.log("Indice enregistré !");
        return collectClue(index + 1);
      });
  };
  
  return collectClue(0);
}

// Fonction principale du jeu
function main() {
    console.log("Bienvenue Monsieur Wayne ! \nVous êtes venu vous détendre avec une partie de Just One ?");
  
    askPlayers().then(nb_player => {
      console.log(`Très bien ! Je prépare la table de suite.`);
    
      let ListWords = ["Europe", "chocolat", "feuille", "chemise", "guerre", "virus", "neige", "vert", "cadeau", "planète", "poubelle", "Barcelone", "jardin", "grenouille", "bleu", "Seine", "judo", "papillon", "cadeau", "nuage", "coeur", "Paris", "orange", "cirque", "crocodile", "Terre", "coq", "noir", "lion", "mercredi", "vacances", "football", "oiseau", "ogre", "princesse", "soleil", "Champignon", "lampe", "film", "Noël", "château", "concert", "sucre", "rose", "masque", "fleur", "Bordeaux", "yoga", "roi", "verre", "papier", "Paris", "pain", "docteur", "lunettes", "César", "cochon", "livre", "marron", "zoo"];
      
      // Génération de la carte
      console.log("Attention, la carte des mots va s'afficher...");
      let carte = [];
      for (let i = 0; i < 5; i++) {
        let randomIndex = randomInt(0, ListWords.length);
        carte.push(ListWords[randomIndex]);
      }
      console.log(`La carte est : ${carte.join(", ")}`);
  
      return askChosenWord(carte).then(ChosenWord => {
        return askClues(nb_player).then(clues => {
            let valid_clues = [];

            let compteur = new Map();
            clues.forEach(mot => {
                compteur.set(mot, (compteur.get(mot) || 0) + 1);
            });
            valid_clues = clues.filter(mot => compteur.get(mot) === 1);


            console.log("C'est désormais à nouveau au tour du joueur qui devine le mot !");
            console.log(`Voici les différents indices valides : ${valid_clues}`);
  
          return askQuestion("Veuillez entrer le mot que vous avez deviné grâce aux indices : ")
            .then(input_word => {
              let normalized_input = normalizing_words(input_word);
              let normalized_target = normalizing_words(carte[ChosenWord]);
  
              if (normalized_input === normalized_target) {
                console.log(`Bravo ! Vous avez trouvé le mot : "${carte[ChosenWord]}"`);
              } else {
                console.log(`Dommage ! Le mot à deviner était : "${carte[ChosenWord]}"`);
              }
  
              rl.close();
            });
        });
      });
    });
}
  
  main();
