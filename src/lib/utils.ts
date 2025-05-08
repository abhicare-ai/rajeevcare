import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateAge = (dobInput?: string | Date): string => {
  if (!dobInput) return "";

  const dob = new Date(dobInput);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age.toString();
};

export function formatDate(dateInput: string | Date): string {
  try {
    return format(new Date(dateInput), "d/M/yyyy"); // eg: 5 May 2025
  } catch {
    return ""; // fallback in case of invalid date
  }
}

export function formatTime(timeInput: string | Date): string {
  try {
    return format(new Date(timeInput), "h:mm a");
    // Example output: "6:00 AM"
  } catch {
    return "";
  }
}
