import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function LogDive() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Log New Dive</h1>
      <form className="space-y-4">
        <Input type="date" placeholder="Date" />
        <Input type="time" placeholder="Time" />
        <Input type="number" placeholder="Depth (meters)" />
        <Input type="number" placeholder="Duration (minutes)" />
        <Input placeholder="Location" />
        <Textarea placeholder="Notes" />
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white">
          Log Dive
        </Button>
      </form>
    </div>
  );
}