// import React, { useState, useEffect } from 'react';
// import { Settings, Mic, MessageSquare, Plug, CheckCircle, BarChart2, TrendingUp, Zap, Clock, Users, DollarSign, Phone, PhoneIncoming, ArrowDown } from 'lucide-react';

// const AnimatedFeatureDashboard = () => {
//     // 1. STATE MANAGEMENT
//     const views = ['creation', 'campaigns', 'analytics'];
//     const [activeView, setActiveView] = useState('creation');
//     const [isPaused, setIsPaused] = useState(false);
    
//     // Internal state for Campaign Flow Animation
//     const [campaignStep, setCampaignStep] = useState(0);

//     // --- Data for Agent Creation Flow ---
//     const creationSteps = [
//         { id: 1, title: "Identity", icon: Settings, content: "Defining Agent Persona..." },
//         { id: 2, title: "Voice", icon: Mic, content: "Synthesizing Neural Voice..." },
//         { id: 3, title: "Logic", icon: BarChart2, content: "Building Conversation Paths..." },
//         { id: 4, title: "Deploy", icon: Zap, content: "Going Live..." },
//     ];
//     const [activeCreationStep, setActiveCreationStep] = useState(1);

//     // 2. MASTER AUTO-ADVANCE LOGIC
//     useEffect(() => {
//         if (isPaused) return;

//         // TIMING CONFIGURATION
//         const viewDuration = activeView === 'creation' ? 12000 : 10000; // Time per main tab

//         const viewTimer = setTimeout(() => {
//             const currentIndex = views.indexOf(activeView);
//             const nextIndex = (currentIndex + 1) % views.length;
//             setActiveView(views[nextIndex]);
            
//             // Reset internal counters when switching views
//             setActiveCreationStep(1);
//             setCampaignStep(0);
//         }, viewDuration);

//         return () => clearTimeout(viewTimer);
//     }, [activeView, isPaused]);

//     // 3. INTERNAL ANIMATION LOOPS (The "Live" Feel)
//     useEffect(() => {
//         if (isPaused) return;

//         let interval;
        
//         // Creation View: Tick through steps
//         if (activeView === 'creation') {
//             interval = setInterval(() => {
//                 setActiveCreationStep(prev => (prev >= 4 ? 1 : prev + 1));
//             }, 2500);
//         }

//         // Campaign View: Tick through flow steps (0 to 3)
//         if (activeView === 'campaigns') {
//             interval = setInterval(() => {
//                 setCampaignStep(prev => (prev >= 3 ? 0 : prev + 1));
//             }, 2000);
//         }

//         return () => clearInterval(interval);
//     }, [activeView, isPaused]);


//     // --- RENDERERS ---

//     const renderSidebar = () => {
//         return (
//             <div className="space-y-2">
//                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Control Panel</h4>
//                 {views.map((view) => (
//                     <div 
//                         key={view}
//                         onClick={() => setActiveView(view)}
//                         className={`flex items-center justify-between px-4 py-4 rounded-xl cursor-pointer transition-all duration-300 border ${
//                             activeView === view 
//                                 ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-200' 
//                                 : 'bg-white text-slate-500 border-transparent hover:bg-slate-50'
//                         }`}
//                     >
//                         <span className="capitalize font-bold flex items-center gap-3">
//                             {view === 'creation' && <Settings className="w-4 h-4" />}
//                             {view === 'campaigns' && <Phone className="w-4 h-4" />}
//                             {view === 'analytics' && <BarChart2 className="w-4 h-4" />}
//                             {view}
//                         </span>
//                         {activeView === view && <div className="w-2 h-2 bg-white rounded-full animate-pulse"/>}
//                     </div>
//                 ))}

//                 {/* Live Status Indicator */}
//                 <div className="mt-8 p-4 bg-slate-900 rounded-xl text-center">
//                     <p className="text-slate-400 text-xs uppercase mb-2">System Status</p>
//                     <div className="flex items-center justify-center gap-2 text-green-400 font-bold text-sm">
//                         <span className="relative flex h-3 w-3">
//                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                           <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//                         </span>
//                         ONLINE
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const renderOutboundFlow = () => {
//         // Steps: 0 = List, 1 = Processing, 2 = Call Active, 3 = CRM Update
//         return (
//             <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 h-full overflow-hidden">
//                 {/* Background Grid Pattern */}
//                 <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#0891b2 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
//                 <h4 className="relative z-10 flex items-center text-lg font-bold text-slate-800 mb-8">
//                     <span className="bg-cyan-100 text-cyan-700 p-2 rounded-lg mr-3"><TrendingUp size={18}/></span>
//                     Outbound Auto-Dialer
//                 </h4>

//                 <div className="relative z-10 space-y-2">
//                     {/* Step 1: Lead List */}
//                     <div className={`transition-all duration-500 flex items-center p-3 rounded-xl border ${campaignStep === 0 ? 'bg-white border-cyan-400 shadow-md scale-105' : 'bg-white/50 border-slate-200 opacity-60'}`}>
//                         <div className="bg-slate-100 p-2 rounded-lg mr-4"><Users size={20} className="text-slate-600"/></div>
//                         <div>
//                             <p className="font-bold text-sm text-slate-800">Lead List Import</p>
//                             <div className="w-24 h-1 bg-slate-200 mt-1 rounded-full overflow-hidden">
//                                 <div className={`h-full bg-cyan-500 transition-all duration-1000 ${campaignStep === 0 ? 'w-full' : 'w-0'}`}></div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Connector */}
//                     <div className="h-6 w-0.5 bg-slate-300 mx-auto relative">
//                         {campaignStep === 0 && <div className="absolute top-0 left-[-2px] w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"/>}
//                     </div>

//                     {/* Step 2: Xeny Bot (The Core) */}
//                     <div className={`transition-all duration-500 p-4 rounded-xl border-2 flex items-center justify-between ${campaignStep === 1 || campaignStep === 2 ? 'bg-indigo-600 border-cyan-400 shadow-xl shadow-cyan-200 scale-105' : 'bg-white border-slate-200 opacity-60'}`}>
//                         <div className="flex items-center">
//                             <div className={`p-2 rounded-full mr-3 ${campaignStep === 1 || campaignStep === 2 ? 'bg-white/20' : 'bg-slate-100'}`}>
//                                 <Mic size={24} className={campaignStep === 1 || campaignStep === 2 ? 'text-white animate-pulse' : 'text-slate-400'}/>
//                             </div>
//                             <div>
//                                 <p className={`font-bold ${campaignStep === 1 || campaignStep === 2 ? 'text-white' : 'text-slate-700'}`}>Xeny AI Dialer</p>
//                                 <p className={`text-xs ${campaignStep === 1 || campaignStep === 2 ? 'text-cyan-100' : 'text-slate-400'}`}>
//                                     {campaignStep === 1 ? 'Dialing...' : campaignStep === 2 ? 'Talking...' : 'Idle'}
//                                 </p>
//                             </div>
//                         </div>
//                         {(campaignStep === 1 || campaignStep === 2) && (
//                             <div className="flex gap-1">
//                                 <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
//                                 <div className="w-1 h-5 bg-white rounded-full animate-bounce" style={{animationDelay: '100ms'}}></div>
//                                 <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
//                             </div>
//                         )}
//                     </div>

//                      {/* Connector */}
//                      <div className="h-6 w-0.5 bg-slate-300 mx-auto relative">
//                         {(campaignStep === 1 || campaignStep === 2) && <div className="absolute top-0 left-[-2px] w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"/>}
//                      </div>

//                     {/* Step 3: CRM Sync */}
//                     <div className={`transition-all duration-500 flex items-center p-3 rounded-xl border ${campaignStep === 3 ? 'bg-green-50 border-green-400 shadow-md scale-105' : 'bg-white/50 border-slate-200 opacity-60'}`}>
//                         <div className="bg-green-100 p-2 rounded-lg mr-4"><CheckCircle size={20} className="text-green-600"/></div>
//                         <div>
//                             <p className="font-bold text-sm text-slate-800">CRM Synced</p>
//                             <p className="text-xs text-slate-500">Qualification Updated</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const renderInboundFlow = () => {
//          // Inbound mirrors outbound but with different visual cues
//          return (
//             <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 h-full overflow-hidden">
//                 <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#7c3aed 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
//                 <h4 className="relative z-10 flex items-center text-lg font-bold text-slate-800 mb-8">
//                     <span className="bg-purple-100 text-purple-700 p-2 rounded-lg mr-3"><PhoneIncoming size={18}/></span>
//                     Inbound Receptionist
//                 </h4>

//                 <div className="relative z-10 space-y-2">
//                     {/* User Calls */}
//                     <div className={`transition-all duration-500 flex items-center p-3 rounded-xl border ${campaignStep === 0 ? 'bg-white border-purple-400 shadow-md scale-105' : 'bg-white/50 border-slate-200 opacity-60'}`}>
//                         <div className="bg-slate-100 p-2 rounded-lg mr-4"><Phone size={20} className="text-slate-600"/></div>
//                         <div>
//                             <p className="font-bold text-sm text-slate-800">Incoming Call</p>
//                             <p className="text-xs text-slate-500">+1 (555) 012-3456</p>
//                         </div>
//                     </div>

//                     <div className="flex justify-center -my-2 z-0 relative">
//                          <ArrowDown size={20} className={`text-purple-400 transition-all ${campaignStep === 0 ? 'opacity-100 translate-y-2' : 'opacity-20'}`} />
//                     </div>

//                     {/* AI Responds */}
//                     <div className={`mt-2 transition-all duration-500 p-4 rounded-xl border-2 flex items-center justify-between ${campaignStep === 1 || campaignStep === 2 ? 'bg-purple-600 border-purple-400 shadow-xl shadow-purple-200 scale-105' : 'bg-white border-slate-200 opacity-60'}`}>
//                         <div className="flex items-center">
//                             <div className={`p-2 rounded-full mr-3 ${campaignStep === 1 || campaignStep === 2 ? 'bg-white/20' : 'bg-slate-100'}`}>
//                                 <Zap size={24} className={campaignStep === 1 || campaignStep === 2 ? 'text-white animate-pulse' : 'text-slate-400'}/>
//                             </div>
//                             <div>
//                                 <p className={`font-bold ${campaignStep === 1 || campaignStep === 2 ? 'text-white' : 'text-slate-700'}`}>AI Receptionist</p>
//                                 <p className={`text-xs ${campaignStep === 1 || campaignStep === 2 ? 'text-purple-100' : 'text-slate-400'}`}>
//                                     {campaignStep === 1 ? 'Answering...' : campaignStep === 2 ? 'Handling Query...' : 'Waiting'}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex justify-center -my-2 z-0 relative">
//                          <ArrowDown size={20} className={`text-purple-400 transition-all ${campaignStep === 2 ? 'opacity-100 translate-y-2' : 'opacity-20'}`} />
//                     </div>

//                     {/* Action Taken */}
//                     <div className={`mt-2 transition-all duration-500 flex items-center p-3 rounded-xl border ${campaignStep === 3 ? 'bg-yellow-50 border-yellow-400 shadow-md scale-105' : 'bg-white/50 border-slate-200 opacity-60'}`}>
//                         <div className="bg-yellow-100 p-2 rounded-lg mr-4"><Clock size={20} className="text-yellow-600"/></div>
//                         <div>
//                             <p className="font-bold text-sm text-slate-800">Appointment Booked</p>
//                             <p className="text-xs text-slate-500">Calendar Updated</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const renderMainContent = () => {
//         switch (activeView) {
//             case 'creation':
//                 return (
//                     <div className="h-full flex flex-col justify-center animate-fadeIn">
//                         <div className="text-center mb-8">
//                             <h3 className="text-3xl font-bold text-slate-900">Building Your Agent</h3>
//                             <p className="text-slate-500">Watch Xeny construct your custom voice bot in seconds.</p>
//                         </div>
                        
//                         {/* Progressive Stepper */}
//                         <div className="flex items-center justify-center gap-4 mb-12">
//                             {creationSteps.map((step) => (
//                                 <div key={step.id} className="flex flex-col items-center relative">
//                                     <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 ${
//                                         activeCreationStep >= step.id 
//                                         ? 'bg-indigo-600 border-cyan-200 text-white shadow-lg scale-110' 
//                                         : 'bg-white border-slate-200 text-slate-300'
//                                     }`}>
//                                         <step.icon size={24} />
//                                     </div>
//                                     <p className={`absolute -bottom-8 text-xs font-bold whitespace-nowrap transition-colors ${
//                                         activeCreationStep >= step.id ? 'text-cyan-700' : 'text-slate-300'
//                                     }`}>{step.title}</p>
                                    
//                                     {/* Connecting Line */}
//                                     {step.id < creationSteps.length && (
//                                         <div className="absolute left-10 top-7 w-16 h-1 bg-slate-100 -z-0">
//                                             <div 
//                                                 className="h-full bg-cyan-500 transition-all duration-1000" 
//                                                 style={{ width: activeCreationStep > step.id ? '100%' : '0%' }}
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Active Step Display */}
//                         <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-2xl text-center max-w-lg mx-auto w-full">
//                             <div className="animate-pulse mb-4 flex justify-center">
//                                 {creationSteps[activeCreationStep - 1].icon && 
//                                     React.createElement(creationSteps[activeCreationStep - 1].icon, { size: 48, className: "text-cyan-400" })
//                                 }
//                             </div>
//                             <h4 className="text-2xl font-bold text-white mb-2">{creationSteps[activeCreationStep - 1].content}</h4>
//                             <div className="w-full bg-slate-700 h-2 rounded-full mt-6 overflow-hidden">
//                                 <div className="h-full bg-cyan-400 animate-loadingBar w-full origin-left"></div>
//                             </div>
//                         </div>
//                     </div>
//                 );

//          case 'campaigns':
//             return (
//                 <div key="campaign-view" className="animate-slideInRight h-full">
//                     <div className="flex justify-between items-end mb-6">
//                         <div>
//                              <h3 className="text-2xl font-bold text-slate-900">Live Campaign Monitor</h3>
//                              <p className="text-slate-500">Real-time visualization of inbound and outbound flows.</p>
//                         </div>
//                         <div className="flex gap-2">
//                              <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
//                                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Active
//                              </span>
//                         </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
//                         {renderOutboundFlow()}
//                         {renderInboundFlow()}
//                     </div>
//                 </div>
//             );

//             case 'analytics':
//                 return (
//                     <div key="analytics-view" className="animate-slideInRight">
//                         <h3 className="text-2xl font-bold text-slate-900 mb-6">Performance Analytics</h3>
//                         <div className="grid grid-cols-3 gap-6 mb-8">
//                             <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
//                                 <p className="text-slate-400 text-sm font-semibold uppercase">Total Calls</p>
//                                 <p className="text-3xl font-bold text-slate-800 mt-2">1,284</p>
//                                 <div className="mt-2 text-green-500 text-sm flex items-center font-bold">
//                                     <TrendingUp size={16} className="mr-1"/> +12%
//                                 </div>
//                             </div>
//                             <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
//                                 <p className="text-slate-400 text-sm font-semibold uppercase">Cost Per Lead</p>
//                                 <p className="text-3xl font-bold text-slate-800 mt-2">$0.45</p>
//                                 <div className="mt-2 text-green-500 text-sm flex items-center font-bold">
//                                     <ArrowDown size={16} className="mr-1"/> -5%
//                                 </div>
//                             </div>
//                             <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
//                                 <p className="text-slate-400 text-sm font-semibold uppercase">Conversion Rate</p>
//                                 <p className="text-3xl font-bold text-slate-800 mt-2">24.8%</p>
//                                 <div className="mt-2 text-green-500 text-sm flex items-center font-bold">
//                                     <TrendingUp size={16} className="mr-1"/> +2.4%
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Animated Chart Simulation */}
//                         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-64 flex items-end justify-between px-10 pb-4 relative overflow-hidden">
//                             <div className="absolute top-6 left-6 font-bold text-slate-800">Live ROI Tracker</div>
//                              {/* Bars */}
//                              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
//                                  <div key={i} className="w-8 bg-cyan-100 rounded-t-lg relative group transition-all hover:bg-cyan-200 cursor-pointer">
//                                      <div 
//                                         className="absolute bottom-0 w-full bg-indigo-600 rounded-t-lg transition-all duration-1000 ease-out" 
//                                         style={{ height: `${h}%`, animation: `growUp 1s ease-out ${i * 0.1}s backwards` }}
//                                      ></div>
//                                      {/* Tooltip */}
//                                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded">
//                                         {h}%
//                                      </div>
//                                  </div>
//                              ))}
//                         </div>
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <section className="py-24 bg-slate-50 relative overflow-hidden font-sans">
//              {/* Animation Keyframes in-line style for simplicity */}
//              <style jsx>{`
//                 @keyframes growUp { from { height: 0; } }
//                 @keyframes loadingBar { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
//                 @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
//             `}</style>

//             <div className="container mx-auto px-6 relative z-10">
//                 <div className="text-center mb-12">
//                     <span className="text-cyan-600 font-bold tracking-wider text-sm uppercase bg-cyan-50 px-4 py-1 rounded-full border border-cyan-100">
//                         The Control Room
//                     </span>
//                     <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6 mb-4">
//                         Your AI Command Center
//                     </h2>
//                     <p className="text-slate-500 max-w-2xl mx-auto text-lg">
//                         Visualize your entire operation. From building agents to watching them close deals in real-time.
//                     </p>
//                 </div>
                
//                 {/* Main Dashboard UI */}
//                 <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden flex flex-col md:flex-row h-auto min-h-[600px]">
                    
//                     {/* Left Sidebar */}
//                     <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col">
//                          {renderSidebar()}
//                     </div>
                    
//                     {/* Right Content */}
//                     <div className="flex-1 p-8 bg-white relative">
//                         {/* Play/Pause Control - Absolute Positioned */}
//                         <button 
//                             onClick={() => setIsPaused(!isPaused)} 
//                             className="absolute top-8 right-8 text-xs font-bold text-slate-400 hover:text-cyan-600 flex items-center gap-2 z-50"
//                         >
//                             {isPaused ? '▶ RESUME AUTO-PLAY' : '⏸ PAUSE DEMO'}
//                         </button>

//                         {renderMainContent()}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default AnimatedFeatureDashboard;


import React, { useState, useEffect } from 'react';
import { Settings, Mic, MessageSquare, Plug, CheckCircle, BarChart2, TrendingUp, Zap, Clock, Users, DollarSign, Phone, PhoneIncoming, ArrowDown, Play, Pause } from 'lucide-react';

const AnimatedFeatureDashboard = () => {
    // 1. STATE MANAGEMENT
    const views = ['creation', 'campaigns', 'analytics'];
    const [activeView, setActiveView] = useState('creation');
    const [isPaused, setIsPaused] = useState(false);
    
    // Internal state for Campaign Flow Animation
    const [campaignStep, setCampaignStep] = useState(0);

    // --- Data for Agent Creation Flow ---
    const creationSteps = [
        { id: 1, title: "Identity", icon: Settings, content: "Defining Persona..." },
        { id: 2, title: "Voice", icon: Mic, content: "Synthesizing Voice..." },
        { id: 3, title: "Logic", icon: BarChart2, content: "Building Flows..." },
        { id: 4, title: "Deploy", icon: Zap, content: "Going Live..." },
    ];
    const [activeCreationStep, setActiveCreationStep] = useState(1);

    // 2. MASTER AUTO-ADVANCE LOGIC
    useEffect(() => {
        if (isPaused) return;

        // TIMING CONFIGURATION
        const viewDuration = activeView === 'creation' ? 12000 : 10000; 

        const viewTimer = setTimeout(() => {
            const currentIndex = views.indexOf(activeView);
            const nextIndex = (currentIndex + 1) % views.length;
            setActiveView(views[nextIndex]);
            
            // Reset internal counters
            setActiveCreationStep(1);
            setCampaignStep(0);
        }, viewDuration);

        return () => clearTimeout(viewTimer);
    }, [activeView, isPaused]);

    // 3. INTERNAL ANIMATION LOOPS
    useEffect(() => {
        if (isPaused) return;

        let interval;
        
        // Creation View: Tick through steps
        if (activeView === 'creation') {
            interval = setInterval(() => {
                setActiveCreationStep(prev => (prev >= 4 ? 1 : prev + 1));
            }, 2500);
        }

        // Campaign View: Tick through flow steps (0 to 3)
        if (activeView === 'campaigns') {
            interval = setInterval(() => {
                setCampaignStep(prev => (prev >= 3 ? 0 : prev + 1));
            }, 2000);
        }

        return () => clearInterval(interval);
    }, [activeView, isPaused]);


    // --- RENDERERS ---

    // DESKTOP SIDEBAR
    const renderSidebar = () => {
        return (
            <div className="hidden md:flex flex-col space-y-2 h-full">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Control Panel</h4>
                {views.map((view) => (
                    <div 
                        key={view}
                        onClick={() => setActiveView(view)}
                        className={`flex items-center justify-between px-4 py-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                            activeView === view 
                                ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-200' 
                                : 'bg-white text-slate-500 border-transparent hover:bg-slate-50'
                        }`}
                    >
                        <span className="capitalize font-bold flex items-center gap-3">
                            {view === 'creation' && <Settings className="w-4 h-4" />}
                            {view === 'campaigns' && <Phone className="w-4 h-4" />}
                            {view === 'analytics' && <BarChart2 className="w-4 h-4" />}
                            {view}
                        </span>
                        {activeView === view && <div className="w-2 h-2 bg-white rounded-full animate-pulse"/>}
                    </div>
                ))}

                {/* Live Status Indicator */}
                <div className="mt-auto p-4 bg-slate-900 rounded-xl text-center">
                    <p className="text-slate-400 text-xs uppercase mb-2">System Status</p>
                    <div className="flex items-center justify-center gap-2 text-green-400 font-bold text-sm">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        ONLINE
                    </div>
                </div>
            </div>
        );
    };

    // MOBILE TOP NAVIGATION (Tabs)
    const renderMobileNav = () => {
        return (
            <div className="md:hidden flex overflow-x-auto pb-4 gap-2 mb-4 no-scrollbar">
                {views.map((view) => (
                    <button
                        key={view}
                        onClick={() => setActiveView(view)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold capitalize flex items-center gap-2 transition-all ${
                            activeView === view
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-white text-slate-500 border border-slate-200'
                        }`}
                    >
                        {view === 'creation' && <Settings className="w-3 h-3" />}
                        {view === 'campaigns' && <Phone className="w-3 h-3" />}
                        {view === 'analytics' && <BarChart2 className="w-3 h-3" />}
                        {view}
                    </button>
                ))}
            </div>
        );
    };

    const renderOutboundFlow = () => {
        return (
            <div className="relative p-4 md:p-6 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden min-h-[320px] md:h-full flex flex-col">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0891b2 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <h4 className="relative z-10 flex items-center text-base md:text-lg font-bold text-slate-800 mb-6">
                    <span className="bg-cyan-100 text-cyan-700 p-2 rounded-lg mr-3"><TrendingUp size={18}/></span>
                    Outbound Dialer
                </h4>

                <div className="relative z-10 space-y-2 flex-1 flex flex-col justify-center">
                    {/* Step 1: Lead List */}
                    <div className={`transition-all duration-500 flex items-center p-2 md:p-3 rounded-xl border ${campaignStep === 0 ? 'bg-white border-cyan-400 shadow-md transform scale-[1.02]' : 'bg-white/50 border-slate-200 opacity-60'}`}>
                        <div className="bg-slate-100 p-2 rounded-lg mr-3 md:mr-4"><Users size={18} className="text-slate-600"/></div>
                        <div className="min-w-0">
                            <p className="font-bold text-xs md:text-sm text-slate-800 truncate">Lead List Import</p>
                            <div className="w-16 md:w-24 h-1 bg-slate-200 mt-1 rounded-full overflow-hidden">
                                <div className={`h-full bg-cyan-500 transition-all duration-1000 ${campaignStep === 0 ? 'w-full' : 'w-0'}`}></div>
                            </div>
                        </div>
                    </div>

                    {/* Connector */}
                    <div className="h-4 md:h-6 w-0.5 bg-slate-300 mx-auto relative">
                        {campaignStep === 0 && <div className="absolute top-0 left-[-2px] w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"/>}
                    </div>

                    {/* Step 2: Xeny Bot */}
                    <div className={`transition-all duration-500 p-3 md:p-4 rounded-xl border-2 flex items-center justify-between ${campaignStep === 1 || campaignStep === 2 ? 'bg-indigo-600 border-cyan-400 shadow-xl shadow-cyan-200 transform scale-[1.02]' : 'bg-white border-slate-200 opacity-60'}`}>
                        <div className="flex items-center min-w-0">
                            <div className={`p-2 rounded-full mr-3 ${campaignStep === 1 || campaignStep === 2 ? 'bg-white/20' : 'bg-slate-100'}`}>
                                <Mic size={20} className={campaignStep === 1 || campaignStep === 2 ? 'text-white animate-pulse' : 'text-slate-400'}/>
                            </div>
                            <div className="min-w-0">
                                <p className={`font-bold text-sm ${campaignStep === 1 || campaignStep === 2 ? 'text-white' : 'text-slate-700'} truncate`}>Xeny AI Dialer</p>
                                <p className={`text-[10px] md:text-xs ${campaignStep === 1 || campaignStep === 2 ? 'text-cyan-100' : 'text-slate-400'} truncate`}>
                                    {campaignStep === 1 ? 'Dialing...' : campaignStep === 2 ? 'Speaking...' : 'Idle'}
                                </p>
                            </div>
                        </div>
                    </div>

                     {/* Connector */}
                     <div className="h-4 md:h-6 w-0.5 bg-slate-300 mx-auto relative">
                        {(campaignStep === 1 || campaignStep === 2) && <div className="absolute top-0 left-[-2px] w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"/>}
                     </div>

                    {/* Step 3: CRM Sync */}
                    <div className={`transition-all duration-500 flex items-center p-2 md:p-3 rounded-xl border ${campaignStep === 3 ? 'bg-green-50 border-green-400 shadow-md transform scale-[1.02]' : 'bg-white/50 border-slate-200 opacity-60'}`}>
                        <div className="bg-green-100 p-2 rounded-lg mr-3 md:mr-4"><CheckCircle size={18} className="text-green-600"/></div>
                        <div className="min-w-0">
                            <p className="font-bold text-xs md:text-sm text-slate-800 truncate">CRM Synced</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderInboundFlow = () => {
         return (
            <div className="relative p-4 md:p-6 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden min-h-[320px] md:h-full flex flex-col">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7c3aed 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <h4 className="relative z-10 flex items-center text-base md:text-lg font-bold text-slate-800 mb-6">
                    <span className="bg-purple-100 text-purple-700 p-2 rounded-lg mr-3"><PhoneIncoming size={18}/></span>
                    Inbound Reception
                </h4>

                <div className="relative z-10 space-y-2 flex-1 flex flex-col justify-center">
                    {/* User Calls */}
                    <div className={`transition-all duration-500 flex items-center p-2 md:p-3 rounded-xl border ${campaignStep === 0 ? 'bg-white border-purple-400 shadow-md transform scale-[1.02]' : 'bg-white/50 border-slate-200 opacity-60'}`}>
                        <div className="bg-slate-100 p-2 rounded-lg mr-3 md:mr-4"><Phone size={18} className="text-slate-600"/></div>
                        <div className="min-w-0">
                            <p className="font-bold text-xs md:text-sm text-slate-800 truncate">Incoming Call</p>
                            <p className="text-[10px] md:text-xs text-slate-500 truncate">+1 (555) 012-3456</p>
                        </div>
                    </div>

                    <div className="flex justify-center -my-2 z-0 relative">
                         <ArrowDown size={20} className={`text-purple-400 transition-all ${campaignStep === 0 ? 'opacity-100 translate-y-2' : 'opacity-20'}`} />
                    </div>

                    {/* AI Responds */}
                    <div className={`mt-2 transition-all duration-500 p-3 md:p-4 rounded-xl border-2 flex items-center justify-between ${campaignStep === 1 || campaignStep === 2 ? 'bg-purple-600 border-purple-400 shadow-xl shadow-purple-200 transform scale-[1.02]' : 'bg-white border-slate-200 opacity-60'}`}>
                        <div className="flex items-center min-w-0">
                            <div className={`p-2 rounded-full mr-3 ${campaignStep === 1 || campaignStep === 2 ? 'bg-white/20' : 'bg-slate-100'}`}>
                                <Zap size={20} className={campaignStep === 1 || campaignStep === 2 ? 'text-white animate-pulse' : 'text-slate-400'}/>
                            </div>
                            <div className="min-w-0">
                                <p className={`font-bold text-sm ${campaignStep === 1 || campaignStep === 2 ? 'text-white' : 'text-slate-700'} truncate`}>AI Receptionist</p>
                                <p className={`text-[10px] md:text-xs ${campaignStep === 1 || campaignStep === 2 ? 'text-purple-100' : 'text-slate-400'} truncate`}>
                                    {campaignStep === 1 ? 'Answering...' : campaignStep === 2 ? 'Helping...' : 'Waiting'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center -my-2 z-0 relative">
                         <ArrowDown size={20} className={`text-purple-400 transition-all ${campaignStep === 2 ? 'opacity-100 translate-y-2' : 'opacity-20'}`} />
                    </div>

                    {/* Action Taken */}
                    <div className={`mt-2 transition-all duration-500 flex items-center p-2 md:p-3 rounded-xl border ${campaignStep === 3 ? 'bg-yellow-50 border-yellow-400 shadow-md transform scale-[1.02]' : 'bg-white/50 border-slate-200 opacity-60'}`}>
                        <div className="bg-yellow-100 p-2 rounded-lg mr-3 md:mr-4"><Clock size={18} className="text-yellow-600"/></div>
                        <div className="min-w-0">
                            <p className="font-bold text-xs md:text-sm text-slate-800 truncate">Booked</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderMainContent = () => {
        switch (activeView) {
            case 'creation':
                return (
                    <div className="h-full flex flex-col justify-center animate-fadeIn py-6 md:py-0">
                        <div className="text-center mb-6 md:mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Building Agent</h3>
                            <p className="text-sm md:text-base text-slate-500">Xeny constructing your bot.</p>
                        </div>
                        
                        {/* Progressive Stepper - Wrapped for mobile */}
                        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                            {creationSteps.map((step) => (
                                <div key={step.id} className="flex flex-col items-center relative">
                                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 ${
                                        activeCreationStep >= step.id 
                                        ? 'bg-indigo-600 border-cyan-200 text-white shadow-lg md:scale-110' 
                                        : 'bg-white border-slate-200 text-slate-300'
                                    }`}>
                                        <step.icon className="w-4 h-4 md:w-6 md:h-6" />
                                    </div>
                                    <p className={`hidden md:block absolute -bottom-8 text-xs font-bold whitespace-nowrap transition-colors ${
                                        activeCreationStep >= step.id ? 'text-cyan-700' : 'text-slate-300'
                                    }`}>{step.title}</p>
                                    
                                    {/* Mobile Label (Only show active) */}
                                    {activeCreationStep === step.id && (
                                         <p className="md:hidden absolute -bottom-6 text-[10px] font-bold text-cyan-700 whitespace-nowrap">{step.title}</p>
                                    )}

                                    {/* Connecting Line */}
                                    {step.id < creationSteps.length && (
                                        <div className="absolute left-8 md:left-10 top-5 md:top-7 w-4 md:w-16 h-1 bg-slate-100 -z-0">
                                            <div 
                                                className="h-full bg-cyan-500 transition-all duration-1000" 
                                                style={{ width: activeCreationStep > step.id ? '100%' : '0%' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Active Step Display */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl text-center max-w-lg mx-auto w-full">
                            <div className="animate-pulse mb-4 flex justify-center">
                                {creationSteps[activeCreationStep - 1].icon && 
                                    React.createElement(creationSteps[activeCreationStep - 1].icon, { className: "text-cyan-400 w-10 h-10 md:w-12 md:h-12" })
                                }
                            </div>
                            <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{creationSteps[activeCreationStep - 1].content}</h4>
                            <div className="w-full bg-slate-700 h-2 rounded-full mt-6 overflow-hidden">
                                <div className="h-full bg-cyan-400 animate-loadingBar w-full origin-left"></div>
                            </div>
                        </div>
                    </div>
                );

         case 'campaigns':
            return (
                <div key="campaign-view" className="animate-slideInRight h-full flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-2">
                        <div>
                             <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Live Campaign Monitor</h3>
                             <p className="text-sm text-slate-500 mt-1">Real-time flows.</p>
                        </div>
                        <div className="flex gap-2 self-start md:self-auto">
                             <span className="text-[10px] md:text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Active
                             </span>
                        </div>
                    </div>
                    
                    {/* Responsive Grid: 1 col on mobile, 2 on lg */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 flex-1">
                        {renderOutboundFlow()}
                        {renderInboundFlow()}
                    </div>
                </div>
            );

            case 'analytics':
                return (
                    <div key="analytics-view" className="animate-slideInRight pb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">Performance</h3>
                        
                        {/* Responsive Grid: 1 col mobile, 3 col desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                            <div className="p-4 md:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-row md:flex-col items-center md:items-start justify-between">
                                <div>
                                    <p className="text-slate-400 text-xs font-semibold uppercase">Total Calls</p>
                                    <p className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">1,284</p>
                                </div>
                                <div className="md:mt-2 text-green-500 text-xs md:text-sm flex items-center font-bold bg-green-50 px-2 py-1 rounded-lg">
                                    <TrendingUp size={16} className="mr-1"/> +12%
                                </div>
                            </div>
                            <div className="p-4 md:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-row md:flex-col items-center md:items-start justify-between">
                                <div>
                                    <p className="text-slate-400 text-xs font-semibold uppercase">Cost / Lead</p>
                                    <p className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">$0.45</p>
                                </div>
                                <div className="md:mt-2 text-green-500 text-xs md:text-sm flex items-center font-bold bg-green-50 px-2 py-1 rounded-lg">
                                    <ArrowDown size={16} className="mr-1"/> -5%
                                </div>
                            </div>
                            <div className="p-4 md:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-row md:flex-col items-center md:items-start justify-between">
                                <div>
                                    <p className="text-slate-400 text-xs font-semibold uppercase">Conversion</p>
                                    <p className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">24.8%</p>
                                </div>
                                <div className="md:mt-2 text-green-500 text-xs md:text-sm flex items-center font-bold bg-green-50 px-2 py-1 rounded-lg">
                                    <TrendingUp size={16} className="mr-1"/> +2%
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm h-48 md:h-64 flex items-end justify-between px-4 md:px-10 pb-4 relative overflow-hidden">
                            <div className="absolute top-4 left-4 md:top-6 md:left-6 font-bold text-sm md:text-base text-slate-800">ROI Tracker</div>
                             {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                 <div key={i} className="w-6 md:w-8 bg-cyan-100 rounded-t-lg relative group transition-all hover:bg-cyan-200 cursor-pointer mx-1">
                                     <div 
                                        className="absolute bottom-0 w-full bg-indigo-600 rounded-t-lg transition-all duration-1000 ease-out" 
                                        style={{ height: `${h}%`, animation: `growUp 1s ease-out ${i * 0.1}s backwards` }}
                                     ></div>
                                 </div>
                             ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="py-12 md:py-24 bg-slate-50 relative overflow-hidden font-sans">
             <style jsx>{`
                @keyframes growUp { from { height: 0; } }
                @keyframes loadingBar { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                /* Hide scrollbar for Chrome, Safari and Opera */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-8 md:mb-12">
                    <span className="text-cyan-600 font-bold tracking-wider text-xs md:text-sm uppercase bg-cyan-50 px-4 py-1 rounded-full border border-cyan-100">
                        The Control Room
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 md:mt-6 mb-2 md:mb-4">
                        AI Command Center
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-lg px-4">
                        Visualize your operation. From building agents to watching them close deals.
                    </p>
                </div>
                
                {/* Main Dashboard UI Card */}
                {/* Added w-full to prevent layout shrinking issues */}
                <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px] relative">
                    
                    {/* Left Sidebar (Desktop) */}
                    <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 md:p-6 flex-shrink-0">
                         {renderMobileNav()} {/* Shows Tabs on Mobile */}
                         {renderSidebar()}   {/* Shows Sidebar on Desktop */}
                    </div>
                    
                    {/* Right Content */}
                    <div className="flex-1 p-4 md:p-8 bg-white relative flex flex-col overflow-y-auto no-scrollbar">
                        
                        {/* Play/Pause Control - Moved to be safe on mobile */}
                        <div className="flex justify-end mb-2 md:absolute md:top-8 md:right-8 md:mb-0 z-50">
                            <button 
                                onClick={() => setIsPaused(!isPaused)} 
                                className="text-[10px] md:text-xs font-bold text-slate-400 hover:text-cyan-600 flex items-center gap-2 bg-slate-50 md:bg-transparent px-3 py-1 rounded-full"
                            >
                                {isPaused ? <Play size={10} /> : <Pause size={10} />}
                                {isPaused ? 'RESUME' : 'PAUSE'}
                            </button>
                        </div>

                        {renderMainContent()}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnimatedFeatureDashboard;