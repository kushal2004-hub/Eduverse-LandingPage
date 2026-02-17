import React from "react";
import AnimatedText from "./AnimatedText";

const Partners = () => {
  const partners = [
    { name: "Yale", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/1200px-Yale_University_Shield_1.svg.png" },
    { name: "Princeton", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/1200px-Princeton_seal.svg.png" },
    { name: "Berkeley", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png" },
    { name: "Stanford", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1200px-Seal_of_Leland_Stanford_Junior_University.svg.png" },
    { name: "MIT", src: "data:image/jpeg;base64,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" },
    { name: "Harvard", src: "https://upload.wikimedia.org/wikipedia/commons/7/76/Harvard_Crimson_logo.svg" },
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
