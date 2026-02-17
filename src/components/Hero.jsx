import React from "react";
import { Link } from "react-router-dom";
import CountUp from "./Countup";
import FloatingLines from "./FloatingLines";

const Hero = () => {
  return (
    <section id="home" className="relative flex min-h-screen w-full flex-col items-center bg-[#050505] px-6 pt-32 pb-20 text-center text-white overflow-hidden">
      
      {/* --- 1. BACKGROUND: Floating Lines (Customized) --- */}
      <div className="absolute inset-0 z-0">
        <FloatingLines 
        // Settings from Screenshot
        enabledWaves={['top', 'middle', 'bottom']}
        lineCount={5}
        lineDistance={12}
        bendRadius={5}
        bendStrength={-0.5}
        
        // Aesthetic tweaks
        animationSpeed={0.4} 
        linesGradient={["#4f46e5", "#8b5cf6", "#ec4899"]} // Nice purple-pink gradient
        />
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-90"></div>
      </div>

      {/* --- 2. Main Content --- */}
      <div className="z-10 flex flex-col items-center max-w-4xl mt-10 animate-fade-in-up">
        <h1 className="text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl leading-tight text-white drop-shadow-lg">
          Transform Your Future with <span className="font-normal text-white">Eduverse !</span>
        </h1>
        
        <p className="mt-8 text-lg text-gray-300 leading-relaxed font-light tracking-wide drop-shadow-md">
          Access premium courses from top universities worldwide. <br className="hidden md:block" />
          Learn at your own pace or pursue university registration <br className="hidden md:block" />
          for recognized degrees.
        </p>

        <Link 
          to="/signup"
          className="mt-12 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-10 py-3 text-sm font-medium text-white transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] inline-block"
        >
          Get started
        </Link>
      </div>

      {/* --- 3. Stats Bar --- */}
      <div className="z-10 mt-32 w-full max-w-6xl animate-fade-in-up">
        <div className="grid grid-cols-2 gap-8 rounded-2xl bg-transparent px-12 py-8 md:grid-cols-4">
        <div className="text-center">
            <h3 className="text-4xl font-bold text-white"><CountUp end={50} suffix="K+" /></h3>
            <p className="mt-2 text-sm text-gray-400">Active Learners</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-white"><CountUp end={1200} suffix="+" /></h3>
            <p className="mt-2 text-sm text-gray-400">Online Courses</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-white"><CountUp end={98} suffix="%" /></h3>
            <p className="mt-2 text-sm text-gray-400">Success Rate</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-white"><CountUp end={150} suffix="+" /></h3>
            <p className="mt-2 text-sm text-gray-400">Countries</p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
