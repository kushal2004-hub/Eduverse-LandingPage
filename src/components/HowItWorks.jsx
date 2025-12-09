import React, { useState, useEffect, useRef } from "react";
import { UserCircle2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom"; 

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 1. Setup Intersection Observer that resets on exit
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If entering view
        if (entry.isIntersecting) {
          setIsVisible(true);
        } 
        // If leaving view (reset animation)
        else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 } // Trigger when 10% is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Auto-cycle the steps animation for the main card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const courseThumbnails = [
    { img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80", title: "Coding" },
    { img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80", title: "Data" },
    { img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80", title: "Analytics" },
    { img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80", title: "Design" },
    { img: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&q=80", title: "Business" },
    { img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80", title: "Marketing" },
  ];

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="w-full bg-[#050505] py-24 px-6 overflow-hidden"
    >
      
      {/* Main Content Wrapper with Re-triggerable Pop-up Animation */}
      <div 
        className={`transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-24 scale-95"
        }`}
      >

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d8b4fe]">How It Works</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Get Started With Your Learning Journey in 4 Simple Steps
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* --- Card 1: Main Feature --- */}
          <div className="md:col-span-3 relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-10 shadow-2xl group min-h-[320px] flex flex-col items-center justify-center hover:border-purple-500/30 transition-colors duration-500">
            
            {/* Step Indicators */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 relative z-20">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  onClick={() => setActiveStep(step)}
                  className={`cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-500 border ${
                    activeStep === step 
                      ? "bg-white/10 text-white border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                      : "bg-transparent border-transparent text-gray-600 hover:bg-white/5"
                  }`}
                >
                  {activeStep === step && <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>}
                  Step {step}
                </div>
              ))}
            </div>

            {/* Dynamic Content */}
            <div className="text-center relative z-10 max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-500 min-h-[3rem]">
                {activeStep === 1 && "Create Your Account"}
                {activeStep === 2 && "Explore Premium Courses"}
                {activeStep === 3 && "Start Learning Instantly"}
                {activeStep === 4 && "Get Certified & Hired"}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed min-h-[3.5rem] transition-opacity duration-500">
                {activeStep === 1 && "Join our community of learners. Sign up in seconds and unlock exclusive access to world-class education."}
                {activeStep === 2 && "Browse thousands of topics from coding to design. Filter by difficulty, duration, and industry demand."}
                {activeStep === 3 && "Watch high-quality video lessons, complete hands-on projects, and track your progress in real-time."}
                {activeStep === 4 && "Earn verified certificates upon completion. Showcase your new skills to top employers and boost your career."}
              </p>
            </div>

            {/* Abstract Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
          </div>


          {/* --- Card 2: Scrolling Image Strip --- */}
          <div className="md:col-span-2 h-64 rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden relative flex items-center group hover:border-purple-500/30 transition-colors duration-500">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
            
            {/* Infinite Scroll Track */}
            <div className="flex gap-4 animate-scroll-slow pl-4 group-hover:[animation-play-state:paused]">
               {courseThumbnails.map((item, i) => (
                 <div key={i} className="w-48 h-36 rounded-xl bg-white/5 border border-white/10 shrink-0 overflow-hidden hover:scale-105 transition-transform duration-300 relative group/card">
                   <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 transition-opacity" />
                   <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                     <p className="text-white text-sm font-semibold">{item.title}</p>
                   </div>
                 </div>
               ))}
               {courseThumbnails.map((item, i) => (
                 <div key={`dup-${i}`} className="w-48 h-36 rounded-xl bg-white/5 border border-white/10 shrink-0 overflow-hidden hover:scale-105 transition-transform duration-300 relative group/card">
                   <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 transition-opacity" />
                   <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                     <p className="text-white text-sm font-semibold">{item.title}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>


          {/* --- Card 3: Login Form Mockup --- */}
          <div className="md:col-span-1 h-64 rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 flex flex-col justify-center relative overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 blur-[60px] rounded-full"></div>
             
             <div className="relative z-10 w-full max-w-[240px] mx-auto space-y-3">
               <div className="flex items-center gap-2 mb-1">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                   <UserCircle2 className="w-5 h-5 text-blue-400" />
                 </div>
                 <span className="text-white font-semibold">Create Account</span>
               </div>

               <div className="h-9 w-full bg-white/5 rounded-lg border border-white/10 flex items-center px-3 gap-2">
                 <Mail className="w-3 h-3 text-gray-500" />
                 <div className="h-1.5 w-20 bg-gray-700/50 rounded"></div>
               </div>

               <div className="h-9 w-full bg-white/5 rounded-lg border border-white/10 flex items-center px-3 gap-2">
                 <Lock className="w-3 h-3 text-gray-500" />
                 <div className="h-1.5 w-16 bg-gray-700/50 rounded"></div>
               </div>

               {/* Clickable Link Wrapper */}
               <Link to="/signup" className="block mt-2">
                 <div className="h-9 w-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform cursor-pointer">
                   <span className="text-xs font-bold text-white">Sign Up Free</span>
                 </div>
               </Link>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
