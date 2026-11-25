import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import SwordCursor from './components/SwordCursor';
import Work, { WorkPreview } from './pages/Work';
import Artwork, { ArtworkPreview } from './pages/Artwork';
import { AboutPreview, ContactInvitation } from './pages/About';
import './styles/Content.css';
import './styles/PublicPages.css';
import './App.css';
import './styles/Work.css';

// Client preview: the complete site is preserved but deliberately not imported.
// To restore all pages, replace this file with: export { default } from './FullSiteApp';
// import FullSiteApp from './FullSiteApp';
gsap.registerPlugin(ScrollTrigger);

function PageFrame() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <Navbar visiblePaths={['/', '/work', '/artwork']} />
      <main id="main" aria-busy={loading}><Routes>
        <Route path="/" element={<><Hero loading={loading} /><WorkPreview homeOnly showCollectionLink /><ArtworkPreview homeOnly showCollectionLink /><AboutPreview homeOnly /><div className="bv-page bv-home-contact"><ContactInvitation homeOnly /></div></>} />
        <Route path="/work" element={<Work previewOnly />} />
        <Route path="/artwork" element={<Artwork previewOnly />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes></main>
      <Footer visiblePaths={['/', '/work', '/artwork']} />
    </div>
  </>;
}

function PreviewShell() {
  const { pathname } = useLocation();
  return <PageFrame key={pathname} />;
}

export default function App() {
  return <BrowserRouter><PreviewShell /></BrowserRouter>;
}
