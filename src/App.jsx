import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import './styles/Work.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Work, { WorkPreview } from './pages/Work';
import ProjectDetail, { NotFound } from './pages/ProjectDetail';
gsap.registerPlugin(ScrollTrigger);
function Shell() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    const tick = time => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, [pathname]);
  return <><a className="bv-skip-link" href="#main">Skip to content</a><Navbar /><main id="main" key={pathname}><Routes><Route path="/" element={<><Hero /><WorkPreview /></>} /><Route path="/work" element={<Work />} /><Route path="/work/:slug" element={<ProjectDetail />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></>;
}
export default function App() { return <BrowserRouter><Shell /></BrowserRouter>; }
