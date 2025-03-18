
import React, { useState } from 'react';
import Header from '@/components/Header';
import PoliceDashboard from '@/components/PoliceDashboard';
import { Shield, Bell, User, MapPin, Clock, BarChart3, Settings } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Police Response Dashboard</h1>
              <p className="text-neutral-600">
                Monitor and manage emergency calls and dispatch responses in real-time
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <button className="flex items-center px-4 py-2 bg-white border border-neutral-200 rounded-lg shadow-sm hover:bg-neutral-50 transition-colors">
                <Settings size={16} className="mr-2 text-neutral-500" />
                <span>Settings</span>
              </button>
              <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
                <Bell size={16} className="mr-2" />
                <span>Notifications</span>
                <span className="ml-2 bg-white text-primary text-xs px-1.5 py-0.5 rounded-full">3</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {/* Stat Card 1 */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Bell size={18} className="text-blue-600" />
                </div>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Today</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">24</h3>
              <p className="text-neutral-600 text-sm">Active Emergencies</p>
              <div className="mt-3 flex items-center text-xs text-green-600">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                <span>12% from yesterday</span>
              </div>
            </div>
            
            {/* Stat Card 2 */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <User size={18} className="text-green-600" />
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Available</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">32</h3>
              <p className="text-neutral-600 text-sm">Officers on Duty</p>
              <div className="mt-3 flex items-center text-xs text-red-600">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                <span>3% from usual</span>
              </div>
            </div>
            
            {/* Stat Card 3 */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <MapPin size={18} className="text-purple-600" />
                </div>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Citywide</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">8</h3>
              <p className="text-neutral-600 text-sm">High Priority Zones</p>
              <div className="mt-3 flex items-center text-xs text-green-600">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                <span>2 zones improved</span>
              </div>
            </div>
            
            {/* Stat Card 4 */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Clock size={18} className="text-orange-600" />
                </div>
                <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">Average</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">4:23</h3>
              <p className="text-neutral-600 text-sm">Response Time (mins)</p>
              <div className="mt-3 flex items-center text-xs text-green-600">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                <span>30s faster than last week</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm mb-8">
            <div className="border-b border-neutral-200">
              <div className="flex overflow-x-auto">
                <button
                  className={`px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'analytics' ? 'border-b-2 border-primary text-primary' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analytics
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'officers' ? 'border-b-2 border-primary text-primary' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setActiveTab('officers')}
                >
                  Officers
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'zones' ? 'border-b-2 border-primary text-primary' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setActiveTab('zones')}
                >
                  Zones
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'reports' ? 'border-b-2 border-primary text-primary' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setActiveTab('reports')}
                >
                  Reports
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <PoliceDashboard />
                </div>
              )}
              
              {activeTab === 'analytics' && (
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <BarChart3 size={48} className="mx-auto mb-4 text-neutral-300" />
                    <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                    <p className="text-neutral-500 max-w-md">
                      Detailed analytics and trends of emergency calls and response times would be displayed here.
                    </p>
                  </div>
                </div>
              )}
              
              {(activeTab === 'officers' || activeTab === 'zones' || activeTab === 'reports') && (
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <Shield size={48} className="mx-auto mb-4 text-neutral-300" />
                    <h3 className="text-lg font-medium mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h3>
                    <p className="text-neutral-500 max-w-md">
                      This section would display information about {activeTab}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm lg:col-span-2">
              <h3 className="font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-start pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      item % 3 === 0 ? 'bg-blue-100 text-blue-600' : 
                      item % 3 === 1 ? 'bg-green-100 text-green-600' : 
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {item % 3 === 0 ? (
                        <Bell size={14} />
                      ) : item % 3 === 1 ? (
                        <User size={14} />
                      ) : (
                        <MapPin size={14} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">
                          {item % 3 === 0 ? 'New emergency call received' : 
                           item % 3 === 1 ? 'Officer dispatched to location' : 
                           'Emergency resolved successfully'}
                        </p>
                        <span className="text-xs text-neutral-500">{item * 5}m ago</span>
                      </div>
                      <p className="text-xs text-neutral-500">
                        {item % 3 === 0 ? 'Caller reported a break-in at 243 Oakwood Avenue.' : 
                         item % 3 === 1 ? 'Officer Johnson responded to emergency #EM-782' + item : 
                         'Emergency #EM-782' + (item-1) + ' was successfully resolved.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 text-sm text-center text-primary hover:bg-primary/5 rounded-lg transition-colors">
                View All Activity
              </button>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm">
              <h3 className="font-medium mb-4">AI Analysis Summary</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-neutral-600">AI Assistance Rate</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-neutral-600">Distress Detection Accuracy</span>
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-neutral-600">Location Accuracy</span>
                    <span className="text-sm font-medium">96%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-neutral-600">Response Time Improvement</span>
                    <span className="text-sm font-medium">38%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-5 border-t border-neutral-100">
                <h4 className="text-sm font-medium mb-3">Emergency Type Distribution</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <div className="text-lg font-bold mb-1">42%</div>
                    <div className="text-xs text-neutral-500">Burglary</div>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <div className="text-lg font-bold mb-1">26%</div>
                    <div className="text-xs text-neutral-500">Assault</div>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <div className="text-lg font-bold mb-1">18%</div>
                    <div className="text-xs text-neutral-500">Accident</div>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <div className="text-lg font-bold mb-1">14%</div>
                    <div className="text-xs text-neutral-500">Other</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-6 px-4 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500 mb-4 md:mb-0">
            &copy; 2023 AI Distress Platform. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-neutral-500">
            <span>Emergency Services Command Center</span>
            <span className="mx-2">•</span>
            <span>System Version 2.3.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
