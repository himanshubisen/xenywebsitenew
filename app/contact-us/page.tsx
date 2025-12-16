// components/ContactUsPage.js
// Use the 'use client' directive for interactive components in Next.js App Router
"use client";

import React from 'react';
// Assuming Header and Footer are defined in your components folder
import Header from "@/components/header";
import Footer from "@/components/footer";

// Icons needed for the page and background effect (using Lucide React for example)
import { 
    Bot, Phone, Mic, Sparkles, Headphones, Mail, Globe, MapPin, PhoneCall, 
    ArrowRight
} from 'lucide-react';

// --- Contact Data adapted from your images ---
const globalSalesData = {
  email: "talib.ahmed@triotech.in",
  website: "www.xeny.ai",
  supportHours: "Monday-Friday, 9:00 AM – 6:00 PM (Local Time)",
};

const indiaOffice = {
  title: "India Office",
  businessName: "TRIOTECH BIZSERVE PRIVATE LIMITED",
  merchantName: "Talib Ahmed",
  addressLine1: "Ganesh Galaxy City, Ayodhya Bypass Road,",
  addressLine2: "Near Ayodhya Square, Bhopal,",
  state: "Madhya Pradesh - 462041",
  supportEmail: "support@xeny.ai",
  phone: "+91 40 4897 6666",
};

const uaeOffice = {
  title: "UAE Office",
  addressLine1: "4th Floor, Unit 40",
  addressLine2: "Al Fahdi Heights - Office Tower,",
  cityCountry: "Bur Dubai, Dubai, UAE",
  poBox: "P.O. Box–624699",
  supportEmail: "uae@xeny.ai",
  phone: "+971 50 877 3115",
};

// --- Main Component ---
export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      
      {/* -------------------------------------------------- */}
      {/* 1. HERO & ANIMATED BACKGROUND SECTION */}
      {/* -------------------------------------------------- */}
      <section className="relative overflow-hidden pt-16 mt-15 md:mt-10 md:pt-24 pb-12 md:pb-20">
        <HeroCanvasEffect /> {/* The animated background component */}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* MODIFIED: Added gradient text and animate-pulse class */}
          <h1 
            className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight 
                       bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                       animate-pulse"
            style={{ animationDuration: '3s' }} // Custom duration for slower pulse
          >
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to assist you with product inquiries, support, or partnership discussions.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 2. OFFICE LOCATIONS SECTION */}
      {/* -------------------------------------------------- */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
            Our Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* India Office Card */}
            <ContactCard data={indiaOffice} color="indigo" />
            
            {/* UAE Office Card */}
            <ContactCard data={uaeOffice} color="purple" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 3. GLOBAL SALES & PARTNERSHIPS SECTION (Now at the bottom) */}
      {/* -------------------------------------------------- */}
      <section className="pb-16 md:pb-24 border-t border-gray-200 py-2 pt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated Card for Sales & Partnerships */}
          <div 
            className="p-8 bg-indigo-50 border border-indigo-100 rounded-xl shadow-2xl transition duration-500 hover:scale-[1.02] hover:shadow-indigo-300/50 group"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-800 mb-8 flex items-center justify-center">
                Global Sales & Partnerships
                <ArrowRight className="w-6 h-6 ml-3 text-indigo-600 transition-transform duration-300 group-hover:translate-x-1" />
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center text-lg text-gray-700 p-2 bg-white/70 rounded-lg shadow-sm">
                <Mail className="w-5 h-5 mr-2 text-indigo-500" />
                <span className="font-medium">{globalSalesData.email}</span>
              </div>
              <div className="flex items-center text-lg text-gray-700 p-2 bg-white/70 rounded-lg shadow-sm">
                <Globe className="w-5 h-5 mr-2 text-purple-500" />
                <a href={`https://${globalSalesData.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition duration-150">
                  {globalSalesData.website}
                </a>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600 font-semibold">
              Support Hours: **{globalSalesData.supportHours}**
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- Helper Component for Contact Cards (with a subtle animation added) ---
const ContactCard = ({ data, color }) => (
  <div 
    className={`p-8 bg-white border border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 hover:translate-y-[-4px]`}
  >
    <div className={`flex items-center mb-6 text-${color}-600`}>
      <MapPin className="w-8 h-8 mr-3" />
      <h3 className="text-3xl font-bold">{data.title}</h3>
    </div>
    
    <dl className="space-y-4 text-gray-700">
      {data.businessName && (
        <div>
          <dt className="text-sm font-semibold text-gray-500">Business Name</dt>
          <dd className="font-medium">{data.businessName}</dd>
        </div>
      )}
      {data.merchantName && (
        <div>
          <dt className="text-sm font-semibold text-gray-500">Merchant Name</dt>
          <dd>{data.merchantName}</dd>
        </div>
      )}
      <div>
        <dt className="text-sm font-semibold text-gray-500">Address</dt>
        <dd>
          {data.addressLine1} <br/>
          {data.addressLine2 && (<>{data.addressLine2} <br/></>)}
          {data.cityCountry && (<>{data.cityCountry} <br/></>)}
          {data.state}
          {data.poBox && (<>, {data.poBox}</>)}
        </dd>
      </div>
      <div className={`flex items-center pt-2 text-${color}-600`}>
        <Mail className="w-5 h-5 mr-2" />
        <a href={`mailto:${data.supportEmail}`} className="hover:underline font-medium">
          {data.supportEmail}
        </a>
      </div>
      <div className={`flex items-center text-${color}-600`}>
        <PhoneCall className="w-5 h-5 mr-2" />
        <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="hover:underline font-medium">
          {data.phone}
        </a>
      </div>
    </dl>
  </div>
);


// --- Animated Background Effect Component (No Change) ---
const HeroCanvasEffect = () => {
    // Icons needed for the animation
    const animationIcons = [Bot, Phone, Mic, Sparkles, Headphones];

    // Particle positions and timings
    const particles = [
        { left: 10, top: 20, delay: 0.5, duration: 4 },
        { left: 30, top: 40, delay: 1.2, duration: 3.5 },
        { left: 50, top: 60, delay: 0.8, duration: 4.2 },
        { left: 70, top: 30, delay: 1.5, duration: 3.8 },
        { left: 20, top: 70, delay: 0.3, duration: 4.5 },
        { left: 80, top: 50, delay: 1.8, duration: 3.2 },
        { left: 40, top: 10, delay: 0.9, duration: 4.1 },
        { left: 60, top: 80, delay: 1.1, duration: 3.9 },
        { left: 15, top: 35, delay: 2.0, duration: 4.3 },
        { left: 85, top: 65, delay: 0.6, duration: 3.7 },
        { left: 55, top: 25, delay: 1.4, duration: 4.0 },
        { left: 25, top: 55, delay: 0.7, duration: 3.6 },
    ];

    // Line positions and rotations
    const lines = [
        { left: 15, top: 25, rotate: 45 },
        { left: 35, top: 55, rotate: 135 },
        { left: 55, top: 35, rotate: 225 },
        { left: 75, top: 65, rotate: 315 },
        { left: 25, top: 45, rotate: 90 },
        { left: 45, top: 75, rotate: 180 },
        { left: 65, top: 15, rotate: 270 },
        { left: 85, top: 85, rotate: 0 },
    ];

    // Floating Theme Icons - Center
    const centerIcons = [
        { icon: animationIcons[0], left: 30, top: 40, delay: 0 },
        { icon: animationIcons[1], left: 50, top: 30, delay: 1 },
        { icon: animationIcons[0], left: 40, top: 60, delay: 2 },
        { icon: animationIcons[2], left: 60, top: 50, delay: 3 },
        { icon: animationIcons[3], left: 35, top: 45, delay: 4 },
        { icon: animationIcons[4], left: 55, top: 35, delay: 5 },
    ];

    // Floating Theme Icons - Left Side
    const leftIcons = [
        { icon: animationIcons[0], left: 5, top: 30, delay: 0 },
        { icon: animationIcons[1], left: 10, top: 60, delay: 1 },
        { icon: animationIcons[3], left: 8, top: 45, delay: 2 },
        { icon: animationIcons[2], left: 12, top: 70, delay: 3 },
    ];

    // Floating Theme Icons - Right Side
    const rightIcons = [
        { icon: animationIcons[0], left: 88, top: 25, delay: 0 },
        { icon: animationIcons[4], left: 90, top: 55, delay: 1 },
        { icon: animationIcons[3], left: 85, top: 40, delay: 2 },
        { icon: animationIcons[1], left: 92, top: 75, delay: 3 },
    ];


    return (
        <div className="absolute inset-0 pointer-events-none z-0 h-full w-full">
            {/* Light Theme Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50"></div>
            
            {/* Pulsing Particles */}
            {particles.map((pos, i) => (
                <div
                    key={i}
                    className="absolute animate-pulse opacity-40"
                    style={{
                        left: `${pos.left}%`,
                        top: `${pos.top}%`,
                        animationDelay: `${pos.delay}s`,
                        animationDuration: `${pos.duration}s`,
                    }}
                >
                    <div className="w-8 h-8 bg-white/50 rounded-full blur-sm flex items-center justify-center border border-gray-100 backdrop-blur-sm">
                        <div className="w-4 h-4 bg-gradient-to-br from-pink-300/60 to-indigo-300/60 rounded-full"></div>
                    </div>
                </div>
            ))}
            
            {/* Faint Lines */}
            {lines.map((line, i) => (
                <div
                    key={`line-${i}`}
                    className="absolute opacity-20"
                    style={{
                        left: `${line.left}%`,
                        top: `${line.top}%`,
                        transform: `rotate(${line.rotate}deg)`,
                    }}
                >
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent"></div>
                </div>
            ))}
            
            {/* Floating Theme Icons - Center */}
            {centerIcons.map((item, i) => {
                const Icon = item.icon;
                return (
                    <div
                        key={`theme-center-${i}`}
                        className="absolute opacity-50 animate-bounce"
                        style={{
                            left: `${item.left}%`,
                            top: `${item.top}%`,
                            animationDelay: `${item.delay * 0.5}s`,
                            animationDuration: `${2 + (i % 2) * 0.5}s`,
                        }}
                    >
                        <div className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-gray-200">
                            <Icon className="w-6 h-6 text-indigo-500/80" />
                        </div>
                    </div>
                );
            })}
            
            {/* Floating Theme Icons - Left Side */}
            {leftIcons.map((item, i) => {
                const Icon = item.icon;
                return (
                    <div
                        key={`theme-left-${i}`}
                        className="absolute opacity-35 animate-pulse"
                        style={{
                            left: `${item.left}%`,
                            top: `${item.top}%`,
                            animationDelay: `${item.delay * 0.7}s`,
                            animationDuration: `${3 + (i % 2) * 1}s`,
                        }}
                    >
                        <div className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-gray-100">
                            <Icon className="w-5 h-5 text-purple-400/70" />
                        </div>
                    </div>
                );
            })}
            
            {/* Floating Theme Icons - Right Side */}
            {rightIcons.map((item, i) => {
                const Icon = item.icon;
                return (
                    <div
                        key={`theme-right-${i}`}
                        className="absolute opacity-35 animate-pulse"
                        style={{
                            left: `${item.left}%`,
                            top: `${item.top}%`,
                            animationDelay: `${item.delay * 0.7}s`,
                            animationDuration: `${3 + (i % 2) * 1}s`,
                        }}
                    >
                        <div className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-gray-100">
                            <Icon className="w-5 h-5 text-pink-400/70" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};