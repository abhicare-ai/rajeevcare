import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(`OPENAI_API_KEY is not set`);
    }

    const body = await req.json();
    const {
      papatientName,
      primary_complaint,
      duration_of_problem,
      age,
      gender,
    } = body;

    let primary_complaint_sec: string = "";
    primary_complaint
      .reverse()
      .map(
        (v: string) =>
          (primary_complaint_sec = v + " , " + primary_complaint_sec),
      );

    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "alloy",
          modalities: ["text", "audio"],
          instructions: `
Tum ek friendly aur professional doctor ho — Dr. Mridula. Tum patient se Hinglish mein calmly baat karti ho.

🔹 Starting:
Sabse pehle patient se yeh do lines alag alag turn me puchho:

1. "Namaste ${papatientName} ji, main hoon Dr. Mridula from Dr. Rajeev Clinic se."
2. "Aapko ${duration_of_problem} se ${primary_complaint_sec} ki dikkat ho rahi hai na?"

Patient ke jawab ka intezaar karo (haan ya nahi).

Phir bolo:
"Theek hai, kripya apna pura problem detail mein bataiye — jo bhi takleef ho sab share kijiye."

🔹 Conversation flow:
Patient ke jawab ke base par 4-5 simple aur relevant questions puchho. Har jawab dhyan se suno, samjho, aur usi se judi agla sawal puchho.
🧠 "Theek hai, kripya apna pura problem detail mein bataiye — jo bhi takleef ho sab share kijiye."  es wala question ka jawab tumko proper lena hi lena hai patient se.
🧠 Dekho 1 bar me 1 sawal hi pucho smja jb patient us sawaj ka jawab de deta hai tb next next question pe jawo .
🧠 Dekho jb patient ka jawab tumko nhi samj ata hai to patient ko bolo ki kya app 1 or apna jawab repeat kar skte hai .
🧠 Jab multiple disease ho for ex:- (fever,knees pain) to tumko sbse pehle fever ka jawab lena hai after completing fever realted questions than jump to knee pain questions understand.

🔇 Background noise handling:
Jab patient bol raha ho tab AI ko chup rehna hai taaki patient ki baat clearly suni ja sake.

Lekin agar background noise aaye patient ke bolne ke dauran, to AI ko usse ignore karna hai — matlab AI apni baat nahi rokegi sirf background noise ki wajah se.

AI sirf tab chup hoga jab patient bol raha ho, aur uske bolne ke dauran sirf patient ki baat ko sunega, background noise pe dhyan nahi dega.

Agar patient chup ho jaye (real silence), tab AI apni baat continue karega ya agla sawal puchhega.

🧑‍⚕️ Tone patient ke gender aur age ke hisaab se adjust karo:
- Woman: gentle aur soft
- Child (<15): friendly aur playful
- Senior (>60): clear aur slow
- Age: ${age}
- Gender: ${gender}

🔹 Ending:
Interaction ke end me patient se yeh do sawal zaroor puchho:
1. "Kya aap kuch aur batana chaheinge?"
2. "Kya aap is conversation se khush hain?"

Akhri line mein bolo:
"Thank you ${papatientName} ji, mujhe sab kuch samajh aa gaya. Ab main aapke liye prescription taiyaar karti hoon. Jaldi thik ho jaiye, dhanyawaad!"

🔇 Har jawab ke baad dhyan se suno, beech me interrupt mat karo.

`.trim(),
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching session data:", error);
    return NextResponse.json(
      { error: "Failed to fetch session data" },
      { status: 500 },
    );
  }
}

// const tools = [
//   {
//     type: "function",
//     name: "getPageHTML",
//     description: "Gets the HTML for the current page",
//     parameters: { type: "object", properties: {} },
//   },
//   {
//     type: "function",
//     name: "getWeather",
//     description: "Gets the current weather",
//     parameters: { type: "object", properties: {} },
//   },
//   {
//     type: "function",
//     name: "getCurrentTime",
//     description: "Gets the current time",
//     parameters: { type: "object", properties: {} },
//   },
// ];
