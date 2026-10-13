import { Link } from 'react-router';
const states = {
  '403': { label: 'A SEALED PASSAGE', title: 'This path is protected.', message: 'You don’t have access to this part of the universe. There is still plenty to explore outside.', glyph: '封' },
  '404': { label: 'UNCHARTED TERRITORY', title: 'Lost between worlds?', message: 'This page may have moved, or its story hasn’t been written yet. Let’s get you somewhere familiar.', glyph: '空' },
  '500': { label: 'A DISTURBANCE IN THE CHAKRA', title: 'Even universes have off days.', message: 'Something interrupted this page. Try again, or return to the collection while things settle.', glyph: '乱' },
  '503': { label: 'RESTORING THE BALANCE', title: 'A brief pause in the story.', message: 'This part of the Bijuverse is temporarily unavailable. Please come back in a little while.', glyph: '休' },
};
export default function ErrorPage({ code = '404', onRetry }) {
  const state = states[code] || states['404'];
  const retryable = code === '500' || code === '503';
  return <section className="bv-page bv-error-page">
    <title>{`${code} — ${state.title} — The Bijuverse`}</title><meta name="robots" content="noindex, nofollow" />
    <div className="bv-error-art" aria-hidden="true"><div className="bv-error-orbit" /><span className="bv-error-glyph">{state.glyph}</span><span className="bv-error-code">{code}</span><span className="bv-error-coordinate">SIGNAL / {code}</span></div>
    <div className="bv-error-copy"><p className="bv-eyebrow">{state.label}</p><h1>{state.title}</h1><p>{state.message}</p><div className="bv-error-actions">{retryable ? <button className="bv-button" onClick={onRetry || (() => window.location.reload())}>Try again ↻</button> : <Link className="bv-button" to="/">Return home ↗</Link>}<Link className="bv-text-link" to="/work">Explore My Work →</Link></div><span className="bv-error-small">THE BIJUVERSE · EVERY DETOUR IS A NEW BEGINNING</span></div>
  </section>;
}
