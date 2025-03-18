
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Mic, MicOff, User, Bot } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';
import { typeText } from '@/utils/animations';

interface AIAssistantProps {
  className?: string;
  onDistressDetected?: (level: number) => void;
  onLocationDetected?: (location: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  className,
  onDistressDetected,
  onLocationDetected,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContentRef = useRef<HTMLSpanElement>(null);
  
  const aiResponses = [
    "Thank you for calling emergency services. This is an AI assistant. What's your emergency?",
    "I understand this is difficult. Can you tell me your current location?",
    "I've detected your location. Are you or anyone else injured?",
    "Help is on the way. The nearest patrol unit has been notified and is heading to your location. Please stay on the line.",
    "Is there anything else I should know about the situation to help the officers when they arrive?",
  ];
  
  const userPrompts = [
    "Help! Someone is trying to break into my apartment!",
    "I'm at 243 Oakwood Avenue, apartment 5B. Please hurry!",
    "No, I'm not injured. I'm hiding in the bedroom closet. I can hear them in the living room.",
    "They have a crowbar or something. I think there are two of them. I'm really scared.",
  ];

  useEffect(() => {
    // Initialize with the first AI message
    const initialMessage: Message = {
      id: Date.now().toString(),
      sender: 'ai',
      text: aiResponses[0],
      timestamp: new Date(),
    };
    
    setMessages([initialMessage]);
    
    // Auto-scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate user speaking
      setTimeout(() => {
        const messageIndex = messages.filter(m => m.sender === 'user').length;
        if (messageIndex < userPrompts.length) {
          addMessage('user', userPrompts[messageIndex]);
          
          // Detect distress in the first message
          if (messageIndex === 0 && onDistressDetected) {
            onDistressDetected(0.85); // High distress
          }
          
          // Detect location in the second message
          if (messageIndex === 1 && onLocationDetected) {
            onLocationDetected("243 Oakwood Avenue, apartment 5B");
          }
          
          // AI responds after user message
          setTimeout(() => {
            const nextAiResponse = aiResponses[messageIndex + 1];
            if (nextAiResponse) {
              addMessage('ai', nextAiResponse);
            }
            
            setIsListening(false);
          }, 2000);
        } else {
          setIsListening(false);
        }
      }, 3000);
    }
  };

  const addMessage = (sender: 'user' | 'ai', text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // For AI messages, animate the text typing
    if (sender === 'ai' && messageContentRef.current) {
      setTimeout(() => {
        if (messageContentRef.current) {
          typeText(messageContentRef.current, text, 30);
        }
      }, 300);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentInput.trim()) {
      addMessage('user', currentInput);
      setCurrentInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const messageIndex = messages.filter(m => m.sender === 'user').length;
        const nextAiResponse = aiResponses[messageIndex];
        
        if (nextAiResponse) {
          addMessage('ai', nextAiResponse);
        }
      }, 1500);
    }
  };

  return (
    <div className={cn(
      'flex flex-col rounded-xl overflow-hidden shadow-lg bg-white border border-neutral-200',
      className
    )}>
      <div className="bg-primary px-4 py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot size={20} />
            <h3 className="font-medium">Emergency AI Assistant</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
              Live Call
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
        {messages.map((message, index) => (
          <div 
            key={message.id}
            className={cn(
              'flex',
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div className={cn(
              'max-w-xs md:max-w-md rounded-2xl p-3 animate-slide-up',
              message.sender === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-neutral-100 text-neutral-800 rounded-tl-none'
            )}>
              <div className="flex items-center space-x-2 mb-1">
                {message.sender === 'ai' ? (
                  <Bot size={14} className="text-neutral-500" />
                ) : (
                  <User size={14} className="text-white/70" />
                )}
                <span className={cn(
                  'text-xs',
                  message.sender === 'user' ? 'text-white/70' : 'text-neutral-500'
                )}>
                  {message.sender === 'user' ? 'You' : 'AI Assistant'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <span 
                ref={index === messages.length - 1 && message.sender === 'ai' ? messageContentRef : null} 
                className="text-sm whitespace-pre-wrap"
              >
                {message.text}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-neutral-200 p-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleListening}
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-full transition-colors',
              isListening
                ? 'bg-emergency-100 text-emergency-600 hover:bg-emergency-200'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
            aria-label={isListening ? 'Stop recording' : 'Start recording'}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          
          <AudioVisualizer 
            isActive={isListening} 
            barCount={6} 
            barColor={isListening ? '#DC2626' : '#9CA3AF'} 
          />
          
          <form onSubmit={handleSubmit} className="flex-1 flex">
            <input
              type="text"
              placeholder="Type your message..."
              value={currentInput}
              onChange={handleInputChange}
              className="flex-1 border border-neutral-300 rounded-l-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors text-sm"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
