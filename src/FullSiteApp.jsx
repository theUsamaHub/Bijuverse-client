import { lazy, Suspense, useEffect, useState } from 'react';
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
import ProjectDetail, { LegacyWorkDetail } from './pages/ProjectDetail';
import { BookDetail, ChapterReader } from './pages/Books';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import ErrorBoundary from './components/ErrorBoundary';
import { adminPaths } from './config/routes';
import './styles/Content.css';
import './styles/Access.css';
import './styles/PublicPages.css';
import Artwork, { ArtworkPreview } from './pages/Artwork';
import About, { AboutPreview, ContactInvitation } from './pages/About';
import Contact from './pages/Contact';
import ArtworkDetail from './pages/ArtworkDetail';

gsap.registerPlugin(ScrollTrigger);
const AdminApp = lazy(() => import('./admin/AdminApp'));

function PageFrame() {
  const { pathname } = useLocation();
  const isAccess = pathname === adminPaths.login || pathname === adminPaths.recovery;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.toggle('bv-access-body', isAccess);
    try { document.documentElement.dataset.theme = localStorage.getItem('bv-theme') === 'light' ? 'light' : 'dark'; } catch { /* Storage may be disabled. */ }
    document.documentElement.setAttribute('data-page-loading', '');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(() => {
      document.documentElement.removeAttribute('data-page-loading');
      setLoading(false);
    }, reducedMotion ? 150 : 1700);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('bv-access-body');
      document.documentElement.removeAttribute('data-page-loading');
    };
  }, [isAccess]);

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
        {!isAccess && <Navbar />}
        <main id="main" aria-busy={loading}>
          <ErrorBoundary><Routes>
            <Route path="/" element={<><Hero loading={loading} /><WorkPreview /><ArtworkPreview /><AboutPreview /><div className="bv-page bv-home-contact"><ContactInvitation /></div></>} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<LegacyWorkDetail />} />
            <Route path="/books/:bookSlug" element={<BookDetail />} />
            <Route path="/books/:bookSlug/chapters/:chapterSlug" element={<ChapterReader />} />
            <Route path="/artwork" element={<Artwork />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/artwork/:slug" element={<ArtworkDetail />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path={adminPaths.login} element={<Login />} />
            <Route path={adminPaths.recovery} element={<Login recovery />} />
            {['403', '404', '500', '503'].map(code => <Route key={code} path={`/preview/errors/${code}`} element={<ErrorPage code={code} />} />)}
            <Route path="*" element={<ErrorPage code="404" />} />
          </Routes></ErrorBoundary>
        </main>
        {!isAccess && <Footer />}
      </div>
    </>
  );
}

function Shell() {
  const { pathname } = useLocation();
  if (pathname === '/studio' || pathname.startsWith('/studio/')) return <Suspense fallback={<PageLoader />}><Routes><Route path="/studio/*" element={<AdminApp />} /></Routes></Suspense>;
  // New pages replay the loader; filtering within My Work does not.
  return <PageFrame key={pathname} />;
}

export default function App() {
  return <BrowserRouter><Shell /></BrowserRouter>;
}
