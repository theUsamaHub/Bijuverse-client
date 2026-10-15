import { Link, Navigate, useParams } from 'react-router';
import { projects, workItems } from '../data/portfolio';
import ProjectVisual from '../components/ProjectVisual';
import ItemReviews from '../components/ItemReviews';
import ErrorPage from './ErrorPage';

export function LegacyWorkDetail() {
  const { slug } = useParams();
  const item = workItems.find(entry => entry.slug === slug);
  return item ? <Navigate to={item.href} replace /> : <ErrorPage code="404" />;
}
export default function ProjectDetail() {
  const { slug } = useParams();
  const item = projects.find(entry => entry.slug === slug && entry.status === 'published');
  if (!item) return <ErrorPage code="404" />;
  return <article className="bv-page bv-detail"><title>{`${item.title} — The Bijuverse`}</title><Link className="bv-text-link" to="/work?category=Projects">← Back to My Work</Link>
    <header><p className="bv-eyebrow">{item.category} / {item.sample ? 'ORIGINAL SAMPLE' : 'PORTFOLIO'}</p><h1>{item.title}</h1><p>{item.description}</p></header>
    <ProjectVisual project={workItems.find(entry => entry.id === item.id)} /><div className="bv-media-waiting"><span aria-hidden="true">▷</span><h2>A little anticipation.</h2><p>The final video is coming soon. Explore the other worlds while it takes shape.</p><Link className="bv-text-link" to="/work">Explore the collection ↗</Link></div>
    <ItemReviews key={item.id} type="project" itemId={item.id} title={item.title} />
  </article>;
}
