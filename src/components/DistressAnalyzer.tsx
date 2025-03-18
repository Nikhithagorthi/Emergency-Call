
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, Volume2, Waveform } from 'lucide-react';

interface DistressAnalyzerProps {
  distressLevel: number; // 0 to 1, where 1 is highest distress
  className?: string;
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

interface AnalysisResult {
  distressLevel: number;
  confidence: number;
  keywords: string[];
}

const DistressAnalyzer: React.FC<DistressAnalyzerProps> = ({
  distressLevel,
  className,
  onAnalysisComplete,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  const [analyzedFeatures, setAnalyzedFeatures] = useState<
    { name: string; value: number; isComplete: boolean }[]
  >([
    { name: 'Voice Tremor', value: 0, isComplete: false },
    { name: 'Speech Rate', value: 0, isComplete: false },
    { name: 'Voice Volume', value: 0, isComplete: false },
    { name: 'Stress Markers', value: 0, isComplete: false },
    { name: 'Keyword Analysis', value: 0, isComplete: false },
  ]);
  
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const analysisDuration = 5000; // 5 seconds
  
  useEffect(() => {
    if (isAnalyzing) {
      startTimeRef.current = Date.now();
      
      const animate = () => {
        if (!startTimeRef.current) return;
        
        const elapsedTime = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsedTime / analysisDuration, 1);
        
        // Gradually increase to the target distress level
        setCurrentLevel(progress * distressLevel);
        
        // Update analyzed features with different timing
        setAnalyzedFeatures(prev => 
          prev.map((feature, index) => {
            // Complete each feature at different times
            const featureProgress = Math.min((elapsedTime - (index * 800)) / 1000, 1);
            const isComplete = featureProgress >= 1;
            
            // Generate a value influenced by the distress level
            const value = isComplete 
              ? Math.max(0.3, Math.min(0.9, distressLevel * (0.7 + Math.random() * 0.4)))
              : feature.value;
              
            return { ...feature, value: value, isComplete };
          })
        );
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnalyzing(false);
          setShowPulse(distressLevel > 0.7);
          
          // Notify parent component
          if (onAnalysisComplete) {
            onAnalysisComplete({
              distressLevel,
              confidence: 0.89,
              keywords: ['help', 'scared', 'break in', 'hurry'],
            });
          }
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isAnalyzing, distressLevel, onAnalysisComplete]);

  const getDistressLevelText = () => {
    if (currentLevel < 0.3) return 'Low';
    if (currentLevel < 0.6) return 'Medium';
    if (currentLevel < 0.8) return 'High';
    return 'Critical';
  };

  const getDistressColor = () => {
    if (currentLevel < 0.3) return 'text-green-500';
    if (currentLevel < 0.6) return 'text-yellow-500';
    if (currentLevel < 0.8) return 'text-orange-500';
    return 'text-emergency-500';
  };

  return (
    <div className={cn(
      'rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-lg',
      className
    )}>
      <div className="px-4 py-3 bg-neutral-100 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Waveform size={18} className="mr-2 text-primary" />
            <h3 className="font-medium text-primary">Distress Analyzer</h3>
          </div>
          {isAnalyzing ? (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
              <span className="animate-pulse mr-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
              Analyzing
            </span>
          ) : (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Analysis Complete
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-6 relative">
          <div className="flex justify-between mb-1 items-center">
            <span className="text-sm text-neutral-600">Distress Level</span>
            <span className={cn("text-sm font-medium", getDistressColor())}>
              {getDistressLevelText()}
            </span>
          </div>
          
          <div className="h-3 w-full bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-1000 ease-out rounded-full relative overflow-hidden",
                currentLevel < 0.3 ? 'bg-green-500' : 
                currentLevel < 0.6 ? 'bg-yellow-500' : 
                currentLevel < 0.8 ? 'bg-orange-500' : 
                'bg-emergency-500'
              )}
              style={{ width: `${currentLevel * 100}%` }}
            >
              {showPulse && (
                <span className="absolute inset-0 bg-white/30 animate-pulse-slow" />
              )}
            </div>
          </div>
          
          {showPulse && (
            <div className="absolute -right-1 -top-1">
              <div className="relative">
                <AlertTriangle size={16} className="text-emergency-500 animate-bounce-subtle" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emergency-500 animate-ping" />
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          {analyzedFeatures.map((feature, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-500">{feature.name}</span>
                {feature.isComplete ? (
                  <span 
                    className={cn(
                      "text-xs font-medium",
                      feature.value < 0.3 ? 'text-green-500' : 
                      feature.value < 0.6 ? 'text-yellow-500' : 
                      feature.value < 0.8 ? 'text-orange-500' : 
                      'text-emergency-500'
                    )}
                  >
                    {Math.round(feature.value * 100)}%
                  </span>
                ) : (
                  <span className="text-xs text-blue-500 animate-pulse">Processing...</span>
                )}
              </div>
              
              <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-700 ease-out rounded-full",
                    feature.value < 0.3 ? 'bg-green-500' : 
                    feature.value < 0.6 ? 'bg-yellow-500' : 
                    feature.value < 0.8 ? 'bg-orange-500' : 
                    'bg-emergency-500'
                  )}
                  style={{ 
                    width: feature.isComplete ? `${feature.value * 100}%` : '0%', 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {!isAnalyzing && (
          <div className="mt-4 p-3 border border-neutral-200 rounded-lg bg-neutral-50">
            <div className="flex items-start mb-2">
              <Volume2 size={16} className="mr-1.5 mt-0.5 text-primary" />
              <span className="text-sm font-medium">Speech Analysis</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-emergency-500 mr-2" />
                <span className="text-xs text-neutral-700">Detected keywords: "help", "scared", "break in"</span>
              </div>
              <div className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-emergency-500 mr-2" />
                <span className="text-xs text-neutral-700">Elevated speech rate: 185 wpm</span>
              </div>
              <div className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-2" />
                <span className="text-xs text-neutral-700">Voice tremor detected at 14.2Hz</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistressAnalyzer;
