import { PhoneInput } from "@/components/PhoneInput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createAppointmentSchema,
  CreateAppointmentSchemaValues,
} from "@/lib/vallidaion";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { useSubmitAppointmetsMutaion } from "./mutation";
import { Textarea } from "@/components/ui/textarea";

interface CreateAppointmetPostDialogProps {
  open: boolean;
  onclose: () => void;
}
export default function CreateAppointmetPostDialog({
  open,
  onclose,
}: CreateAppointmetPostDialogProps) {
  const form = useForm<CreateAppointmentSchemaValues>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      phoneNumber: "",
      patientName: "",
      gendar: "",
      patientDOB: undefined,
      appointmentDate: undefined,
      consultationFees: "600",
      pmsId: "",
      refrenshby: "",
      patientAddress: "",
      patientEmial: "",
      patientWeight: "",
      patinetDiet: "",
      bp: "",
    },
  });

  const [dbodate, setDobDate] = useState<Date>();
  const [dobSelectedMonth, setDobSelectedMonth] = useState<Date>(new Date());
  const [aptdate, setAptDate] = useState<Date>();
  const [aptSelectedMonth, setAptSelectedMonth] = useState<Date>(new Date());

  const mutation = useSubmitAppointmetsMutaion();

  const onSubmit = async (input: CreateAppointmentSchemaValues) => {
    mutation.mutate(input, {
      onSuccess: () => {
        form.reset();

        onclose();
        setDobDate(undefined);
        setAptDate(undefined);
      },
    });
  };

  function handlerOpenChange() {
    if (!mutation.isPending) {
      onclose();
    }
  }
  return (
    <Dialog open={open} onOpenChange={handlerOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-center">Create Appointment </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Phone Number </FormLabel>
                    <FormControl>
                      <PhoneInput
                        value={field.value}
                        onChange={field.onChange}
                        defaultCountry="IN"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Patient Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="gendar"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="patientDOB"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>DOB</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full shrink-1 justify-start text-left font-normal",
                            !dbodate && "text-muted-foreground",
                          )}
                          type="button"
                        >
                          <CalendarIcon />
                          {dbodate ? (
                            format(dbodate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="flex w-auto flex-col space-y-2 p-2"
                      >
                        <Select
                          onValueChange={(value) => {
                            const selectedYear = parseInt(value);
                            const updated = new Date(dobSelectedMonth);
                            updated.setFullYear(selectedYear);
                            setDobSelectedMonth(updated);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {Array.from(
                              { length: 2025 - 1890 + 1 },
                              (_, i) => 1890 + i,
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
                            selected={dbodate}
                            onSelect={(date) => {
                              setDobDate(date);
                              field.onChange(date); // 🔥 bind value to form
                            }}
                            month={dobSelectedMonth}
                            onMonthChange={setDobSelectedMonth}
                            fromDate={new Date(1890, 0, 1)}
                            toDate={new Date(2025, 11, 31)}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Appointment Date</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full shrink-1 justify-start text-left font-normal",
                            !aptdate && "text-muted-foreground",
                          )}
                          type="button"
                        >
                          <CalendarIcon />
                          {aptdate ? (
                            format(aptdate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="flex w-auto flex-col space-y-2 p-2"
                      >
                        <Select
                          onValueChange={(value) => {
                            const selectedYear = parseInt(value);
                            const updated = new Date(aptSelectedMonth);
                            updated.setFullYear(selectedYear);
                            setAptSelectedMonth(updated);
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
                            selected={aptdate}
                            onSelect={(date) => {
                              setAptDate(date);
                              field.onChange(date); // 🔥 bind value to form
                            }}
                            month={aptSelectedMonth}
                            onMonthChange={setAptSelectedMonth}
                            fromDate={new Date(1990, 0, 1)}
                            toDate={new Date(2025, 11, 31)}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consultationFees"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Consultation Fees</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a Consultation Fees
"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="600">600</SelectItem>
                        <SelectItem value="650">650</SelectItem>
                        <SelectItem value="700">700</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="pmsId"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Patient Id </FormLabel>
                    <FormControl>
                      <Input placeholder="Patient Id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="refrenshby"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Reference By</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Reference By" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Doctor">Doctor</SelectItem>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Family">Family</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="patientWeight"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Patient Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="Patient Weight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patinetDiet"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Diet</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Diet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Non Vegetarian">
                          Non Vegetarian
                        </SelectItem>
                        <SelectItem value="Vegetarian">Vegetarian </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="patientEmial"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bp"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>BP </FormLabel>
                    <FormControl>
                      <Input placeholder="BP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="patientAddress"
              render={({ field }) => (
                <FormItem className="!w-full">
                  <FormLabel>Patient Address </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Patient Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              loading={mutation.isPending}
              type="submit"
              className="w-full"
            >
              Create Appointment
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
