'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface JobData {
  title: string;
  date: string;
  location: string;
  duration: string;
  information: string;
  equipment: string;
  files: File[];
}

interface AddJobModalProps {
  onAddJob: (job: JobData) => void;
}

export default function AddJobModal({ onAddJob }: AddJobModalProps) {
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    date: '',
    location: '',
    duration: '',
    information: '',
    equipment: '',
    files: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setJobData(prev => ({ ...prev, files }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddJob(jobData);
    setJobData({ title: '', date: '', location: '', duration: '', information: '', equipment: '', files: [] });
    setOpen(false);
  };

  // ... (rest of the component remains unchanged)
}