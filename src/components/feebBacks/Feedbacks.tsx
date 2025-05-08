import kyInstance from "@/lib/ky";
import { FeedbacksPage, PrisciptionData } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import FeedBackInput from "./FeedBackInput";
import FeedBackData from "./FeedBackData";

interface FeedbacksProps {
  presciton: PrisciptionData;
}

export default function Feedbacks({ presciton }: FeedbacksProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["feedbacks", presciton.id],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            `/api/patient/${presciton.id}/feedback`,
            pageParam ? { searchParams: { cursor: pageParam } } : {},
          )
          .json<FeedbacksPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (firstPage) => firstPage.previousCursor,
      select: (data) => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const comments = data?.pages.flatMap((page) => page.Feedback) || [];

  return (
    <div className="space-y-3">
      <FeedBackInput presciton={presciton} />
      {hasNextPage && (
        <Button
          variant="link"
          className="mx-auto block"
          disabled={isFetching}
          onClick={() => fetchNextPage()}
        >
          Load previous comments
        </Button>
      )}
      {status === "pending" && <Loader2 className="mx-auto animate-spin" />}
      {status === "success" && !comments.length && (
        <p className="text-muted-foreground text-center">No comments yet.</p>
      )}
      {status === "error" && (
        <p className="text-destructive text-center">
          An error occurred while loading comments.
        </p>
      )}
      <div className="divide-y">
        {comments.map((comment) => (
          <FeedBackData key={comment.id} feedback={comment} />
        ))}
      </div>
    </div>
  );
}
