import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Hero.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Loader Particles ──────────────────────────────────────────────
   16 particles that burst outward from centre during the loading
   sequence. Pure CSS keyframes — no JS animation needed.
   ─────────────────────────────────────────────────────────────────── */
const LOADER_PARTICLE_COUNT = 16;

function LoaderParticles() {
  return (
    <div className="bv-loader-particles">
      {Array.from({ length: LOADER_PARTICLE_COUNT }, (_, i) => {
        const angle = (360 / LOADER_PARTICLE_COUNT) * i;
        const distance = 80 + Math.random() * 60;
        const size = 3 + Math.random() * 4;
        const delay = Math.random() * 0.2;
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

/* ─── Chakra Particles (hero background) ──────────────────────────── */
const PARTICLE_COUNT = 40;

function ChakraParticles() {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const size = 2 + Math.random() * 5;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 4 + Math.random() * 8;
    const delay = Math.random() * -12;
    const variant = Math.random();
    let cls = 'bv-particle';
    if (variant > 0.7) cls += ' bv-particle--orange';
    else if (variant > 0.5) cls += ' bv-particle--bright';

    return (
      <span
        key={i}
        className={cls}
        style={{
          width: size,
          height: size,
          left: `${left}%`,
          top: `${top}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });

  return <div className="bv-hero-particles">{particles}</div>;
}

/* ─── Scroll Down Indicator ───────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <div className="bv-hero-scroll">
      <span className="bv-hero-scroll-text">Scroll</span>
      <svg
        className="bv-hero-scroll-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  );
}

/* ─── Hero Component ────────────────────────────────────────────────
   Full-viewport hero with:
   1. Loading screen — chakra ring expands + particles burst (~1.5s)
   2. Hero entrance — staggered text reveal after loader fades
   3. ScrollTrigger — fade + parallax on scroll

   Loading sequence:
     0.0s  — loader ring expands from dot
     0.2s  — loader particles burst outward
     0.6s  — ring glow flash
     1.2s  — loader overlay fades out
     1.4s  — hero entrance timeline starts
   ─────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const ringRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const accentRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const loaderRef = useRef(null);

  /* ── Loading timer → reveal hero ──────────────────────────────── */
  useEffect(() => {
    // Block scroll during load
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 1500); // 1.5s loading duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  /* ── Entrance timeline (runs after loading completes) ─────────── */
  useEffect(() => {
    if (loading) return; // wait for loader to finish

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Hero content starts hidden, revealed by timeline
      gsap.set(contentRef.current, { opacity: 0 });

      // Content fades in
      tl.to(contentRef.current, { opacity: 1, duration: 0.3 }, 0);

      // Tag line slides up
      tl.fromTo(
        tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.1
      );

      // Title — split text: each character staggers up
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.bv-hero-char');
        tl.fromTo(
          chars,
          { y: 40, opacity: 0, rotateX: -40 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.04 },
          0.25
        );
      }

      // Accent gradient line draws in
      tl.fromTo(
        accentRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
        0.45
      );

      // Subtitle fades in
      tl.fromTo(
        subtitleRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.55
      );

      // CTA button scales in
      tl.fromTo(
        ctaRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45 },
        0.65
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.8
      );

      // Ring — starts visible from loader, stays visible
      gsap.set(ringRef.current, { scale: 1, opacity: 1 });
    }, heroRef);

    return () => ctx.revert();
  }, [loading]);

  /* ── ScrollTrigger: fade + parallax on scroll ─────────────────── */
  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          contentRef.current,
          { y: 0, opacity: 1 },
          {
            y: -80,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );

        gsap.fromTo(
          ringRef.current,
          { y: 0, opacity: 1 },
          {
            y: -120,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: '60% top',
              scrub: 0.3,
            },
          }
        );

        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: '10% top',
              end: '25% top',
              scrub: true,
            },
          }
        );
      }, heroRef);

      return () => ctx.revert();
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading]);

  /* ── Split title into individual characters ───────────────────── */
  const titleText = 'The Bijuverse';
  const splitTitle = titleText.split('').map((char, i) => (
    <span key={i} className="bv-hero-char">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section className="bv-hero" ref={heroRef} id="home">
      {/* ── Loading Screen ──────────────────────────────────────── */}
      {loading && (
        <div className="bv-hero-loader" ref={loaderRef}>
          <div className="bv-loader-ring">
            <div className="bv-loader-ring-glow" />
          </div>
          <LoaderParticles />
          <span className="bv-loader-text">The Bijuverse</span>
        </div>
      )}

      {/* ── Hero Content ────────────────────────────────────────── */}
      <ChakraParticles />

      <div className="bv-hero-ring" ref={ringRef}>
        <div className="bv-hero-ring-rotate">
          <div className="bv-hero-ring-inner" />
        </div>
      </div>

      <div className="bv-hero-content" ref={contentRef}>
        <span className="bv-hero-tag" ref={tagRef}>
          Creative Portfolio
        </span>

        <h1 className="bv-hero-title" ref={titleRef}>
          {splitTitle}
        </h1>

        <div className="bv-hero-accent" ref={accentRef} />

        <p className="bv-hero-subtitle" ref={subtitleRef}>
          Crafting digital experiences with anime-inspired energy.
          <br />
          Where creativity meets the chakra of design.
        </p>

        <a href="#projects" className="bv-hero-cta" ref={ctaRef}>
          <span>Explore My Work</span>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div ref={scrollIndicatorRef}>
        <ScrollIndicator />
      </div>
    </section>
  );
}
