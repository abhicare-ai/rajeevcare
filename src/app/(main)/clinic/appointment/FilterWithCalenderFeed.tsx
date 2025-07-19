"use client";

import Appointment from "@/components/clinic/appointmets/Appointment";
import InfinitScrollContainer from "@/components/InfinitScrollContainer";
import kyInstance from "@/lib/ky";
import { AppoinmentsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import AppointmetLodingSkelator from "../../../../components/clinic/appointmets/AppointmetLodingSkelator";

interface FilterWithCalenderFeedProps {
  fromdate: Date;
  todate: Date;
}

export default function FilterWithCalenderFeed({
  fromdate,
  todate,
}: FilterWithCalenderFeedProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["appointmet-feed", "throwdatewise", fromdate, todate],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(`/api/clinic/appointment/filterwithcalender`, {
          searchParams: {
            fromdate: fromdate?.toISOString(),
            todate: todate?.toISOString(),
            ...(pageParam ? { cursor: pageParam } : {}),
          },
        })
        .json<AppoinmentsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.appoinments) || [];

  if (status === "pending") {
    return <AppointmetLodingSkelator />;
  }
  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-muted-foreground text-center">
        No appointments faund.
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="text-destructive text-center">
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
