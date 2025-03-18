
import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import EmergencyCall from '@/components/EmergencyCall';
import AIAssistant from '@/components/AIAssistant';
import DistressAnalyzer from '@/components/DistressAnalyzer';
import LocationTracker from '@/components/LocationTracker';
import PoliceDashboard from '@/components/PoliceDashboard';
import { Shield, ArrowRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [callActive, setCallActive] = useState(false);
  const [distressLevel, setDistressLevel] = useState(0);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    if (distressLevel > 0.7) {
      toast({
        title: "High Distress Detected",
        description: "Emergency services have been automatically notified of your situation.",
        variant: "destructive",
      });
    }
  }, [distressLevel]);

  useEffect(() => {
    if (location) {
      toast({
        title: "Location Confirmed",
        description: `Your location at ${location} has been verified.`,
        variant: "default",
      });
    }
  }, [location]);

  const handleCallStarted = () => {
    setCallActive(true);
  };

  const handleCallEnded = () => {
    setCallActive(false);
  };

  const handleDistressDetected = (level: number) => {
    setDistressLevel(level);
  };

  const handleLocationDetected = (address: string) => {
    setLocation(address);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 mb-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4 animate-fade-in">
            <Shield size={16} className="mr-2" />
            <span className="text-sm font-medium">AI-Powered Emergency Response System</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-slide-up text-balance">
            Smart Emergency Assistance <span className="text-emergency-600">When Every Second Counts</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-8 animate-slide-up delay-100 text-balance">
            Our AI-powered emergency system uses advanced voice recognition to analyze distress, 
            pinpoint your location, and connect you with emergency services—all in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up delay-200">
            <button className="px-8 py-3 rounded-lg bg-emergency-600 text-white hover:bg-emergency-700 transition-colors flex items-center">
              <span className="mr-2">Try the Demo</span>
              <ArrowRight size={16} />
            </button>
            <Link to="/emergency" className="px-8 py-3 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors flex items-center">
              <span className="mr-2">Emergency Response Center</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section className="py-16 px-4 bg-neutral-100 border-y border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Interactive Demo
            </span>
            <h2 className="text-3xl font-bold mb-4 text-balance">Experience the Emergency Response System</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Start an emergency call simulation to see how our AI system analyzes distress levels,
              tracks location, and coordinates police response in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-8">
              <EmergencyCall
                onCallStarted={handleCallStarted}
                onCallEnded={handleCallEnded}
              />
              {callActive && (
                <DistressAnalyzer
                  distressLevel={distressLevel}
                  onAnalysisComplete={(result) => console.log('Analysis complete:', result)}
                />
              )}
            </div>
            
            <div className="space-y-8">
              {callActive && (
                <AIAssistant
                  onDistressDetected={handleDistressDetected}
                  onLocationDetected={handleLocationDetected}
                />
              )}
              {location && (
                <LocationTracker
                  address={location}
                  onLocationConfirmed={(coords) => console.log('Location confirmed:', coords)}
                />
              )}
            </div>
          </div>
          
          {(distressLevel > 0 || location) && (
            <div className="mt-12">
              <PoliceDashboard />
            </div>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Key Features
            </span>
            <h2 className="text-3xl font-bold mb-4 text-balance">AI-Powered Emergency Response</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our system combines advanced technologies to ensure the fastest and most effective emergency response possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Call Assistance</h3>
              <p className="text-neutral-600 mb-3">
                When officers are unavailable, our AI assistant answers emergency calls, gathering critical details and maintaining caller engagement.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-neutral-600">24/7 automated emergency response</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-neutral-600">Natural language processing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-neutral-600">Contextual information gathering</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sentiment Analysis</h3>
              <p className="text-neutral-600 mb-3">
                Advanced ML models analyze voice patterns to detect levels of distress, helping prioritize urgent situations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-neutral-600">Real-time voice tremor analysis</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-neutral-600">Speech pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-neutral-600">Multi-language support</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Location Tracking</h3>
              <p className="text-neutral-600 mb-3">
                Automatically extracts and verifies caller location to dispatch help to the exact position, saving critical time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-neutral-600">Precise GPS coordination</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-neutral-600">Address verification</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-neutral-600">Nearest responder routing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-noise"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-balance">Ready to Implement Advanced Emergency Response?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-balance">
            Our AI-powered system can be integrated with existing emergency services infrastructure to improve response times and save lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 rounded-lg bg-white text-primary hover:bg-neutral-100 transition-colors">
              Request Demo
            </button>
            <Link to="/emergency" className="px-8 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition-colors">
              View Emergency Center
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-neutral-900 text-neutral-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mr-2">
                <Shield size={20} className="text-white" />
              </div>
              <span className="text-white font-semibold text-lg">AI Distress</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Demo</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2023 AI Distress. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
              <span className="mx-2">•</span>
              <a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
