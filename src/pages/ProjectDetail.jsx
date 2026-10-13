import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { artworks, projects, artworkMedia, getMedia, workItems } from '../data/portfolio';
import ProjectVisual from '../components/ProjectVisual';
import ItemReviews from '../components/ItemReviews';
import ErrorPage from './ErrorPage';

export function LegacyWorkDetail() {
  const { slug } = useParams();
  const item = workItems.find(entry => entry.slug === slug);
  return item ? <Navigate to={item.href} replace /> : <ErrorPage code="404" />;
}
export default function ProjectDetail({ type = 'project' }) {
  const { slug } = useParams();
  const [imageIndex, setImageIndex] = useState(-1);
  const item = (type === 'artwork' ? artworks : projects).find(entry => entry.slug === slug && entry.status === 'published');
  if (!item) return <ErrorPage code="404" />;
  const images = type === 'artwork' ? artworkMedia.filter(m => m.artwork_id === item.id).sort((a, b) => a.sort_order - b.sort_order).map(m => getMedia(m.media_id)).filter(Boolean) : [];
  return <article className="bv-page bv-detail"><title>{`${item.title} — The Bijuverse`}</title><Link className="bv-text-link" to={`/work?category=${type === 'artwork' ? 'Artwork' : 'Projects'}`}>← Back to My Work</Link>
    <header><p className="bv-eyebrow">{item.category} / {item.sample ? 'ORIGINAL SAMPLE' : 'PORTFOLIO'}</p><h1>{item.title}</h1><p>{item.description}</p></header>
    {images.length ? <><div className="bv-artwork-gallery">{images.map((image, i) => <button key={image.id} onClick={() => setImageIndex(i)} aria-label={`Enlarge image ${i + 1}: ${image.default_alt}`}><img src={image.url} alt={image.default_alt} /><span>View artwork ↗</span></button>)}</div><Lightbox open={imageIndex >= 0} close={() => setImageIndex(-1)} index={imageIndex} slides={images.map(m => ({ src: m.url, alt: m.default_alt, width: 1400, height: 800 }))} /></> : <><ProjectVisual project={workItems.find(entry => entry.id === item.id)} /><div className="bv-media-waiting"><span aria-hidden="true">▷</span><h2>A little anticipation.</h2><p>The final video is coming soon. Explore the other worlds while it takes shape.</p><Link className="bv-text-link" to="/work">Explore the collection ↗</Link></div></>}
    <ItemReviews key={item.id} type={type} itemId={item.id} title={item.title} />
  </article>;
}
