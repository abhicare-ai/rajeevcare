"use client";

import Appointment from "@/components/clinic/appointmets/Appointment";
import InfinitScrollContainer from "@/components/InfinitScrollContainer";
import kyInstance from "@/lib/ky";
import { AppoinmentsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import AppointmetLodingSkelator from "../clinic/appointmets/AppointmetLodingSkelator";

interface SearchFeedProps {
  query: string;
}
export default function SearchFeed({ query }: SearchFeedProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["appointmet-feed", "search", query],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(`/api/search`, {
          searchParams: {
            search: query,
            ...(pageParam ? { cursor: pageParam } : {}),
          },
        })
        .json<AppoinmentsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    //gcTime: 0, //compnet ka page band hone pe pura deta hta deta hai
    // enabled: !!query,
  });

  const posts = data?.pages.flatMap((page) => page.appoinments) || [];

  if (status === "pending") {
    return <AppointmetLodingSkelator />;
  }
  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-muted-foreground p-5 text-center">
        No appointments faund.
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="text-destructive p-5 text-center">
        An error occurred while loading appointments.
      </p>
    );
  }
  return (
    <InfinitScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <Appointment appt={posts} />
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfinitScrollContainer>
  );
}
