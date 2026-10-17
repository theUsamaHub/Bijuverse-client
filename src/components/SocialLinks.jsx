import { FaFacebookF, FaDiscord, FaInstagram, FaYoutube, FaTiktok, FaLinkedinIn, FaGithub, FaTwitch, FaRedditAlien, FaPinterestP, FaSnapchatGhost, FaTelegramPlane, FaWhatsapp, FaLink } from 'react-icons/fa';
import { FaXTwitter, FaThreads } from 'react-icons/fa6';
import { socialLinks, socialPlatforms } from '../data/portfolio';
const icons = { facebook: FaFacebookF, discord: FaDiscord, instagram: FaInstagram, youtube: FaYoutube, tiktok: FaTiktok, x: FaXTwitter, linkedin: FaLinkedinIn, github: FaGithub, twitch: FaTwitch, reddit: FaRedditAlien, pinterest: FaPinterestP, snapchat: FaSnapchatGhost, telegram: FaTelegramPlane, whatsapp: FaWhatsapp, threads: FaThreads };
export function SocialIcon({ platform, size = 20 }) { const Icon = icons[platform] || FaLink; return <Icon size={size} aria-hidden="true" />; }
export default function SocialLinks({ placement = 'navbar' }) {
  const links = socialLinks.filter(link => link.is_active && link[`show_in_${placement}`]).sort((a, b) => a.sort_order - b.sort_order);
  return <div className="bv-socials">{links.map(link => {
    const platform = socialPlatforms.find(p => p.id === link.platform_id);
    if (!platform?.is_active) return null;
    try { const url = new URL(link.url); if (url.protocol !== 'https:' || url.username || url.password) return null; } catch { return null; }
    const Icon = icons[platform.key] || FaLink;
    return <a key={link.id} className="bv-social-icon" href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label || platform.name}><Icon size={18} /></a>;
  })}</div>;
}
