import { UserData } from '@/types';

// This is a mock API function. In a real application, this would make an API call to your backend.
export async function fetchUserData(): Promise<UserData> {
  // Simulating an API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock user data
  return {
    name: "John Doe",
    totalDives: 150,
    totalDiveTime: 200,
    maxDepthReached: 40,
    diveData: [
      { month: "Jan", dives: 5 },
      { month: "Feb", dives: 7 },
      { month: "Mar", dives: 10 },
      { month: "Apr", dives: 8 },
      { month: "May", dives: 12 },
      { month: "Jun", dives: 15 },
    ],
    depthData: [
      { month: "Jan", depth: 20 },
      { month: "Feb", depth: 25 },
      { month: "Mar", depth: 30 },
      { month: "Apr", depth: 28 },
      { month: "May", depth: 35 },
      { month: "Jun", depth: 40 },
    ],
    upcomingDive: {
      title: "Reef Exploration",
      date: "2023-07-15",
      time: "09:00 AM",
      expectedDepth: 25,
    },
    certifications: [
      { name: "Open Water Diver", status: "valid" },
      { name: "Advanced Open Water", status: "valid" },
      { name: "Rescue Diver", status: "expired" },
      { name: "Nitrox Diver", status: "valid" },
    ],
  };
}