import { Link } from 'react-router';
import SocialLinks from './SocialLinks';
export default function Footer({ homeOnly = false, visiblePaths }) {
  return <footer className="bv-footer" id="connect"><div><Link to="/" className="bv-footer-brand">The Bijuverse<span>独自の世界 / A universe of creativity</span></Link><p>Stories. Art. A little chakra.</p></div><div className="bv-footer-links">{[['/', 'Home'], ['/work', 'My Work'], ['/artwork', 'Artwork'], ['/about', 'About'], ['/contact', 'Contact']].filter(([path]) => visiblePaths ? visiblePaths.includes(path) : !homeOnly || path === '/').map(([path, label]) => <Link key={path} to={path}>{label}</Link>)}</div><div><p className="bv-eyebrow">Find me elsewhere</p><SocialLinks placement="footer" /></div><small>© {new Date().getFullYear()} The Bijuverse</small></footer>;
}
