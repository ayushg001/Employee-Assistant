import React, { createContext, useContext, useState, useEffect } from 'react';
import { sendChatMessage } from '../services/geminiApi';

const ChatContext = createContext();

const INITIAL_WELCOME_MESSAGE = {
  id: 'msg-welcome',
  sender: 'assistant',
  content: `Hello! 👋 I'm **PulseAI**, your intelligent workplace assistant.

I can help you check company policies, search employee details, draft meeting notes, or explain benefits and expense procedures.

Feel free to ask a question or select one of the suggested prompts below to get started!`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  source: 'local-knowledge-base'
};

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('pulseai_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading chat history from localStorage:', e);
    }
    return [INITIAL_WELCOME_MESSAGE];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('pulseai_gemini_key') || '';
  });

  useEffect(() => {
    try {
      localStorage.setItem('pulseai_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error('Error saving chat history to localStorage:', e);
    }
  }, [messages]);

  const saveApiKey = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem('pulseai_gemini_key', newKey.trim());
    } else {
      localStorage.removeItem('pulseai_gemini_key');
    }
  };

  const clearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('pulseai_gemini_key');
  };

  const clearHistory = () => {
    const welcome = {
      ...INITIAL_WELCOME_MESSAGE,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcome]);
    setError(null);
    localStorage.removeItem('pulseai_chat_history');
  };

  const sendMessage = async (text) => {
    if (!text || !text.trim() || isLoading) return;

    const userText = text.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      content: userText,
      timestamp: timestamp
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    try {
      const response = await sendChatMessage(updatedMessages, apiKey);

      const botMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'assistant',
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: response.source
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError({
        message: err.message || 'An unexpected error occurred while contacting the AI Assistant.',
        status: err.status || 500,
        originalPrompt: userText
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const retryLastMessage = () => {
    if (error?.originalPrompt) {
      const promptToRetry = error.originalPrompt;
      setError(null);
      sendMessage(promptToRetry);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        isTyping,
        error,
        apiKey,
        saveApiKey,
        clearApiKey,
        sendMessage,
        clearHistory,
        retryLastMessage,
        clearError: () => setError(null)
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
