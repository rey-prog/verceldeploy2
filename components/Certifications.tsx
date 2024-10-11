'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, Upload, Trash2 } from 'lucide-react';

type Certification = {
  id: string;
  title: string;
  issuingAuthority: string;
  dateIssued: string;
  expirationDate: string;
  certificationNumber: string;
  notes: string;
  documentUrl?: string;
};

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [newCertification, setNewCertification] = useState<Certification>({
    id: '',
    title: '',
    issuingAuthority: '',
    dateIssued: '',
    expirationDate: '',
    certificationNumber: '',
    notes: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // In a real app, you would fetch this data from an API or local storage
    const mockCertifications: Certification[] = [
      {
        id: '1',
        title: 'Commercial Diver Certification',
        issuingAuthority: 'Association of Diving Contractors International',
        dateIssued: '2022-01-15',
        expirationDate: '2025-01-15',
        certificationNumber: 'CD12345',
        notes: 'Unrestricted surface supplied air diving to 190 fsw',
      },
      {
        id: '2',
        title: 'Underwater Welding Certification',
        issuingAuthority: 'American Welding Society',
        dateIssued: '2022-03-01',
        expirationDate: '2024-03-01',
        certificationNumber: 'UW98765',
        notes: 'Certified for wet welding up to 60 fsw',
      },
    ];
    setCertifications(mockCertifications);
  }, []);

  const addCertification = (cert: Certification) => {
    setCertifications([...certifications, { ...cert, id: Date.now().toString() }]);
    setIsAddModalOpen(false);
    setNewCertification({
      id: '',
      title: '',
      issuingAuthority: '',
      dateIssued: '',
      expirationDate: '',
      certificationNumber: '',
      notes: '',
    });
  };

  const deleteCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const getCertificationStatus = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const daysUntilExpiration = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

    if (daysUntilExpiration < 0) {
      return { status: 'expired', color: 'bg-red-500' };
    } else if (daysUntilExpiration <= 30) {
      return { status: 'expiring soon', color: 'bg-yellow-500' };
    } else {
      return { status: 'valid', color: 'bg-green-500' };
    }
  };

  const handleUpload = (certId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          // Here you would typically upload the file to your server
          // and get back a URL to store with the certification
          console.log(`Uploading file for certification ${certId}:`, file.name);
          // For now, we'll just update the state to simulate an upload
          setCertifications(certs => certs.map(cert => 
            cert.id === certId ? { ...cert, documentUrl: URL.createObjectURL(file) } : cert
          ));
        }
      };
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Certifications</h1>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white mb-4">
            Add New Certification
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Certification</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] overflow-auto">
            <form onSubmit={(e) => {
              e.preventDefault();
              addCertification(newCertification);
            }} className="space-y-4">
              <div>
                <Label htmlFor="title">Certification Title</Label>
                <Input
                  id="title"
                  value={newCertification.title}
                  onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="issuingAuthority">Issuing Authority</Label>
                <Input
                  id="issuingAuthority"
                  value={newCertification.issuingAuthority}
                  onChange={(e) => setNewCertification({ ...newCertification, issuingAuthority: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateIssued">Date Issued</Label>
                <Input
                  id="dateIssued"
                  type="date"
                  value={newCertification.dateIssued}
                  onChange={(e) => setNewCertification({ ...newCertification, dateIssued: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={newCertification.expirationDate}
                  onChange={(e) => setNewCertification({ ...newCertification, expirationDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="certificationNumber">Certification Number</Label>
                <Input
                  id="certificationNumber"
                  value={newCertification.certificationNumber}
                  onChange={(e) => setNewCertification({ ...newCertification, certificationNumber: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newCertification.notes}
                  onChange={(e) => setNewCertification({ ...newCertification, notes: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white">
                Add Certification
              </Button>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => {
          const { status, color } = getCertificationStatus(cert.expirationDate);
          return (
            <Card key={cert.id} className="relative">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {cert.title}
                  <Badge className={`${color} text-white`}>{status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Issuing Authority:</strong> {cert.issuingAuthority}</p>
                <p><strong>Date Issued:</strong> {cert.dateIssued}</p>
                <p><strong>Expiration Date:</strong> {cert.expirationDate}</p>
                <p><strong>Certification Number:</strong> {cert.certificationNumber}</p>
                <p><strong>Notes:</strong> {cert.notes}</p>
                {cert.documentUrl && (
                  <p><strong>Document:</strong> <a href={cert.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Document</a></p>
                )}
                <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                  <Button variant="outline" className="flex items-center justify-center w-full sm:w-auto" onClick={() => handleUpload(cert.id)}>
                    <Upload className="mr-2 h-4 w-4" /> Upload Document
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center w-full sm:w-auto text-red-500 hover:bg-red-50" 
                    onClick={() => deleteCertification(cert.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".pdf,.jpg,.jpeg,.png" />
    </div>
  );
}