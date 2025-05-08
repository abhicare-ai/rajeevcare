"use client";

import { format } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import SearchBar from "@/components/searchBar/SearchBar";
import CreateAppointmetPostDialog from "@/components/clinic/appointmets/editor/CreateAppointmetPostDialog";
import FilterWithCalenderFeed from "./FilterWithCalenderFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForYourBranch from "./ForYourBranch";
import Budge from "@/components/Budge";
import { useAppSelector } from "@/hooks/hooks";

export default function AppointmentTabs() {
  const [fromdate, setFromDate] = useState<Date>();
  const [fromSelectedMonth, setFromSelectedMonth] = useState<Date>(new Date());

  const [todate, setToDate] = useState<Date>();
  const [toSelectedMonth, setToSelectedMonth] = useState<Date>(new Date());

  const [showDeletDailog, setShowDeletDialog] = useState(false);
  const { count,count2 } = useAppSelector((state) => state.countSlice);
  return (
    <>
      <div className="bg-sidebar flex w-full flex-col justify-between gap-5 border-b p-3 xl:flex-row">
        {/* From */}
        <div className="flex items-center">
          <span className="bg-background dark:bg-input/30 dark:border-input inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md rounded-r-none border px-4 py-2 text-sm font-medium">
            From
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full shrink-1 justify-start rounded-l-none border-l-0 text-left font-normal xl:w-[200px]",
                  !fromdate && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {fromdate ? format(fromdate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="flex w-auto flex-col space-y-2 p-2"
            >
              <Select
                onValueChange={(value) => {
                  const selectedYear = parseInt(value);
                  const updated = new Date(fromSelectedMonth); // current month
                  updated.setFullYear(selectedYear); // change only year
                  setFromSelectedMonth(updated); // update month/year display
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Array.from(
                    { length: 2025 - 1990 + 1 },
                    (_, i) => 1990 + i,
                  ).map((yr) => (
                    <SelectItem key={yr} value={yr.toString()}>
                      {yr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="rounded-md border">
                <Calendar
                  mode="single"
                  selected={fromdate}
                  onSelect={setFromDate}
                  month={fromSelectedMonth}
                  onMonthChange={setFromSelectedMonth}
                  fromDate={new Date(1990, 0, 1)} // Jan 1, 1990 se aage
                  toDate={new Date(2025, 11, 31)} // Dec 31, 2030 tak allowed
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* TO */}
        <div className="flex items-center">
          <span className="bg-background dark:bg-input/30 dark:border-input inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md rounded-r-none border px-4 py-2 text-sm font-medium">
            To
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full shrink-1 justify-start rounded-l-none border-l-0 text-left font-normal xl:w-[200px]",
                  !todate && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {todate ? format(todate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="flex w-auto flex-col space-y-2 p-2"
            >
              <Select
                onValueChange={(value) => {
                  const selectedYear = parseInt(value);
                  const updated = new Date(toSelectedMonth); // current month
                  updated.setFullYear(selectedYear); // change only year
                  setToSelectedMonth(updated); // update month/year display
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Array.from(
                    { length: 2025 - 1990 + 1 },
                    (_, i) => 1990 + i,
                  ).map((yr) => (
                    <SelectItem key={yr} value={yr.toString()}>
                      {yr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="rounded-md border">
                <Calendar
                  mode="single"
                  selected={todate}
                  onSelect={setToDate}
                  month={toSelectedMonth}
                  onMonthChange={setToSelectedMonth}
                  fromDate={new Date(1990, 0, 1)} // Jan 1, 1990 se aage
                  toDate={new Date(2025, 11, 31)} // Dec 31, 2030 tak allowed
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <SearchBar />

        <Button onClick={() => setShowDeletDialog(true)}>
          Create Appointment <PlusCircle />
        </Button>
      </div>

      <CreateAppointmetPostDialog
        onclose={() => setShowDeletDialog(false)}
        open={showDeletDailog}
      />

      <Tabs defaultValue="yourbranch">
        <TabsList>
          <TabsTrigger value="yourbranch" className="relative">
            {" "}
            Your Branch{" "}
            <Budge className="bg-destructive absolute right-0 rounded-full border p-2 text-white sm:w-[46px]">
              {count}
            </Budge>
          </TabsTrigger>
          <TabsTrigger value="throwdatewise" className="relative">
            Throw Date Wise{" "}
            <Budge className="bg-destructive absolute right-0 rounded-full border p-2 text-white sm:w-[46px]">
              {count2}
            </Budge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="yourbranch">
          <ForYourBranch />
        </TabsContent>
        <TabsContent value="throwdatewise">
          {fromdate && todate ? (
            <FilterWithCalenderFeed fromdate={fromdate} todate={todate} />
          ) : (
            <p className="text-muted-foreground text-center">
              Please choose a date.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
