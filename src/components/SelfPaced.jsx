import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

// --- 1. ANIMATION UTILITIES ---

// Custom hook to check if element is in view (Triggers EVERY time)
function useInView(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update state based strictly on visibility (true/false)
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

// Wrapper for Fade-in/Slide-up Animations (Resets on exit)
const AnimatedBlock = ({ children, className, delay = 0 }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-12"
      } ${className || ""}`}
      style={{ 
        transitionDelay: isInView ? `${delay}ms` : '0ms' 
      }}
    >
      {children}
    </div>
  );
};

// --- 2. MAIN COMPONENT ---

const features = [
  {
    title: "Learn Anytime, Anywhere",
    desc: "Access course materials from any device, anytime you want.",
  },
  {
    title: "Personalized Learning Paths",
    desc: "Customized curriculum tailored to your goals and learning style.",
  },
  {
    title: "Expert Support",
    desc: "Get help from instructors whenever you need it.",
  },
];

const SelfPaced = () => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

  // Parallax Scroll Logic (Movement relative to scroll)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (inView) {
        // Move the image container slightly slower than scroll
        setOffset(rect.top * 0.08); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#050505] py-32 px-8 overflow-hidden">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* --- Left Side: Content (Re-animates on entry) --- */}
        <div className="flex flex-col justify-center space-y-8">
          
          <AnimatedBlock delay={0}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] text-white text-left">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e9d5ff] via-[#a855f7] to-[#fae8ff]">
                Self-paced Learning for <br /> Modern Learners
              </span>
            </h2>
          </AnimatedBlock>
          
          <AnimatedBlock delay={100}>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg text-left">
              Our self-paced learning system is designed for today's busy professionals. 
              Whether you're working full-time, managing a family, or juggling multiple responsibilities, 
              our flexible learning approach adapts to your lifestyle.
            </p>
          </AnimatedBlock>

          <div className="space-y-8 mt-4">
            {features.map((feature, index) => (
              <AnimatedBlock key={index} delay={200 + (index * 100)}>
                <div className="flex gap-5 items-start group">
                  <div className="mt-1 shrink-0">
                    <div className="w-6 h-6 rounded-full border border-green-500/50 flex items-center justify-center group-hover:bg-green-500/10 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{feature.title}</h4>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>

        {/* --- Right Side: Parallax Container (Moves on Scroll + Re-animates on entry) --- */}
        <AnimatedBlock delay={300} className="w-full h-full flex items-center justify-center lg:justify-end">
          <div 
              className="relative w-full aspect-[4/3]"
              style={{ transform: `translateY(${offset}px)`, transition: 'transform 0.1s linear' }}
          >
            <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            {/* Image Container - Static Image inside */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" 
                alt="Learner on sofa" 
                className="absolute left-0 top-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </section>
  );
};

export default SelfPaced;
