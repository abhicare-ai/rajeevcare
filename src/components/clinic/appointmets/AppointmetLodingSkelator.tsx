import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { useAppSelector } from "@/hooks/hooks";
export default function AppointmetLodingSkelator() {
  return <AppointmentLoadingSkeleton />;
}

function AppointmentLoadingSkeleton() {
  const { user } = useAppSelector((state) => state.authSlice);

  if (!user) throw new Error(" User not found");
  return (
    <Table>
      <TableHeader className="bg-sidebar">
        <TableRow>
          <TableHead>Token No.</TableHead>
          <TableHead>Start Test</TableHead>

          <TableHead>Patient Name</TableHead>
          <TableHead>Patient Number</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead>Consultation Fee</TableHead>
          <TableHead>Appt date</TableHead>
          <TableHead>Appt Time</TableHead>
          {user.isAdmin && <TableHead>More</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10}).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-9 w-20 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-20 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-16 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-16 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-24 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-12 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-12 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-12 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-12 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-9 w-12 rounded" />
            </TableCell>

            {user.isAdmin && (
              <TableCell>
                <Skeleton className="h-9 w-12 rounded" />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
