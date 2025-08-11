import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string, base?: string): string {
  // If path is already absolute (starts with http:// or https://), return as is
  if (/^https?:\/\//i.test(path)) {
    return path
  }
  // Use base if provided, otherwise fallback to Vercel/Next.js env or localhost
  const origin =
    base ||
    process.env.NODE_ENV === 'production' ? `https://blogs.devwtf.in` : "http://localhost:3000"
  // Ensure no double slashes
  return origin.replace(/\/+$/, "") + "/" + path.replace(/^\/+/, "")
}
