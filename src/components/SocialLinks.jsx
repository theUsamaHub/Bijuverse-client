import { FaFacebookF, FaDiscord } from 'react-icons/fa';
import { socials } from '../data/portfolio';
const icons = { Facebook: FaFacebookF, Discord: FaDiscord };
export default function SocialLinks() {
  return <div className="bv-socials">{socials.map(({ name, url }) => {
    const Icon = icons[name];
    return url ? <a key={name} className="bv-social-icon" href={url} target="_blank" rel="noopener noreferrer" aria-label={name}><Icon size={18} /></a> : <span key={name} className="bv-social-pending" title={`${name} link coming soon`}><Icon size={18} /><span className="bv-sr-only">{name} — coming soon</span></span>;
  })}</div>;
}
