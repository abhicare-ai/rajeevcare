import Feedbacks from "@/components/feebBacks/Feedbacks";
import UserAvatar from "@/components/UserAvatar";
import { DoctornData, PrisciptionData } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

import Link from "next/link";
import { useState } from "react";

interface DeasesListProps {
  deasesList: DoctornData;
 
}

export default function DeasesListForm({ deasesList }: DeasesListProps) {
  

  return (
    <article className="group/post bg-card space-y-5 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/clinic/patient/${deasesList.Doctor.id}/patientdata/${deasesList.id}`}
          >
            <UserAvatar avatarUrl={deasesList.Doctor.patinetAvatar} />
          </Link>
          <div>
            <Link
              href={`/clinic/patient/${deasesList.Doctor.id}/patientdata/${deasesList.id}`}
              className="uppercase"
            >
              {deasesList.atientFullName}
            </Link>
            <Link
              href={`/clinic/patient/${deasesList.Doctor.id}/patientdata/${deasesList.id}`}
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
            {deasesList.atientFullName}
          </span>{" "}
          is suffering from:
        </div>
        <div className="font-bold break-words whitespace-pre-line">
          ({deasesList.list_complaints_in_order_of_priority})
        </div>
      </div>

    </article>
  );
}

