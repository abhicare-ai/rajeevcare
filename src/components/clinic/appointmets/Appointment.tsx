"use client";
import DeasesGenerationDialogBox from "@/app/(main)/clinic/patient/[patientId]/DeasesGenerationDialogBox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { AppoinmentData } from "@/lib/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ApptMoreButton from "./ApptMoreButton";
import { calculateAge, formatDate, formatTime } from "@/lib/utils";
import { countHandler } from "@/hooks/countSlice";

interface PostPorps {
  appt: AppoinmentData[];
}
export default function Appointment({ appt }: PostPorps) {
  const { user } = useAppSelector((state) => state.authSlice);

  if (!user) throw new Error(" User not found");
  const dispatch = useAppDispatch();
  const prevCount = useRef<number | null>(null);
  const prevCount2 = useRef<number | null>(null);

  useEffect(() => {
    if (appt.length > 0) {
      const currentCount = appt[0].user._count.Appointment;
      const currentCount2 = appt.length;

      // Only dispatch if the count values are different
      if (
        currentCount !== prevCount.current ||
        currentCount2 !== prevCount2.current
      ) {
        dispatch(
          countHandler({
            count: currentCount,
            count2: currentCount2,
          }),
        );

        // Update previous counts
        prevCount.current = currentCount;
        prevCount2.current = currentCount2;
      }
    }
  }, [appt, dispatch]);
  const [showDeletDailog, setShowDeletDialog] = useState(false);

  const [selectedPost, setselectedPost] = useState<AppoinmentData>();

  return (
    <>
      <Table>
        <TableHeader className="bg-sidebar">
          <TableRow>
            <TableHead>Token No.</TableHead>
            <TableHead>Start Test</TableHead>

            <TableHead>Patient Name</TableHead>
            <TableHead>Patient Number </TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Consultation Fee</TableHead>
            <TableHead>Appt date</TableHead>
            <TableHead>Appt Time</TableHead>
            <TableHead>More</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appt.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="text-muted-foreground hover:underline">
                <Link href={`/clinic/patient/${post.id}`}>{post.tokenNo}</Link>
              </TableCell>

              <TableCell>
                <Button
                  onClick={() => {
                    setselectedPost(post);
                    setShowDeletDialog(true);
                  }}
                >
                  Diagnosis
                </Button>
              </TableCell>

              <TableCell>{post.patientName}</TableCell>

              <TableCell>{post.phoneNumber}</TableCell>

              <TableCell>{post.gendar}</TableCell>
              <TableCell>{calculateAge(post.patientDOB)}</TableCell>
              <TableCell>{formatDate(post.patientDOB)}</TableCell>
              <TableCell>{post.consultationFees}</TableCell>

              <TableCell>{formatDate(post.appointmentDate)}</TableCell>
              <TableCell>{formatTime(post.createdAt)}</TableCell>

              <TableCell>
                <ApptMoreButton appt={post} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPost && (
        <DeasesGenerationDialogBox
          onclose={() => setShowDeletDialog(false)}
          open={showDeletDailog}
          patientData={selectedPost}
        />
      )}
    </>
  );
}
