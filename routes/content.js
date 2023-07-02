const express = require("express");
const app = express.Router();
const functions = require("../structs/functions.js");
const path = require("path");

// website of lawinserver v1 (updated for v2)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../responses/index.html"));
});
app.get("/lawinserver/assets/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../responses/reqs/styles.css"));
});
app.get("/lawinserver/assets/index.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../responses/reqs/index.css"));
});
app.get("/lawinserver/assets/jquery.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../responses/reqs/jquery.js"));
});
app.get("/lawinserver/assets/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../responses/reqs/script.js"));
});
app.get("/lawinserver/assets/fiddlerscript", (req, res) => {
  res.sendFile(path.join(__dirname, "../responses/reqs/script.txt"));
});

// jane
app.get("/love-jane", (req, res) => {
  res.sendFile(path.join(__dirname, "../responses/jane.jpg"));
});

// fortnite contentpages
app.get("/content/api/pages/*", async (req, res) => {
  const contentpages = functions.getContentPages(req);

  res.json(contentpages);
});

module.exports = app;
