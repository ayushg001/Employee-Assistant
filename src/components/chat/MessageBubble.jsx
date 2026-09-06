import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Copy, Check, Sparkles, Database } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

export default function MessageBubble({ message }) {
  const { profile } = useProfile();
  const [copied, setCopied] = useState(false);

  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderFormattedContent = (content) => {
    const lines = content.split('\n');

    return lines.map((line, index) => {
      if (line.startsWith('### ')) {
        return (
          <h4 key={index} className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }

      if (line.startsWith('> ')) {
        return (
          <div
            key={index}
            className="border-l-2 border-indigo-500 pl-3 my-2 text-xs italic text-slate-600 dark:text-slate-400 bg-indigo-50/40 dark:bg-indigo-950/20 py-1 rounded-r"
          >
            {formatInlineText(line.replace('> ', ''))}
          </div>
        );
      }

      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <div key={index} className="flex items-start gap-2 my-0.5 text-xs sm:text-sm">
            <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
            <span>{formatInlineText(line.replace(/^[*|-]\s+/, ''))}</span>
          </div>
        );
      }

      const numMatch = line.match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <div key={index} className="flex items-start gap-2 my-0.5 text-xs sm:text-sm">
            <span className="text-indigo-500 font-semibold shrink-0">{numMatch[1]}.</span>
            <span>{formatInlineText(numMatch[2])}</span>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={index} className="h-1.5" />;
      }

      return (
        <p key={index} className="my-0.5 leading-relaxed">
          {formatInlineText(line)}
        </p>
      );
    });
  };

  const formatInlineText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-start gap-3 py-2 group ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {isUser ? (
        <img
          src={profile.avatar}
          alt={profile.fullName}
          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shrink-0 shadow-xs">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-xs sm:text-sm shadow-xs relative transition-all ${
          isUser
            ? 'bg-indigo-600 text-white rounded-tr-xs'
            : 'bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs'
        }`}
      >
        <div className="space-y-1">
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          ) : (
            renderFormattedContent(message.content)
          )}
        </div>

        <div
          className={`flex items-center justify-between gap-3 pt-2 mt-2 border-t text-[10px] ${
            isUser
              ? 'border-indigo-500/40 text-indigo-200'
              : 'border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span>{message.timestamp}</span>
            {!isUser && message.source && (
              <span className="flex items-center gap-1 font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                {message.source === 'gemini-api' || message.source === 'Gemini API' ? (
                  <>
                    <Sparkles className="w-2.5 h-2.5 text-indigo-500" /> Gemini API
                  </>
                ) : (
                  <>
                    <Database className="w-2.5 h-2.5 text-emerald-500" /> Knowledge Base
                  </>
                )}
              </span>
            )}
          </div>

          {!isUser && (
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Copy response to clipboard"
            >
              {copied ? (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3 h-3" /> Copied
                </span>
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
