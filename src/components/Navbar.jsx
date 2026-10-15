import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router';
import SocialLinks from './SocialLinks';
import '../styles/Navbar.css';

const LINKS = [{ label: 'Home', href: '/' }, { label: 'My Work', href: '/work' }, { label: 'Artwork', href: '/artwork' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
);

/* ─── Anime Menu Icons ──────────────────────────────────────────────
   Three interchangeable icon variants for the mobile menu button.
   Only Sharingan is active; Rasengan and Chidori are commented out
   below so they can be swapped in later if desired.

   To swap: replace <SharinganIcon /> with <RasenganIcon /> or
   <ChidoriIcon /> in the burger button JSX, and uncomment the
   corresponding CSS block in Navbar.css.
   ─────────────────────────────────────────────────────────────────── */

/**
 * SharinganIcon — three tomoe (Uchiha eye motif) arranged in a circle.
 * - Outer ring: the eye border
 * - 3 tomoe: comma-shaped marks at 120° intervals, GSAP-rotated on open
 * - Center dot: the pupil, glows gold on active state
 *
 * Active state: tomoe spin 360° via GSAP (see handleBurgerClick).
 * Idle state: subtle gold drop-shadow on the outer ring.
 */
const SharinganIcon = () => (
  <svg
    className="bv-sharingan"
    viewBox="0 0 40 40"
    width="28"
    height="28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer ring — eye border */}
    <circle
      cx="20"
      cy="20"
      r="17"
      stroke="var(--accent-gold)"
      strokeWidth="2"
      className="bv-sharingan-ring"
    />

    {/* Tomoe 1 — top (0°) */}
    <g className="bv-tomoe" data-index="0">
      <path
        d="M20 9c1.5 0 2.8 1.2 2.8 2.8 0 2-1.3 3.5-2.8 4.2-1.5-.7-2.8-2.2-2.8-4.2C17.2 10.2 18.5 9 20 9z"
        fill="var(--accent-gold)"
      />
      {/* Tomoe tail — small curved flick */}
      <path
        d="M22.8 11.8c1.2.3 2.2 1.2 2.2 2.5"
        stroke="var(--accent-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>

    {/* Tomoe 2 — bottom-right (120°) */}
    <g className="bv-tomoe" data-index="1" transform="rotate(120 20 20)">
      <path
        d="M20 9c1.5 0 2.8 1.2 2.8 2.8 0 2-1.3 3.5-2.8 4.2-1.5-.7-2.8-2.2-2.8-4.2C17.2 10.2 18.5 9 20 9z"
        fill="var(--accent-gold)"
      />
      <path
        d="M22.8 11.8c1.2.3 2.2 1.2 2.2 2.5"
        stroke="var(--accent-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>

    {/* Tomoe 3 — bottom-left (240°) */}
    <g className="bv-tomoe" data-index="2" transform="rotate(240 20 20)">
      <path
        d="M20 9c1.5 0 2.8 1.2 2.8 2.8 0 2-1.3 3.5-2.8 4.2-1.5-.7-2.8-2.2-2.8-4.2C17.2 10.2 18.5 9 20 9z"
        fill="var(--accent-gold)"
      />
      <path
        d="M22.8 11.8c1.2.3 2.2 1.2 2.2 2.5"
        stroke="var(--accent-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>

    {/* Center dot — pupil */}
    <circle cx="20" cy="20" r="2.5" fill="var(--accent-gold)" className="bv-sharingan-pupil" />
  </svg>
);

/* ─── RASENGAN ICON (inactive — Sharingan chosen) ────────────────
   Swirling energy orb with three concentric spiral arms.
   To activate: uncomment, swap <SharinganIcon /> with <RasenganIcon />
   in the burger button.
   ───────────────────────────────────────────────────────────────────
const RasenganIcon = () => (
  <svg className="bv-rasengan" viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="rasengan-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0.9" />
        <stop offset="70%" stopColor="var(--accent-orange)" stopOpacity="0.4" />
        <stop offset="100%" stopColor="var(--accent-orange)" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="20" cy="20" r="18" fill="url(#rasengan-glow)" opacity="0.3" />
    <path d="M20 6 A14 14 0 0 1 34 20" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" className="bv-rasengan-arm" />
    <path d="M34 20 A14 14 0 0 1 20 34" stroke="var(--accent-orange)" strokeWidth="2" strokeLinecap="round" className="bv-rasengan-arm" />
    <path d="M20 34 A14 14 0 0 1 6 20" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" className="bv-rasengan-arm" />
    <circle cx="20" cy="20" r="4" fill="var(--accent-gold)" opacity="0.8" />
  </svg>
);
─────────────────────────────────────────────────────────────────── */

/* ─── CHIDORI ICON (inactive — Sharingan chosen) ─────────────────
   Three jagged lightning bolt lines — one per burger bar.
   To activate: uncomment, swap <SharinganIcon /> with <ChidoriIcon />
   in the burger button.
   ───────────────────────────────────────────────────────────────────
const ChidoriIcon = () => (
  <svg className="bv-chidori" viewBox="0 0 28 28" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6 L10 6 L8 12 L14 12" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bv-chidori-bolt" />
    <path d="M4 14 L10 14 L8 20 L14 20" stroke="var(--accent-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bv-chidori-bolt" />
    <path d="M4 22 L10 22 L8 28 L14 28" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bv-chidori-bolt" />
  </svg>
);
─────────────────────────────────────────────────────────────────── */

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('bv-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; } });
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoRef = useRef(null);
  const underlineRefs = useRef({});
  const mobilePanelRef = useRef(null);
  const mobileLinkRefs = useRef([]);
  const tomoeRefs = useRef([]);
  const burgerRef = useRef(null);

  // Scroll state -> reveals the chakra hairline border (single, deliberate change)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Apply theme to <html> so the rest of the site can read the same tokens
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('bv-theme', theme); } catch { /* Storage can be unavailable. */ }
  }, [theme]);

  // Idle logo shimmer — the one ambient animation on the bar, kept slow and quiet
  useEffect(() => {
    if (!logoRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.to(logoRef.current, {
      backgroundPosition: '300% 0%',
      duration: 6,
      repeat: -1,
      ease: 'linear',
    });
    return () => tween.kill();
  }, []);

  // Collect tomoe refs from the Sharingan SVG for GSAP rotation
  useEffect(() => {
    if (!burgerRef.current) return;
    tomoeRefs.current = Array.from(burgerRef.current.querySelectorAll('.bv-tomoe'));
  }, []);

  const handleLinkEnter = (key) => {
    const el = underlineRefs.current[key];
    if (!el) return;
    gsap.to(el, { scaleX: 1, duration: 0.35, ease: 'power3.out' });
  };

  const handleLinkLeave = (key) => {
    const el = underlineRefs.current[key];
    if (!el) return;
    gsap.to(el, { scaleX: 0, duration: 0.3, ease: 'power2.in' });
  };

  // Mobile panel open/close + body scroll lock + Sharingan tomoe spin
  useEffect(() => {
    if (!mobilePanelRef.current) return;
    const ctx = gsap.context(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(mobilePanelRef.current, { pointerEvents: 'auto' });
      gsap.to(mobilePanelRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
      gsap.fromTo(
        mobileLinkRefs.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.1, ease: 'power2.out' }
      );
      // Sharingan: spin all tomoe 360° on open
      gsap.to(tomoeRefs.current, {
        rotation: '+=360',
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        transformOrigin: '20px 20px',
      });
    } else {
      document.body.style.overflow = '';
      gsap.to(mobilePanelRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => gsap.set(mobilePanelRef.current, { pointerEvents: 'none' }),
      });
      // Sharingan: reverse spin tomoe on close
      gsap.to(tomoeRefs.current, {
        rotation: '-=360',
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.in',
        transformOrigin: '20px 20px',
      });
    }
    });
    const handleKey = e => { if (e.key === 'Escape') { setMobileOpen(false); burgerRef.current?.focus(); } };
    const handleResize = () => { if (window.innerWidth > 1100) setMobileOpen(false); };
    document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);
    return () => { ctx.revert(); document.body.style.overflow = ''; document.removeEventListener('keydown', handleKey); window.removeEventListener('resize', handleResize); };
  }, [mobileOpen]);

  return (
    <>
      <nav className="bv-navbar bv-chakra-border" data-scrolled={scrolled}>
        <Link to="/" className="bv-logo" ref={logoRef} onClick={() => setMobileOpen(false)}>
          The Bijuverse
        </Link>

        <ul className="bv-links">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="bv-link"
                aria-current={(link.href === '/' ? pathname === '/' : link.href === '/work' ? ['/work', '/books', '/projects'].some(path => pathname.startsWith(path)) : pathname.startsWith(link.href)) ? "page" : undefined}
                onMouseEnter={() => handleLinkEnter(link.label)}
                onMouseLeave={() => handleLinkLeave(link.label)}
              >
                {link.label}
                <span
                  className="bv-link-underline"
                  ref={(el) => (underlineRefs.current[link.label] = el)}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="bv-right">
          <SocialLinks />

          <button
            type="button"
            className="bv-theme-toggle"
            aria-label="Toggle dark / light mode"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className="bv-burger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            ref={burgerRef}
          >
            <SharinganIcon />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className="bv-mobile-panel" ref={mobilePanelRef} inert={!mobileOpen} onKeyDown={e => { if (e.key === "Escape") { setMobileOpen(false); burgerRef.current?.focus(); } }}>
        {LINKS.map((link, i) => (
          <Link
            key={link.label}
            to={link.href}
            className="bv-link"
            ref={(el) => (mobileLinkRefs.current[i] = el)}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="bv-mobile-actions">
          <button
            type="button"
            className="bv-theme-toggle"
            aria-label="Toggle dark / light mode"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <SocialLinks />
        </div>
      </div>
    </>
  );
}