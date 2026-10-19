import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import SwordCursor from './components/SwordCursor';
import { WorkPreview } from './pages/Work';
import { ArtworkPreview } from './pages/Artwork';
import { AboutPreview, ContactInvitation } from './pages/About';
import './styles/Content.css';
import './styles/PublicPages.css';
import './App.css';
import './styles/Work.css';

// Client preview: the complete site is preserved but deliberately not imported.
// To restore all pages, replace this file with: export { default } from './FullSiteApp';
// import FullSiteApp from './FullSiteApp';
gsap.registerPlugin(ScrollTrigger);

function HomePreview() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.documentElement.setAttribute('data-page-loading', '');
    const timer = setTimeout(() => {
      document.documentElement.removeAttribute('data-page-loading');
      setLoading(false);
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 150 : 1700);
    return () => {
      clearTimeout(timer);
      document.documentElement.removeAttribute('data-page-loading');
    };
  }, []);

  useEffect(() => {
    if (loading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, anchors: true });
    const tick = time => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    ScrollTrigger.refresh();
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, [loading]);

  return <>
    {loading && <PageLoader />}
    <SwordCursor />
    <div inert={loading}>
      <a className="bv-skip-link" href="#main">Skip to content</a>
      <Navbar homeOnly />
      <main id="main" aria-busy={loading}><Hero loading={loading} homeOnly /><WorkPreview homeOnly /><ArtworkPreview homeOnly /><AboutPreview homeOnly /><div className="bv-page bv-home-contact"><ContactInvitation homeOnly /></div></main>
      <Footer homeOnly />
    </div>
  </>;
}

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<HomePreview />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter>;
}
