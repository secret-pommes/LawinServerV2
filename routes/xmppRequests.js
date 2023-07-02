const express = require("express");
const app = express();

app.get("/xmpp/clients", (req, res) => {
  res.type("application/json");

  let data = JSON.stringify(
    {
      amount: global.Clients.length,
      clients: global.Clients.map((i) => i.displayName),
    },
    null,
    2
  );

  res.send(data);
});

module.exports = app;