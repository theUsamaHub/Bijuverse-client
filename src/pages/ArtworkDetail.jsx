import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { FiArrowLeft, FiArrowRight, FiMaximize2 } from 'react-icons/fi';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { artworks, artworkMedia, getMedia } from '../data/portfolio';
import ItemReviews from '../components/ItemReviews';
import { ArtworkCard } from './Artwork';
import ErrorPage from './ErrorPage';

export default function ArtworkDetail() {
  const { slug } = useParams();
  const item = artworks.find(art => art.slug === slug && art.status === 'published');
  return item ? <ArtworkViewer key={item.id} item={item} /> : <ErrorPage code="404" />;
}

function ArtworkViewer({ item }) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const images = artworkMedia.filter(media => media.artwork_id === item.id)
    .sort((a, b) => a.sort_order - b.sort_order).map(media => getMedia(media.media_id)).filter(Boolean);
  const image = images[selected];
  const related = artworks.filter(art => art.status === 'published' && art.id !== item.id)
    .sort((a, b) => Number(b.category === item.category) - Number(a.category === item.category) || a.sort_order - b.sort_order).slice(0, 3);

  return <article className="bv-page bv-art-detail">
    <title>{`${item.title} — Artwork — The Bijuverse`}</title>
    <nav className="bv-art-breadcrumb" aria-label="Breadcrumb"><Link to="/artwork"><FiArrowLeft aria-hidden="true" /> Artwork gallery</Link><span aria-hidden="true">/</span><span aria-current="page">{item.title}</span></nav>
    <div className="bv-art-presentation">
      <section className="bv-art-viewer" aria-label={`Images in ${item.title}`}>
        <div className="bv-art-frame">
          {image ? <button className="bv-art-enlarge" onClick={() => setExpanded(true)} aria-label={`Enlarge ${item.title}, image ${selected + 1}`}><img src={image.url} alt={image.default_alt} /><span><FiMaximize2 aria-hidden="true" /> Full view</span></button> : <p>Images for this artwork are coming soon.</p>}
        </div>
        {image && <><div className="bv-art-image-caption" aria-live="polite"><span>{String(selected + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span><p>{image.default_alt}</p></div>
          {images.length > 1 && <div className="bv-art-thumbnails" aria-label="Choose an image in this artwork">{images.map((media, index) => <button key={media.id} aria-pressed={selected === index} aria-label={`Show image ${index + 1}: ${media.default_alt}`} onClick={() => setSelected(index)}><img src={media.url} alt="" /><span>{String(index + 1).padStart(2, '0')}</span></button>)}</div>}
          <Lightbox open={expanded} close={() => setExpanded(false)} index={selected} on={{ view: ({ index }) => setSelected(index) }} slides={images.map(media => ({ src: media.url, alt: media.default_alt }))} carousel={{ finite: images.length === 1 }} />
        </>}
      </section>
      <header className="bv-art-information"><p className="bv-eyebrow">THE ART COLLECTION / {item.category}</p><h1>{item.title}</h1><div className="bv-art-title-rule" /><p className="bv-art-description">{item.description}</p><dl><div><dt>Collection</dt><dd>{item.category}</dd></div><div><dt>Inside this artwork</dt><dd>{images.length} {images.length === 1 ? 'image' : 'images'}</dd></div></dl>{item.sample && <p className="bv-art-sample">Original sample illustration · preview collection</p>}<a className="bv-text-link" href="#artwork-comments">Leave a comment <FiArrowRight aria-hidden="true" /></a><Link className="bv-art-gallery-link" to="/artwork">Browse all artwork</Link></header>
    </div>
    {related.length > 0 && <section className="bv-related-art" aria-labelledby="related-art-title"><div className="bv-section-heading"><div><p className="bv-eyebrow">KEEP EXPLORING</p><h2 id="related-art-title">More artwork<span>.</span></h2></div><Link className="bv-text-link" to="/artwork">View gallery <FiArrowRight aria-hidden="true" /></Link></div><div className="bv-related-art-grid">{related.map(art => <ArtworkCard key={art.id} item={art} />)}</div></section>}
    <div id="artwork-comments"><ItemReviews type="artwork" itemId={item.id} title={item.title} /></div>
  </article>;
}
