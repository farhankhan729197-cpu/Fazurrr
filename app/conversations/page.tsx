'use client';

import React, { useState, useEffect, useRef } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { useAuth } from '@/components/AuthProvider';
import { 
  collection, query, where, onSnapshot, 
  orderBy, addDoc, serverTimestamp, doc, 
  updateDoc, getDocs, limit 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { Send, Image as ImageIcon, Paperclip, MoreVertical, Search, CheckCheck, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

export default function ConversationsPage() {
  const { user, isAdmin } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConv, setSelectedConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user.uid),
      orderBy('lastMessageAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConversations(convs);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'conversations'));

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!selectedConv) return;

    const q = query(
      collection(db, `conversations/${selectedConv.id}/messages`),
      orderBy('createdAt', 'asc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, (error) => handleFirestoreError(error, OperationType.GET, `conversations/${selectedConv.id}/messages`));

    return () => unsubscribe();
  }, [selectedConv]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConv || !user) return;

    try {
      const msgData = {
        senderId: user.uid,
        text: newMessage,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, `conversations/${selectedConv.id}/messages`), msgData);
      
      await updateDoc(doc(db, 'conversations', selectedConv.id), {
        lastMessage: newMessage,
        lastMessageAt: serverTimestamp(),
      });

      setNewMessage('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `conversations/${selectedConv.id}/messages`);
    }
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 md:px-6 py-8 h-[calc(100vh-140px)]">
        <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden flex h-full shadow-2xl">
          
          {/* List Sidebar */}
          <div className="w-full md:w-80 lg:w-96 border-r border-white/10 flex flex-col bg-zinc-950/50">
            <div className="p-6 border-b border-white/10">
              <h1 className="text-2xl font-black text-white mb-6">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search conversations..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="p-10 text-center"><div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div></div>
              ) : conversations.length > 0 ? (
                conversations.map((conv) => (
                  <button 
                    key={conv.id}
                    onClick={() => setSelectedConv(conv)}
                    className={`w-full p-6 flex gap-4 hover:bg-white/5 transition-all text-left border-b border-white/5 ${selectedConv?.id === conv.id ? 'bg-green-500/5' : ''}`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex-shrink-0 relative">
                      <img src={`https://picsum.photos/seed/${conv.id}/100/100`} alt="" className="rounded-2xl" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-white font-bold text-sm tracking-tight truncate">
                          {isAdmin ? (conv.customerName || 'Client') : 'Fazur (Admin)'}
                        </h4>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                          {conv.lastMessageAt?.seconds ? format(new Date(conv.lastMessageAt.seconds * 1000), 'HH:mm') : 'Now'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs truncate leading-tight tracking-tight">
                        {conv.lastMessage || 'No messages yet'}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-10 text-center text-gray-500 text-sm">No conversations found.</div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex flex-col flex-grow bg-black/40 backdrop-blur-sm">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800">
                      <img src={`https://picsum.photos/seed/${selectedConv.id}/100/100`} alt="" className="rounded-xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-black text-sm tracking-tight">
                        {isAdmin ? (selectedConv.customerName || 'Client') : 'Fazur (Admin)'}
                      </h3>
                      <p className="text-green-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages List */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                  {messages.map((msg, i) => {
                    const isMe = msg.senderId === user?.uid;
                    return (
                      <div key={msg.id || i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                          <div 
                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                              isMe 
                                ? 'bg-green-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                                : 'bg-zinc-900 text-gray-300 rounded-tl-none border border-white/5'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div className="flex items-center gap-2 px-1">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                              {msg.createdAt?.seconds ? format(new Date(msg.createdAt.seconds * 1000), 'HH:mm') : '...'}
                            </span>
                            {isMe && <CheckCheck className="w-3 h-3 text-green-500" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={scrollRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={sendMessage} className="p-6 border-t border-white/10 bg-zinc-950/50">
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[1.5rem] p-2 pr-3 focus-within:border-green-500/50 transition-all">
                    <div className="flex gap-1 pl-2">
                      <button type="button" className="p-2 text-gray-500 hover:text-white transition-colors">
                        <ImageIcon className="w-5 h-5" />
                      </button>
                      <button type="button" className="p-2 text-gray-500 hover:text-white transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-grow bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-gray-600 px-2"
                    />
                    <button 
                      type="submit" 
                      disabled={!newMessage.trim()}
                      className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-600 text-white p-3 rounded-xl transition-all shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-10">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 text-gray-700">
                  <MessageSquare className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2">Select a conversation</h3>
                <p className="text-gray-500 max-w-sm tracking-tight leading-relaxed">
                  Connect with your clients or the expert Fazur to discuss projects and details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </PageWrapper>
  );
}
