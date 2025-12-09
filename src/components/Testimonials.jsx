import React from "react";

const testimonials = [
  {
    name: "Deepam Makwana",
    handle: "@makwanadeepam",
    text: "Really impressed by https://reactbits.dev. Check it out. The Splash Cursor effect is amazing.",
    img: "https://i.pravatar.cc/150?u=deepam"
  },
  {
    name: "Dmg",
    handle: "@syskey_dmg",
    text: "Just discovered http://reactbits.dev — a sleek, minimal, and super dev-friendly React component library.",
    img: "https://i.pravatar.cc/150?u=dmg"
  },
  {
    name: "shadcn",
    handle: "@shadcn",
    text: "Everything about this is next level: the components, the registry, dynamic items.",
    img: "https://i.pravatar.cc/150?u=shadcn"
  },
  {
    name: "Greg Bergé",
    handle: "@gregberge_",
    text: "React Bits: A stellar collection of React components to make your landing pages shine ✨",
    img: "https://i.pravatar.cc/150?u=greg"
  },
  {
    name: "LoG",
    handle: "@Logreg_n_coffee",
    text: "Literally the coolest react library in react -",
    img: "https://i.pravatar.cc/150?u=log"
  },
  {
    name: "DIY Devs",
    handle: "@DIYDevs",
    text: "Have you heard of react bits? David Haz has lovingly put together a collection of animated and fully customizable React components.",
    img: "https://i.pravatar.cc/150?u=diy"
  },
  {
    name: "Gibson Murray",
    handle: "@GibsonSMurray",
    text: "React Bits has got to be the most artistic ui component lib I have seen in a while 👌",
    img: "https://i.pravatar.cc/150?u=gibson"
  },
  {
    name: "Rohan",
    handle: "@irohandev",
    text: "Was scrolling X, I saw a post regarding UI library and got to know about React Bits and its just wow, the components are incredibly well designed!",
    img: "https://i.pravatar.cc/150?u=rohan"
  },
  {
    name: "Ali Shahzad",
    handle: "@Alishahzad2000M",
    text: "Today, I explored React Bit Animation, a lightweight library to add beautiful animations to your React apps!",
    img: "https://i.pravatar.cc/150?u=ali"
  }
];

// Split testimonials into three rows
const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);
const row3 = testimonials.slice(6, 9);

const Card = ({ name, handle, text, img }) => (
  <div className="w-[350px] md:w-[450px] h-full p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between shrink-0">
    <p className="text-gray-400 text-sm leading-relaxed mb-8">{text}</p>
    <div className="flex items-center gap-3">
      <img src={img} alt={name} className="w-10 h-10 rounded-full bg-gray-800 object-cover" />
      <div>
        <h4 className="text-white font-medium text-sm">{handle}</h4>
      </div>
    </div>
  </div>
);

const MarqueeRow = ({ testimonials, direction = 'left' }) => {
  return (
    <div className="relative w-full overflow-hidden group">
      {/* Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
      
      {/* Animated Container */}
      <div 
        className={`flex gap-6 w-max group-hover:[animation-play-state:paused]`}
        style={{
          animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} 40s linear infinite`
        }}
      >
        {/* Render items 4 times to ensure smooth loop on wide screens */}
        {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
          <Card key={i} {...t} />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="w-full bg-[#050505] py-24">
      
      {/* Embedded Styles for Animation */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Heading */}
      <div className="text-center mb-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d8b4fe]">What Our Students Say</span> 
        </h2>
        <p className="text-gray-400">Real Success Stories from our Community.</p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex flex-col gap-6">
        {/* Row 1: Scrolls Right */}
        <MarqueeRow testimonials={row1} direction="right" />
        
        {/* Row 2: Scrolls Left */}
        <MarqueeRow testimonials={row2} direction="left" />
        
        {/* Row 3: Scrolls Right */}
        <MarqueeRow testimonials={row3} direction="right" />
      </div>

    </section>
  );
};

export default Testimonials;
