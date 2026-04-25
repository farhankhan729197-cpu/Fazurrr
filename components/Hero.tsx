'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 border-b border-white/5 bg-gradient-to-r from-[#111] to-[#0A0A0A]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-[#1DBF73] text-[10px] font-bold uppercase tracking-wider mb-4"
            >
              Premium Freelance Experience
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
            >
              All-in-One Digital Services <span className="text-[#1DBF73]">by FAZUR</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-base md:text-lg mb-8 max-w-lg leading-relaxed"
            >
              Tailored solutions for Amazon Sellers, Web Owners, and Creators. Quality guaranteed by a single dedicated expert.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Link 
                href="/services" 
                className="btn-premium px-8 py-3 rounded text-sm flex items-center gap-2"
              >
                Find Services <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex flex-col items-start gap-1 ml-4 pl-6 border-l border-white/10">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-zinc-800 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${i + 15}/100/100`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">+4k</div>
                </div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Happy customers worldwide</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:block w-[450px] aspect-square relative"
          >
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10 w-full h-full glass rounded-3xl overflow-hidden border border-[#1DBF73]/20 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#1DBF73] flex items-center justify-center">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-[10px] font-black text-[#1DBF73] uppercase tracking-widest px-2 py-1 bg-[#1DBF73]/10 rounded">Active Projects</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-4 italic tracking-tighter uppercase">Excellence <br />as standard.</h3>
                <p className="text-gray-500 text-sm italic">"Fazur single-handedly built my entire ecosystem. The most reliable expert I've ever hired." — Steve G.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <p className="text-[#1DBF73] text-sm font-black">99%</p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase">Success Rate</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <p className="text-[#1DBF73] text-sm font-black">&lt; 24h</p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase">Response Time</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
