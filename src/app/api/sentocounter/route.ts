// import { NextResponse } from "next/server";
// import twilio from "twilio";

// const accountSid = process.env.TWILIO_SID!;
// const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const client = twilio(accountSid, authToken);

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { casehistory, inpute } = body;

//   try {
//     const response = await client.messages.create({
//       to: "whatsapp:+918709692232", // e.g., +91xxxxxxxxxx
//       from: "whatsapp:+15557486713",
//       contentSid: "HXc91152fe16da4f322680ef3d35743277", // Your approved template SID
//       contentVariables: JSON.stringify({
//         "1": casehistory.toString(),
//         "2": inpute.toString(),
//       }),
//     });

//     return NextResponse.json({ success: true, sid: response });
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
import SetTocounter from "../../../../email/SetTocounter";
export async function POST(req: Request) {
  const body = await req.json();
  const { casehistory, inpute, to } = body;
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
    SetTocounter({
      link: inpute,
      patientName: casehistory,
    }),
  );

  // ✅ Email Options
  const mailOptions = {
    from: `"Dr. Rajeev's Wellness AI" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `New Prescription Generated – Case History ID: ${casehistory}`,
    html: emailHtml,
  };

  // ✅ Email Send karo (await lagao)
  await transporter.sendMail(mailOptions);

  return NextResponse.json({
    success: true,
    message: "Email send successfully to medicine counter!",
  });
}
