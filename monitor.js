const axios = require("axios");
const { sendAlert } = require("./emailService");
const fs = require("fs");
const path = require("path");

const WEBSITES_FILE = path.join(__dirname, "websites.json");

exports.checkWebsites = async () => {
  const websites = JSON.parse(fs.readFileSync(WEBSITES_FILE));
  for (const url of websites) {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      console.log(`${url} is UP - Status: ${response.status}`);
    } catch (err) {
      console.log(`${url} is DOWN`);
      await sendAlert(url);
    }
  }
};
