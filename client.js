const net = require("net");
const readline = require("readline");

const PORT = 65432;
const HOST = "localhost";

const client = new net.Socket();
client.connect(PORT, HOST, () => {
    console.log(`Connected to server at ${HOST}:${PORT}`);
});

// Handle incoming messages from server
client.on("data", (data) => {
    console.log(`\nServer: ${data.toString().trim()}`);
});

// Handle connection closed
client.on("close", () => {
    console.log("Connection closed by server.");
    process.exit(0);
});

// Handle errors
client.on("error", (err) => {
    console.error("Socket error:", err.message);
});

// Setup readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Read user input and send it to the server
rl.on("line", (message) => {
    if (message.toLowerCase() === "exit") {
        console.log("Adieu !!");
        client.end();
        rl.close();
        return;
    }
    client.write(message);
});

