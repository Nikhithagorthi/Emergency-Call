
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AudioVisualizerProps {
  isActive: boolean;
  className?: string;
  barCount?: number;
  barColor?: string;
  minHeight?: number;
  maxHeight?: number;
  speed?: number;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isActive,
  className,
  barCount = 10,
  barColor = 'currentColor',
  minHeight = 15,
  maxHeight = 30,
  speed = 0.5,
}) => {
  const [heights, setHeights] = useState<number[]>([]);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    if (isActive) {
      // Initialize with random heights
      const initialHeights = Array.from({ length: barCount }, () => 
        Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight
      );
      setHeights(initialHeights);
      
      // Animation loop
      const animate = (time: number) => {
        if (previousTimeRef.current === undefined) {
          previousTimeRef.current = time;
        }
        
        const deltaTime = time - previousTimeRef.current;
        
        // Only update every 100ms for performance
        if (deltaTime > 100) {
          previousTimeRef.current = time;
          
          // Generate new random heights
          setHeights(prev => 
            prev.map(() => Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight)
          );
        }
        
        requestRef.current = requestAnimationFrame(animate);
      };
      
      requestRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    } else {
      // Reset to minimum height when inactive
      setHeights(Array(barCount).fill(minHeight / 2));
    }
  }, [isActive, barCount, minHeight, maxHeight]);

  return (
    <div
      className={cn("flex items-end h-10 space-x-[2px]", className)}
      aria-hidden="true"
    >
      {heights.map((height, index) => (
        <div
          key={index}
          className={cn(
            "voice-bar transition-transform duration-300 ease-in-out", 
            isActive && "voice-bar-animated"
          )}
          style={{
            height: `${height}px`,
            backgroundColor: barColor,
            animationDelay: `${(index * 0.05).toFixed(2)}s`,
            animationDuration: `${speed}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
