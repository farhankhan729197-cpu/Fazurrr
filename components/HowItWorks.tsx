'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingCart, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Browse',
    desc: 'Explore various professional services tailored for your needs and select the perfect package.',
    icon: Search,
  },
  {
    title: 'Order',
    desc: 'Provide your requirements and place the order securely using our premium checkout.',
    icon: ShoppingCart,
  },
  {
    title: 'Get Delivery',
    desc: 'Receive your high-quality project within the promised deadline. Unlimited revisions!',
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[10px] font-black text-[#1DBF73] uppercase tracking-[0.2em] mb-3">Efficiency First</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Fast Workflow</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-[#161616] rounded-xl border border-white/5 glass"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#1DBF73] flex items-center justify-center text-black mb-6 shadow-[0_0_20px_rgba(29,191,115,0.2)]">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
