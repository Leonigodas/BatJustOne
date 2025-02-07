const net = require("net");

const PORT = 65432;
const clients = []
var isGameStarted = false
var players = []
var ignoredClients = []

const server = net.createServer((socket) => {
    console.log("New player !!!", socket.remoteAddress, socket.remotePort);
    
    
    clients.push(socket);
    if (isGameStarted) {
      socket.write("La partie à déjà commencé, veuillez patienter")
      ignoredClients.push(socket)
    } else {
      socket.write("La partie va bientôt commencer !")
      players.push(socket)
  }

    // Handle incoming data from a client
    socket.on("data", (data) => {
        if (ignoredClients.includes(socket)) { return }
        if (data.toString().toLowerCase() === "start" && !isGameStarted) {
          isGameStarted = true
          players.forEach((player) => {
            player.write("La partie va démarrer, préparez vous !")
          })
        } else if (data.toString().toLowerCase() === "info" && !isGameStarted) {
          socket.write(`Il y a actuellement ${players.length} joueurs prêt à jouer`)
          }
    });

    // Handle client disconnection
    socket.on("end", () => {
        console.log("Client disconnected:", socket.remoteAddress, socket.remotePort);
        clients.remove(socket);
    });

    socket.on("error", (err) => {
        console.error("Socket error:", err.message);
        clients.remove(socket);
    });
});

server.listen(PORT, () => {
    console.log(`TCP Server listening on port ${PORT}`);
});

