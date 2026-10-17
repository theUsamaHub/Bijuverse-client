import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router';
import { FiGrid, FiBookOpen, FiImage, FiFilm, FiFolder, FiMessageSquare, FiMail, FiUser, FiLink, FiSearch, FiBarChart2, FiSettings, FiArrowUpRight, FiMenu, FiX, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { AdminProvider } from './AdminContext';
import { useAdmin, studioBase } from './adminStore';
import Dashboard from './Dashboard';
import { ContentList, ContentEditor, ChapterList } from './Content';
import { MediaLibrary, SocialEditor, ProfileEditor, SEOEditor, Settings, Analytics } from './Settings';
import { Reviews, Inbox } from './Messages';
import { adminPaths } from '../config/routes';
import './Admin.css';
const ChapterEditor = lazy(() => import('./ChapterEditor'));
const groups = [
  ['WORKSPACE', [['','Overview',FiGrid],['books','Books & chapters',FiBookOpen],['artworks','Artwork',FiImage],['projects','Projects',FiFilm],['media','Media library',FiFolder]]],
  ['COMMUNITY', [['comments','Comments',FiMessageSquare],['inbox','Inbox',FiMail]]],
  ['YOUR WEBSITE', [['profile','About you',FiUser],['socials','Social links',FiLink],['seo','Search & sharing',FiSearch],['analytics','Analytics',FiBarChart2],['settings','Account',FiSettings]]],
];
function StudioLayout() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('bv-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; } });
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('bv-theme', theme); } catch { /* Theme still works when storage is unavailable. */ } }, [theme]);
  const { data, notice, setNotice } = useAdmin();
  const pending = data.reviews.filter(r => r.status === 'pending').length;
  const unread = data.contacts.filter(r => r.status === 'new').length;
  useEffect(() => { document.body.classList.add('ad-body'); return () => document.body.classList.remove('ad-body'); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <div className="ad-app"><title>Creator studio — The Bijuverse</title><meta name="robots" content="noindex, nofollow" /><a className="bv-skip-link" href="#studio-main">Skip to studio content</a>
    {menu && <button className="ad-overlay" onClick={() => setMenu(false)} aria-label="Close navigation" />}
    <aside className={`ad-sidebar ${menu ? 'is-open' : ''}`}><Link to={studioBase} className="ad-brand" onClick={() => setMenu(false)}><span className="ad-brand-mark">B</span><span>The Bijuverse<small>CREATOR STUDIO</small></span></Link><button className="ad-mobile-close ad-icon-button" onClick={() => setMenu(false)} aria-label="Close navigation"><FiX /></button><nav aria-label="Studio navigation">{groups.map(([label, links]) => <div className="ad-nav-group" key={label}><p>{label}</p>{links.map(([path, text, Icon]) => <NavLink key={path} to={path ? `${studioBase}/${path}` : studioBase} end={!path} onClick={() => setMenu(false)}><Icon /><span>{text}</span>{path === 'comments' && pending > 0 && <b>{pending}</b>}{path === 'inbox' && unread > 0 && <b>{unread}</b>}</NavLink>)}</div>)}</nav><div className="ad-sidebar-bottom"><div className="ad-avatar">創</div><div><strong>Creator</strong><small>Single admin workspace</small></div><Link to={adminPaths.login} aria-label="Exit studio preview"><FiLogOut /></Link></div></aside>
    <div className="ad-workspace"><header className="ad-topbar"><div><button className="ad-menu-button ad-icon-button" aria-expanded={menu} aria-label="Open studio navigation" onClick={() => setMenu(!menu)}><FiMenu /></button><span className="ad-top-label">YOUR SPACE TO CREATE</span></div><div><span className="ad-preview-dot">Design preview</span><button className="ad-icon-button ad-theme-toggle" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setTheme(current => current === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}</button><Link to="/" target="_blank" rel="noreferrer" className="ad-site-link">View website <FiArrowUpRight /></Link></div></header>
      <div className="ad-preview-banner"><span>PREVIEW MODE</span> Try the tools with sample content. Changes stay here until you reload or exit; nothing is published or sent.</div>
      {notice && <div className="ad-notice" role="status">{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}><FiX /></button></div>}
      <main id="studio-main" className="ad-main"><Suspense fallback={<p className="ad-empty">Opening editor…</p>}><Routes>
        <Route index element={<Dashboard />} />
        {['books','artworks','projects'].map(kind => <Route key={kind} path={kind} element={<ContentList key={kind} kind={kind} />} />)}
        {['books','artworks','projects'].map(kind => <Route key={kind} path={`${kind}/:id`} element={<ContentEditor key={kind} kind={kind} />} />)}
        <Route path="books/:bookId/chapters" element={<ChapterList />} /><Route path="books/:bookId/chapters/:id" element={<ChapterEditor />} />
        <Route path="media" element={<MediaLibrary />} /><Route path="comments" element={<Reviews />} /><Route path="inbox" element={<Inbox />} /><Route path="profile" element={<ProfileEditor />} /><Route path="socials" element={<SocialEditor />} /><Route path="seo" element={<SEOEditor />} /><Route path="settings" element={<Settings />} /><Route path="analytics" element={<Analytics />} />
        <Route path="*" element={<div className="ad-empty"><h1>This studio page doesn’t exist.</h1><Link className="ad-button" to={studioBase}>Back to overview</Link></div>} />
      </Routes></Suspense></main><footer className="ad-footer"><span>THE BIJUVERSE / CREATOR STUDIO</span><span>A little imagination. An entire universe.</span></footer>
    </div></div>;
}
export default function AdminApp() { return <AdminProvider><StudioLayout /></AdminProvider>; }
