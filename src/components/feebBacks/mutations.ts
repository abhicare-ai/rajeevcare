import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitFeedBack } from "./actions";
import { FeedbacksPage } from "@/lib/types";
import { toast } from "sonner";

export function useSubmitFeedBackMutation(deasesId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitFeedBack,
    onSuccess: async (newComment) => {
      const queryKey: QueryKey = ["feedbacks", deasesId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<FeedbacksPage, string | null>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  previousCursor: firstPage.previousCursor,
                  Feedback: [...firstPage.Feedback, newComment],
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast.success("Feedback created");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to submit Feedback. Please try again.");
    },
  });

  return mutation;
}

// export function useDeleteCommentMutation() {
//   const { toast } = useToast();

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: deleteComment,
//     onSuccess: async (deletedComment) => {
//       const queryKey: QueryKey = ["comments", deletedComment.postId];

//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
//         queryKey,
//         (oldData) => {
//           if (!oldData) return;

//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               previousCursor: page.previousCursor,
//               comments: page.comments.filter((c) => c.id !== deletedComment.id),
//             })),
//           };
//         },
//       );

//       toast({
//         description: "Comment deleted",
//       });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "Failed to delete comment. Please try again.",
//       });
//     },
//   });

//   return mutation;
// }
