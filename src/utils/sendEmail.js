import nodemailer from "nodemailer";
import environmentVariables from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: environmentVariables.service, // or your email provider
  auth: {
    user: environmentVariables.email,
    pass: environmentVariables.appPassword,
  },
});


export const firstUserService = (name, email) => {
  const mailOptions = {
    from: environmentVariables.email,
    to: email,
    subject: `Welcome to Eukaai, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #004b23;">Welcome to Eukaai, ${name}!</h2>
        <p>We are thrilled to have you on board.</p>
        
        <h3 style="color: #004b23;">Your Ultimate Interview Guide</h3>
        <ul>
          <li>Generate a complete interview guide for any role.</li>
          <li>Crack any interview by having all information in a single source.</li>
          <li>Write and save notes for a particular module or the entire guide.</li>
          <li>Access curated questions and answers for interviews.</li>
          <li>Check sources from where the information is obtained.</li>
        </ul>

        <p>Start exploring and get ready to excel in your interviews!</p>
        <p style="margin-top: 20px;">Best Regards,<br/>The Eukaai Team</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("User registration email failed:", error);
    } else {
      console.log("User registration email sent:", info.response);
    }
  });
};
