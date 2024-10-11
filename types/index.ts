export interface UserData {
  name: string;
  totalDives: number;
  totalDiveTime: number;
  maxDepthReached: number;
  diveData: { month: string; dives: number }[];
  depthData: { month: string; depth: number }[];
  upcomingDive: {
    title: string;
    date: string;
    time: string;
    expectedDepth: number;
  };
  certifications: { name: string; status: 'valid' | 'expired' }[];
}