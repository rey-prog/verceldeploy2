import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function calculateTotalDiveTime(dives: any[]): number {
  return dives.reduce((total, dive) => total + dive.duration, 0);
}

export function calculateAverageDepth(dives: any[]): number {
  if (dives.length === 0) return 0;
  const totalDepth = dives.reduce((sum, dive) => sum + dive.depth, 0);
  return Math.round(totalDepth / dives.length * 10) / 10;
}

export function getMaxDepth(dives: any[]): number {
  if (dives.length === 0) return 0;
  return Math.max(...dives.map(dive => dive.depth));
}

export function groupDivesByMonth(dives: any[]): { month: string; count: number }[] {
  const grouped = dives.reduce((acc, dive) => {
    const month = new Date(dive.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped).map(([month, count]) => ({ month, count: count as number }));
}