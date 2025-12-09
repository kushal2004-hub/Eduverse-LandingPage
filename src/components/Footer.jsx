import React, { useRef, useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="about" className="bg-[#050505] pt-20 pb-10 px-6 border-t border-white/5 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto mb-24 relative">
        <FluidGlassBanner />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: Logo & Tagline */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <svg width="56" height="50" viewBox="0 0 56 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.4912 1.76074C19.2787 4.8291 25.6382 10.1706 28.1709 16.9707C30.7035 10.1706 36.8064 4.8291 44.5804 1.76074H40.6259C34.7413 3.26621 30.8003 6.2002 28.8954 10.7451C29.1402 5.65977 30.8942 3.09473 33.2978 1.76074H22.2134C24.6174 3.09473 26.3744 5.65977 26.619 10.7451C24.7142 6.2002 20.7733 3.26621 14.8885 1.76074H11.4912ZM53.8158 2.1667C51.9948 24.4739 44.8609 42.2514 30.9499 41.1225C35.4941 44.9738 40.1133 47.2147 44.3311 48.1752L53.8161 48.175V44.9555C50.8298 46.2951 48.0307 46.3759 39.4947 43.6432C47.0008 43.7031 50.5462 42.2398 53.816 38.5986V34.1003C51.5442 37.3145 47.3635 40.0003 39.4948 41.4673C46.5725 38.0545 51.2619 32.6896 53.8161 23.8067V2.1668L53.8158 2.1667ZM2.04418 6.96719V24.9482C4.6648 33.153 9.24761 38.2033 16.0168 41.4673C8.53012 40.0716 4.38513 37.5718 2.04418 34.5642V38.9709C5.22185 42.3385 8.77326 43.7011 16.0168 43.6432C7.81043 46.2704 4.90904 46.2972 2.04418 45.1051V48.1751H11.0436C15.2613 47.2147 19.8806 44.9739 24.4249 41.1224C11.528 42.169 4.45786 26.9651 2.04407 6.96709L2.04418 6.96719ZM14.4787 15.0146V32.2295L15.0119 32.4891L27.2688 38.4339L27.7575 38.6688L28.2431 38.4337L40.4997 32.4889L41.0365 32.2295V15.0146H38.9921V31.1463L27.7539 36.5936L16.5224 31.1463V15.0146H14.4785H14.4787ZM18.5835 15.033V29.8188L26.6261 33.8653V19.3848L18.5838 15.0329L18.5835 15.033ZM36.9279 15.033L28.6701 19.5037V33.9752L36.9279 29.8188V15.033Z" fill="white"/>
            </svg>
            <span className="text-xl font-bold tracking-[0.15em] text-white uppercase">EDUVERSE</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs">Transform Your Learning Journey</p>
          <p className="text-gray-600 text-xs pt-8">© 2025 EduLearn Pro. All rights reserved.</p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Courses</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            {["Programming", "Design", "Business", "Data Science"].map((item) => (
              <li key={item} className="hover:text-purple-400 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            {["About Us", "Careers", "Blog", "Contact"].map((item) => (
              <li key={item} className="hover:text-purple-400 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="max-w-7xl mx-auto flex justify-center md:justify-end gap-6 text-gray-500">
        <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
        <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
        <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
        <Linkedin className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
      </div>
    </footer>
  );
};

// --- FLUID GLASS BANNER COMPONENT ---
const FluidGlassBanner = () => {
  const bannerRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div 
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full rounded-[3rem] bg-gradient-to-r from-[#8b5cf6] via-[#4c1d95] to-[#8b5cf6] p-12 md:p-20 text-center relative overflow-hidden group isolate"
    >
      {/* 1. Background effects div (kept at z-0) */}
      <div className="absolute inset-0 z-0">
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        {/* Fluid Glass Cursor */}
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: opacity,
            background: `radial-gradient(600px circle at ${cursor.x}px ${cursor.y}px, rgba(255,255,255,0.15), transparent 40%)`
          }}
        />
        {/* Distortion Layer */}
        <div 
          className="absolute inset-0 transition-opacity duration-500 mix-blend-overlay"
          style={{
            opacity: opacity,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            maskImage: `radial-gradient(300px circle at ${cursor.x}px ${cursor.y}px, black, transparent)`
          }}
        />
      </div>

      {/* 2. Content div (given explicit z-10 to ensure it's on top) */}
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          Start Exploring
        </h2>
        <p className="text-blue-100 text-lg mb-10 font-medium drop-shadow-md">
          One Platform for all your Educational needs.
        </p>
        
        {/* This link will now be clickable */}
        <Link to="/signup">
          <button className="bg-white text-[#4c1d95] px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all active:scale-95">
            Sign-up NOW!
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Footer;
