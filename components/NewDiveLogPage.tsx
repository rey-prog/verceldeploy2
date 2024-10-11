'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDiveLog } from '@/lib/DiveLogContext';
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function NewDiveLogPage() {
  // ... (existing state and refs)
  const { toast } = useToast();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.get('date')) newErrors.date = 'Date is required';
    if (!formData.get('location')) newErrors.location = 'Location is required';
    if (!formData.get('depth')) newErrors.depth = 'Depth is required';
    if (Number(formData.get('depth')) <= 0) newErrors.depth = 'Depth must be greater than 0';
    if (!formData.get('duration')) newErrors.duration = 'Duration is required';
    if (Number(formData.get('duration')) <= 0) newErrors.duration = 'Duration must be greater than 0';
    if (!diveType) newErrors.diveType = 'Dive type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!validateForm(formData)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    const newDive = {
      // ... (create newDive object as before)
    };

    addDive(newDive);
    router.push('/my-logbook');
    toast({
      title: "Success",
      description: "New dive logged successfully!",
    });
  };

  // ... (rest of the component logic remains the same)

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Log New Dive</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Dive Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {Object.entries(errors).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm"
                >
                  {value}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Form fields remain the same, but add error handling */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <Input 
                type="date" 
                id="date" 
                name="date" 
                required 
                className={`mt-1 ${errors.date ? "border-red-500" : ""}`}
              />
            </div>
            {/* Repeat for other form fields */}
            
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
              Log Dive
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}