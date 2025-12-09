import React, { useEffect, useRef, useState } from "react";
import { GraduationCap, Globe, Users } from "lucide-react";

// --- 1. ANIMATION UTILITIES ---

// Custom hook to check if element is in view (Triggers EVERY time)
function useInView(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Directly update state based on visibility
      setIsInView(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isInView];
}

// Wrapper for Slide-in Animations (Resets on exit)
const AnimatedSection = ({ children, className, direction = "up", delay = 0 }) => {
  const [ref, isInView] = useInView({ threshold: 0.2 }); // 20% visibility triggers it

  const getInitialTransform = () => {
    switch (direction) {
      case "left": return "-translate-x-24 opacity-0"; // Slide in from left
      case "right": return "translate-x-24 opacity-0";  // Slide in from right
      case "up": return "translate-y-12 opacity-0";     // Slide up (default)
      default: return "translate-y-12 opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isInView ? "translate-x-0 translate-y-0 opacity-100" : getInitialTransform()
      } ${className || ""}`}
      style={{ 
        // Only apply delay when ENTERING. Reset instantly when leaving.
        transitionDelay: isInView ? `${delay}ms` : '0ms' 
      }}
    >
      {children}
    </div>
  );
};

// --- 2. CONTENT DATA ---

const features = [
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
    title: "Accredited Degree",
    desc: "Earn degrees recognized by international accreditation bodies.",
    color: "bg-blue-500/10 border-blue-500/20"
  },
  {
    icon: <Globe className="w-6 h-6 text-cyan-500" />,
    title: "Industry Recognition",
    desc: "Degrees valued by top employers worldwide.",
    color: "bg-cyan-500/10 border-cyan-500/20"
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-500" />,
    title: "Career Support",
    desc: "Get career guidance and job placement assistance.",
    color: "bg-indigo-500/10 border-indigo-500/20"
  }
];

// --- 3. MAIN COMPONENT ---

const AccreditedDegrees = () => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

  // Parallax Image Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (inView) {
        const relativeScroll = window.innerHeight - rect.top;
        setOffset(relativeScroll * 0.1); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#050505] py-32 px-8 overflow-hidden">
      
      {/* Centered Heading - Slides Up */}
      <AnimatedSection direction="up">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e9d5ff] via-[#a855f7] to-[#fae8ff]">
              University Registered & Accredited
            </span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#7e22ce]">
              Degrees
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Earn recognized degrees and credentials from top institutions
          </p>
        </div>
      </AnimatedSection>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* --- Left Side: Image (Slides in from LEFT) --- */}
        <AnimatedSection direction="left" className="relative w-full h-full flex items-center justify-center lg:justify-start">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl group">
            
            {/* Parallax Inner Image */}
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop" 
              alt="University Campus" 
              className="absolute left-0 w-full h-[120%] object-cover transition-transform duration-75 ease-linear will-change-transform"
              style={{ 
                top: '-10%', 
                transform: `translateY(${offset * 0.5}px)` 
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* Floating Badge - bounces independently */}
          <div className="absolute -bottom-6 -right-6 lg:right-20 bg-[#0a0a0a] border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md animate-bounce-slow hidden md:block z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                ⭐
              </div>
              <div>
                <p className="text-white font-bold text-sm">Top Rated</p>
                <p className="text-gray-400 text-xs">Global Programs</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* --- Right Side: Content (Slides in from RIGHT) --- */}
        <AnimatedSection direction="right" delay={200} className="flex flex-col justify-center space-y-10">
          
          <p className="text-gray-400 text-lg leading-relaxed">
            Our accredited degree programs are designed with leading universities to ensure you receive the highest quality education. Each program is internationally recognized and valued by employers worldwide.
          </p>

          <div className="space-y-8">
            {features.map((feature, index) => (
              // Staggered animation for list items
              <AnimatedSection key={index} direction="up" delay={400 + (index * 100)}>
                <div className="flex gap-5 items-start group">
                  <div className="mt-1 shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feature.color} transition-transform duration-300 group-hover:scale-110`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">{feature.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </AnimatedSection>

      </div>
    </section>
  );
};

export default AccreditedDegrees;
