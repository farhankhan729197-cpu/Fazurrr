'use client';

import React, { useState, useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';
import GigCard from '@/components/GigCard';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const allGigs = [
  { id: 'web-1', title: 'Custom High-Performance Next.js Website Development', category: 'web', price: 450, rating: 5.0, reviews: 124, image: 'https://picsum.photos/seed/web1/800/600' },
  { id: 'web-2', title: 'Modern UI/UX Design & Frontend Implementation', category: 'web', price: 300, rating: 4.9, reviews: 82, image: 'https://picsum.photos/seed/web2/800/600' },
  { id: 'amazon-1', title: 'Professional Amazon A+ Content & EBC Brand Store Design', category: 'amazon', price: 195, rating: 5.0, reviews: 89, image: 'https://picsum.photos/seed/amazon1/800/600' },
  { id: 'amazon-2', title: 'Amazon PPC Campaign Setup & Management', category: 'amazon', price: 150, rating: 4.7, reviews: 45, image: 'https://picsum.photos/seed/amazon2/800/600' },
  { id: 'design-1', title: 'Modern Brand Identity & Luxury Social Media Post Design', category: 'design', price: 85, rating: 5.0, reviews: 215, image: 'https://picsum.photos/seed/design1/800/600' },
  { id: 'design-2', title: 'Professional Business Card & Stationery Design', category: 'design', price: 45, rating: 4.9, reviews: 67, image: 'https://picsum.photos/seed/design2/800/600' },
  { id: 'video-1', title: 'Cinematic Video Editing for YouTube and Social Media', category: 'video', price: 120, rating: 4.8, reviews: 67, image: 'https://picsum.photos/seed/video1/800/600' },
  { id: 'script-1', title: 'Engaging YouTube Script Writing & Content Strategy', category: 'script', price: 60, rating: 4.9, reviews: 34, image: 'https://picsum.photos/seed/script1/800/600' },
  { id: 'excel-1', title: 'Advanced Excel Dashboards & Automation Services', category: 'excel', price: 100, rating: 5.0, reviews: 52, image: 'https://picsum.photos/seed/excel1/800/600' },
];

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'web', name: 'Web Dev' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'design', name: 'Design' },
  { id: 'video', name: 'Video' },
  { id: 'script', name: 'Scripts' },
  { id: 'excel', name: 'Excel' },
];

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat') || 'all';
  
  const [selectedCat, setSelectedCat] = useState(catParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setSelectedCat(catParam);
  }, [catParam]);

  const filteredGigs = allGigs.filter(gig => {
    const matchesCat = selectedCat === 'all' || gig.category === selectedCat;
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <PageWrapper>
      <div className="bg-[#0A0A0A] py-12 md:py-16 border-b border-white/5 bg-gradient-to-r from-[#111] to-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-8">
            <div className="max-w-2xl">
              <div className="text-[10px] font-black text-[#1DBF73] uppercase tracking-[0.2em] mb-3">Service Directory</div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">Marketplace</h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">Discover premium digital services provided exclusively by Fazur. High quality assured through years of expertise.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow max-w-xl group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 group-focus-within:text-[#1DBF73] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search for any service..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-6 py-4 pl-12 text-sm text-white focus:outline-none focus:border-[#1DBF73] transition-colors"
                />
              </div>
              
              <div className="flex gap-2 p-1 bg-[#1A1A1A] border border-white/10 rounded overflow-x-auto no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`px-5 py-2.5 rounded text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                      selectedCat === cat.id ? 'bg-[#1DBF73] text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-20 container mx-auto px-4 md:px-8 bg-[#0F0F0F]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
            <span className="text-[#1DBF73]">{filteredGigs.length}</span> Services Available
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer hover:text-[#1DBF73] transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
              </select>
            </div>
          </div>
        </div>

        {filteredGigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGigs.map((gig) => (
                <motion.div
                  key={gig.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <GigCard 
                    id={gig.id}
                    title={gig.title}
                    category={gig.category}
                    price={gig.price}
                    rating={gig.rating}
                    reviews={gig.reviews}
                    image={gig.image}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-white/5 mb-6 text-gray-600 border border-white/5">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">No results matched.</h3>
            <p className="text-gray-500 text-sm">Refine your search or try another category.</p>
            <button 
              onClick={() => { setSelectedCat('all'); setSearchQuery(''); }}
              className="mt-6 text-[#1DBF73] text-xs font-black uppercase tracking-widest hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
