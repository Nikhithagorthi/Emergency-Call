
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Navigation, Search, CheckCircle, Loader2 } from 'lucide-react';

interface LocationTrackerProps {
  address?: string;
  className?: string;
  onLocationConfirmed?: (coordinates: { lat: number; lng: number; address: string }) => void;
}

const LocationTracker: React.FC<LocationTrackerProps> = ({
  address,
  className,
  onLocationConfirmed,
}) => {
  const [locationStatus, setLocationStatus] = useState<'idle' | 'locating' | 'confirmed'>('idle');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [locatedAddress, setLocatedAddress] = useState<string | null>(null);
  const [nearbyUnits, setNearbyUnits] = useState<{ id: string; distance: string; eta: string }[]>([]);
  
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (address) {
      // Simulate location tracking
      setLocationStatus('locating');
      
      setTimeout(() => {
        // Simulate getting coordinates
        const simulatedCoordinates = {
          lat: 37.7749,
          lng: -122.4194,
        };
        setCoordinates(simulatedCoordinates);
        setLocatedAddress(address);
        setLocationStatus('confirmed');
        
        // Simulate finding nearby units
        setNearbyUnits([
          { id: 'Unit 34', distance: '0.8 miles', eta: '4 min' },
          { id: 'Unit 17', distance: '1.2 miles', eta: '7 min' },
          { id: 'Unit 42', distance: '2.1 miles', eta: '10 min' },
        ]);
        
        // Notify parent component
        if (onLocationConfirmed) {
          onLocationConfirmed({
            ...simulatedCoordinates,
            address: address,
          });
        }
      }, 3000);
    }
  }, [address, onLocationConfirmed]);

  useEffect(() => {
    // Create a simplified map visualization
    if (mapRef.current && coordinates) {
      const mapElement = mapRef.current;
      mapElement.innerHTML = ''; // Clear previous map
      
      // Create map container
      const mapContainer = document.createElement('div');
      mapContainer.className = 'w-full h-full relative overflow-hidden rounded-md bg-neutral-100';
      
      // Fake map grid
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const gridCell = document.createElement('div');
          gridCell.className = 'absolute border border-neutral-200';
          gridCell.style.width = '20%';
          gridCell.style.height = '20%';
          gridCell.style.left = `${j * 10}%`;
          gridCell.style.top = `${i * 10}%`;
          
          if ((i + j) % 2 === 0) {
            gridCell.style.backgroundColor = 'rgba(229, 231, 235, 0.5)';
          }
          
          mapContainer.appendChild(gridCell);
        }
      }
      
      // Add main roads
      const horizontalRoad = document.createElement('div');
      horizontalRoad.className = 'absolute bg-white border border-neutral-300';
      horizontalRoad.style.width = '100%';
      horizontalRoad.style.height = '8%';
      horizontalRoad.style.top = '45%';
      mapContainer.appendChild(horizontalRoad);
      
      const verticalRoad = document.createElement('div');
      verticalRoad.className = 'absolute bg-white border border-neutral-300';
      verticalRoad.style.width = '8%';
      verticalRoad.style.height = '100%';
      verticalRoad.style.left = '45%';
      mapContainer.appendChild(verticalRoad);
      
      // Add location marker
      const marker = document.createElement('div');
      marker.className = 'absolute';
      marker.style.width = '20px';
      marker.style.height = '20px';
      marker.style.borderRadius = '50%';
      marker.style.backgroundColor = '#ef4444';
      marker.style.transform = 'translate(-50%, -50%)';
      marker.style.left = '50%';
      marker.style.top = '50%';
      marker.style.boxShadow = '0 0 0 5px rgba(239, 68, 68, 0.3)';
      
      // Pulse animation
      marker.innerHTML = `
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency-400 opacity-50"></span>
        <span class="absolute inset-0 flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </span>
      `;
      
      mapContainer.appendChild(marker);
      
      // Add police unit markers
      if (nearbyUnits.length > 0) {
        // First unit
        const unit1 = document.createElement('div');
        unit1.className = 'absolute';
        unit1.style.width = '16px';
        unit1.style.height = '16px';
        unit1.style.borderRadius = '50%';
        unit1.style.backgroundColor = '#3b82f6';
        unit1.style.transform = 'translate(-50%, -50%)';
        unit1.style.left = '30%';
        unit1.style.top = '40%';
        unit1.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
        unit1.innerHTML = `
          <span class="absolute inset-0 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-3 h-3">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </span>
        `;
        
        // Draw path from unit to target
        const path1 = document.createElement('div');
        path1.className = 'absolute bg-blue-500 opacity-50';
        path1.style.width = '2px';
        path1.style.height = '10%';
        path1.style.left = '30%';
        path1.style.top = '40%';
        path1.style.transformOrigin = 'top';
        
        mapContainer.appendChild(unit1);
        mapContainer.appendChild(path1);
        
        // Second unit
        const unit2 = document.createElement('div');
        unit2.className = 'absolute';
        unit2.style.width = '16px';
        unit2.style.height = '16px';
        unit2.style.borderRadius = '50%';
        unit2.style.backgroundColor = '#3b82f6';
        unit2.style.transform = 'translate(-50%, -50%)';
        unit2.style.left = '70%';
        unit2.style.top = '60%';
        unit2.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
        unit2.innerHTML = `
          <span class="absolute inset-0 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-3 h-3">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </span>
        `;
        
        mapContainer.appendChild(unit2);
      }
      
      mapElement.appendChild(mapContainer);
    }
  }, [coordinates, nearbyUnits]);

  return (
    <div className={cn(
      'rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-lg',
      className
    )}>
      <div className="px-4 py-3 bg-neutral-100 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin size={18} className="mr-2 text-primary" />
            <h3 className="font-medium text-primary">Location Tracker</h3>
          </div>
          <span 
            className={cn(
              "text-xs px-2 py-0.5 rounded-full flex items-center",
              locationStatus === 'idle' && "bg-neutral-100 text-neutral-800",
              locationStatus === 'locating' && "bg-blue-100 text-blue-800",
              locationStatus === 'confirmed' && "bg-green-100 text-green-800"
            )}
          >
            {locationStatus === 'idle' && 'Waiting for location'}
            {locationStatus === 'locating' && (
              <>
                <Loader2 size={12} className="mr-1 animate-spin" />
                Locating
              </>
            )}
            {locationStatus === 'confirmed' && (
              <>
                <CheckCircle size={12} className="mr-1" />
                Location Confirmed
              </>
            )}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex mb-4 items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-neutral-400" />
            </div>
            <input
              type="text"
              value={locatedAddress || ''}
              placeholder="Enter location or address"
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              readOnly={locationStatus !== 'idle'}
              onChange={() => {}}
            />
          </div>
          
          <button
            className={cn(
              "ml-2 p-2 rounded-lg text-white transition-colors",
              locationStatus === 'idle' ? "bg-primary hover:bg-primary/90" : "bg-neutral-300"
            )}
            disabled={locationStatus !== 'idle'}
          >
            <Navigation size={18} />
          </button>
        </div>
        
        <div className="rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 h-64 mb-4">
          <div ref={mapRef} className="w-full h-full">
            {/* Map will be rendered here */}
            {locationStatus === 'idle' && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-neutral-500">
                  <MapPin size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Location will appear here</p>
                </div>
              </div>
            )}
            
            {locationStatus === 'locating' && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-blue-500">
                  <Loader2 size={24} className="mx-auto mb-2 animate-spin" />
                  <p className="text-sm">Locating caller...</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {locationStatus === 'confirmed' && nearbyUnits.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-neutral-700">Nearby Police Units</h4>
            <div className="space-y-2">
              {nearbyUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center justify-between bg-neutral-50 p-2 rounded-lg border border-neutral-200"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <line x1="19" y1="8" x2="19" y2="14"></line>
                        <line x1="22" y1="11" x2="16" y2="11"></line>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">{unit.id}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-500">{unit.distance}</div>
                    <div className="text-xs font-medium text-blue-600">ETA: {unit.eta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationTracker;
