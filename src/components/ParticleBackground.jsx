import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  // Initialize the engine safely once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Don't render until initialized
  if (!init) return null;

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="tsparticles"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          particles: {
            color: { value: "#a855f7" },
            links: {
              color: "#a855f7",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: { enable: true, speed: 1 },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
