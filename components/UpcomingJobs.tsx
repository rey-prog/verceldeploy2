'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock, FileText, Tool } from 'lucide-react';
import AddJobModal from './AddJobModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UpcomingJobs() {
  const [jobs, setJobs] = useState([
    {
      title: "Underwater Welding",
      date: "2023-08-15",
      location: "Gulf of Mexico",
      duration: "2 weeks",
      information: "Critical repair work on offshore platform.",
      equipment: "Welding gear, diving suit, underwater camera",
      files: []
    },
    {
      title: "Pipeline Inspection",
      date: "2023-09-01",
      location: "North Sea",
      duration: "10 days",
      information: "Annual inspection of deep-sea pipeline.",
      equipment: "ROV, sonar equipment, inspection cameras",
      files: []
    }
  ]);

  const handleAddJob = (newJob) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Upcoming Jobs</h1>
      <AddJobModal onAddJob={handleAddJob} />
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            job={job}
          />
        ))}
      </div>
    </div>
  );
}

function JobCard({ job }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{job.date}</span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{job.duration}</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4">View Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{job.title}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] overflow-auto">
              <div className="space-y-4 p-4">
                <div>
                  <h4 className="font-semibold">Date</h4>
                  <p>{job.date}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p>{job.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Duration</h4>
                  <p>{job.duration}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Important Information</h4>
                  <p>{job.information}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Equipment Needed</h4>
                  <p>{job.equipment}</p>
                </div>
                {job.files && job.files.length > 0 && (
                  <div>
                    <h4 className="font-semibold">Files</h4>
                    <ul>
                      {job.files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}