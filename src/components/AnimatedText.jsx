import React from "react";

const AnimatedText = ({ text, className = "" }) => {
  return (
    <h2 className={`flex flex-wrap justify-center gap-x-3 ${className}`}>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="inline-block animate-fade-in-up" 
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both' // Ensures it stays visible after animation
          }}
        >
          {word}
        </span>
      ))}
    </h2>
  );
};

export default AnimatedText;
