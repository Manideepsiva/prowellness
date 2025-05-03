const nodemailer = require("nodemailer");

async function sendVerificationEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "msiva0100@gmail.com",
      pass: "smfz ennz kbyu hzkh",
    },
  });

  const mailOptions = {
    from:"msiva0100@gmail.com" ,
    to: "sivamanideep7@gmail.com",
    subject: "Verify Your Email",
    html: `<p>Click the link below to verify your email:</p>`,
  };

  await transporter.sendMail(mailOptions);

}


sendVerificationEmail();
