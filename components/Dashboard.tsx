'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Droplet, Award, AlertTriangle, Anchor, FileText } from 'lucide-react';
import { fetchUserData } from '@/lib/api';
import { UserData } from '@/types';
import Link from 'next/link';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    loadUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const axisStyle = {
    fontSize: '12px',
    fontFamily: 'Arial, sans-serif',
    tickMargin: 5,
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {userData.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Calendar className="h-8 w-8 text-blue-500" />} title="Total Dives" value={userData.totalDives} />
          <StatCard icon={<Clock className="h-8 w-8 text-green-500" />} title="Total Dive Time" value={`${userData.totalDiveTime} hrs`} />
          <StatCard icon={<Droplet className="h-8 w-8 text-indigo-500" />} title="Max Depth" value={`${userData.maxDepthReached} m`} />
          <StatCard icon={<Award className="h-8 w-8 text-yellow-500" />} title="Certifications" value={userData.certifications.length} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Dive Frequency</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userData.diveData}>
                  <XAxis dataKey="month" style={axisStyle} />
                  <YAxis style={axisStyle} />
                  <Tooltip />
                  <Bar dataKey="dives" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Depth Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userData.depthData}>
                  <XAxis dataKey="month" style={axisStyle} />
                  <YAxis style={axisStyle} />
                  <Tooltip />
                  <Line type="monotone" dataKey="depth" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link href="/log-dive" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
              <Anchor className="mr-2 h-4 w-4" /> Log New Dive
            </Button>
          </Link>
          <Link href="/my-logbook" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
              <FileText className="mr-2 h-4 w-4" /> View Logbook
            </Button>
          </Link>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Upcoming Dive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{userData.upcomingDive.title}</p>
            <p>Date: {userData.upcomingDive.date}</p>
            <p>Time: {userData.upcomingDive.time}</p>
            <p>Expected Depth: {userData.upcomingDive.expectedDepth} meters</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {userData.certifications.map((cert, index) => (
                <li key={index} className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${cert.status === 'valid' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {cert.name} - {cert.status}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="mr-4">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}