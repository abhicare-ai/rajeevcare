import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function DesesSkelaton() {
  return (
    <div className="space-y-5 p-3">
      <DeasesLoadingSkelation />
      <DeasesLoadingSkelation />
      <DeasesLoadingSkelation />
      <DeasesLoadingSkelation />
      <DeasesLoadingSkelation />
    </div>
  );
}

function DeasesLoadingSkelation() {
  return (
    <div className="bg-card w-full animate-pulse space-y-3 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
      <Skeleton className="h-16 rounded" />
    </div>
  );
}
