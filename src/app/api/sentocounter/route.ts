import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import SetTocounter from "../../../../email/SetTocounter";
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
    SetTocounter({
      link: inpute,
      patientName: patientName,
    }),
  );

  // ✅ Email Options
  const mailOptions = {
    from: `"Dr Rajeev's Wellness Ai👨‍💻" <${process.env.EMAIL_USER}>`,
    to: `counterahh@gmail.com `,
    subject: `${patientName} :- Prescription Data`,
    html: emailHtml,
  };

  // ✅ Email Send karo (await lagao)
  const message = await transporter.sendMail(mailOptions);

  return Response.json(message);
}
