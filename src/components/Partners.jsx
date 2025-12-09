import React from "react";
import AnimatedText from "./AnimatedText";

const Partners = () => {
  const partners = [
    { name: "Yale", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/1200px-Yale_University_Shield_1.svg.png" },
    { name: "Princeton", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/1200px-Princeton_seal.svg.png" },
    { name: "Berkeley", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png" },
    { name: "Stanford", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1200px-Seal_of_Leland_Stanford_Junior_University.svg.png" },
    { name: "MIT", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2560px-MIT_logo.svg.png" },
    { name: "Harvard", src: "data:image/png;base64,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" },
  ];

  return (
    <section className="w-full bg-[#050505] py-24 border-t border-white/5 overflow-hidden">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        
        {/* Force Gradient using style prop */}
        <h2 
          className="text-3xl md:text-5xl font-bold tracking-tight inline-block"
          style={{
            background: "linear-gradient(to right, #ffffff, #a855f7, #d8b4fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent"
          }}
        >
          Top Universities We Partner With
        </h2>

        <p className="mt-6 text-gray-400 text-base tracking-wide animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          Learn from the world's leading institutions and earn recognized credentials
        </p>
      </div>

      {/* Scrolling Logos Container */}
      <div className="relative w-full flex overflow-hidden group">
        
        {/* Fade Gradients on Sides */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

        {/* The Scrolling Track */}
        <div className="flex animate-scroll-slow gap-20 w-max group-hover:[animation-play-state:paused] items-center">
          
          {/* Original Set */}
          {partners.map((partner, index) => (
            <img 
              key={`orig-${index}`}
              src={partner.src} 
              alt={partner.name} 
              className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110"
            />
          ))}

          {/* Duplicate Set 1 (for loop) */}
          {partners.map((partner, index) => (
            <img 
              key={`dup1-${index}`}
              src={partner.src} 
              alt={partner.name} 
              className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110"
            />
          ))}
          
          {/* Duplicate Set 2 (for wider screens) */}
          {partners.map((partner, index) => (
            <img 
              key={`dup2-${index}`}
              src={partner.src} 
              alt={partner.name} 
              className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110"
            />
          ))}

        </div>
      </div>

    </section>
  );
};

export default Partners;
