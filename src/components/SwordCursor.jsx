import { useEffect, useRef } from 'react';
import '../styles/SwordCursor.css';

export default function SwordCursor() {
  const swordRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    const sword = swordRef.current;
    const trail = trailRef.current;
    let points = [];
    let frame = 0;

    const draw = now => {
      points = points.filter(point => now - point.time < 180);
      trail.setAttribute('points', points.map(point => `${point.x},${point.y}`).join(' '));
      frame = points.length ? requestAnimationFrame(draw) : 0;
    };
    const hide = () => {
      root.classList.remove('bv-sword-active');
      sword.style.opacity = '0';
      points = [];
      trail.setAttribute('points', '');
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const move = event => {
      if (!finePointer.matches || event.pointerType !== 'mouse' || event.target.closest('input, textarea, [contenteditable="true"], iframe')) {
        hide();
        return;
      }
      sword.style.transform = `translate3d(${event.clientX - 2}px, ${event.clientY - 2}px, 0)`;
      sword.style.opacity = '1';
      sword.classList.toggle('is-link', Boolean(event.target.closest('a, button, [role="button"]')));
      root.classList.add('bv-sword-active');
      if (!reducedMotion.matches) {
        points.push({ x: event.clientX, y: event.clientY, time: performance.now() });
        points = points.slice(-18);
        if (!frame) frame = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    document.addEventListener('visibilitychange', hide);
    finePointer.addEventListener('change', hide);
    reducedMotion.addEventListener('change', hide);
    return () => {
      hide();
      document.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      document.removeEventListener('visibilitychange', hide);
      finePointer.removeEventListener('change', hide);
      reducedMotion.removeEventListener('change', hide);
    };
  }, []);

  return <div className="bv-cursor-layer" aria-hidden="true">
    <svg className="bv-sword-trail"><polyline ref={trailRef} fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <svg ref={swordRef} className="bv-sword-cursor" viewBox="0 0 40 44" width="32" height="35">
      <path d="M2 2 12 6 28 26 23 30 6 12Z" fill="#e8edf2" stroke="#292b35" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="m2 2 23 26" stroke="#fff" strokeWidth="1.5" />
      <path d="m12 6 16 20-3 2L6 12Z" fill="#a5b3c6" opacity=".65" />
      <path d="m20 31 11-10 3 4-11 10Z" fill="#ffd60a" stroke="#5c340b" strokeWidth="1.4" />
      <path d="m28 31 8 8-4 3-8-9Z" fill="#27212c" stroke="#d79325" strokeWidth="1.4" />
      <path d="m28 34 4-2m-1 5 4-2" stroke="#efb637" strokeWidth="1.2" />
      <path d="m31 41 5-4 2 3-4 3Z" fill="#ffd60a" stroke="#5c340b" />
    </svg>
  </div>;
}
