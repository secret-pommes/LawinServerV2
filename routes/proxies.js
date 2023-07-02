const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.get("/api/fmodproxy", (req, res) => {
  res.json(["Online!"]);
});

app.get("/api/proxy/nintendo_v7", (req, res) => {
  res.status(204);
  res.end();
})

app.post("/api/proxy/nintendo_v7", (req, res) => {
  res.status(204);
  res.end();
})

app.get("/api/proxy/file/:file", (req, res) => {
  let file = path.join(
    __dirname,
    `../responses/proxies/public_files/${req.params.file}`
  );
  if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
    res.json(["Error 404! | File not found!"]);
  }
});

// FMod (Proxy) Content
app.get("/api/fmodproxy/content", (req, res) => {
  // FMod contentpages
  res.sendFile(path.join(__dirname, "../responses/fmodcontent.json"));
});

// Beyond (Proxy) Content
app.get("/api/beyondproxy/content", (req, res) => {
  // Beyond contentpages
  res.sendFile(path.join(__dirname, "../responses/beyondcontent.json"));
})

module.exports = app;
