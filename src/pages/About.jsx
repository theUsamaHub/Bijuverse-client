import { Link } from 'react-router';
import { FiBookOpen, FiFeather, FiFilm } from 'react-icons/fi';
import { creatorProfile as profile } from '../data/profile';
import SocialLinks from '../components/SocialLinks';

function CreatorPortrait() {
  return <div className="bv-creator-portrait" aria-label="Decorative creator emblem; portrait not yet supplied"><div className="bv-portrait-orbit" /><span aria-hidden="true">創</span><p>THE CREATOR’S CORNER</p><small>Personal portrait coming soon</small></div>;
}
export function AboutPreview({ homeOnly = false }) {
  return <section className="bv-page bv-about-preview"><CreatorPortrait /><div><p className="bv-eyebrow">03 / BEHIND THE UNIVERSE</p><h2>{profile.headline}</h2><p>{profile.introduction}</p>{!homeOnly && <Link className="bv-text-link" to="/about">Meet the creator ↗</Link>}</div></section>;
}
export default function About() {
  return <div className="bv-page"><title>About — The Bijuverse</title><header className="bv-work-header"><p className="bv-eyebrow">THE BIJUVERSE / ABOUT</p><h1>Behind every world,<br /><span>there’s a creator.</span></h1><p>A closer look at the imagination behind the work.</p></header>
    <div className="bv-about-layout"><CreatorPortrait /><section className="bv-about-copy"><p className="bv-eyebrow">{profile.display_name}</p><h2>{profile.headline}</h2>{profile.sample && <p className="bv-demo-label">Sample introduction · personal biography to follow</p>}{profile.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<div className="bv-interest-tags">{profile.interests.map(interest => <span key={interest}>{interest}</span>)}</div><SocialLinks placement="social_section" /></section></div>
    <section className="bv-creative-practice"><p className="bv-eyebrow">WAYS TO EXPLORE</p><h2>One imagination. Different forms.</h2><div className="bv-practice-grid">{[{icon:FiBookOpen,title:'Between the lines',text:'Follow a story, chapter by chapter.',url:'/work?category=Books',label:'Explore stories'}, {icon:FiFeather,title:'Beyond the frame',text:'Take a closer look at the visual collection.',url:'/artwork',label:'View artwork'}, {icon:FiFilm,title:'Into motion',text:'Discover projects and moving images.',url:'/work?category=Projects',label:'Explore projects'}].map(({icon:Icon,...item}) => <Link key={item.title} to={item.url}><Icon size={24} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p><span>{item.label} ↗</span></Link>)}</div></section><ContactInvitation />
  </div>;
}
export function ContactInvitation({ homeOnly = false }) {
  return <section className="bv-contact-invitation"><div><p className="bv-eyebrow">A NEW CONVERSATION</p><h2>Have something in mind?</h2><p>An idea, a question, or just a hello. Start here.</p></div>{homeOnly ? <a className="bv-button" href="#connect">Find me on socials ↗</a> : <Link className="bv-button" to="/contact">Get in touch ↗</Link>}</section>;
}
