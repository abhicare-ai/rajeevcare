"use client";
import InfinitScrollContainer from "@/components/InfinitScrollContainer";
import kyInstance from "@/lib/ky";
import { PrisciptionPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import DeasesList from "./DeasesList";
import DesesSkelaton from "./DesesSkelaton";
import DeasesListForm from "./DeasesListForm";

interface PatientDeasesProps {
  patinetId: string;
}

export default function PatientDeasesForm({ patinetId }: PatientDeasesProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["appointmet-feedb", "patient-deaseForm", patinetId],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/patient/${patinetId}/deaseForm`,
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PrisciptionPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.prisciption) || [];

  if (status === "pending") {
    return <DesesSkelaton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-muted-foreground text-center">
        This patient hasn&apos;t posted any disease yet.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-destructive text-center">
        An error occurred while loading diseases.
      </p>
    );
  }

  return (
    <InfinitScrollContainer
      className="space-y-5 p-3"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <DeasesListForm key={post.id} deasesList={post}/>
      ))}

      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfinitScrollContainer>
  );
}
