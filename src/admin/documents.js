export function editorDocument(document, media) {
  const walk = node => ({ ...node, ...(node.type === 'image' ? { attrs: { ...node.attrs, src: media.find(m => m.id === node.attrs?.mediaId)?.url, alt: node.attrs?.alt || media.find(m => m.id === node.attrs?.mediaId)?.default_alt || '' } } : {}), ...(node.content ? { content: node.content.map(walk) } : {}) });
  return walk(document || { type: 'doc', content: [{ type: 'paragraph' }] });
}
export function storedDocument(document) {
  const walk = node => { const result = { ...node }; if (node.type === 'image') { result.attrs = { ...node.attrs }; delete result.attrs.src; } if (node.content) result.content = node.content.map(walk); return result; };
  return walk(document);
}
export function updateChapterDraft(chapter, title, document) { return { ...chapter, title, draft_content_json: structuredClone(document) }; }
export function publishChapterPreview(chapter, title, document) { return { ...updateChapterDraft(chapter, title, document), status: 'published', published_snapshot_json: { title, schema_version: 1, document: structuredClone(document) } }; }
