import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { toast } from "sonner";

export interface Attachment {
  file: File;
  mediaId?: string;
  isUploading?: boolean;
  imgUrl?: string;
}
export default function useMediaUplods() {
  const [attachment, setAttachment] = useState<Attachment[]>([]);

  const [uploadProgress, setUploadProgress] = useState<number>();

  const { startUpload, isUploading } = useUploadThing("attachment", {
    onBeforeUploadBegin(files) {
      const renamedFiles = files.map((file) => {
        const extension = file.name.split(".").pop();

        return new File(
          [file],
          `attachment_${crypto.randomUUID()}.${extension}`,
          {
            type: file.type,
          },
        );
      });

      setAttachment((prev) => [
        ...prev,
        ...renamedFiles.map((file) => ({ file, isUploading: true })),
      ]);

      return renamedFiles;
    },

    onUploadProgress: setUploadProgress,
    onClientUploadComplete(res) {
      setAttachment((prev) =>
        prev.map((a) => {
          const uploadResult = res.find((r) => r.name === a.file.name);

          if (!uploadResult) return a;

          return {
            ...a,
            mediaId: uploadResult.serverData.mediaId,
            isUploading: false,
          };
        }),
      );
    },
    onUploadError(e) {
      setAttachment((prev) => prev.filter((a) => !a.isUploading));

      toast.error(e.message);
    },
  });

  function handleStartUpload(files: File[]) {
    if (isUploading) {
      toast.error("Please wait for the current upload finish.");
      return;
    }

    if (attachment.length + files.length > 5) {
      toast.error("You can only upload up to 5 lab report.");
      return;
    }

    startUpload(files);
  }

  function removeAttachment(fileName: string) {
    setAttachment((prev) => prev.filter((a) => a.file.name !== fileName));
  }

  function reset() {
    setAttachment([]);
    setUploadProgress(undefined);
  }

  return {
    startUpload: handleStartUpload,
    attachment,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset,
  };
}
