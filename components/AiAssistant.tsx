import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      text: 'Hello! I am the SafeNet AI. How can I assist you with cybersecurity today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await chatWithAssistant(userMsg.text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      // Error handled in service, but we can show visual error if needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 z-50 flex items-center gap-2"
        >
          <Bot className="w-6 h-6" />
          <span className="font-bold hidden md:inline">Ask AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-10 fade-in duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-900/50 border-b border-slate-700 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">SafeNet Assistant</h3>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-indigo-600' : 'bg-blue-600'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`p-3 rounded-xl text-sm max-w-[80%] ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600/20 text-indigo-100 border border-indigo-600/30 rounded-tr-none' 
                    : 'bg-slate-700 text-slate-200 border border-slate-600 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                 </div>
                 <div className="bg-slate-700 p-3 rounded-xl rounded-tl-none border border-slate-600">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-700 bg-slate-900/30 rounded-b-2xl">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your question..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
