
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, MapPin, Clock, Phone, User } from 'lucide-react';
import { rippleEffect } from '@/utils/animations';

interface EmergencyCardProps {
  id: string;
  caller: string;
  location: string;
  timestamp: string;
  distressLevel: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'active' | 'resolved';
  className?: string;
  onClick?: () => void;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({
  id,
  caller,
  location,
  timestamp,
  distressLevel,
  status,
  className,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDistressColor = () => {
    switch (distressLevel) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical':
        return 'bg-emergency-100 text-emergency-800 border-emergency-200';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const getDistressLevelLabel = () => {
    switch (distressLevel) {
      case 'low':
        return 'Low Distress';
      case 'medium':
        return 'Medium Distress';
      case 'high':
        return 'High Distress';
      case 'critical':
        return 'Critical';
      default:
        return 'Unknown';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    rippleEffect(e);
    onClick?.();
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden border rounded-lg shadow-sm transition-all duration-300 ease-in-out bg-white',
        isHovered && 'shadow-md transform -translate-y-1',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <User size={14} className="mr-1 text-neutral-500" />
              <h3 className="font-medium text-neutral-900">{caller}</h3>
            </div>
            <div className="flex items-center text-sm text-neutral-500">
              <MapPin size={12} className="mr-1" />
              <span className="truncate max-w-[180px]">{location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={cn('px-2 py-0.5 text-xs rounded-full mb-1', getDistressColor())}>
              {getDistressLevelLabel()}
            </span>
            <div className="flex items-center text-xs text-neutral-500">
              <Clock size={12} className="mr-1" />
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={cn('px-2 py-0.5 text-xs rounded-full', getStatusColor())}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          
          <div className="flex space-x-1">
            <button 
              className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-700"
              aria-label="View details"
            >
              <AlertCircle size={14} />
            </button>
            <button 
              className="p-1.5 rounded-full bg-green-100 hover:bg-green-200 transition-colors text-green-700"
              aria-label="Call"
            >
              <Phone size={14} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Distress level indicator line at the top */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-1 transition-colors',
        distressLevel === 'low' && 'bg-green-500',
        distressLevel === 'medium' && 'bg-yellow-500',
        distressLevel === 'high' && 'bg-orange-500',
        distressLevel === 'critical' && 'bg-emergency-500 animate-pulse'
      )} />
    </div>
  );
};

export default EmergencyCard;
