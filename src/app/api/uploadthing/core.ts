import { validateRequest } from "@/authSlice";
import { extractTextAndDisease } from "@/hooks/tools/patientTools";
import { prisma } from "@/lib/prisma";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  attachment: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const { user } = await validateRequest();
      console.log("user", user);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(" welcome to oncomplete", metadata.userId);
      console.log("file 1", file);
      const resArray = await extractTextAndDisease([file.ufsUrl]);

      const res = resArray[0];
      console.log("Upload Completed File:", file);
      console.log("Extracted ResArray:", resArray);
      console.log("Final res:", res);
      const media = await prisma.media.create({
        data: {
          url: file.ufsUrl,
          type: file.type.startsWith("image") ? "IMAGE" : "PDF",
          labReportFor: res.labReportFor.join(", "),
          imgText: res.imgText,
        },
      });
      console.log("media", media);
      return { mediaId: media.id };
    }),
  genratedAudio: f({
    audio: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      // This code runs on your server before upload
      const user = auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
