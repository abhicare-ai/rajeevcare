"use client";

import { loginSchema, LoginValues } from "@/lib/vallidaion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./actions";
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
import LodingButton from "@/components/LoadingButton";

export default function LoginForm() {
  const [error, setError] = useState<string>();

  const [ispending, startTransation] = useTransition();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      branch: "",
    },
  });

  async function onSubmit(value: LoginValues) {
    setError(undefined);
    startTransation(async () => {
      const { error } = await login(value);
      if (error) setError(error);
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-destructive text-center">{error}</p>}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="!w-full cursor-pointer">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Branch City" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="RANCHI">RANCHI</SelectItem>
                  <SelectItem value="RANCHI SHOP">RANCHI SHOP</SelectItem>
                  <SelectItem value="PATNA">PATNA</SelectItem>
                  <SelectItem value="KOLKATA">KOLKATA</SelectItem>
                  <SelectItem value="GAUR CITY">GAUR CITY</SelectItem>
                  <SelectItem value="SPECTRUM">SPECTRUM</SelectItem>
                  <SelectItem value="JAGTAULI">JAGTAULI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LodingButton loading={ispending} type="submit" className="w-full">
          Login
        </LodingButton>
      </form>
    </Form>
  );
}
