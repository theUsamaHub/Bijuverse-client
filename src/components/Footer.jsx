import { Link } from 'react-router';
import SocialLinks from './SocialLinks';
export default function Footer() {
  return <footer className="bv-footer"><div><Link to="/" className="bv-footer-brand">The Bijuverse<span>独自の世界 / A universe of creativity</span></Link><p>Stories. Art. A little chakra.</p></div><div className="bv-footer-links"><Link to="/">Home</Link><Link to="/work">My Work</Link></div><div><p className="bv-eyebrow">Find me elsewhere</p><SocialLinks /></div><small>© {new Date().getFullYear()} The Bijuverse</small></footer>;
}
