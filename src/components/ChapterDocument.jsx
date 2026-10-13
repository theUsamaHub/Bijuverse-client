import { getMedia } from '../data/portfolio';
// Allowlisted JSON renderer. No raw HTML or arbitrary inline styles from content.
function Node({ node }) {
  if (node.type === 'text') return (node.marks || []).reduce((text, mark) => {
    if (mark.type === 'bold') return <strong>{text}</strong>;
    if (mark.type === 'italic') return <em>{text}</em>;
    if (mark.type === 'underline') return <u>{text}</u>;
    if (mark.type === 'strike') return <s>{text}</s>;
    if (mark.type === 'link') {
      try {
        const url = new URL(mark.attrs?.href);
        if (url.protocol === 'https:' && !url.username && !url.password) return <a href={url.href} target="_blank" rel="noopener noreferrer">{text}</a>;
      } catch { /* Invalid URLs render as plain text. */ }
    }
    return text;
  }, node.text);
  const children = node.content?.map((child, i) => <Node key={i} node={child} />);
  switch (node.type) {
    case 'doc': return children;
    case 'paragraph': return <p>{children}</p>;
    case 'heading': return node.attrs?.level === 3 ? <h3>{children}</h3> : <h2>{children}</h2>;
    case 'blockquote': return <blockquote>{children}</blockquote>;
    case 'bulletList': return <ul>{children}</ul>;
    case 'orderedList': return <ol>{children}</ol>;
    case 'listItem': return <li>{children}</li>;
    case 'horizontalRule': return <hr />;
    case 'hardBreak': return <br />;
    case 'image': {
      const asset = getMedia(node.attrs?.mediaId);
      if (!asset) return null;
      const width = Number(node.attrs.widthPercent);
      const widthPercent = Number.isFinite(width) ? Math.max(25, Math.min(100, width)) : 100;
      const align = ['left', 'center', 'right'].includes(node.attrs.align) ? node.attrs.align : 'center';
      return <figure className={`bv-figure--${align}`} style={{ width: `${widthPercent}%` }}><img src={asset.url} alt={node.attrs.alt || asset.default_alt} loading="lazy" width="1400" height="800" />{node.attrs.caption && <figcaption>{node.attrs.caption}</figcaption>}</figure>;
    }
    default: return null;
  }
}
export default function ChapterDocument({ document }) { return <div className="bv-prose"><Node node={document} /></div>; }
