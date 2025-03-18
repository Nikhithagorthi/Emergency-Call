
import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { MapPin, RefreshCw, Phone, PhoneCall, AlertTriangle, Check, X, ChevronUp } from 'lucide-react';
import AudioVisualizer from '@/components/AudioVisualizer';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const Emergency = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCaller, setShowCaller] = useState(false);
  const [activeCall, setActiveCall] = useState<any>(null);
  const [callerDistress, setCallerDistress] = useState(0);
  const [incomingCalls, setIncomingCalls] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalCalls: 0,
    responseTimeAvg: '0:00',
    successRate: '0%',
    normalCalls: 0,
    moderateCalls: 0,
    severeCalls: 0
  });
  
  const navigate = useNavigate();

  // Simulate loading screen
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      showToast('System loaded successfully', 'success');
    }, 2000);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Show toast notification
  const showToast = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
    switch (type) {
      case 'success':
        toast({
          title: "Success",
          description: message,
          variant: "default",
        });
        break;
      case 'warning':
        toast({
          title: "Warning",
          description: message,
          variant: "default",
          className: "bg-warning-color border-warning-color",
        });
        break;
      case 'error':
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
        break;
    }
  };

  // Generate mock calls
  useEffect(() => {
    const locations = [
      '123 Main St, Cityville',
      '456 Oak Ave, Townsville',
      '789 Pine Rd, Villageton',
      '321 Elm Blvd, Hamletville',
      '654 Maple Dr, Boroughton'
    ];
    
    const calls = Array.from({ length: 5 }, (_, i) => ({
      id: `CALL-${1000 + i}`,
      time: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
      location: locations[i],
      distressLevel: Math.random(),
      lat: 30 + Math.random() * 10,
      lng: -120 + Math.random() * 10
    }));
    
    setIncomingCalls(calls);
    
    setStats({
      totalCalls: 1243,
      responseTimeAvg: '3:24',
      successRate: '94%',
      normalCalls: 27,
      moderateCalls: 14,
      severeCalls: 8
    });
  }, []);

  // Accept a call
  const acceptCall = (call: any) => {
    setActiveCall(call);
    setCallerDistress(call.distressLevel);
    setShowCaller(true);
    setIncomingCalls(prev => prev.filter(c => c.id !== call.id));
    showToast(`Call ${call.id} accepted`, 'success');
  };

  // Refresh stats
  const refreshStats = () => {
    showToast('Dashboard refreshed', 'success');
    
    setStats(prev => ({
      ...prev,
      normalCalls: Math.floor(Math.random() * 30) + 20,
      moderateCalls: Math.floor(Math.random() * 20) + 10,
      severeCalls: Math.floor(Math.random() * 10) + 5
    }));
  };

  // Map function to show map
  const showMap = () => {
    showToast('Map view opened', 'success');
  };

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if should show scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Return to home
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-neutral-900 text-neutral-100' : 'bg-neutral-50 text-neutral-800'}`}>
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-primary z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 mx-auto mb-4 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <h2 className="text-2xl font-bold mb-2">Emergency Response Center</h2>
            <p>Loading system resources...</p>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-primary text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-2 font-bold text-xl cursor-pointer" onClick={goToHome}>
            <span className="text-emergency-500 animate-pulse">⚕️</span>
            <span>Emergency Response Center</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:bg-white/10 px-3 py-1 rounded transition duration-300">Home</a>
            <a href="#call-management" className="hover:bg-white/10 px-3 py-1 rounded transition duration-300">Call Center</a>
            <a href="#resources" className="hover:bg-white/10 px-3 py-1 rounded transition duration-300">Resources</a>
            <a href="#analytics" className="hover:bg-white/10 px-3 py-1 rounded transition duration-300">Analytics</a>
            <a href="#team" className="hover:bg-white/10 px-3 py-1 rounded transition duration-300">Team</a>
          </div>
          <button 
            onClick={toggleDarkMode}
            className={`border-2 border-white px-3 py-1 rounded transition duration-300 ${darkMode ? 'bg-neutral-800' : 'bg-transparent'}`}
          >
            Toggle Dark Mode
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden px-6 py-16">
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ripple"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Emergency Response Management System</h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up opacity-90">
            Our advanced platform for handling emergency calls, distress detection, and rapid response coordination. Together, we save lives.
          </p>
          <div className="flex flex-col md:flex-row justify-center md:space-x-8 space-y-4 md:space-y-0 mt-8">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
              <div className="text-3xl font-bold" id="total-calls-handled">{stats.totalCalls}</div>
              <div>Calls Handled</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
              <div className="text-3xl font-bold" id="response-time-avg">{stats.responseTimeAvg}</div>
              <div>Avg. Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
              <div className="text-3xl font-bold" id="success-rate">{stats.successRate}</div>
              <div>Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call Management Section */}
      <section id="call-management" className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 relative pb-3 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-24 before:h-1 before:bg-emergency-500 before:-translate-x-1/2">
          Call Management
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Incoming Calls Card */}
          <div className={`bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:-translate-y-1 ${darkMode ? 'bg-neutral-800' : ''}`}>
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-primary'}`}>Incoming Emergency Calls</h3>
              <div>{incomingCalls.length} calls</div>
            </div>
            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {incomingCalls.map(call => (
                <li key={call.id} className={`${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'} rounded-lg p-4 flex justify-between items-center animate-slide-up hover:scale-[1.02] transition duration-300`}>
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-accent' : 'text-primary'}`}>{call.id}</p>
                    <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{call.time}</p>
                    <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{call.location}</p>
                  </div>
                  <button 
                    onClick={() => acceptCall(call)}
                    className="bg-emergency-500 text-white px-4 py-2 rounded hover:bg-emergency-600 hover:scale-105 transition duration-300"
                  >
                    Accept
                  </button>
                </li>
              ))}
              {incomingCalls.length === 0 && (
                <li className={`${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'} rounded-lg p-4 text-center`}>
                  No incoming calls at the moment
                </li>
              )}
            </ul>
          </div>
          
          {/* Dashboard Card */}
          <div className={`bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:-translate-y-1 ${darkMode ? 'bg-neutral-800' : ''}`}>
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-primary'}`}>Dashboard</h3>
              <button 
                onClick={refreshStats}
                className="bg-primary text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-accent transition duration-300"
              >
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className={`${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'} p-4 rounded-lg text-center transition duration-300 hover:-translate-y-1`}>
                <div className="text-success-500 text-2xl font-bold">{stats.normalCalls}</div>
                <div>Normal</div>
              </div>
              <div className={`${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'} p-4 rounded-lg text-center transition duration-300 hover:-translate-y-1`}>
                <div className="text-warning-500 text-2xl font-bold">{stats.moderateCalls}</div>
                <div>Moderate</div>
              </div>
              <div className={`${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'} p-4 rounded-lg text-center transition duration-300 hover:-translate-y-1`}>
                <div className="text-emergency-500 text-2xl font-bold">{stats.severeCalls}</div>
                <div>Severe</div>
              </div>
            </div>
            
            <div className="mt-6 relative">
              <div className={`${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'} h-80 rounded-lg flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center">
                  <MapPin className="text-emergency-500 w-12 h-12" />
                  <button 
                    onClick={showMap}
                    className="mt-4 bg-primary text-white px-6 py-3 rounded hover:bg-accent hover:scale-105 transition duration-300"
                  >
                    View Map
                  </button>
                </div>
                
                {/* Map pins */}
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-5 h-5 bg-emergency-500 rounded-full animate-pinDrop"
                    style={{ 
                      top: `${20 + Math.random() * 60}%`, 
                      left: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  >
                    <div className="absolute w-10 h-10 bg-emergency-500/30 rounded-full -top-2.5 -left-2.5 animate-ping"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Caller Details Section */}
        {showCaller && activeCall && (
          <div className={`mt-8 ${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'} rounded-lg p-6 animate-fade-in`}>
            <h3 className="text-xl font-bold mb-4">Caller Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8">
              <div className={`font-bold ${darkMode ? 'text-accent' : 'text-primary'}`}>Call ID:</div>
              <div>{activeCall.id}</div>
              
              <div className={`font-bold ${darkMode ? 'text-accent' : 'text-primary'}`}>Time:</div>
              <div>{activeCall.time}</div>
              
              <div className={`font-bold ${darkMode ? 'text-accent' : 'text-primary'}`}>Location:</div>
              <div>{activeCall.location}</div>
              
              <div className={`font-bold ${darkMode ? 'text-accent' : 'text-primary'}`}>Coordinates:</div>
              <div>{activeCall.lat.toFixed(4)}, {activeCall.lng.toFixed(4)}</div>
              
              <div className={`font-bold ${darkMode ? 'text-accent' : 'text-primary'}`}>Distress Level:</div>
              <div className="flex items-center">
                <div 
                  className={`h-3 rounded-full mr-2`}
                  style={{ 
                    width: '100px',
                    background: `linear-gradient(90deg, #10b981 0%, #f59e0b 50%, #dc2626 100%)`,
                  }}
                >
                  <div 
                    className="h-5 w-5 bg-white border-2 border-gray-300 rounded-full shadow-md -mt-1 relative"
                    style={{ transform: `translateX(${callerDistress * 100}px)` }}
                  ></div>
                </div>
                <span>
                  {callerDistress < 0.3 ? 'Low' : callerDistress < 0.7 ? 'Medium' : 'High'}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Audio Analysis</h4>
              <div className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} p-4 rounded-lg h-24 flex items-center justify-center`}>
                <AudioVisualizer 
                  isActive={true} 
                  barCount={20} 
                  barColor={callerDistress < 0.3 ? '#10b981' : callerDistress < 0.7 ? '#f59e0b' : '#dc2626'}
                  className="h-full"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <button 
                onClick={() => {
                  setShowCaller(false);
                  showToast('Call ended', 'warning');
                }}
                className="bg-neutral-500 text-white px-4 py-2 rounded hover:bg-neutral-600 transition duration-300"
              >
                End Call
              </button>
              <button 
                onClick={() => {
                  showToast('Dispatching emergency services', 'success');
                }}
                className="bg-emergency-600 text-white px-4 py-2 rounded hover:bg-emergency-700 transition duration-300"
              >
                Dispatch Emergency Services
              </button>
            </div>
          </div>
        )}
      </section>
      
      {/* Resources Section */}
      <section id="resources" className={`py-16 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 relative pb-3 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-24 before:h-1 before:bg-emergency-500 before:-translate-x-1/2">
            Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Resource 1 */}
            <div className={`rounded-lg overflow-hidden shadow-md transition duration-300 hover:-translate-y-2 ${darkMode ? 'bg-neutral-700' : 'bg-white'}`}>
              <div className="h-36 bg-primary flex items-center justify-center text-white text-4xl">
                <Phone size={48} />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-primary'}`}>Emergency Protocols</h3>
                <p className="mb-4">Standard operating procedures for various emergency scenarios. Quick reference guides for dispatchers.</p>
                <a 
                  href="#" 
                  className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-accent hover:scale-105 transition duration-300"
                >
                  View Protocols
                </a>
              </div>
            </div>
            
            {/* Resource 2 */}
            <div className={`rounded-lg overflow-hidden shadow-md transition duration-300 hover:-translate-y-2 ${darkMode ? 'bg-neutral-700' : 'bg-white'}`}>
              <div className="h-36 bg-primary flex items-center justify-center text-white text-4xl">
                <AlertTriangle size={48} />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-primary'}`}>Crisis Training</h3>
                <p className="mb-4">Online training modules for emergency response operators. Includes crisis management and de-escalation techniques.</p>
                <a 
                  href="#" 
                  className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-accent hover:scale-105 transition duration-300"
                >
                  Start Training
                </a>
              </div>
            </div>
            
            {/* Resource 3 */}
            <div className={`rounded-lg overflow-hidden shadow-md transition duration-300 hover:-translate-y-2 ${darkMode ? 'bg-neutral-700' : 'bg-white'}`}>
              <div className="h-36 bg-primary flex items-center justify-center text-white text-4xl">
                <MapPin size={48} />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-primary'}`}>Area Resources</h3>
                <p className="mb-4">Map of local emergency resources including hospitals, police stations, and fire departments.</p>
                <a 
                  href="#" 
                  className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-accent hover:scale-105 transition duration-300"
                >
                  View Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Analytics Section */}
      <section id="analytics" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 relative pb-3 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-24 before:h-1 before:bg-emergency-500 before:-translate-x-1/2">
            Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1 */}
            <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-neutral-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-primary'}`}>Call Volume by Day</h3>
              </div>
              <div className="h-64 flex items-end justify-around">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const height = 30 + Math.random() * 70;
                  return (
                    <div key={day} className="flex flex-col items-center">
                      <div 
                        className="w-10 bg-accent rounded-t-sm transition-all duration-1000" 
                        style={{ height: `${height}%` }}
                        data-value={Math.floor(height * 2)}
                      ></div>
                      <div className="mt-2">{day}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Chart 2 */}
            <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-neutral-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-primary'}`}>Response Times (minutes)</h3>
              </div>
              <div className="h-64 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-px w-full bg-primary transform origin-left scale-x-100 transition-transform duration-2000"></div>
                </div>
                {[0, 1, 2, 3, 4, 5, 6].map((hour, i) => {
                  const top = 100 - (Math.sin(i * 0.9) * 40 + 20);
                  return (
                    <div 
                      key={hour} 
                      className="absolute w-3 h-3 bg-emergency-500 rounded-full" 
                      style={{ 
                        left: `${i * 16}%`, 
                        top: `${top}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section id="team" className={`py-16 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 relative pb-3 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-24 before:h-1 before:bg-emergency-500 before:-translate-x-1/2">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className={`rounded-lg overflow-hidden shadow-md text-center ${darkMode ? 'bg-neutral-700' : 'bg-white'} transition duration-300 hover:-translate-y-2`}>
              <div className="w-24 h-24 mx-auto mt-8 mb-4 bg-accent rounded-full flex items-center justify-center text-white text-3xl">
                JD
              </div>
              <div className="px-6 pb-8">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-primary'}`}>John Doe</h3>
                <p className="text-accent mb-4">Emergency Director</p>
                <p className="mb-4">10+ years of experience in emergency management and crisis response.</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">Twitter</span>
                    T
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">LinkedIn</span>
                    L
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">Email</span>
                    E
                  </a>
                </div>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className={`rounded-lg overflow-hidden shadow-md text-center ${darkMode ? 'bg-neutral-700' : 'bg-white'} transition duration-300 hover:-translate-y-2`}>
              <div className="w-24 h-24 mx-auto mt-8 mb-4 bg-accent rounded-full flex items-center justify-center text-white text-3xl">
                JS
              </div>
              <div className="px-6 pb-8">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-primary'}`}>Jane Smith</h3>
                <p className="text-accent mb-4">AI Systems Specialist</p>
                <p className="mb-4">Expert in AI-driven emergency response and sentiment analysis systems.</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">Twitter</span>
                    T
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">LinkedIn</span>
                    L
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">Email</span>
                    E
                  </a>
                </div>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className={`rounded-lg overflow-hidden shadow-md text-center ${darkMode ? 'bg-neutral-700' : 'bg-white'} transition duration-300 hover:-translate-y-2`}>
              <div className="w-24 h-24 mx-auto mt-8 mb-4 bg-accent rounded-full flex items-center justify-center text-white text-3xl">
                RJ
              </div>
              <div className="px-6 pb-8">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-primary'}`}>Robert Johnson</h3>
                <p className="text-accent mb-4">GIS Specialist</p>
                <p className="mb-4">Expert in geographic information systems and emergency location tracking.</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">Twitter</span>
                    T
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">LinkedIn</span>
                    L
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">Email</span>
                    E
                  </a>
                </div>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className={`rounded-lg overflow-hidden shadow-md text-center ${darkMode ? 'bg-neutral-700' : 'bg-white'} transition duration-300 hover:-translate-y-2`}>
              <div className="w-24 h-24 mx-auto mt-8 mb-4 bg-accent rounded-full flex items-center justify-center text-white text-3xl">
                SL
              </div>
              <div className="px-6 pb-8">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-primary'}`}>Sarah Lee</h3>
                <p className="text-accent mb-4">Dispatch Coordinator</p>
                <p className="mb-4">Experienced emergency dispatcher specialized in rapid response coordination.</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">Twitter</span>
                    T
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">LinkedIn</span>
                    L
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'} flex items-center justify-center hover:bg-primary hover:text-white transition duration-300`}>
                    <span className="sr-only">Email</span>
                    E
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-3 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-emergency-500">
              About Us
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-emergency-300 transition duration-300">Our Mission</a></li>
              <li><a href="#" className="hover:text-emergency-300 transition duration-300">History</a></li>
              <li><a href="#" className="hover:text-emergency-300 transition duration-300">Leadership</a></li>
              <li><a href="#" className="hover:text-emergency-300 transition duration-300">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-3 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-emergency-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-emergency-300 transition duration-300">Emergency Services</a></li>
              <li><a href="#" className="hover:text-emergency-300 transition duration-300">Training Programs</a></li>
              <li><a href="#" className="hover:text-emergency-300 transition duration-300">Resources</a></li>
              <li><a href="#" className="hover:text-emergency-300 transition duration-300">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-3 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-emergency-500">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-emergency-500 mt-1 flex-shrink-0" size={18} />
                <span>1234 Emergency Avenue, Response City, RC 10101</span>
              </div>
              <div className="flex items-start gap-3">
                <PhoneCall className="text-emergency-500 mt-1 flex-shrink-0" size={18} />
                <span>+1 (555) 911-1234</span>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-emergency-500 mt-1 flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>support@emergencyresponse.org</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 text-center">
          <p>&copy; 2023 Emergency Response Center. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <a 
          href="#top" 
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          className={`fixed bottom-8 right-8 w-12 h-12 bg-emergency-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emergency-600 transition duration-300 z-50`}
        >
          <ChevronUp size={24} />
        </a>
      )}
    </div>
  );
};

export default Emergency;
