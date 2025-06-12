// import { NextRequest } from "next/server";
// import twilio from "twilio";

// const accountSid = process.env.TWILO_ACCOUNT_SID;
// const authToken = process.env.TWILO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

// export async function POST(req: NextRequest) {
//   try {
//     const { inpute } = await req.json();

//     const message = await client.messages.create({
//       body: `Here is your link:\n${inpute}`,

//       from: "whatsapp:+14155238886",
//       to: "whatsapp:+919263049994",
//     });

//     return Response.json(message);
//   } catch (err) {
//     console.error("Error sending message", err);
//     return Response.json({ error: "Message not sent" }, { status: 500 });
//   }
// }

import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import Sendtodr from "../../../../email/Sendtodr";
import { render } from "@react-email/components";
export async function POST(req: NextRequest) {
  const { inpute, patientName } = await req.json();

  // ✅ Nodemailer Transporter Setup for Zoho Mail
  const transporter = nodemailer.createTransport({
     service: "gmail",
  
    auth: {
      user: "abhihomeoit@gmail.com", // ✅ .env se email lo
      pass:"ttrj rwcs fhsu yvde", // ✅ .env se App Password lo (Zoho ke app password)
    },
  });


  const emailHtml = await render(
    Sendtodr({
      link: inpute,
      patientName: patientName,
    }),
  );

  // ✅ Email Options
  const mailOptions = {
    from: `"Dr Rajeev's Wellness Ai👨‍💻" <${process.env.EMAIL_USER}>`,
    to: `abhihomoeo@gmail.com`,
    subject: `${patientName} Prescription Data`,
    html: emailHtml,
  };

  // ✅ Email Send karo (await lagao)
  const message = await transporter.sendMail(mailOptions);

  return Response.json(message);
}
