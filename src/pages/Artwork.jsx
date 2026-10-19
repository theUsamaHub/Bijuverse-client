import { Link, useSearchParams } from 'react-router';
import { artworks, artworkMedia, getMedia } from '../data/portfolio';
const published = artworks.filter(item => item.status === 'published').sort((a, b) => a.sort_order - b.sort_order);
export function ArtworkCard({ item, homeOnly = false }) {
  const Card = homeOnly ? 'article' : Link;
  const image = getMedia(artworkMedia.filter(m => m.artwork_id === item.id).sort((a, b) => a.sort_order - b.sort_order)[0]?.media_id);
  return <Card className="bv-gallery-card" {...(homeOnly ? {} : { to: `/artwork/${item.slug}` })}>
    <div className="bv-gallery-image">{image ? <img src={image.url} alt={image.default_alt} loading="lazy" /> : <span>Artwork coming soon</span>}{!homeOnly && <span className="bv-gallery-arrow" aria-hidden="true">↗</span>}</div>
    <div className="bv-gallery-caption"><div><p className="bv-eyebrow">{item.category}{item.sample ? ' / SAMPLE' : ''}</p><h3>{item.title}</h3></div>{!homeOnly && <span>VIEW ARTWORK</span>}</div>
    <p>{item.description}</p>
  </Card>;
}
export function ArtworkPreview({ homeOnly = false }) {
  return <section className="bv-page bv-home-art" aria-labelledby="home-art-title"><div className="bv-section-heading"><div><p className="bv-eyebrow">02 / THE VISUAL WORLD</p><h2 id="home-art-title">A world beyond words<span>.</span></h2></div>{!homeOnly && <Link className="bv-text-link" to="/artwork">Enter the gallery ↗</Link>}</div><div className="bv-gallery-grid">{published.slice(0, 2).map(item => <ArtworkCard key={item.id} item={item} homeOnly={homeOnly} />)}</div></section>;
}
export default function Artwork() {
  const [params, setParams] = useSearchParams();
  const categories = ['All artwork', ...new Set(published.map(item => item.category))];
  const active = categories.includes(params.get('category')) ? params.get('category') : 'All artwork';
  const query = params.get('q') || '';
  const filtered = published.filter(item => (active === 'All artwork' || item.category === active) && `${item.title} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  const update = (key, value) => { const next = new URLSearchParams(params); if (value) next.set(key, value); else next.delete(key); setParams(next, { replace: key === 'q' }); };
  return <div className="bv-page"><title>Artwork — The Bijuverse</title><header className="bv-work-header"><p className="bv-eyebrow">THE BIJUVERSE / GALLERY</p><h1>Some worlds<br /><span>need no words.</span></h1><p>Illustrations, landscapes, and small moments of imagination.<br />Step closer. There’s more in every frame.</p><span className="bv-header-seal" aria-hidden="true">画</span></header>
    <div className="bv-work-toolbar"><div className="bv-filters" aria-label="Artwork categories">{categories.map(category => <button key={category} aria-pressed={category === active} onClick={() => update('category', category === 'All artwork' ? '' : category)}>{category}</button>)}</div><label className="bv-search"><span className="bv-sr-only">Search artwork</span><input type="search" placeholder="Find an artwork…" value={query} onChange={e => update('q', e.target.value)} /></label></div>
    <p className="bv-results" role="status">{filtered.length} series / {active}</p>
    <div className="bv-gallery-grid">{filtered.map(item => <ArtworkCard key={item.id} item={item} />)}</div>
    {!filtered.length && <div className="bv-empty"><h2>A blank canvas.</h2><p>No artwork matches this search. Try another title or category.</p><button className="bv-button" onClick={() => setParams({})}>Reset filters</button></div>}
    <p className="bv-content-note">The illustrations currently shown are original sample assets for the design. Client artwork will replace them.</p>
    <div className="bv-end-note"><p>Have a thought about a piece?</p><Link className="bv-text-link" to="/contact">Let’s talk ↗</Link></div>
  </div>;
}
