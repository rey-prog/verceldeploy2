'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useDiveLog } from '@/lib/DiveLogContext';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function ExportLogbook() {
  const { dives } = useDiveLog();

  const exportToCSV = () => {
    const csvContent = [
      ["Date", "Location", "Depth (m)", "Duration (min)", "Dive Type", "Temperature (°C)", "Contractor", "Vessel", "Equipment", "Breathing Mixture", "Deco Schedule", "Supervisor"],
      ...dives.map(dive => [
        dive.date,
        dive.location,
        dive.depth,
        dive.duration,
        dive.diveType || '',
        dive.temperature || '',
        dive.contractor || '',
        dive.vessel || '',
        dive.equipment || '',
        dive.breathingMixture || '',
        dive.decoSchedule || '',
        dive.supervisor || ''
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(csvContent);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dive Logs");
    const wbout = XLSX.write(wb, { bookType: 'csv', type: 'binary' });

    const blob = new Blob([s2ab(wbout)], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "dive_logs.csv");
  };

  const exportToPDF = () => {
    // This is a placeholder for PDF export functionality
    // You would typically use a library like jsPDF here
    console.log("PDF export not implemented yet");
  };

  // Utility function to convert string to ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  return (
    <div className="flex space-x-2">
      <Button onClick={exportToCSV}>Export to CSV</Button>
      <Button onClick={exportToPDF}>Export to PDF</Button>
    </div>
  );
}