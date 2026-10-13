export default function ProjectVisual({ project }) {
  return <div className={`bv-project-visual bv-project-visual--${project.motif}`} aria-hidden="true"><div className="bv-art-grid" /><div className="bv-art-orbit" /><div className="bv-art-core" /><span className="bv-art-mark">{project.category === 'Stories' ? '渦' : project.category === 'Artwork' ? '光' : '動'}</span><span className="bv-art-caption">BIJUVERSE / {project.tag}</span><span className="bv-art-number">{project.number}</span></div>;
}
