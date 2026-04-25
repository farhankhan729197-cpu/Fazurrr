'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Menu, X, LogIn, LogOut, LayoutDashboard, MessageSquare, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user, profile, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Why Fazur?', href: '/#why-fazur' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A0A0A] border-b border-white/10 py-2' : 'bg-[#0A0A0A]/50 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tighter text-white">
                FAZUR<span className="text-[#1DBF73]">.</span>
              </span>
            </Link>
            
            {/* Theme Search Bar */}
            <div className="hidden lg:flex relative w-80">
              <input 
                type="text" 
                placeholder="What service are you looking for?" 
                className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-2 text-sm focus:border-[#1DBF73] outline-none text-white"
              />
              <div className="absolute right-2 top-1.5 p-1 bg-[#1DBF73] rounded text-black cursor-pointer hover:bg-[#19a463] transition-colors">
                <Search className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-4 w-px bg-white/10 mx-2" />

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/conversations" className="text-sm font-semibold text-gray-400 hover:text-white">
                  Messages
                </Link>
                <Link 
                  href={isAdmin ? '/admin' : '/dashboard'} 
                  className="text-sm font-semibold text-gray-400 hover:text-[#1DBF73] transition-colors"
                >
                  Orders
                </Link>
                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-white/10">
                  <span className="text-xs text-gray-400 font-medium">Hi, {profile?.name.split(' ')[0]}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#1DBF73]/30">
                    <img src={profile?.avatar || user.photoURL || ''} alt={profile?.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={login}
                className="btn-premium px-6 py-2 rounded text-sm transition-all"
              >
                Join
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-white/10 py-6 px-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="h-px w-full bg-white/10 my-2" />
              
              {user ? (
                <>
                  <Link 
                    href={isAdmin ? '/admin' : '/dashboard'}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-lg font-medium text-green-400"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    {isAdmin ? 'Admin Panel' : 'My Dashboard'}
                  </Link>
                  <Link 
                    href="/conversations"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-lg font-medium text-gray-300"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Messages
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="flex items-center gap-3 text-lg font-medium text-red-500"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { login(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-bold"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In with Google
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
