import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Bot, AlertCircle, RotateCcw, X } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestedPrompts from './SuggestedPrompts';
import Button from '../common/Button';

export default function ChatInterface() {
  const {
    messages,
    isLoading,
    isTyping,
    error,
    sendMessage,
    clearHistory,
    retryLastMessage,
    clearError
  } = useChat();

  const [inputPrompt, setInputPrompt] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;
    sendMessage(inputPrompt);
    setInputPrompt('');
  };

  const handleSelectPrompt = (prompt) => {
    sendMessage(prompt);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                PulseAI Assistant
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Workplace Knowledge & Team Assistant
            </p>
          </div>
        </div>

        <button
          onClick={clearHistory}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Clear Chat History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        {/* Error handling banner */}
        {error && (
          <div className="my-3 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <div>
                <p className="font-semibold">API Error</p>
                <p className="text-rose-600 dark:text-rose-300 text-[11px] mt-0.5">
                  {error.message}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="secondary" onClick={retryLastMessage} className="text-xs">
                <RotateCcw className="w-3 h-3 mr-1" /> Retry
              </Button>
              <button onClick={clearError} className="p-1 text-rose-500 hover:text-rose-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {messages.length <= 2 && (
          <div className="pt-3">
            <SuggestedPrompts onSelectPrompt={handleSelectPrompt} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
          <input
            ref={inputRef}
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about company leave policy, leadership, or expenses..."
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 transition-all"
          />

          <Button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            isLoading={isLoading}
            className="h-10 px-4 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline ml-1.5 font-semibold">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
