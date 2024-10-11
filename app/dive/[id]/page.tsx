import DiveDetailsPage from '@/components/DiveDetailsPage';

export default function DiveDetailPage({ params }: { params: { id: string } }) {
  return <DiveDetailsPage id={params.id} />;
}

// This function is now correctly placed in a server component
export async function generateStaticParams() {
  // In a real application, you would fetch the actual number of dives
  // For now, we'll generate params for 10 dives as an example
  return Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }));
}