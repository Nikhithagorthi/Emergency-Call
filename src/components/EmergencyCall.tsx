
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Phone, PhoneCall, PhoneOff, Clock, Shield } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';
import { rippleEffect } from '@/utils/animations';

interface EmergencyCallProps {
  className?: string;
  onCallStarted?: () => void;
  onCallEnded?: () => void;
}

const EmergencyCall: React.FC<EmergencyCallProps> = ({
  className,
  onCallStarted,
  onCallEnded,
}) => {
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  
  useEffect(() => {
    let timer: number;
    
    if (callStatus === 'active') {
      timer = window.setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callStatus]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStartCall = (e: React.MouseEvent<HTMLButtonElement>) => {
    rippleEffect(e);
    setCallStatus('connecting');
    setShowPulse(true);
    
    // Simulate connecting
    setTimeout(() => {
      setCallStatus('active');
      setCallDuration(0);
      
      if (onCallStarted) {
        onCallStarted();
      }
    }, 2000);
  };
  
  const handleEndCall = (e: React.MouseEvent<HTMLButtonElement>) => {
    rippleEffect(e);
    setCallStatus('ended');
    setShowPulse(false);
    
    if (onCallEnded) {
      onCallEnded();
    }
    
    // Reset after a delay
    setTimeout(() => {
      setCallStatus('idle');
      setCallDuration(0);
    }, 5000);
  };

  return (
    <div className={cn(
      'rounded-xl overflow-hidden shadow-lg bg-white border border-neutral-200',
      className
    )}>
      <div className={cn(
        'px-4 py-3 border-b transition-colors',
        callStatus === 'idle' || callStatus === 'ended' ? 'bg-neutral-100 border-neutral-200' : 
        callStatus === 'connecting' ? 'bg-yellow-100 border-yellow-200' : 
        'bg-emergency-100 border-emergency-200'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {callStatus === 'idle' || callStatus === 'ended' ? (
              <Phone size={18} className="mr-2 text-primary" />
            ) : callStatus === 'connecting' ? (
              <PhoneCall size={18} className="mr-2 text-yellow-600 animate-pulse" />
            ) : (
              <PhoneCall size={18} className="mr-2 text-emergency-600" />
            )}
            <h3 className={cn(
              "font-medium",
              callStatus === 'idle' || callStatus === 'ended' ? 'text-primary' : 
              callStatus === 'connecting' ? 'text-yellow-600' : 
              'text-emergency-600'
            )}>
              Emergency Call
            </h3>
          </div>
          
          {callStatus === 'active' && (
            <div className="flex items-center">
              <Clock size={14} className="mr-1 text-emergency-600" />
              <span className="text-xs font-medium text-emergency-600">
                {formatTime(callDuration)}
              </span>
            </div>
          )}
          
          {callStatus === 'connecting' && (
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full flex items-center">
              <span className="animate-pulse mr-1.5 h-1.5 w-1.5 rounded-full bg-yellow-500" />
              Connecting
            </span>
          )}
          
          {callStatus === 'ended' && (
            <span className="text-xs bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded-full">
              Call Ended
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 flex flex-col items-center">
        {(callStatus === 'idle' || callStatus === 'ended') && (
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
              <Shield size={32} className="text-primary" />
            </div>
            <h4 className="text-lg font-medium mb-1">Emergency Services</h4>
            <p className="text-sm text-neutral-500 mb-6 max-w-xs mx-auto">
              {callStatus === 'idle' 
                ? 'Press the call button to simulate an emergency call with our AI assistant.'
                : 'Your emergency call has ended. Press the call button to start a new call.'}
            </p>
            
            <button
              onClick={handleStartCall}
              className="flex items-center justify-center mx-auto w-16 h-16 rounded-full bg-emergency-500 text-white hover:bg-emergency-600 transition-colors relative overflow-hidden"
            >
              {showPulse && (
                <span className="absolute inset-0 bg-white opacity-20 animate-ping" />
              )}
              <Phone size={24} />
            </button>
            <span className="block mt-3 text-sm font-medium text-emergency-600">Call Now</span>
          </div>
        )}
        
        {(callStatus === 'connecting' || callStatus === 'active') && (
          <div className="text-center p-4 w-full">
            <div className={cn(
              "w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center relative",
              callStatus === 'connecting' ? 'bg-yellow-100' : 'bg-emergency-100'
            )}>
              {showPulse && (
                <span className={cn(
                  "absolute inset-0 rounded-full animate-ping opacity-70",
                  callStatus === 'connecting' ? 'bg-yellow-200' : 'bg-emergency-200'
                )} />
              )}
              {callStatus === 'connecting' ? (
                <PhoneCall size={36} className="text-yellow-600" />
              ) : (
                <PhoneCall size={36} className="text-emergency-600" />
              )}
            </div>
            
            <h4 className="text-lg font-semibold mb-1">
              {callStatus === 'connecting' ? 'Connecting...' : 'Emergency Call Active'}
            </h4>
            <p className={cn(
              "text-sm mb-2",
              callStatus === 'connecting' ? 'text-yellow-700' : 'text-emergency-700'
            )}>
              {callStatus === 'connecting' ? 'Please wait while we connect you' : 'You are now connected to AI Emergency Services'}
            </p>
            
            <AudioVisualizer 
              isActive={callStatus === 'active'} 
              barCount={10} 
              className="mx-auto mb-6" 
              barColor={callStatus === 'connecting' ? '#d97706' : '#dc2626'}
            />
            
            <button
              onClick={handleEndCall}
              className="flex items-center justify-center mx-auto w-14 h-14 rounded-full bg-emergency-500 text-white hover:bg-emergency-600 transition-colors relative overflow-hidden"
            >
              <PhoneOff size={20} />
            </button>
            <span className="block mt-2 text-sm font-medium text-emergency-600">End Call</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyCall;
