import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { FiX, FiPlus, FiArrowUpRight, FiImage } from 'react-icons/fi';
import { useAdmin, studioBase } from './adminStore';
export function PageHeading({ eyebrow = 'CREATOR STUDIO', title, description, children }) { return <header className="ad-heading"><div><p className="ad-eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p>{description}</p>}</div><div className="ad-actions">{children}</div></header>; }
export function Badge({ status }) { return <span className={`ad-badge ad-badge--${status}`}>{status}</span>; }
export function Empty({ title = 'Nothing here yet.', children }) { return <div className="ad-empty"><FiImage size={30} /><h3>{title}</h3><p>{children || 'Add something new to start your collection.'}</p></div>; }
export function Field({ label, children, hint }) { return <label className="ad-field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>; }
export function Modal({ title, children, onClose }) {
  const ref = useRef(null);
  useEffect(() => { const dialog = ref.current; dialog.showModal(); return () => dialog.close(); }, []);
  return <dialog ref={ref} className="ad-modal" aria-label={title} onCancel={onClose}><div className="ad-modal-heading"><h2>{title}</h2><button className="ad-icon-button" onClick={onClose} aria-label="Close dialog"><FiX /></button></div>{children}</dialog>;
}
export function MediaPicker({ multiple = false, value, onChange }) {
  const { data } = useAdmin();
  const ids = multiple ? value || [] : value ? [value] : [];
  return <div className="ad-media-picker"><p className="ad-help">{multiple ? 'Select images in the order you want them shown.' : 'Choose a cover image.'}</p><div className="ad-media-options">{data.media.map(m => <button type="button" key={m.id} aria-label={`Select ${m.original_name || m.default_alt}`} aria-pressed={ids.includes(m.id)} onClick={() => onChange(multiple ? ids.includes(m.id) ? ids.filter(id => id !== m.id) : [...ids, m.id] : value === m.id ? null : m.id)}><img src={m.url} alt={m.default_alt} /><span>{ids.includes(m.id) ? `✓ ${ids.indexOf(m.id) + 1}` : '+'}</span></button>)}</div><Link className="ad-inline-link" to={`${studioBase}/media`}>Manage media <FiArrowUpRight /></Link></div>;
}
export function NewLink({ to, children }) { return <Link className="ad-button" to={to}><FiPlus />{children}</Link>; }
export function SearchFilters({ query, setQuery, status, setStatus, statuses = ['draft','published','archived'], placeholder = 'Search content' }) { return <div className="ad-filters"><label className="ad-search"><span className="bv-sr-only">{placeholder}</span><input type="search" placeholder={placeholder} value={query} onChange={e => setQuery(e.target.value)} /></label><label><span className="bv-sr-only">Filter by status</span><select value={status} onChange={e => setStatus(e.target.value)}><option value="all">All statuses</option>{statuses.map(s => <option key={s}>{s}</option>)}</select></label></div>; }

