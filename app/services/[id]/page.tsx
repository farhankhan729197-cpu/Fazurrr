'use client';

import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { useParams } from 'next/navigation';
import { Star, Clock, RotateCcw, Check, MessageSquare, ShieldCheck, ArrowRight, Share2, Heart, Flag } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const gigsData: Record<string, any> = {
  'web-1': {
    title: 'Custom High-Performance Next.js Website Development',
    category: 'Web Development',
    rating: 5.0,
    reviews: 124,
    images: ['https://picsum.photos/seed/web1/1200/800', 'https://picsum.photos/seed/web2/1200/800'],
    description: `I will build a professional, high-performance website using Next.js 14/15, Tailwind CSS, and TypeScript. Whether you need a landing page, a portfolio, or a fully functional web application, I've got you covered.

### What you'll get:
- Full responsive design (Mobile, Tablet, Desktop)
- SEO optimization for Google visibility
- Optimized performance (90+ PageSpeed score)
- Clean, maintainable industry-standard code
- API integrations and dynamic data handling

### Why hire me?
I have over 6 years of experience building scalable web solutions for startups and enterprises. I don't just write code; I design user experiences that convert visitors into customers.`,
    packages: {
      basic: {
        name: 'Essential Launch',
        price: 450,
        desc: 'Single page high-converting landing page with contact form and responsive layout.',
        delivery: 3,
        revisions: 2,
        features: ['1 Page', 'Responsive Design', 'Source Code', 'Content Upload']
      },
      standard: {
        name: 'Professional Business',
        price: 950,
        desc: 'Up to 5 pages business website with CMS integration (Sanity/Contentful) and SEO.',
        delivery: 7,
        revisions: 5,
        features: ['5 Pages', 'Responsive Design', 'CMS Integration', 'SEO Setup', 'Speed Optimization']
      },
      premium: {
        name: 'Enterprise App',
        price: 2500,
        desc: 'Full-stack web application with authentication, database, and complex business logic.',
        delivery: 21,
        revisions: -1, // Unlimited
        features: ['Multi-page/App', 'Authentications', 'Real-time DB', 'Payment Gateway', 'Priority Support']
      }
    },
    faqs: [
      { q: 'Do you provide hosting and domain?', a: 'I can help you set it up on platforms like Vercel, Netlify, or AWS, but the domain and hosting costs are covered by the client.' },
      { q: 'Can you work with an existing design?', a: 'Absolutely! Send me your Figma, Adobe XD, or Sketch files and I will translate them into pixel-perfect code.' }
    ]
  },
  // Add other gigs as needed...
};

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const gig = gigsData[id] || gigsData['web-1']; // Fallback for demo
  
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('standard');
  const pkg = gig.packages[selectedPackage];

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#1DBF73]">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#1DBF73]">Services</Link>
              <span>/</span>
              <span className="text-white truncate">{gig.title}</span>
            </nav>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {gig.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 border border-white/10">
                  <img src="https://picsum.photos/seed/fazur/100/100" alt="Fazur" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm flex items-center gap-1.5 uppercase tracking-tighter">
                    Fazur 
                    <span className="w-1 h-1 rounded-full bg-[#1DBF73]"></span>
                    <span className="text-[#1DBF73] text-[10px] font-black tracking-widest">PRO SELLER</span>
                  </p>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Level 2 Expert</p>
                </div>
              </div>
              
              <div className="h-4 w-px bg-white/10 hidden md:block"></div>
              
              <div className="flex items-center gap-1 text-xs font-bold">
                <span className="text-yellow-500 text-sm">★</span>
                <span className="text-white">{gig.rating.toFixed(1)}</span>
                <span className="text-gray-500 font-medium tracking-tight">({gig.reviews} reviews)</span>
              </div>
              
              <div className="h-4 w-px bg-white/10 hidden md:block"></div>
              
              <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                {5} Orders in Queue
              </div>
            </div>

            {/* Gallery */}
            <div className="mb-12 aspect-[16/10] rounded-xl overflow-hidden border border-white/5 bg-[#161616] glass group relative">
              <img src={gig.images[0]} alt={gig.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-6 right-6 flex gap-2">
                <button className="p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-[#1DBF73] hover:text-black transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-red-500 transition-all">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-[#1DBF73] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter shadow-xl">
                  Best Value Guaranteed
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-16">
              <h2 className="text-xs uppercase tracking-[0.2em] font-black text-[#1DBF73] mb-6">Service Overview</h2>
              <div className="prose prose-invert max-w-none prose-p:text-gray-400 prose-p:text-sm prose-p:leading-relaxed prose-headings:text-white prose-li:text-gray-400 prose-li:text-sm">
                {gig.description.split('\n').map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-16 pb-12 border-b border-white/5">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-bold text-white tracking-tight">Client Feedback</h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Sort by:</span>
                  <select className="bg-transparent text-white font-black text-[10px] uppercase tracking-widest focus:outline-none cursor-pointer">
                    <option>Most Relevant</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-12">
                {[
                  { name: "James Cooper", country: "United States", rating: 5, date: "3 weeks ago", text: "Fazur delivered exactly what I needed. His coding skills are top-notch and he was very responsive throughout the project. Highly recommended!" },
                  { name: "Elena Schmidt", country: "Germany", rating: 5, date: "1 month ago", text: "Absolute professional. The website is incredibly fast and looks great on mobile instruments. Will hire again for sure." }
                ].map((review, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-[#161616] border border-white/5 rounded-xl glass">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={`https://picsum.photos/seed/rev-${i}/100/100`} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-white uppercase text-[10px] tracking-widest">{review.name}</h4>
                        <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{review.country}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <span key={j} className="text-yellow-500 text-[10px]">★</span>
                        ))}
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1DBF73] ml-2">{review.date}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="mb-16">
              <h2 className="text-xl font-bold text-white tracking-tight mb-8">Service FAQs</h2>
              <div className="space-y-3">
                {gig.faqs.map((faq: any, i: number) => (
                  <details key={i} className="group bg-[#161616] border border-white/5 rounded-xl overflow-hidden cursor-pointer h-auto glass">
                    <summary className="p-5 flex items-center justify-between font-bold text-sm text-gray-200 list-none group-open:text-[#1DBF73] transition-colors">
                      {faq.q}
                      <ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform text-[#1DBF73]" />
                    </summary>
                    <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-[#161616] border border-[#1DBF73]/20 rounded-xl overflow-hidden glass shadow-2xl">
                <div className="flex border-b border-white/5">
                  {['basic', 'standard', 'premium'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPackage(p as any)}
                      className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.15em] transition-all relative ${
                        selectedPackage === p ? 'text-[#1DBF73] bg-[#1DBF73]/5' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {p}
                      {selectedPackage === p && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1DBF73]"></div>}
                    </button>
                  ))}
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold text-lg">{pkg.name}</h3>
                    <span className="text-2xl font-black text-white tracking-tighter">${pkg.price}</span>
                  </div>
                  
                  <p className="text-gray-400 text-xs mb-8 leading-relaxed font-medium">
                    {pkg.desc}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2 text-[10px] text-gray-300 font-black uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5 text-[#1DBF73]" />
                      {pkg.delivery} Days
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-300 font-black uppercase tracking-widest">
                      <RotateCcw className="w-3.5 h-3.5 text-[#1DBF73]" />
                      {pkg.revisions === -1 ? 'Unlimited' : pkg.revisions} Rev
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((f: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#1DBF73]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="btn-premium w-full py-4 rounded text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 mb-4">
                    Order Now (${pkg.price}) <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <button className="w-full bg-white/5 border border-white/5 hover:border-[#1DBF73]/30 text-white py-4 rounded text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    Message Fazur
                  </button>
                </div>
                
                <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-center gap-3 text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">
                  <ShieldCheck className="w-3 h-3 text-[#1DBF73]" />
                  Secure Checkout Guaranteed
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <button className="flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                  <Flag className="w-3 h-3" /> Report Gig
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
