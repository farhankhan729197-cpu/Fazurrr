'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

export default function Footer() {
  const { isAdmin } = useAuth();

  return (
    <footer className="h-12 border-t border-white/10 bg-[#0A0A0A] flex items-center justify-between px-4 md:px-8 text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest">
      <div className="hidden sm:block">
        &copy; {new Date().getFullYear()} FAZUR Digital Services. All Rights Reserved.
      </div>
      <div className="sm:hidden">
        &copy; {new Date().getFullYear()} FAZUR
      </div>
      
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <div className="w-2 h-2 rounded-full bg-[#1DBF73] animate-pulse"></div> 
          Available Now
        </span>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          {isAdmin && (
            <Link 
              href="/admin" 
              className="hover:text-white font-bold text-white border-l border-white/10 pl-4 transition-colors"
            >
              ADMIN PANEL
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
