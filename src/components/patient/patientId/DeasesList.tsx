import Feedbacks from "@/components/feebBacks/Feedbacks";
import UserAvatar from "@/components/UserAvatar";
import { PrisciptionData } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

import Link from "next/link";
import { useState } from "react";

interface DeasesListProps {
  deasesList: PrisciptionData;
}

export default function DeasesList({ deasesList }: DeasesListProps) {
  const primary_complaint = deasesList.primary_complaint.join(",  ");
  const [showFeedBacks, setShowFeedBacks] = useState(false);

  return (
    <article className="group/post bg-card space-y-5 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/clinic/patient/${deasesList.appointment.id}/patientdata/${deasesList.id}`}
          >
            <UserAvatar avatarUrl={deasesList.appointment.patinetAvatar} />
          </Link>
          <div>
            <Link
              href={`/clinic/patient/${deasesList.appointment.id}/patientdata/${deasesList.id}`}
              className="uppercase"
            >
              {deasesList.papatientName}
            </Link>
            <Link
              href={`/clinic/patient/${deasesList.appointment.id}/patientdata/${deasesList.id}`}
              className="text-muted-foreground block text-sm hover:underline"
            >
              {formatDate(deasesList.createdAt)}
            </Link>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-muted-foreground">
          <span className="font-bold uppercase">
            {deasesList.papatientName}
          </span>{" "}
          is suffering from:
        </div>
        <div className="font-bold break-words whitespace-pre-line">
          ({primary_complaint})
        </div>
      </div>

      <div className="border-t pt-3">
        <FeedBackButton
          presciton={deasesList}
          onClick={() => setShowFeedBacks(!showFeedBacks)}
        />
      </div>

      {showFeedBacks && <Feedbacks presciton={deasesList} />}
    </article>
  );
}

interface FeedBackButtonProps {
  presciton: PrisciptionData;
  onClick: () => void;
}
function FeedBackButton({ presciton, onClick }: FeedBackButtonProps) {
  console.log(presciton);
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2"
    >
      <MessageSquare className="size-5" />
      <span className="text-sm font-medium tabular-nums">
        {presciton._count.Feedback}{" "}
        <span className="hidden sm:inline">Feedbacks</span>
      </span>
    </button>
  );
}
