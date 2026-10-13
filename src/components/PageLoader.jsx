import '../styles/PageLoader.css';

function particleRandom(index, seed) {
  const value = Math.sin((index + 1) * 127.1 + seed * 311.7) * 43758.5453;
  return value - Math.floor(value);
}
const LOADER_PARTICLE_COUNT = 16;

function LoaderParticles() {
  return (
    <div className="bv-loader-particles">
      {Array.from({ length: LOADER_PARTICLE_COUNT }, (_, i) => {
        const angle = (360 / LOADER_PARTICLE_COUNT) * i;
        const distance = 80 + particleRandom(i, 1) * 60;
        const size = 3 + particleRandom(i, 2) * 4;
        const delay = particleRandom(i, 3) * 0.2;
        const isOrange = i % 3 === 0;

        return (
          <span
            key={i}
            className={`bv-loader-particle ${isOrange ? 'bv-loader-particle--orange' : ''}`}
            style={{
              '--angle': `${angle}deg`,
              '--distance': `${distance}px`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function PageLoader() {
  return (
    <div className="bv-hero-loader" role="status" aria-label="Loading page">
      <div className="bv-loader-ring" aria-hidden="true">
        <div className="bv-loader-ring-glow" />
      </div>
      <div aria-hidden="true"><LoaderParticles /></div>
      <span className="bv-loader-text">The Bijuverse</span>
    </div>
  );
}
