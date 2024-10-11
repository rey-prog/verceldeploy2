'use client';

import { useRouter } from 'next/navigation';
import { useDiveLog } from '@/lib/DiveLogContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DiveDetailsPage({ id }: { id: string }) {
  const { dives } = useDiveLog();
  const router = useRouter();

  const dive = dives.find(d => d.id === parseInt(id));

  if (!dive) {
    return <div>Dive not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => router.back()} className="mb-4">Back to Logbook</Button>
      <Card>
        <CardHeader>
          <CardTitle>Dive Details: {dive.location}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Date:</strong> {dive.date}</p>
            <p><strong>Location:</strong> {dive.location}</p>
            <p><strong>Depth:</strong> {dive.depth} meters</p>
            <p><strong>Duration:</strong> {dive.duration} minutes</p>
            {dive.diveType && <p><strong>Dive Type:</strong> {dive.diveType}</p>}
            {dive.temperature && <p><strong>Temperature:</strong> {dive.temperature}°C</p>}
            {dive.contractor && <p><strong>Contractor:</strong> {dive.contractor}</p>}
            {dive.vessel && <p><strong>Vessel/Installation:</strong> {dive.vessel}</p>}
            {dive.equipment && <p><strong>Equipment Used:</strong> {dive.equipment}</p>}
            {dive.breathingMixture && <p><strong>Breathing Mixture:</strong> {dive.breathingMixture}</p>}
            {dive.decoSchedule && <p><strong>Deco Schedule:</strong> {dive.decoSchedule}</p>}
            {dive.supervisor && <p><strong>Supervisor:</strong> {dive.supervisor}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}