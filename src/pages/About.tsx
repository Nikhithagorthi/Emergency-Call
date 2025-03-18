
import React from 'react';
import Header from '@/components/Header';
import { Shield, CheckCircle, Lightbulb, Search, Users, MessageSquare, Award, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              About Our Mission
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Revolutionizing Emergency Response with AI
            </h1>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto text-balance">
              We're developing cutting-edge technology to bridge communication gaps between 
              people in distress and emergency services, saving critical response time and lives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Shield size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Purpose</h3>
              <p className="text-neutral-600 text-balance">
                To create a world where no emergency call goes unanswered and help arrives 
                exactly when and where it's needed most.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle size={28} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Approach</h3>
              <p className="text-neutral-600 text-balance">
                Combining advanced AI, natural language processing, and geolocation 
                technology to transform emergency response systems.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Lightbulb size={28} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-neutral-600 text-balance">
                A future where AI seamlessly supports emergency services, reducing 
                response times and improving outcomes for people in critical situations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-16 px-4 bg-white border-y border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Our Story
              </span>
              <h2 className="text-3xl font-bold mb-4 text-balance">
                Why We Built AI Distress Communicator
              </h2>
              <div className="space-y-4">
                <p className="text-neutral-600">
                  Our journey began with a simple yet powerful observation: in moments of crisis, 
                  effective communication can mean the difference between life and death. Yet, emergency 
                  response systems worldwide face common challenges:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-emergency-100 text-emergency-600 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </span>
                    <span>Overwhelmed call centers during crisis events</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-emergency-100 text-emergency-600 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </span>
                    <span>Inability to accurately gauge distress levels to prioritize responses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-emergency-100 text-emergency-600 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </span>
                    <span>Difficulty in quickly obtaining and verifying caller locations</span>
                  </li>
                </ul>
                <p className="text-neutral-600">
                  Founded by a team of AI researchers, emergency response veterans, and public safety 
                  advocates, we set out to develop a solution that could address these challenges 
                  using the latest advancements in artificial intelligence and natural language processing.
                </p>
                <p className="text-neutral-600">
                  After three years of research, development, and collaboration with emergency service 
                  providers, we've created a system that not only answers calls when human operators 
                  can't but one that analyzes voice patterns to detect distress, extracts crucial 
                  location data, and ensures that help arrives exactly where it's needed.
                </p>
              </div>
            </div>
            <div className="perspective">
              <div className="relative preserve-3d transform transition-transform duration-500 hover:rotate-y-10 hover:rotate-x-5">
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-primary rounded-xl shadow-xl p-8 text-white">
                  <blockquote className="text-xl italic mb-6">
                    "Every second counts in an emergency. Our AI system has reduced response times by 42% 
                    in pilot communities, potentially saving dozens of lives already."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Dr. Jennifer Chen</p>
                      <p className="text-white/80 text-sm">Founder & Lead AI Researcher</p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/5 rounded-xl transform -rotate-x-5 -rotate-y-5 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              The Technology
            </span>
            <h2 className="text-3xl font-bold mb-4 text-balance">
              How Our AI Emergency System Works
            </h2>
            <p className="text-neutral-600 max-w-3xl mx-auto text-balance">
              Our platform integrates multiple advanced technologies to create a 
              seamless emergency response experience from call to resolution.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline connector */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-neutral-200 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="md:hidden h-0.5 w-12 bg-neutral-200 absolute top-10 left-10 transform -translate-x-full"></div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 bg-primary text-white rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">1</div>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 mt-4 md:mt-0">
                    <h3 className="text-xl font-semibold mb-2">Call Interception & AI Engagement</h3>
                    <p className="text-neutral-600 mb-3">
                      When human operators are unavailable, our AI system immediately answers the 
                      emergency call, identifying itself and beginning to gather critical information.
                    </p>
                    <ul className="space-y-1 text-sm text-neutral-500 md:ml-auto md:mr-0">
                      <li className="flex items-center md:justify-end">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Natural language processing</span>
                      </li>
                      <li className="flex items-center md:justify-end">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Multi-language support</span>
                      </li>
                      <li className="flex items-center md:justify-end">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Adaptive dialogue system</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="md:hidden w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 z-10">
                    <span>1</span>
                  </div>
                  
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-2">
                    <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <MessageSquare size={16} className="text-primary mr-2" />
                        <span className="text-sm font-medium">AI Assistant Transcript</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="bg-primary/10 text-primary p-2 rounded-lg inline-block max-w-xs">
                          "Emergency services. This is an AI assistant. What's your emergency?"
                        </div>
                        <div className="bg-neutral-100 p-2 rounded-lg inline-block max-w-xs ml-auto">
                          "Someone's breaking into my house! I'm hiding upstairs."
                        </div>
                        <div className="bg-primary/10 text-primary p-2 rounded-lg inline-block max-w-xs">
                          "I understand. Can you tell me your address? Help is on the way."
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="md:hidden h-0.5 w-12 bg-neutral-200 absolute top-10 left-10 transform -translate-x-full"></div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 bg-primary text-white rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">2</div>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="md:w-1/2 md:pr-12 order-2 md:order-2 mt-4 md:mt-0">
                    <h3 className="text-xl font-semibold mb-2">Distress Analysis & Prioritization</h3>
                    <p className="text-neutral-600 mb-3">
                      While gathering information, our AI analyzes voice patterns, speech tempo, 
                      and language markers to detect and quantify levels of distress.
                    </p>
                    <ul className="space-y-1 text-sm text-neutral-500">
                      <li className="flex items-center">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Voice tremor detection</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Stress keyword identification</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Real-time sentiment analysis</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="md:hidden w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 z-10">
                    <span>2</span>
                  </div>
                  
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-1">
                    <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <Search size={16} className="text-primary mr-2" />
                        <span className="text-sm font-medium">Distress Analysis</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-neutral-500">Voice Tremor</span>
                            <span className="text-xs font-medium text-orange-600">High (82%)</span>
                          </div>
                          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: '82%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-neutral-500">Speech Rate</span>
                            <span className="text-xs font-medium text-emergency-600">Very High (94%)</span>
                          </div>
                          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emergency-500 rounded-full" style={{ width: '94%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-neutral-500">Distress Keywords</span>
                            <span className="text-xs font-medium text-emergency-600">Critical (96%)</span>
                          </div>
                          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emergency-500 rounded-full" style={{ width: '96%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="md:hidden h-0.5 w-12 bg-neutral-200 absolute top-10 left-10 transform -translate-x-full"></div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 bg-primary text-white rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">3</div>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 mt-4 md:mt-0">
                    <h3 className="text-xl font-semibold mb-2">Location Tracking & Verification</h3>
                    <p className="text-neutral-600 mb-3">
                      The system simultaneously works to precisely locate the caller through 
                      a combination of GPS data, network triangulation, and address confirmation.
                    </p>
                    <ul className="space-y-1 text-sm text-neutral-500 md:ml-auto md:mr-0">
                      <li className="flex items-center md:justify-end">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>GPS precision tracking</span>
                      </li>
                      <li className="flex items-center md:justify-end">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Address database matching</span>
                      </li>
                      <li className="flex items-center md:justify-end">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Real-time location verification</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="md:hidden w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 z-10">
                    <span>3</span>
                  </div>
                  
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-2">
                    <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <MapPin size={16} className="text-primary mr-2" />
                        <span className="text-sm font-medium">Location Tracking</span>
                      </div>
                      <div className="rounded-lg overflow-hidden border border-neutral-200 h-40 bg-neutral-50 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-emergency-100 flex items-center justify-center">
                              <MapPin size={20} className="text-emergency-600" />
                            </div>
                            <div className="text-sm font-medium">243 Oakwood Avenue, apt 5B</div>
                            <div className="text-xs text-neutral-500">Location confirmed with 98% accuracy</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="md:hidden h-0.5 w-12 bg-neutral-200 absolute top-10 left-10 transform -translate-x-full"></div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 bg-primary text-white rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">4</div>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="md:w-1/2 md:pr-12 order-2 md:order-2 mt-4 md:mt-0">
                    <h3 className="text-xl font-semibold mb-2">Automated Dispatch & Officer Coordination</h3>
                    <p className="text-neutral-600 mb-3">
                      Based on distress analysis and precise location, the system automatically 
                      alerts the nearest available police units, providing them with complete incident details.
                    </p>
                    <ul className="space-y-1 text-sm text-neutral-500">
                      <li className="flex items-center">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Nearest unit identification</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Real-time officer notification</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={14} className="text-green-500 mr-1" />
                        <span>Comprehensive situation briefing</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="md:hidden w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 z-10">
                    <span>4</span>
                  </div>
                  
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-1">
                    <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                      <div className="flex items-center mb-3">
                        <Users size={16} className="text-primary mr-2" />
                        <span className="text-sm font-medium">Officer Dispatch</span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <User size={16} className="text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div className="text-sm font-medium">Officer Ramirez - Unit 34</div>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Responding</span>
                            </div>
                            <div className="text-xs text-blue-600">ETA: 4 minutes (0.8 miles away)</div>
                          </div>
                        </div>
                        <div className="p-3 bg-neutral-50 rounded-lg flex items-center">
                          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center mr-3">
                            <User size={16} className="text-neutral-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div className="text-sm font-medium">Officer Chen - Unit 17</div>
                              <span className="text-xs bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded-full">En Route</span>
                            </div>
                            <div className="text-xs text-neutral-500">ETA: 7 minutes (1.2 miles away)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4 text-balance">
                Ready to transform emergency response in your community?
              </h2>
              <p className="text-white/80 mb-6 lg:pr-12 text-balance">
                Our AI Emergency Response System can be integrated with your existing 
                infrastructure to dramatically improve response times and outcomes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-neutral-100 transition-colors flex items-center">
                  <span className="mr-2">Request a Demo</span>
                  <ArrowRight size={16} />
                </button>
                <button className="px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition-colors">
                  Contact Our Team
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Award size={24} className="mr-3" />
                  <h3 className="text-xl font-semibold">Proven Results</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold mb-1">42%</div>
                    <div className="text-white/80 text-sm">Faster Response Times</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">96%</div>
                    <div className="text-white/80 text-sm">Location Accuracy</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">89%</div>
                    <div className="text-white/80 text-sm">Distress Detection Rate</div>
                  </div>
                </div>
              </div>
            </div>
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

export default About;
