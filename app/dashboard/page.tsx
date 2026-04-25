'use client';

import React, { useState, useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { useAuth } from '@/components/AuthProvider';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Package, Clock, MessageSquare, CreditCard, ExternalLink, Star } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function UserDashboard() {
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const q = query(
        collection(db, 'orders'),
        where('customerId', '==', user?.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-500/10';
      case 'in-progress': return 'text-blue-500 bg-blue-500/10';
      case 'delivered': return 'text-purple-500 bg-purple-500/10';
      case 'cancelled': return 'text-red-500 bg-red-500/10';
      default: return 'text-yellow-500 bg-yellow-500/10';
    }
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col gap-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-12 border-b border-white/10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <img src={profile?.avatar || user?.photoURL || ''} alt={profile?.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white mb-1">Welcome back, {profile?.name.split(' ')[0]}!</h1>
                <p className="text-gray-400">Total Orders: <span className="text-white font-bold">{orders.length}</span></p>
              </div>
            </div>
            <Link 
              href="/services" 
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-2xl font-bold transition-all"
            >
              Order New Service
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Sidebar Stats */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-green-500" /> My Wallet
                </h3>
                <div className="mb-6">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Credit Balance</p>
                  <p className="text-3xl font-black text-white">$0.00</p>
                </div>
                <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm hover:bg-white/10 transition-all">
                  Top Up
                </button>
              </div>

              <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-500" /> Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div>
                      <p className="text-white text-sm font-bold">Profile Created</p>
                      <p className="text-gray-500 text-xs">Welcome to Fazur!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard Area */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <Package className="w-6 h-6 text-green-500" /> Order History
              </h2>

              {loading ? (
                <div className="py-20 flex justify-center">
                  <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b border-white/10">
                        <th className="pb-4 text-gray-500 text-xs font-bold uppercase tracking-widest">Service</th>
                        <th className="pb-4 text-gray-500 text-xs font-bold uppercase tracking-widest">Date</th>
                        <th className="pb-4 text-gray-500 text-xs font-bold uppercase tracking-widest">Amount</th>
                        <th className="pb-4 text-gray-500 text-xs font-bold uppercase tracking-widest text-center">Status</th>
                        <th className="pb-4 text-gray-500 text-xs font-bold uppercase tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] group transition-colors">
                          <td className="py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-zinc-800 overflow-hidden">
                                <img src={order.gigImage || 'https://picsum.photos/seed/gig/100/100'} alt="" className="w-full h-full object-cover" />
                              </div>
                              <Link href={`/orders/${order.id}`} className="text-white font-bold text-sm hover:text-green-500 transition-colors line-clamp-1">
                                {order.gigTitle || 'Professional Service'}
                              </Link>
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <Clock className="w-3 h-3" />
                              {order.createdAt?.seconds ? format(new Date(order.createdAt.seconds * 1000), 'MMM d, yyyy') : 'Recently'}
                            </div>
                          </td>
                          <td className="py-6 text-white font-bold">${order.price}</td>
                          <td className="py-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-6 text-right">
                            <Link 
                              href={`/orders/${order.id}`}
                              className="text-gray-500 hover:text-white transition-colors"
                            >
                              <ExternalLink className="w-5 h-5 ml-auto" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-zinc-950 border border-white/5 border-dashed rounded-[2rem] py-24 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-gray-600">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No orders found</h3>
                  <p className="text-gray-500 mb-8 max-w-sm mx-auto tracking-tight">You haven't placed any orders yet. Explore the marketplace to find the perfect service for your project.</p>
                  <Link 
                    href="/services" 
                    className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-2xl font-black hover:bg-green-500 hover:text-white transition-all shadow-lg"
                  >
                    Start Exploring <Star className="w-4 h-4 fill-current" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
