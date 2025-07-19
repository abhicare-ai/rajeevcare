import MeetingPage from "./MeetingPage";

interface PageProps {
  params: Promise<{ meetingId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { meetingId } = await params;
  return <MeetingPage id={meetingId} />;
}
