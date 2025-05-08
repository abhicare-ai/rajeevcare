import { FeedbacksData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatDate } from "@/lib/utils";

interface FeedBackDataProps {
  feedback: FeedbacksData;
}
export default function FeedBackData({ feedback }: FeedBackDataProps) {
  return (
    <div className="group/comment flex gap-3 py-3">
      <span className="hidden sm:inline">
        <Link
          href={`/clinic/patient/${feedback.appointment.id}/patientdata/${feedback.deasesId}`}
        >
          <UserAvatar
            avatarUrl={feedback.appointment.patinetAvatar}
            size={40}
          />
        </Link>
      </span>
      <div>
        <div className="flex items-center gap-1 text-sm">
          <Link
            href={`/clinic/patient/${feedback.appointment.id}/patientdata/${feedback.deasesId}`}
            className="font-medium hover:underline"
          >
            {feedback.appointment.patientName}
          </Link>

          <span className="text-muted-foreground">
            {formatDate(feedback.createdAt)}
          </span>
        </div>
        <div>{feedback.content}</div>
      </div>
      {/* {comment.user.id === user.id && (
      <CommentMoreButton
        comment={comment}
        className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
      />
    )} */}
    </div>
  );
}
