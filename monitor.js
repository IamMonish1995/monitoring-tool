const axios = require("axios");
const { sendAlert } = require("./emailService");
const fs = require("fs");

exports.checkWebsites = async () => {
  const websites = JSON.parse(fs.readFileSync("websites.json"));
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
