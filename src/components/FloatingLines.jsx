import React, { useEffect, useRef } from "react";

const FloatingLines = ({
  linesGradient = ["#4f46e5", "#7c3aed"],
  lineCount = 5, // Updated default
  lineDistance = 12, // Updated default
  bendRadius = 5, // Updated default
  bendStrength = -0.5, // Updated default
  animationSpeed = 0.5,
  lineWidth = 2,
  interactive = true,
  mouseDamping = 0.05,
  enabledWaves = ['top', 'middle', 'bottom'], // New prop for toggles
  className = "",
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let lines = [];
    let t = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const initLines = () => {
      lines = [];
      
      // Helper to create a wave set
      const createWave = (baseY, speedMult, ampMult) => {
        for (let i = 0; i < lineCount; i++) {
          lines.push({
            y: baseY + (i * lineDistance), // Use lineDistance prop
            speed: (Math.random() * 0.5 + 0.5) * animationSpeed * speedMult,
            amplitude: (Math.random() * 50 + 50) * ampMult,
            frequency: Math.random() * 0.005 + 0.002,
            offset: Math.random() * Math.PI * 2,
          });
        }
      };

      // Create specific waves based on enabledWaves prop
      if (enabledWaves.includes('top'))    createWave(height * 0.2, 1.0, 1.0);
      if (enabledWaves.includes('middle')) createWave(height * 0.5, 0.8, 1.2);
      if (enabledWaves.includes('bottom')) createWave(height * 0.8, 0.6, 0.8);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
    };

    const draw = () => {
      if (!ctx) return;
      
      t += 0.01 * animationSpeed;
      
      if (interactive) {
        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * mouseDamping;
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * mouseDamping;
      }

      ctx.clearRect(0, 0, width, height);

      lines.forEach((line) => {
        ctx.beginPath();
        
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        linesGradient.forEach((color, index) => {
          gradient.addColorStop(index / (linesGradient.length - 1), color);
        });
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";

        for (let x = 0; x < width; x += 5) { // Higher resolution (step=5)
          let y = line.y + Math.sin(x * line.frequency + t + line.offset) * line.amplitude;
          
          if (interactive) {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Use bendRadius (scaled for visibility, * 50 is a good multiplier for pixels)
            const maxDist = bendRadius * 50; 

            if (dist < maxDist) {
              const force = (1 - dist / maxDist) * (bendStrength * 50); 
              y += force; // Direct vertical displacement
            }
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    initLines(); // Initialize with new logic
    
    window.addEventListener("resize", resize);
    if (interactive) window.addEventListener("mousemove", handleMouseMove);
    
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [linesGradient, lineCount, lineDistance, animationSpeed, lineWidth, interactive, mouseDamping, enabledWaves, bendRadius, bendStrength]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default FloatingLines;
