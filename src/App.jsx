import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import './styles/Work.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import Work, { WorkPreview } from './pages/Work';
import ProjectDetail, { NotFound } from './pages/ProjectDetail';

gsap.registerPlugin(ScrollTrigger);

function PageFrame() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.setAttribute('data-page-loading', '');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(() => {
      document.documentElement.removeAttribute('data-page-loading');
      setLoading(false);
    }, reducedMotion ? 150 : 1700);
    return () => {
      clearTimeout(timer);
      document.documentElement.removeAttribute('data-page-loading');
    };
  }, []);

  useEffect(() => {
    if (loading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    const tick = time => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    ScrollTrigger.refresh();
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading && <PageLoader />}
      <div inert={loading}>
        <a className="bv-skip-link" href="#main">Skip to content</a>
        <Navbar />
        <main id="main" aria-busy={loading}>
          <Routes>
            <Route path="/" element={<><Hero loading={loading} /><WorkPreview /></>} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function Shell() {
  const { pathname } = useLocation();
  // New pages replay the loader; filtering within My Work does not.
  return <PageFrame key={pathname} />;
}

export default function App() {
  return <BrowserRouter><Shell /></BrowserRouter>;
}
