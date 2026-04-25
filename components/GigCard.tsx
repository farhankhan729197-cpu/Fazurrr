'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Heart, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface GigCardProps {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

export default function GigCard({ id, title, category, price, rating, reviews, image }: GigCardProps) {
  return (
    <motion.div 
      className="bg-[#161616] border border-white/5 rounded-xl overflow-hidden glass card-hover flex flex-col h-full"
    >
      <Link href={`/services/${id}`} className="relative aspect-[16/10] overflow-hidden block">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {rating >= 5 && reviews > 50 && (
          <span className="absolute bottom-2 left-3 bg-[#1DBF73] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
            Bestseller
          </span>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-grow gap-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/seed/fazur/50/50" alt="Fazur" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-bold text-white uppercase flex items-center gap-1">
            FAZUR 
            <span className="w-1 h-1 rounded-full bg-[#1DBF73]"></span>
          </span>
        </div>
        
        <Link href={`/services/${id}`} className="flex-grow">
          <h4 className="text-sm font-medium leading-snug text-gray-200 line-clamp-2 hover:text-[#1DBF73] transition-colors">
            {title}
          </h4>
        </Link>
        
        <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
          ★ {rating.toFixed(1)} <span className="text-gray-500 font-normal">({reviews})</span>
        </div>
        
        <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between">
          <button className="text-gray-500 hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Starting at</p>
            <p className="text-lg font-black text-white">${price}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
