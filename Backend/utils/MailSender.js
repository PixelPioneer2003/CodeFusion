const nodemailer = require("nodemailer");
const mailSender = async (email, title, body) => {
  try {
    // transporter

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // send mail
    let info = await transporter.sendMail({
      from: "Nikhil from CODEFUSION",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("info", info);
    return info;
  } catch (error) {
    console.log(error);
  }
};
module.exports = mailSender;
