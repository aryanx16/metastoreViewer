import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TableFormat } from "@shared/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormatColor(format: TableFormat): string {
  switch (format) {
    case "parquet":
      return "bg-[#964B00]";
    case "iceberg":
      return "bg-[#0094FF]";
    case "delta":
      return "bg-[#AA0082]";
    case "hudi":
      return "bg-[#FF7D00]";
    default:
      return "bg-neutral-500";
  }
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '…';
}

// Convert camelCase to Title Case with spaces
export function humanizeString(str: string): string {
  return str
    // Insert a space before all capital letters
    .replace(/([A-Z])/g, ' $1')
    // Uppercase the first character
    .replace(/^./, function(str) { return str.toUpperCase(); })
    .trim();
}

// Get date in YYYY-MM-DD format
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
