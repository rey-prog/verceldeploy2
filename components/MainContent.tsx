"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Anchor, Clipboard, Calendar, Share2 } from 'lucide-react';

export default function MainContent() {
  const [activeTab, setActiveTab] = useState("dives");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="dives">Dives</TabsTrigger>
        <TabsTrigger value="certifications">Certifications</TabsTrigger>
        <TabsTrigger value="jobs">Jobs</TabsTrigger>
        <TabsTrigger value="share">Share</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dives">
        <Card>
          <CardHeader>
            <CardTitle>Log a New Dive</CardTitle>
            <CardDescription>Record your latest underwater adventure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter dive location" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="depth">Max Depth (meters)</Label>
              <Input id="depth" type="number" placeholder="Enter max depth" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input id="duration" type="number" placeholder="Enter dive duration" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              <Anchor className="mr-2 h-4 w-4" /> Log Dive
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="certifications">
        <Card>
          <CardHeader>
            <CardTitle>Upload Certification</CardTitle>
            <CardDescription>Keep your qualifications up to date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="cert-name">Certification Name</Label>
              <Input id="cert-name" placeholder="Enter certification name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cert-file">Upload File</Label>
              <Input id="cert-file" type="file" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              <Clipboard className="mr-2 h-4 w-4" /> Upload Certification
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="jobs">
        <Card>
          <CardHeader>
            <CardTitle>Schedule a Job</CardTitle>
            <CardDescription>Plan your upcoming work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" placeholder="Enter job title" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="job-date">Date</Label>
              <Input id="job-date" type="date" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="job-location">Location</Label>
              <Input id="job-location" placeholder="Enter job location" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              <Calendar className="mr-2 h-4 w-4" /> Schedule Job
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="share">
        <Card>
          <CardHeader>
            <CardTitle>Share Your Logbook</CardTitle>
            <CardDescription>Let others view your diving history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="share-email">Recipient&apos;s Email</Label>
              <Input id="share-email" type="email" placeholder="Enter email address" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              <Share2 className="mr-2 h-4 w-4" /> Share Logbook
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}