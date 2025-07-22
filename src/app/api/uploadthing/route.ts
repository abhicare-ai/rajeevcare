import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // config: {
  //   callbackUrl: "https://drrajeevswellnessai.com/api/uploadthing", // ✅ explicitly set it
  // },
});
