import { getMedia } from '../data/portfolio';
export default function ProjectVisual({ project }) {
  const cover = getMedia(project.cover_media_id);
  if (cover) return <div className="bv-project-visual"><img className="bv-cover-image" src={cover.url} alt={cover.default_alt} loading="lazy" /><span className="bv-art-caption">{project.sample ? 'ORIGINAL SAMPLE / ' : ''}{project.tag}</span></div>;
  return <div className={`bv-project-visual bv-project-visual--${project.motif}`} aria-hidden="true"><div className="bv-art-grid" /><div className="bv-art-orbit" /><div className="bv-art-core" /><span className="bv-art-mark">渦</span><span className="bv-art-caption">BIJUVERSE / {project.tag}</span><span className="bv-art-number">{project.number}</span></div>;
}
