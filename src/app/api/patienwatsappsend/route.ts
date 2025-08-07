// app/api/send-sms/route.ts
// import { NextResponse } from "next/server";
// import twilio from "twilio";

// const accountSid = process.env.TWILIO_SID!;
// const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const client = twilio(accountSid, authToken);

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { id, to, casehistory } = body;

//   try {
//     const response = await client.messages.create({
//       to: `whatsapp:${to}`, // e.g., +91xxxxxxxxxx
//       from: "whatsapp:+15557486713",
//       contentSid: "HXc91152fe16da4f322680ef3d35743277",
//       contentVariables: JSON.stringify({
//         "1": casehistory.toString(),
//         "2": `https://drrajeevswellnessai.com/sendtoall/${id}`,
//       }),
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
import PatientEmail from "../../../../email/PatientWastsap";
export async function POST(req: Request) {
  const body = await req.json();
  const { id, to, casehistory, patienName } = body;
  console.log(to);
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
    PatientEmail({
      patientId: casehistory,
      link: `https://drrajeevswellnessai.com/sendtoall/${id}`,
      patienName,
      to,
    }),
  );

  // ✅ Email Options
  const mailOptions = {
    from: `"Dr. Rajeev's Wellness AI" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `Your Prescription is Ready – Case ID: ${casehistory}`,
    html: emailHtml,
  };

  // ✅ Email Send karo (await lagao)
  await transporter.sendMail(mailOptions);

  return NextResponse.json({
    success: true,
    message: `Email send successfully to ${patienName} !`,
  });
}
