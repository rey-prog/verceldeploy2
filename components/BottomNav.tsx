'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Book, Calendar, Award, BarChart, Settings } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/my-logbook', icon: Book, label: 'Logbook' },
    { href: '/upcoming-jobs', icon: Calendar, label: 'Jobs' },
    { href: '/certifications', icon: Award, label: 'Certs' },
    { href: '/statistics', icon: BarChart, label: 'Stats' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 flex flex-col items-center ${
              pathname === item.href ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}