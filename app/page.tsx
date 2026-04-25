'use client';

import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedServices from '@/components/FeaturedServices';
import HowItWorks from '@/components/HowItWorks';
import { motion } from 'motion/react';
import { Shield, Clock, Award, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <Categories />
      <FeaturedServices />
      <HowItWorks />
      
      {/* Why Choose Fazur Section */}
      <section id="why-fazur" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img src="https://picsum.photos/seed/fazur/1000/1000" alt="Fazur - The Expert" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-green-600 p-8 rounded-3xl hidden md:block">
                <p className="text-4xl font-black text-white mb-1">6+</p>
                <p className="text-sm font-bold text-green-100 uppercase tracking-tighter">Years of Experience</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 text-white">Why Choose <span className="text-green-500">FAZUR?</span></h2>
              <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                I don't just complete tasks; I build solutions that drive growth. My unique perspective across multiple digital domains allow me to provide holistic strategy that standard freelancers miss.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Award, title: "Industry Standard Excellence", desc: "Every deliverable meets the highest global standards for design and code." },
                  { icon: Shield, title: "100% Reliable Service", desc: "No disappearances, no ghosts. I am your long-term partner in success." },
                  { icon: Clock, title: "Strict Deadlines", desc: "Time is money. I respect your schedule as much as my own." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <Link href="/services" className="inline-flex items-center gap-2 text-green-500 font-black text-lg hover:gap-4 transition-all">
                  Browse my portfolio <span className="text-2xl">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">Client Love</h2>
            <p className="text-gray-400">Success stories from businesses that scaled with Fazur's expertise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO at TechFlow", text: "Fazur single-handedly built our platform from scratch. The code is clean, the UI is stunning, and his insights on UX were invaluable.", rating: 5 },
              { name: "Michael Chen", role: "Amazon FBA Seller", text: "The A+ content Fazur designed for my listing tripled my conversion rate. He knows exactly what Amazon customers want to see.", rating: 5 },
              { name: "Alex Rivera", role: "Creative Director", text: "Hands down the best video editor I've worked with. He understands the rhythm of storytelling and delivers perfectly every time.", rating: 5 },
            ].map((test, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl relative"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: test.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-green-500 fill-green-500 shadow-sm" />
                  ))}
                </div>
                <p className="text-white italic mb-8 leading-relaxed">"{test.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
                    <img src={`https://picsum.photos/seed/${i + 50}/100/100`} alt={test.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{test.name}</h4>
                    <p className="text-gray-500 text-xs">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">Ready to start your next big project?</h2>
              <p className="text-green-100 text-lg md:text-xl mb-12 opacity-90">Join 500+ satisfied clients and get elite-level services delivered with passion and precision.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/services" className="w-full sm:w-auto bg-white text-green-700 px-10 py-5 rounded-2xl font-black text-xl hover:bg-green-50 transition-all shadow-xl">
                  Get Started Now
                </Link>
                <Link href="/conversations" className="w-full sm:w-auto bg-green-900/30 text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-xl hover:bg-green-900/50 transition-all">
                  Chat with Fazur
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
