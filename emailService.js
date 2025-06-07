const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendAlert = async (url) => {
  await transporter.sendMail({
    from: `"Site Monitor" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `Website Down: ${url}`,
    text: `The website ${url} is currently unreachable.`,
  });
};
