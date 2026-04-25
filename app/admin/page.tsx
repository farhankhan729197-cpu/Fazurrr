'use client';

import React, { useState, useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { useAuth } from '@/components/AuthProvider';
import { collection, query, getDocs, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { 
  Users, Package, DollarSign, MessageSquare, 
  Settings, Plus, Edit2, Trash2, CheckCircle, 
  Clock, TrendingUp, ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    activeOrders: 0,
    totalUsers: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      // Redirect or show access denied
    } else if (user && isAdmin) {
      fetchAdminData();
    }
  }, [user, isAdmin, authLoading]);

  const fetchAdminData = async () => {
    try {
      const ordersQ = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(10));
      const ordersSnapshot = await getDocs(ordersQ);
      const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentOrders(ordersData);

      // Aggregating simple stats
      let earnings = 0;
      let active = 0;
      ordersData.forEach((o: any) => {
        earnings += o.price || 0;
        if (o.status === 'in-progress' || o.status === 'pending') active++;
      });
      
      setStats({
        totalEarnings: earnings,
        totalOrders: ordersSnapshot.size,
        activeOrders: active,
        totalUsers: 0 // Fetch users count separately if needed
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { 
        status: newStatus,
        updatedAt: new Date()
      });
      fetchAdminData();
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!isAdmin) return <PageWrapper><div className="container mx-auto px-4 py-32 text-center"><h1 className="text-4xl font-black mb-4">Access Denied</h1><p>Only the owner (Fazur) can access this page.</p></div></PageWrapper>;

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col gap-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/10">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Admin Command Center</h1>
              <p className="text-gray-400">Manage your digital empire and services.</p>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/admin/gigs/new" 
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                <Plus className="w-5 h-5" /> New Gig
              </Link>
              <button className="bg-white/5 border border-white/10 text-white p-3 rounded-2xl hover:bg-white/10 transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Revenue', val: `$${stats.totalEarnings}`, icon: DollarSign, color: 'bg-green-500' },
              { label: 'Total Orders', val: stats.totalOrders, icon: Package, color: 'bg-blue-500' },
              { label: 'Active Tasks', val: stats.activeOrders, icon: Clock, color: 'bg-orange-500' },
              { label: 'Unread Chats', val: '12', icon: MessageSquare, color: 'bg-pink-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-950 border border-white/10 p-6 rounded-3xl group hover:border-green-500/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-20`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-white">{stat.val}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Orders Table */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white">Recent Orders</h2>
                <Link href="/admin/orders" className="text-sm text-green-500 font-bold hover:underline">View All Orders</Link>
              </div>

              <div className="bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                        <th className="p-6">Client</th>
                        <th className="p-6">Gig</th>
                        <th className="p-6">Price</th>
                        <th className="p-6">Status</th>
                        <th className="p-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                                <img src={order.customerAvatar || 'https://picsum.photos/seed/user/100/100'} alt="" />
                              </div>
                              <span className="text-white font-bold text-sm tracking-tight">{order.customerName || 'Client'}</span>
                            </div>
                          </td>
                          <td className="p-6">
                            <p className="text-white text-sm font-medium truncate max-w-[150px]">{order.gigTitle || 'Professional Gig'}</p>
                          </td>
                          <td className="p-6 text-green-500 font-black">${order.price}</td>
                          <td className="p-6">
                            <select 
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className={`text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1 cursor-pointer bg-zinc-800 text-white outline-none focus:ring-1 ring-green-500`}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="delivered">Delivered</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-6 text-right">
                            <Link href={`/admin/orders/${order.id}`} className="p-2 text-gray-500 hover:text-white inline-block">
                              <ChevronRight className="w-5 h-5" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                      {recentOrders.length === 0 && (
                        <tr><td colSpan={5} className="p-20 text-center text-gray-500 italic">No orders yet. Start marketing!</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-black text-white mb-8">Manage Gigs</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Next.js Web Dev', category: 'Web', active: true },
                    { title: 'Amazon A+ Content', category: 'Amazon', active: true },
                    { title: 'Logo Design', category: 'Design', active: false },
                  ].map((gig, i) => (
                    <div key={i} className="bg-zinc-950 border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:border-green-500/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${gig.active ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-700'}`}></div>
                        <div>
                          <p className="text-white font-bold text-sm tracking-tight">{gig.title}</p>
                          <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">{gig.category}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-500 hover:text-blue-400 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-4 border border-zinc-800 border-dashed rounded-2xl text-gray-500 hover:text-white hover:border-white/20 transition-all font-bold text-sm">
                    View All Gigs
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-white mb-8">Inbox</h2>
                <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6 space-y-6">
                  {[
                    { from: 'James C.', time: '2m', msg: 'Hey, when can you deliver the logo?' },
                    { from: 'Elena S.', time: '1h', msg: 'I loved the website! Can we add...' }
                  ].map((chat, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex-shrink-0">
                        <img src={`https://picsum.photos/seed/chat-${i}/100/100`} alt="" className="rounded-xl" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-white font-bold text-xs">{chat.from}</h4>
                          <span className="text-[10px] text-gray-500 font-bold">{chat.time} ago</span>
                        </div>
                        <p className="text-gray-400 text-xs truncate leading-tight tracking-tight">{chat.msg}</p>
                      </div>
                    </div>
                  ))}
                  <Link href="/conversations" className="block text-center text-sm font-black text-green-500 pt-4 border-t border-white/5 hover:underline">
                    Go to Messages
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
