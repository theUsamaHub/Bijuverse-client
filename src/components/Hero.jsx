import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Hero.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Loader Particles ──────────────────────────────────────────────
   16 particles that burst outward from centre during the loading
   sequence. Pure CSS keyframes — no JS animation needed.
   ─────────────────────────────────────────────────────────────────── */
function particleRandom(index, seed) {
  const value = Math.sin((index + 1) * 127.1 + seed * 311.7) * 43758.5453;
  return value - Math.floor(value);
}
/* ─── Chakra Particles (hero background) ──────────────────────────── */
const PARTICLE_COUNT = 40;

function ChakraParticles() {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const size = 2 + particleRandom(i, 4) * 5;
    const left = particleRandom(i, 5) * 100;
    const top = particleRandom(i, 6) * 100;
    const duration = 4 + particleRandom(i, 7) * 8;
    const delay = particleRandom(i, 8) * -12;
    const variant = particleRandom(i, 9);
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

/* Hero entrance waits for the shared page loader. */
export default function Hero({ loading = false, homeOnly = false }) {
  const Cta = homeOnly ? 'a' : Link;
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const ringRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const accentRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  /* ── Entrance timeline (runs after loading completes) ─────────── */
  useEffect(() => {
    if (loading) return; // wait for loader to finish
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

      // Ring — starts visible from loader, stays visible
      gsap.set(ringRef.current, { scale: 1, opacity: 1 });
    }, heroRef);

    return () => ctx.revert();
  }, [loading]);

  /* ── ScrollTrigger: fade + parallax on scroll ─────────────────── */
  useEffect(() => {
    if (loading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
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
      }, heroRef);

    }, 1000);

    return () => { clearTimeout(timer); ctx?.revert(); };
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

        <Cta {...(homeOnly ? { href: '#work-preview' } : { to: '/work' })} className="bv-hero-cta" ref={ctaRef}>
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
        </Cta>
      </div>
    </section>
  );
}
