import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { AppoinmentsPage } from "@/lib/types";
import { deletAppoinmet } from "./actions";
import { toast } from "sonner";

export function useDeleteApptMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletAppoinmet,
    onSuccess: async (deletedAppt) => {
      const queryFilter = { queryKey: ["appointmet-feed"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<AppoinmentsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              appoinments: page.appoinments.filter(
                (p) => p.id !== deletedAppt.id,
              ),
            })),
          };
        },
      );

      toast.success("Post deleted");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to delete post. Please try again.");
    },
  });

  return mutation;
}
