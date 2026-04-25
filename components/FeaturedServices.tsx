'use client';

import React from 'react';
import GigCard from './GigCard';
import Link from 'next/link';

const featuredGigs = [
  {
    id: 'web-1',
    title: 'Custom High-Performance Next.js Website Development',
    category: 'Web Dev',
    price: 450,
    rating: 5.0,
    reviews: 124,
    image: 'https://picsum.photos/seed/web1/800/600',
  },
  {
    id: 'amazon-1',
    title: 'Professional Amazon A+ Content & EBC Brand Store Design',
    category: 'Amazon',
    price: 195,
    rating: 4.9,
    reviews: 89,
    image: 'https://picsum.photos/seed/amazon1/800/600',
  },
  {
    id: 'design-1',
    title: 'Modern Brand Identity & Luxury Social Media Post Design',
    category: 'Graphic Design',
    price: 85,
    rating: 5.0,
    reviews: 215,
    image: 'https://picsum.photos/seed/design1/800/600',
  },
  {
    id: 'video-1',
    title: 'Cinematic Video Editing for YouTube and Social Media',
    category: 'Video Editing',
    price: 120,
    rating: 4.8,
    reviews: 67,
    image: 'https://picsum.photos/seed/video1/800/600',
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-20 bg-[#0F0F0F] border-y border-white/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[10px] font-black text-[#1DBF73] uppercase tracking-[0.2em] mb-3">Top Rated Picks</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Featured Gigs</h2>
          </div>
          <Link href="/services" className="text-sm font-bold text-gray-400 hover:text-[#1DBF73] transition-colors border-b border-white/10 pb-1">Explore All →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGigs.map((gig) => (
            <GigCard key={gig.id} {...gig} />
          ))}
        </div>
      </div>
    </section>
  );
}
