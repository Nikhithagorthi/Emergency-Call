
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bell, Search, Filter, AlertCircle, CheckCircle, Clock, User, Users, RefreshCw } from 'lucide-react';
import EmergencyCard from './EmergencyCard';

interface PoliceDashboardProps {
  className?: string;
}

interface EmergencyCase {
  id: string;
  caller: string;
  location: string;
  timestamp: string;
  distressLevel: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'active' | 'resolved';
}

const PoliceDashboard: React.FC<PoliceDashboardProps> = ({ className }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'active' | 'resolved'>('all');
  const [activeSorting, setActiveSorting] = useState<'latest' | 'oldest' | 'priority'>('priority');
  const [searchQuery, setSearchQuery] = useState('');
  
  const emergencyCases: EmergencyCase[] = [
    {
      id: 'EM-7821',
      caller: 'Sarah Johnson',
      location: '243 Oakwood Avenue, apt 5B',
      timestamp: '2 min ago',
      distressLevel: 'critical',
      status: 'new',
    },
    {
      id: 'EM-7820',
      caller: 'Michael Chen',
      location: '185 Pine Street',
      timestamp: '5 min ago',
      distressLevel: 'high',
      status: 'active',
    },
    {
      id: 'EM-7819',
      caller: 'David Wilson',
      location: '742 Evergreen Terrace',
      timestamp: '12 min ago',
      distressLevel: 'medium',
      status: 'active',
    },
    {
      id: 'EM-7818',
      caller: 'Emily Rodriguez',
      location: '1234 Maple Avenue',
      timestamp: '23 min ago',
      distressLevel: 'low',
      status: 'active',
    },
    {
      id: 'EM-7817',
      caller: 'James Smith',
      location: '567 Oak Lane',
      timestamp: '45 min ago',
      distressLevel: 'medium',
      status: 'resolved',
    },
    {
      id: 'EM-7816',
      caller: 'Sophia Kim',
      location: '890 Cedar Road',
      timestamp: '1 hour ago',
      distressLevel: 'high',
      status: 'resolved',
    },
  ];
  
  const getFilteredAndSortedCases = () => {
    // First, filter by status if needed
    let filtered = emergencyCases;
    if (activeFilter !== 'all') {
      filtered = emergencyCases.filter(c => c.status === activeFilter);
    }
    
    // Then filter by search query if any
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.caller.toLowerCase().includes(query) || 
        c.location.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query)
      );
    }
    
    // Then sort according to the selected option
    return filtered.sort((a, b) => {
      if (activeSorting === 'priority') {
        // Sort by distress level (critical first)
        const levelOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return levelOrder[a.distressLevel] - levelOrder[b.distressLevel];
      } else if (activeSorting === 'latest') {
        // Just use the order as is (assuming they're already sorted by time)
        return 0;
      } else {
        // oldest first, reverse the order
        return 1;
      }
    });
  };
  
  const filteredCases = getFilteredAndSortedCases();
  
  const handleCardClick = (id: string) => {
    console.log(`Clicked case ${id}`);
    // This would typically open a detailed view
  };
  
  const handleRefresh = () => {
    console.log('Refreshing dashboard...');
    // This would typically refresh the data
  };

  return (
    <div className={cn(
      'rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-lg',
      className
    )}>
      <div className="px-4 py-3 bg-primary text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell size={18} className="mr-2" />
            <h3 className="font-medium">Police Response Dashboard</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw size={14} />
            </button>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={14} className="text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, location or ID"
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-neutral-100 rounded-lg">
              <button
                className={cn(
                  "px-3 py-1.5 text-xs rounded-lg transition-colors",
                  activeFilter === 'all' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-200'
                )}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button
                className={cn(
                  "px-3 py-1.5 text-xs rounded-lg transition-colors",
                  activeFilter === 'new' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-200'
                )}
                onClick={() => setActiveFilter('new')}
              >
                New
              </button>
              <button
                className={cn(
                  "px-3 py-1.5 text-xs rounded-lg transition-colors",
                  activeFilter === 'active' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-200'
                )}
                onClick={() => setActiveFilter('active')}
              >
                Active
              </button>
              <button
                className={cn(
                  "px-3 py-1.5 text-xs rounded-lg transition-colors",
                  activeFilter === 'resolved' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-200'
                )}
                onClick={() => setActiveFilter('resolved')}
              >
                Resolved
              </button>
            </div>
            
            <div className="relative">
              <button
                className="flex items-center px-2 py-1.5 text-xs rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
              >
                <Filter size={12} className="mr-1" />
                {activeSorting === 'priority' && 'Priority'}
                {activeSorting === 'latest' && 'Latest'}
                {activeSorting === 'oldest' && 'Oldest'}
              </button>
              <div className="absolute top-full right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 hidden">
                <div className="p-1">
                  <button
                    className="flex items-center w-full px-3 py-1.5 text-xs text-left hover:bg-neutral-100 rounded"
                    onClick={() => setActiveSorting('priority')}
                  >
                    <AlertCircle size={12} className="mr-1.5" />
                    Priority
                  </button>
                  <button
                    className="flex items-center w-full px-3 py-1.5 text-xs text-left hover:bg-neutral-100 rounded"
                    onClick={() => setActiveSorting('latest')}
                  >
                    <Clock size={12} className="mr-1.5" />
                    Latest
                  </button>
                  <button
                    className="flex items-center w-full px-3 py-1.5 text-xs text-left hover:bg-neutral-100 rounded"
                    onClick={() => setActiveSorting('oldest')}
                  >
                    <Clock size={12} className="mr-1.5" />
                    Oldest
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCases.map((emergency) => (
            <EmergencyCard
              key={emergency.id}
              id={emergency.id}
              caller={emergency.caller}
              location={emergency.location}
              timestamp={emergency.timestamp}
              distressLevel={emergency.distressLevel}
              status={emergency.status}
              onClick={() => handleCardClick(emergency.id)}
            />
          ))}
          
          {filteredCases.length === 0 && (
            <div className="col-span-full py-10 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                <AlertCircle size={20} className="text-neutral-400" />
              </div>
              <h4 className="text-sm font-medium text-neutral-700 mb-1">No emergencies found</h4>
              <p className="text-xs text-neutral-500">
                {searchQuery 
                  ? 'Try adjusting your search criteria'
                  : activeFilter !== 'all' 
                    ? `No ${activeFilter} emergencies currently`
                    : 'There are no emergency calls at the moment'}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-6 border-t border-neutral-200 pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-neutral-500">
                <div className="w-2 h-2 rounded-full bg-emergency-500 mr-1"></div>
                <span>Critical: {emergencyCases.filter(c => c.distressLevel === 'critical').length}</span>
              </div>
              <div className="flex items-center text-xs text-neutral-500">
                <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
                <span>High: {emergencyCases.filter(c => c.distressLevel === 'high').length}</span>
              </div>
              <div className="flex items-center text-xs text-neutral-500">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                <span>Medium: {emergencyCases.filter(c => c.distressLevel === 'medium').length}</span>
              </div>
              <div className="flex items-center text-xs text-neutral-500">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span>Low: {emergencyCases.filter(c => c.distressLevel === 'low').length}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <User size={14} className="text-primary mr-1" />
                <span className="text-xs text-neutral-600">
                  {emergencyCases.length} total calls
                </span>
              </div>
              <div className="flex items-center">
                <Users size={14} className="text-primary mr-1" />
                <span className="text-xs text-neutral-600">12 active officers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;
