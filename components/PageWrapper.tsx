'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'motion/react';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Search/Category mini-bar for High Density theme */}
      <div className="fixed top-14 md:top-16 left-0 right-0 h-10 border-b border-white/5 flex items-center px-4 md:px-8 space-x-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 bg-[#0F0F0F] z-40 overflow-x-auto no-scrollbar scroll-smooth">
        <Link href="/services?cat=web" className="hover:text-[#1DBF73] whitespace-nowrap cursor-pointer transition-colors">Website Dev</Link>
        <Link href="/services?cat=amazon" className="hover:text-[#1DBF73] whitespace-nowrap cursor-pointer transition-colors">Amazon SEO</Link>
        <Link href="/services?cat=design" className="hover:text-[#1DBF73] whitespace-nowrap cursor-pointer transition-colors">Graphic Design</Link>
        <Link href="/services?cat=video" className="hover:text-[#1DBF73] whitespace-nowrap cursor-pointer transition-colors">Video Editing</Link>
        <Link href="/services?cat=script" className="hover:text-[#1DBF73] whitespace-nowrap cursor-pointer transition-colors">Script Writing</Link>
        <Link href="/services?cat=excel" className="hover:text-[#1DBF73] whitespace-nowrap cursor-pointer transition-colors">Excel Automation</Link>
      </div>
      <main className="flex-grow pt-24 md:pt-28">
        {children}
      </main>
      <Footer />
    </div>
  );
}
