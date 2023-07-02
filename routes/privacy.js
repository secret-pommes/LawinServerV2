const express = require("express");
const app = express();

app.get("/fortnite/api/game/v2/privacy/account/:accountId", (req, res) => {
  res.status(204);
  res.end();
});

module.exports = app;
