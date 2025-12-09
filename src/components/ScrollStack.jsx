import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    title: "Web Development",
    desc: "Master modern web tech",
    weeks: "12 weeks",
    students: "2.5k students",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Data Science",
    desc: "Unlock insights with data",
    weeks: "16 weeks",
    students: "1.8k students",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Digital Marketing",
    desc: "Grow your brand with cutting-edge marketing strategies",
    weeks: "8 weeks",
    students: "3.1k students",
    color: "from-orange-400 to-red-500",
  },
  {
    title: "UX/UI Design",
    desc: "Create intuitive user experiences",
    weeks: "10 weeks",
    students: "4.2k students",
    color: "from-emerald-400 to-teal-500",
  },
];

const ScrollStack = () => {
  return (
    <section className="w-full bg-[#050505] py-20 px-4">
      
      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e9d5ff] via-[#a855f7] to-[#fae8ff]">
            Explore Our Course Categories
          </span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          Scroll down to see our featured programs
        </p>
      </div>

      {/* Stack Container */}
      <div className="w-full max-w-2xl mx-auto space-y-20 pb-40">
        {courses.map((course, index) => (
          <Card key={index} course={course} index={index} total={courses.length} />
        ))}
      </div>

    </section>
  );
};

const Card = ({ course, index, total }) => {
  // Calculate reverse index for stacking order (last card on top if needed, but here sticky handles it)
  // Sticky top offset calculation: e.g., 100px, 120px, 140px...
  const topOffset = 100 + index * 15; 
  
  // Scale calculation (simulated depth)
  const scale = 1 - (index * 0.05);

  return (
    <div 
      className="sticky transition-all duration-500 ease-out"
      style={{ 
        top: `${topOffset}px`,
        zIndex: index + 1,
      }}
    >
      <div 
        className="relative w-full h-[400px] rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:-translate-y-2 transition-transform"
        style={{
            boxShadow: `0px -10px 30px rgba(0,0,0,0.5)`, // Shadow on top to separate cards
        }}
      >
        {/* Gradient Header */}
        <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${course.color} opacity-20`}></div>
        
        {/* Content */}
        <div className="relative z-10 mt-8">
          <h3 className="text-3xl font-bold text-white mb-2">{course.title}</h3>
          <p className="text-gray-400 text-lg">{course.desc}</p>
        </div>

        <div className="relative z-10 flex items-end justify-between">
           <div className="flex gap-4 text-sm text-gray-500 font-mono">
              <span>⏱ {course.weeks}</span>
              <span>👥 {course.students}</span>
           </div>

           <button className="px-6 py-3 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
             Learn More <ArrowRight className="w-4 h-4" />
           </button>
        </div>

      </div>
    </div>
  );
};

export default ScrollStack;
