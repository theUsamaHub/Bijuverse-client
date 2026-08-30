import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/Navbar.css';

// Swap Home / My Projects / Reviews / Contact for the client's real page
// list once it's confirmed — these are placeholders for "home, my projects, etc."
const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'My Work', href: '#projects' },
  { label: 'Projects', href: '#reviews' },
  { label: 'Contact me', href: '#contact' },
];

// Inline SVGs so the navbar has zero icon-library dependency beyond gsap.
// Swap hrefs for the client's real profiles.
const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M18.24 2h3.3l-7.2 8.23L23 22h-6.9l-5.4-7.06L4.5 22H1.2l7.7-8.8L1 2h7.06l4.88 6.45L18.24 2Zm-1.16 18h1.83L7.02 3.9H5.06L17.08 20Z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoRef = useRef(null);
  const underlineRefs = useRef({});
  const mobilePanelRef = useRef(null);
  const mobileLinkRefs = useRef([]);

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
  }, [theme]);

  // Idle logo shimmer — the one ambient animation on the bar, kept slow and quiet
  useEffect(() => {
    if (!logoRef.current) return;
    gsap.to(logoRef.current, {
      backgroundPosition: '300% 0%',
      duration: 6,
      repeat: -1,
      ease: 'linear',
    });
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

  // Mobile panel open/close + body scroll lock
  useEffect(() => {
    if (!mobilePanelRef.current) return;
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(mobilePanelRef.current, { pointerEvents: 'auto' });
      gsap.to(mobilePanelRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
      gsap.fromTo(
        mobileLinkRefs.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.1, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(mobilePanelRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => gsap.set(mobilePanelRef.current, { pointerEvents: 'none' }),
      });
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="bv-navbar" data-scrolled={scrolled}>
        <a href="#home" className="bv-logo" ref={logoRef}>
          The Bijuverse
        </a>

        <ul className="bv-links">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="bv-link"
                onMouseEnter={() => handleLinkEnter(link.label)}
                onMouseLeave={() => handleLinkLeave(link.label)}
              >
                {link.label}
                <span
                  className="bv-link-underline"
                  ref={(el) => (underlineRefs.current[link.label] = el)}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="bv-right">
          <div className="bv-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="bv-social-icon"
                aria-label={s.name}
              >
                {s.svg}
              </a>
            ))}
          </div>

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
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className="bv-mobile-panel" ref={mobilePanelRef}>
        {LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className="bv-link"
            ref={(el) => (mobileLinkRefs.current[i] = el)}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
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
          <div className="bv-socials">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="bv-social-icon" aria-label={s.name}>
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}