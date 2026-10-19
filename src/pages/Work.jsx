import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { workItems as projects } from '../data/portfolio';
import ProjectVisual from '../components/ProjectVisual';
const categories = ['All work', 'Books', 'Artwork', 'Projects'];
export function WorkPreview({ homeOnly = false }) {
  return <section id="work-preview" className="bv-work-preview bv-page"><div className="bv-section-heading"><div><p className="bv-eyebrow">01 / The creative archive</p><h2>Inside the Bijuverse<span>.</span></h2></div>{!homeOnly && <Link className="bv-text-link" to="/work">Explore all work ↗</Link>}</div><ProjectCard project={projects[0]} featured homeOnly={homeOnly} /></section>;
}
function ProjectCard({ project, featured = false, homeOnly = false }) {
  const Card = homeOnly ? 'article' : Link;
  return <Card {...(homeOnly ? {} : { to: project.href })} className={`bv-project-card ${featured ? 'bv-project-card--featured' : ''}`}><ProjectVisual project={project} /><div className="bv-project-copy"><div className="bv-card-meta"><span>{project.tag}</span><span>{project.sample ? 'SAMPLE CONTENT' : 'STORY COLLECTION'}</span></div><h2>{project.title}</h2><p>{project.description}</p>{!homeOnly && <span className="bv-text-link">{project.category === 'Books' ? 'Discover the story' : 'Explore project'} <span aria-hidden="true">↗</span></span>}</div></Card>;
}
export default function Work() {
  const [params, setParams] = useSearchParams();
  const active = categories.includes(params.get('category')) ? params.get('category') : 'All work';
  const [search, setSearch] = useState('');
  const filtered = projects.filter(p => (active === 'All work' || p.category === active) && `${p.title} ${p.description}`.toLowerCase().includes(search.toLowerCase().trim()));
  return <div className="bv-page bv-work-page"><title>My Work — The Bijuverse</title><header className="bv-work-header"><p className="bv-eyebrow">THE BIJUVERSE / CREATIVE ARCHIVE</p><h1>Different worlds.<br /><span>One imagination.</span></h1><p>A collection of stories, artwork, and motion.<br />Choose a world. See where it takes you.</p><span className="bv-header-seal" aria-hidden="true">創</span></header><div className="bv-work-toolbar"><div className="bv-filters" aria-label="Filter projects">{categories.map(c => <button key={c} aria-pressed={active === c} onClick={() => setParams(c === 'All work' ? {} : { category: c })}>{c}<span>{c === 'All work' ? projects.length : projects.filter(p => p.category === c).length}</span></button>)}</div><label className="bv-search"><span className="bv-sr-only">Search projects</span><input type="search" placeholder="Find a project…" value={search} onChange={e => setSearch(e.target.value)} /></label></div><p className="bv-results" role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'} / {active}</p><div className="bv-work-grid">{filtered.map((p, i) => <ProjectCard key={p.slug} project={p} featured={active === 'All work' && !search && i === 0} />)}</div>{!filtered.length && <div className="bv-empty"><h2>No worlds found.</h2><p>Try a different name or explore the full collection.</p><button className="bv-button" onClick={() => { setSearch(''); setParams({}); }}>Reset filters</button></div>}<aside className="bv-content-note">The archive is taking shape. The Ember Gate story and landscape illustrations are original samples. Final client content will replace demo entries.</aside></div>;
}
