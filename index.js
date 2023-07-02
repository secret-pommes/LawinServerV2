const WebSocket = require("ws").Server;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");

const PORT = require("./Config/config.json").server.PORT;

const config = JSON.parse(fs.readFileSync("./Config/config.json").toString());
const log = require("./structs/log.js");
const error = require("./structs/error.js");
const functions = require("./structs/functions.js");
const xmpp = require("./xmpp/xmpp.js");
const tokens = JSON.parse(
  fs.readFileSync("./tokenManager/tokens.json").toString()
);

global.xmppDomain = "prod.ol.epicgames.com"; // XMPP Domain
global.JWT_SECRET = functions.MakeID(); // SECRET
global.accessTokens = tokens.accessTokens; // CURRENT TOKENS
global.refreshTokens = tokens.refreshTokens; // CURRENT REFRESH TOKENS
global.clientTokens = tokens.clientTokens; // CURRENT CLIENT TOKENS
global.Clients = []; // ONLINE XMPP CLIENTS
global.MUCs = {}; // CURRENT MULTI-USER-CHATS
global.exchangeCodes = []; // CURRENT EXCHANGE-CODES

app.use(rateLimit({ windowMs: 0.5 * 60 * 1000, max: 45 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const wss = new WebSocket({
  server: app.listen(PORT, () => {
    log.backend(
      "LawinServerV2 started listening on port: " + PORT
    );
    require("./DiscordBot/index.js"); // starting discord bot
    xmpp(wss); // starting xmpp N matchmaker
  }),
});

mongoose.connect(config.mongodb.database, () => {
  log.backend("App successfully connected to MongoDB!");
});
mongoose.connection.on("error", (err) => {
  log.error(
    "MongoDB failed to connect, please make sure you have MongoDB installed and running."
  );
  throw err;
});

if (!fs.existsSync("./ClientSettings")) fs.mkdirSync("./ClientSettings");
fs.writeFileSync("./tokenManager/tokens.json", JSON.stringify(tokens, null, 2));

for (let tokenType in tokens) {
  for (let tokenIndex in tokens[tokenType]) {
    let decodedToken = jwt.decode(
      tokens[tokenType][tokenIndex].token.replace("eg1~", "")
    );

    if (
      functions
        .DateAddHours(
          new Date(decodedToken.creation_date),
          decodedToken.hours_expire
        )
        .getTime() <= new Date().getTime()
    ) {
      tokens[tokenType].splice(Number(tokenIndex), 1);
    }
  }
}

fs.readdirSync("./routes").forEach((fileName) => {
  app.use(require(`./routes/${fileName}`));
});

// if endpoint not found, return this error
app.use((req, res, next) => {
  error.createError(
    "errors.com.epicgames.common.not_found",
    "Sorry the resource you were trying to find could not be found",
    undefined,
    1004,
    undefined,
    404,
    res
  );
});
