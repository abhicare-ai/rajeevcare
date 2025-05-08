// "use server";

// import { OpenAI } from "@/hooks/openAI";
// import { prisma } from "@/lib/prisma";
// import {
//   prescriptionGeneratorSchema,
//   PrescriptionGeneratorValues,
// } from "@/lib/vallidaion";

// export async function prescriptionGenerator(
//   audioFile: PrescriptionGeneratorValues,
// ) {
//   const { patientId, file } = prescriptionGeneratorSchema.parse(audioFile);

//   const arrayBuffer = await file.arrayBuffer();

//   const audio = new Uint8Array(arrayBuffer);

//   // get trascipt audio
//   const audioTranscipt = await OpenAI.getAudioTranscription(
//     process.env.AZURE_DEPLOYMENT_NAME!,
//     audio,
//   );

//   // get result from OpenAI
//   const PriscitonsResult = await OpenAI.getChatCompletions(
//     process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME!,
//     [
//       {
//         role: "system",
//         content:
//           "You are a homeopathy doctor. Always speak in simple English so that patients can understand easily. Suggest homeopathic treatment only.",
//       },
//       {
//         role: "user",
//         content: audioTranscipt.text,
//       },
//     ],
//   );

//   const presciptionGenerate = PriscitonsResult.choices[0].message?.content;

//   if (!presciptionGenerate) {
//     return {};
//   }

//   const result = await prisma.prisciption.create({
//     data: {
//       apptId: patientId,
//       patientPaln: presciptionGenerate,
//     },
//   });

//   return result;
// }
