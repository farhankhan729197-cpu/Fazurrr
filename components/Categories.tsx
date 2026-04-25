'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Monitor, ShoppingBag, Palette, Video, FileText, BarChart } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Website Development', icon: Monitor, color: 'bg-blue-500', href: '/services?cat=web' },
  { name: 'Amazon Seller Services', icon: ShoppingBag, color: 'bg-orange-500', href: '/services?cat=amazon' },
  { name: 'Graphic Designing', icon: Palette, color: 'bg-pink-500', href: '/services?cat=design' },
  { name: 'Video Editing', icon: Video, color: 'bg-red-500', href: '/services?cat=video' },
  { name: 'Script Writing', icon: FileText, color: 'bg-yellow-500', href: '/services?cat=script' },
  { name: 'Excel Services', icon: BarChart, color: 'bg-green-500', href: '/services?cat=excel' },
];

export default function Categories() {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[10px] font-black text-[#1DBF73] uppercase tracking-[0.2em] mb-3">Specialized Verticals</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Popular Services</h2>
          </div>
          <Link href="/services" className="text-sm font-bold text-gray-400 hover:text-[#1DBF73] transition-colors border-b border-white/10 pb-1">View Full Marketplace →</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              whileHover={{ y: -2 }}
              className="group"
            >
              <Link href={cat.href}>
                <div className="h-full bg-[#161616] border border-white/5 p-5 rounded-xl glass card-hover transition-all flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-lg ${cat.color} bg-opacity-20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <cat.icon className={`w-5 h-5 text-white`} />
                  </div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-[#1DBF73] transition-colors">{cat.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
