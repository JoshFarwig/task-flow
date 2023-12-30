import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines tailwind classes dynamically  
// EX error state + success state 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
