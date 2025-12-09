import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Zap } from "lucide-react";

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black flex items-center justify-center font-sans">
      <div className="max-w-7xl w-full mx-auto p-6 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* --- Left Column: Info --- */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-12 w-fit font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12 text-black leading-tight">
            Reserve your spot
          </h1>

          <div className="space-y-8 mb-16">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-gray-300/50 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-black" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed pt-2">
                Get priority access to new features and updates before public release.
              </p>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-gray-300/50 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed pt-2">
                Join a community of early adopters and help influence our product roadmap.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-300 pt-10 mt-10 space-y-6">
            <p className="text-2xl md:text-3xl font-medium leading-snug text-black/80">
              The waitlist has been a game-changer for our workflow. Highly recommend joining early.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div>
                <p className="font-bold text-black text-lg">Alex Rivera</p>
                <p className="text-gray-500 text-sm">Early Access Member</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Column: Form --- */}
        <div className="w-full max-w-lg space-y-6">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Full Name *</label>
            <input type="text" className="w-full bg-[#111] text-white p-4 rounded-xl border-none focus:ring-2 focus:ring-gray-400 transition-all placeholder-gray-500 h-14" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Email *</label>
            <input type="email" className="w-full bg-[#111] text-white p-4 rounded-xl border-none focus:ring-2 focus:ring-gray-400 transition-all placeholder-gray-500 h-14" />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
             <div className="flex-1">
               <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Use Case</label>
               <input type="text" className="w-full bg-[#111] text-white p-4 rounded-xl border-none focus:ring-2 focus:ring-gray-400 transition-all h-14" />
             </div>
             <div className="flex-1 relative">
               <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Team Size</label>
               <div className="relative">
                 <select className="w-full bg-[#111] text-white p-4 pr-10 rounded-xl border-none focus:ring-2 focus:ring-gray-400 appearance-none cursor-pointer h-14">
                   <option>Select</option>
                   <option>1-10</option>
                   <option>10-50</option>
                   <option>50+</option>
                 </select>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                   <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M4 6L8 10L12 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </div>
               </div>
             </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">What are you most excited about?</label>
            <textarea rows="4" className="w-full bg-[#111] text-white p-4 rounded-xl border-none focus:ring-2 focus:ring-gray-400 resize-none transition-all"></textarea>
          </div>

          <button className="w-full bg-[#111] text-white font-bold text-lg py-4 rounded-full hover:bg-black hover:scale-[1.01] transition-all mt-4 active:scale-[0.98]">
            Join waitlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
