'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const BurgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    // Implement sign out logic here
    setIsOpen(false);
    router.push('/login');
  };

  const menuItems = [
    { title: "Dashboard", href: "/" },
    { title: "My Logbook", href: "/my-logbook" },
    { title: "Upcoming Jobs", href: "/upcoming-jobs" },
    { title: "Certifications", href: "/certifications" },
    { title: "Statistics", href: "/statistics" },
    { title: "Settings", href: "/settings" },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/TEXT LOGO.png"
              alt="Commercial Diver Logbook"
              width={300}
              height={40}
              className="h-6 w-auto sm:h-8"
              priority
            />
          </Link>
          <div className="flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 overflow-hidden"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={() => setIsOpen(false)}
              ></motion.div>
              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <motion.div
                  initial={{ translateX: '100%' }}
                  animate={{ translateX: 0 }}
                  exit={{ translateX: '100%' }}
                  transition={{ duration: 0.3 }}
                  className="relative w-screen max-w-md"
                >
                  <div className="h-full flex flex-col py-6 bg-white dark:bg-gray-800 shadow-xl overflow-y-scroll">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100" id="slide-over-title">
                          Menu
                        </h2>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <span className="sr-only">Close panel</span>
                            <CloseIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      <nav className="space-y-1">
                        {menuItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="group flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </Link>
                        ))}
                        <button
                          onClick={handleSignOut}
                          className="w-full group flex items-center px-3 py-2 text-base font-medium rounded-md text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900"
                        >
                          <LogOut className="mr-4 h-6 w-6" />
                          <span>Sign Out</span>
                        </button>
                      </nav>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}