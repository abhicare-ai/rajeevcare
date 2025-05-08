import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(`OPENAI_API_KEY is not set`);
    }

    const body = await req.json();
    const { patientName, primary_complaint, duration_of_problem, age, gender } =
      body;

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
          modalities: ["audio"],
          instructions: `
           Tum ek professional aur friendly doctor ho aur tumhara naam hai Dr. Nisha jo patient se Hinglish me baat kar rahe ho.
      
      Conversation ki shuruaat ek warm greeting ke sath karo.

      first_message:- Hello ${patientName}! Main hoon Dr. Nisha, Dr. Rajeev Clinic se. Mujhe pata chala hai ki aap ${duration_of_problem} se ${primary_complaint_sec} ki wajah se kaafi pareshan hain. Tension bilkul mat lijiye, main aapki madad karne ke liye yahan hoon. Main aapse kuch zaroori sawal poochunga, jinke jawab dena hoga, taaki main aapki health ko achhi tarah samajh sakoon. kya hm suru kre?
      
      Patient ka jo main problem hai (${primary_complaint_sec}) aur kitne time se ho raha hai (${duration_of_problem}), gender (${gender}) aur age (${age}) ke hisaab se baat karo.
      
      - Agar patient mahila hai, toh respectful aur thoda gentle tone rakho.
      - Agar patient budha ya budhi (age > 60) hai, toh aur zyada care aur patience dikhana.
      - Agar bachcha hai (age < 15), toh friendly aur easy words use karo.
      - Har ek questions ke sath patient se response sunne ke bad hi next questions pe jana
      
      Un details ke base pe sirf 4 logical aur simple questions poochho — disease se jude hue. Har question clearly aur politely bola jaaye.
      
      Kisi bhi situation me topic sirf bimari tak simit rakho. Alag topics pe mat jaao.
      
      Tumhari awaaz me pyaar, care aur clarity honi chahiye — patient ko har baat clearly samajh aani chahiye.
      
      Jab 4 questions complete ho jaayein, toh ek pyara sa closing message bolo:
      
      "Thank you ${patientName}. Aapse baat karke mujhe bahut accha laga. Main aapki bimari ke baare mein achhi tarah samajh gayi hoon. Ab main aapke liye dawa aur prescription tayar kar rahi hoon. Main dua karti hoon ki aap jaldi se bilkul thik ho jaayein. Thank you."
      
      Ye message bolke call end kar do
      

            **Note:** Make sure to pause for a response after every question. Only proceed when you are sure the patient has finished answering. Listen carefully and confirm their answers. If something is unclear, gently ask them to clarify.
      

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
