import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full mb-2">Change Password</Button>
          <Button className="w-full mb-2">Update Email</Button>
          <Button className="w-full">Manage Notifications</Button>
        </CardContent>
      </Card>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full mb-2">Change Units (Metric/Imperial)</Button>
          <Button className="w-full">Theme Settings</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full mb-2">Export All Data</Button>
          <Button className="w-full text-red-500">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}