const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { checkWebsites } = require("./monitor");
const cron = require("node-cron");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const WEBSITES_FILE = path.join(__dirname, "websites.json");

// Homepage to list/add/remove websites
app.get("/", (req, res) => {
  const websites = JSON.parse(fs.readFileSync(WEBSITES_FILE));
  res.render("index", { websites });
});

app.post("/add", (req, res) => {
  const websites = JSON.parse(fs.readFileSync(WEBSITES_FILE));
  if (!websites.includes(req.body.url)) {
    websites.push(req.body.url);
    fs.writeFileSync(WEBSITES_FILE, JSON.stringify(websites, null, 2));
  }
  res.redirect("/");
});

app.post("/remove", (req, res) => {
  let websites = JSON.parse(fs.readFileSync(WEBSITES_FILE));
  websites = websites.filter(url => url !== req.body.url);
  fs.writeFileSync(WEBSITES_FILE, JSON.stringify(websites, null, 2));
  res.redirect("/");
});

// Run check every 10 minutes
cron.schedule("*/10 * * * *", () => {
  console.log("Running scheduled website check...");
  checkWebsites();
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
