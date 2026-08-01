import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with clsx for conditional class handling.
 * This is the standard utility function used by shadcn/ui components.
 *
 * @param  {...any} inputs - Class names, conditionals, or arrays
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
