import React, { useState, useEffect } from "react";
import { MonitorPlay } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");

  // 1. Update hrefs to match section IDs
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Courses", href: "#courses" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },

  ];

  // 2. Smooth Scroll Handler
  const handleScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      // Scroll to element
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for fixed navbar height
        behavior: "smooth",
      });
      // Update active state
      setActiveLink(navLinks.find(link => link.href === href).name);
    }
  };

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#050505]/90 px-12 py-5 font-sans backdrop-blur-md border-b border-white/5">
      
      {/* Left: Logo + Text */}
      <div 
        className="flex items-center gap-4 cursor-pointer select-none group"
        onClick={(e) => handleScroll(e, "#home")} // Clicking logo goes home
      >
        <svg
          width="56"
          height="50"
          viewBox="0 0 56 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <path d="M11.4912 1.76074C19.2787 4.8291 25.6382 10.1706 28.1709 16.9707C30.7035 10.1706 36.8064 4.8291 44.5804 1.76074H40.6259C34.7413 3.26621 30.8003 6.2002 28.8954 10.7451C29.1402 5.65977 30.8942 3.09473 33.2978 1.76074H22.2134C24.6174 3.09473 26.3744 5.65977 26.619 10.7451C24.7142 6.2002 20.7733 3.26621 14.8885 1.76074H11.4912ZM53.8158 2.1667C51.9948 24.4739 44.8609 42.2514 30.9499 41.1225C35.4941 44.9738 40.1133 47.2147 44.3311 48.1752L53.8161 48.175V44.9555C50.8298 46.2951 48.0307 46.3759 39.4947 43.6432C47.0008 43.7031 50.5462 42.2398 53.816 38.5986V34.1003C51.5442 37.3145 47.3635 40.0003 39.4948 41.4673C46.5725 38.0545 51.2619 32.6896 53.8161 23.8067V2.1668L53.8158 2.1667ZM2.04418 6.96719V24.9482C4.6648 33.153 9.24761 38.2033 16.0168 41.4673C8.53012 40.0716 4.38513 37.5718 2.04418 34.5642V38.9709C5.22185 42.3385 8.77326 43.7011 16.0168 43.6432C7.81043 46.2704 4.90904 46.2972 2.04418 45.1051V48.1751H11.0436C15.2613 47.2147 19.8806 44.9739 24.4249 41.1224C11.528 42.169 4.45786 26.9651 2.04407 6.96709L2.04418 6.96719ZM14.4787 15.0146V32.2295L15.0119 32.4891L27.2688 38.4339L27.7575 38.6688L28.2431 38.4337L40.4997 32.4889L41.0365 32.2295V15.0146H38.9921V31.1463L27.7539 36.5936L16.5224 31.1463V15.0146H14.4785H14.4787ZM18.5835 15.033V29.8188L26.6261 33.8653V19.3848L18.5838 15.0329L18.5835 15.033ZM36.9279 15.033L28.6701 19.5037V33.9752L36.9279 29.8188V15.033Z" fill="white"/>
        </svg>
        <span 
          className="text-xl font-bold tracking-[0.15em] uppercase" 
          style={{
            background: "linear-gradient(to right, #FFFFFF, #A0A0A0, #FFFFFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          EDUVERSE
        </span>
      </div>

      {/* Center: Pill Menu */}
      <div className="hidden lg:flex items-center rounded-full border border-white/10 bg-white/5 px-1 py-1.5 backdrop-blur-md">
        <ul className="flex items-center px-6 gap-8">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                  activeLink === link.name 
                    ? "text-white" 
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-white transition-all duration-300 ${
                    activeLink === link.name ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                ></span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Sign Up Button */}
      <div>
        <Link to="/signup">
          <button className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8A3FFC] to-[#4F46E5] px-8 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(138,63,252,0.5)] active:scale-95">
            <MonitorPlay className="h-4 w-4 fill-current" />
            <span>Sign Up</span>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
