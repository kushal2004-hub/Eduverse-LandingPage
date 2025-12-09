import React, { useState, createContext, useContext, useRef, useEffect } from "react";
import { Check, Box, Award, Building2 } from "lucide-react";

// --- 1. UTILITIES FOR SCROLL ANIMATION ---

// Custom hook to check if element is in view (UPDATED: Triggers every time)
function useInView(options = { threshold: 0.1 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update state based on intersection, allowing re-animation
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

// Wrapper component for scroll animations
const ScrollReveal = ({ children, className, delay = 0, direction = "up" }) => {
  const [ref, isInView] = useInView();
  
  // Define initial transform based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case "left": return "-translate-x-20"; // Start from left
      case "right": return "translate-x-20"; // Start from right
      default: return "translate-y-12";      // Start from bottom (default)
    }
  };

  const initialTransform = getInitialTransform();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isInView 
          ? "opacity-100 translate-x-0 translate-y-0" 
          : `opacity-0 ${initialTransform}`
      } ${className || ""}`}
      style={{ 
        // Apply delay only when entering; reset instantly when leaving
        transitionDelay: isInView ? `${delay}ms` : '0ms' 
      }}
    >
      {children}
    </div>
  );
};

// --- 2. 3D CARD LOGIC (Unchanged) ---

const MouseEnterContext = createContext(undefined);

const CardContainer = ({ children, className, containerClassName }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => setIsMouseEntered(true);
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={`py-20 flex items-center justify-center ${containerClassName || ""}`}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`flex items-center justify-center relative transition-all duration-200 ease-linear ${className || ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

const CardBody = ({ children, className }) => (
  <div className={`h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] ${className || ""}`}>
    {children}
  </div>
);

const CardItem = ({ as: Tag = "div", children, className, translateX = 0, translateY = 0, translateZ = 0, rotateX = 0, rotateY = 0, rotateZ = 0, ...rest }) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag ref={ref} className={`w-fit transition duration-200 ease-linear ${className || ""}`} {...rest}>
      {children}
    </Tag>
  );
};

const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  return context;
};

// --- 3. MAIN COMPONENT ---

const plans = [
  {
    name: "Starter",
    desc: "For developers testing out Liveblocks locally.",
    price: { monthly: "$0", yearly: "$0" },
    icon: <Box className="w-6 h-6 text-blue-400" />,
    features: ["Presence", "Comments", "Notifications", "Text Editor", "Sync Datastore"],
    cta: "Start today for free",
    popular: false,
  },
  {
    name: "Pro",
    desc: "For companies adding collaboration in production.",
    price: { monthly: "$20", yearly: "$17" },
    icon: <Award className="w-6 h-6 text-purple-400" />,
    features: ["Everything in Starter", "Real-time data", "Authentication", "Advanced Analytics", "Premium Support"],
    cta: "Sign up",
    popular: true,
  },
  {
    name: "Enterprise",
    desc: "For organizations that need more support and compliance.",
    price: { monthly: "Custom", yearly: "Custom" },
    icon: <Building2 className="w-6 h-6 text-indigo-400" />,
    features: ["Everything in Pro", "SLA Guarantee", "Dedicated Success Manager", "Audit Logs", "SSO Integration"],
    cta: "Contact sales",
    popular: false,
  },
];

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");
  const [isFlipping, setIsFlipping] = useState(false);

  const toggleBilling = (value) => {
    if (billing === value) return;
    setIsFlipping(true);
    setBilling(value);
    setTimeout(() => setIsFlipping(false), 600);
  };

  return (
    <section id="pricing" className="w-full bg-[#050505] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Slide In From LEFT (Re-animates) */}
        <ScrollReveal direction="left">
          <div className="text-center mb-16">
            <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-2">Simple Pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Transform your project with our comprehensive pricing options designed for every need.
            </p>
          </div>
        </ScrollReveal>

        {/* Toggle Switch - Slide In From RIGHT (Re-animates) */}
        <ScrollReveal direction="right" delay={200}>
          <div className="flex justify-center mb-20">
            <div className="bg-white/5 p-1 rounded-full border border-white/10 flex relative">
              <div className={`absolute top-1 bottom-1 w-[100px] bg-white/10 rounded-full transition-all duration-300 ${billing === "monthly" ? "left-1" : "left-[108px]"}`}></div>
              <button onClick={() => toggleBilling("monthly")} className={`relative px-8 py-2 text-sm font-medium rounded-full transition-colors z-10 ${billing === "monthly" ? "text-white" : "text-gray-400 hover:text-white"}`}>
                Monthly
              </button>
              <button onClick={() => toggleBilling("yearly")} className={`relative px-8 py-2 text-sm font-medium rounded-full transition-colors z-10 flex items-center gap-2 ${billing === "yearly" ? "text-white" : "text-gray-400 hover:text-white"}`}>
                Yearly <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded-full">Save 17%</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing Cards Grid (Re-animates) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            // Determine direction based on index
            let direction = "up";
            if (index === 0) direction = "left";
            if (index === 2) direction = "right";

            return (
              <ScrollReveal key={index} delay={300 + (index * 100)} direction={direction} className="h-full">
                <CardContainer className="inter-var h-full">
                  <CardBody className={`relative group transition-all duration-700 h-auto w-auto ${isFlipping ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}>
                    <div className={`h-full p-8 rounded-3xl border flex flex-col relative overflow-hidden ${plan.popular ? "bg-[#0f0f13] border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]" : "bg-[#0a0a0a] border-white/10 hover:border-white/20"}`}>
                      {plan.popular && (
                        <CardItem translateZ={20} className="absolute -top-0 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-b-lg shadow-lg z-10">
                          Most popular
                        </CardItem>
                      )}
                      <div className="flex justify-between items-start mb-6">
                        <CardItem translateZ={30} className="w-full">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                              <p className="text-gray-400 text-sm h-10">{plan.desc}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                              {plan.icon}
                            </div>
                          </div>
                        </CardItem>
                      </div>
                      <CardItem translateZ={40} className="mb-8">
                        <span className="text-4xl font-bold text-white">
                          {billing === "monthly" ? plan.price.monthly : plan.price.yearly}
                        </span>
                        {plan.name !== "Enterprise" && <span className="text-gray-500"> /month</span>}
                      </CardItem>
                      <CardItem translateZ={50} className="mb-8">
                        <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-lg shadow-purple-900/20" : "bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/30 text-[#8b5cf6]"}`}>
                          {plan.cta}
                        </button>
                      </CardItem>
                      <CardItem translateZ={30} className="flex-1">
                        <ul className="space-y-4">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                              <Check className="w-4 h-4 text-green-400 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
