'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ShareLogbookModal() {
  const [open, setOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const generateShareLink = () => {
    // In a real application, this would generate a unique link
    const uniqueId = Math.random().toString(36).substring(2, 15);
    const link = `https://divinglogbook.com/share/${uniqueId}`;
    setShareLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    // You might want to show a toast notification here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
          Share Logbook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Logbook</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Button onClick={generateShareLink} className="w-full">
            Generate Share Link
          </Button>
          {shareLink && (
            <>
              <div>
                <Label htmlFor="shareLink">Share Link</Label>
                <div className="flex mt-1">
                  <Input id="shareLink" value={shareLink} readOnly className="flex-grow" />
                  <Button onClick={copyToClipboard} className="ml-2">
                    Copy
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                This link allows others to view your logbook. Be careful who you share it with.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}