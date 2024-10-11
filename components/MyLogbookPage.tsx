'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Droplet, List, Grid, Filter, Search } from 'lucide-react';
import { useDiveLog } from '@/lib/DiveLogContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import LogDiveModal from './LogDiveModal';
import ShareLogbookModal from './ShareLogbookModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from "framer-motion";

interface Dive {
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
}

export default function MyLogbookPage() {
  const { dives } = useDiveLog();
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minDepth: '',
    maxDepth: '',
    location: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDives = useMemo(() => {
    return dives.filter(dive => {
      const dateInRange = (!filters.startDate || dive.date >= filters.startDate) &&
                          (!filters.endDate || dive.date <= filters.endDate);
      const depthInRange = (!filters.minDepth || dive.depth >= Number(filters.minDepth)) &&
                           (!filters.maxDepth || dive.depth <= Number(filters.maxDepth));
      const locationMatch = !filters.location || dive.location.toLowerCase().includes(filters.location.toLowerCase());
      const searchMatch = !searchTerm || 
                          dive.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dive.diveType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dive.equipment?.toLowerCase().includes(searchTerm.toLowerCase());
      return dateInRange && depthInRange && locationMatch && searchMatch;
    });
  }, [dives, filters, searchTerm]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">My Logbook</h1>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline"
            onClick={() => setViewMode(viewMode === 'card' ? 'list' : 'card')}
          >
            {viewMode === 'card' ? <List className="mr-2" /> : <Grid className="mr-2" />}
            {viewMode === 'card' ? 'List View' : 'Card View'}
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <LogDiveModal />
        </div>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search dives..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          icon={<Search className="h-4 w-4 text-gray-500" />}
        />
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minDepth">Min Depth (m)</Label>
                    <Input
                      type="number"
                      id="minDepth"
                      name="minDepth"
                      value={filters.minDepth}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxDepth">Max Depth (m)</Label>
                    <Input
                      type="number"
                      id="maxDepth"
                      name="maxDepth"
                      value={filters.maxDepth}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      type="text"
                      id="location"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`grid ${viewMode === 'card' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
        <AnimatePresence>
          {filteredDives.map((dive) => (
            <motion.div
              key={dive.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === 'card' ? (
                <DiveCard dive={dive} />
              ) : (
                <DiveListItem dive={dive} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center">
        <ShareLogbookModal />
      </div>
    </div>
  );
}

function DiveCard({ dive }: { dive: Dive }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dive.location}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{dive.date}</span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <Droplet className="h-4 w-4" />
          <span>{dive.depth} meters</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{dive.duration} minutes</span>
        </div>
      </CardContent>
    </Card>
  );
}

function DiveListItem({ dive }: { dive: Dive }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h3 className="font-semibold">{dive.location}</h3>
        <p className="text-sm text-gray-500">{dive.date}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Droplet className="h-4 w-4 mr-1" />
          <span>{dive.depth}m</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{dive.duration}min</span>
        </div>
      </div>
    </div>
  );
}