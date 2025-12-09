import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const courses = [
  {
    title: "Web Development",
    desc: "Master modern web tech",
    weeks: "12 weeks",
    students: "2.5k students",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Data Science",
    desc: "Unlock insights with data",
    weeks: "16 weeks",
    students: "1.8k students",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Digital Marketing",
    desc: "Grow your brand with strategies",
    weeks: "8 weeks",
    students: "3.1k students",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "UX/UI Design",
    desc: "Create intuitive user experiences",
    weeks: "10 weeks",
    students: "4.2k students",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Mobile Development",
    desc: "Build iOS and Android apps",
    weeks: "14 weeks",
    students: "2.2k students",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
  },
];

const CourseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [hoverPos, setHoverPos] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Intersection Observer State
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 1. Setup Intersection Observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false); // Reset to false first to restart animation if needed
          setTimeout(() => setIsVisible(true), 50); // Small delay to trigger reflow
        }
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);


  // 2. Handle Section Mouse Move for Parallax
  const handleSectionMouseMove = (e) => {
    if (!sectionRef.current) return;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  // 3. Handle Card Tilt
  const handleCardMouseMove = (e) => {
    if (!isHovering) setIsHovering(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setHoverPos({ x, y });
  };

  const handleCardMouseLeave = () => {
    setIsHovering(false);
    setHoverPos({ x: 0.5, y: 0.5 });
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % courses.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  return (
    <section 
      id="courses" 
      ref={sectionRef}
      className="w-full bg-[#050505] py-24 overflow-hidden text-white relative group"
      onMouseMove={handleSectionMouseMove}
    >
      
      {/* Background Parallax Blobs (Always active) */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30"
        style={{
             transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)`,
             transition: "transform 0.1s ease-out"
        }}
      >
          <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main Content Wrapper with Entrance Animation */}
      <div 
         className={`transition-all duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"
         }`}
      >

        {/* Heading */}
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e9d5ff] via-[#a855f7] to-[#fae8ff]">
              Explore Our Course Categories
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Choose from a wide range of subjects designed to help you achieve your learning goals
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative flex h-[500px] w-full max-w-7xl mx-auto items-center justify-center perspective-1000">
          
          {/* Navigation Buttons */}
          <button onClick={prevSlide} className="absolute left-4 md:left-10 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all hover:scale-110 shadow-lg border border-white/5"><ChevronLeft className="w-6 h-6 text-white" /></button>
          <button onClick={nextSlide} className="absolute right-4 md:right-10 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all hover:scale-110 shadow-lg border border-white/5"><ChevronRight className="w-6 h-6 text-white" /></button>

          {/* Cards Track */}
          <div className="relative w-full h-full flex justify-center items-center [perspective:1000px] [transform-style:preserve-3d]">
            {courses.map((course, index) => {
              let offset = index - activeIndex;
              if (offset < -2) offset += courses.length;
              if (offset > 2) offset -= courses.length;
              
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // Base Transforms
              const translateX = offset * 60; 
              const translateZ = Math.abs(offset) * -250; 
              const rotateY = offset * -25;
              const scale = isActive ? 1 : 0.8;

              // Active Card Tilt Calculations
              const tiltX = isActive && isHovering ? (hoverPos.y - 0.5) * 20 : 0; 
              const tiltY = isActive && isHovering ? (hoverPos.x - 0.5) * -20 : 0; 

              return (
                <div
                  key={index}
                  className={`absolute w-[320px] md:w-[360px] h-[420px] rounded-3xl p-1 transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer ${
                     isActive ? "z-30" : "z-10 opacity-40 blur-[2px]"
                  }`}
                  style={{
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY + tiltY}deg) rotateX(${tiltX}deg) scale(${scale})`,
                    zIndex: 30 - Math.abs(offset)
                  }}
                  onClick={() => setActiveIndex(index)}
                  onMouseMove={isActive ? handleCardMouseMove : undefined}
                  onMouseLeave={isActive ? handleCardMouseLeave : undefined}
                >
                  {/* Active Card Glow Border Wrapper */}
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-[1px] relative overflow-hidden">
                     
                     {/* Dynamic Glow Gradient following mouse */}
                     {isActive && (
                       <div 
                         className="absolute inset-0 opacity-50 transition-opacity duration-300"
                         style={{
                           background: `radial-gradient(600px circle at ${hoverPos.x * 100}% ${hoverPos.y * 100}%, rgba(168, 85, 247, 0.4), transparent 40%)`
                         }}
                       />
                     )}

                     {/* Inner Card Body */}
                     <div className="w-full h-full rounded-3xl bg-[#0a0a0a] border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden">
                        
                        {/* Glossy Sheen Effect */}
                        {isActive && (
                          <div 
                            className="absolute inset-0 z-20 pointer-events-none opacity-40 mix-blend-soft-light"
                            style={{
                              background: `linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0.8) 45%, rgba(255, 255, 255, 0.0) 50%)`,
                              transform: `translateX(${(hoverPos.x - 0.5) * 100}%) translateY(${(hoverPos.y - 0.5) * 100}%) scale(1.5)`,
                              transition: 'transform 0.1s ease-out'
                            }}
                          />
                        )}

                        {/* Card Image Container */}
                        <div className="h-[50%] w-full rounded-2xl relative overflow-hidden shadow-lg shadow-purple-500/10 group-hover:shadow-purple-500/20 transition-shadow">
                           <img 
                             src={course.image} 
                             alt={course.title} 
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 mt-4 flex flex-col justify-between z-10 relative">
                          <div>
                            <h3 className="text-2xl font-bold mb-2 text-white">{course.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{course.desc}</p>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs font-medium text-gray-500 mt-3 pt-3 border-t border-white/10">
                            <div className="flex items-center gap-1"><span className="text-purple-400">⏱</span> {course.weeks}</div>
                            <div className="flex items-center gap-1"><span className="text-blue-400">👥</span> {course.students}</div>
                          </div>
                        </div>

                        {/* Button */}
                        <div className={`mt-4 overflow-hidden transition-all duration-500 ${isActive ? "max-h-20 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-4"}`}>
                          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-[1.02]">
                            View Details <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCarousel;
