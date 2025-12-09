import { useState, useEffect, useRef } from "react";

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false); // Ensure it runs only once

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true; // Mark as done
          
          let start = 0;
          const totalFrames = Math.round(duration / 16); // 60fps
          const increment = end / totalFrames;

          let currentFrame = 0;
          const timer = setInterval(() => {
            currentFrame++;
            start += increment;
            
            if (currentFrame >= totalFrames) {
              clearInterval(timer);
              setCount(end); // Ensure it lands exactly on the number
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default CountUp;
