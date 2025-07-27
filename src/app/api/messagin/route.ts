// // app/api/send-sms/route.ts
// import { NextResponse } from "next/server";
// import twilio from "twilio";

// const accountSid = process.env.TWILIO_SID!;
// const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const client = twilio(accountSid, authToken);

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { casehistory,inpute } = body;

//   try {

//     const response = await client.messages.create({
//       to: `whatsapp:+919263049994`, // e.g., +91xxxxxxxxxx
//       from: "whatsapp:+15557486713",
//       body: `A new prescription has been generated for Case History ID ${casehistory}:\n${inpute}`,
//     });

//     return NextResponse.json({ success: true, sid: response.sid });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import SendToDrRajeev from "../../../../email/Sendtodr";
export async function POST(req: Request) {
  const body = await req.json();
  const { casehistory, inpute } = body;
  // ✅ Nodemailer Transporter Setup for Zoho Mail
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com", // ✅ Ensure it's smtp.zoho.com  smtp.gmail.com
    port: 587, // ✅ SSL ke liye 465 ya TLS ke liye 587
    secure: false, // ✅ 465 port ke liye true, 587 ke liye false
    auth: {
      user: process.env.EMAIL_USER, // ✅ .env se email lo
      pass: process.env.EMAIL_PASS, // ✅ .env se App Password lo (Zoho ke app password)
    },
  });

  const emailHtml = await render(
    SendToDrRajeev({
      link: inpute,
      patientName: casehistory,
    }),
  );

  // ✅ Email Options
  const mailOptions = {
    from: `"Dr. Rajeev's Wellness AI" <${process.env.EMAIL_USER}>`,
    to: `abhihomeo@gmail.com`,
    subject: `New Prescription Generated – Case History ID: ${casehistory}`,
    html: emailHtml,
  };

  // ✅ Email Send karo (await lagao)
  await transporter.sendMail(mailOptions);

  return NextResponse.json({
    success: true,
    message: "Email send successfully to Dr Rajeev sir!",
  });
}
