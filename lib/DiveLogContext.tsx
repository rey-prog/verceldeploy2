'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Dive = {
  id: number;
  date: string;
  location: string;
  depth: number;
  duration: number;
  diveType?: string;
  temperature?: number;
  contractor?: string;
  vessel?: string;
  equipment?: string;
  breathingMixture?: string;
  decoSchedule?: string;
  supervisor?: string;
};

type DiveLogContextType = {
  dives: Dive[];
  addDive: (dive: Omit<Dive, 'id'>) => void;
  updateDive: (id: number, updatedDive: Partial<Dive>) => void;
  deleteDive: (id: number) => void;
};

const DiveLogContext = createContext<DiveLogContextType | undefined>(undefined);

export function DiveLogProvider({ children }: { children: React.ReactNode }) {
  const [dives, setDives] = useState<Dive[]>([]);

  useEffect(() => {
    const storedDives = localStorage.getItem('dives');
    if (storedDives) {
      setDives(JSON.parse(storedDives));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dives', JSON.stringify(dives));
  }, [dives]);

  const addDive = (newDive: Omit<Dive, 'id'>) => {
    setDives(prevDives => {
      const dive = { ...newDive, id: Date.now() };
      return [...prevDives, dive];
    });
  };

  const updateDive = (id: number, updatedDive: Partial<Dive>) => {
    setDives(prevDives => 
      prevDives.map(dive => 
        dive.id === id ? { ...dive, ...updatedDive } : dive
      )
    );
  };

  const deleteDive = (id: number) => {
    setDives(prevDives => prevDives.filter(dive => dive.id !== id));
  };

  return (
    <DiveLogContext.Provider value={{ dives, addDive, updateDive, deleteDive }}>
      {children}
    </DiveLogContext.Provider>
  );
}

export function useDiveLog() {
  const context = useContext(DiveLogContext);
  if (context === undefined) {
    throw new Error('useDiveLog must be used within a DiveLogProvider');
  }
  return context;
}