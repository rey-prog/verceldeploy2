import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ShareLogbook() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Share Logbook</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Generate Shareable Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input placeholder="https://diving-logbook.com/share/abc123" readOnly />
            <Button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
              Copy Link
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Download Logbook</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white w-full">
            Download PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}