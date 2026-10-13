// Relational demo fixtures. IDs are readable fixture keys, not production UUIDs.
// Only published records are exposed through the public selectors below.
export const books = [
  { id: 'book-whirlpool', title: 'The House of the Whirlpool', slug: 'house-of-the-whirlpool', synopsis: 'A new story is finding its place in the Bijuverse. The final synopsis and chapters are on their way.', cover_media_id: null, status: 'published', sort_order: 0, sample: false },
  { id: 'book-embers', title: 'Beyond the Ember Gate', slug: 'beyond-the-ember-gate', synopsis: 'A quiet journey through a world lit by the last light of day. An original sample story created to demonstrate the reading experience.', cover_media_id: 'media-valley', status: 'published', sort_order: 1, sample: true },
];
export const mediaAssets = [
  { id: 'media-valley', url: '/demo/valley.svg', default_alt: 'Layered mountains and a winding river beneath a golden sun', status: 'ready' },
  { id: 'media-gate', url: '/demo/gate.svg', default_alt: 'A dark mountain gate beneath a crescent moon', status: 'ready' },
];
const paragraph = text => ({ type: 'paragraph', content: [{ type: 'text', text }] });
const figure = (mediaId, caption) => ({ type: 'image', attrs: { mediaId, caption, align: 'center', widthPercent: 100 } });
export const chapters = [
  { id: 'chapter-dawn', book_id: 'book-embers', slug: 'the-last-light', chapter_number: 1, sort_order: 0, status: 'published', published_snapshot_json: { title: 'The last light', schema_version: 1, document: { type: 'doc', content: [
    paragraph('By the time the sun reached the mountains, the river had turned to gold. Ren stopped at the bridge and watched the water carry the light away. Somewhere beyond the valley, a bell sounded once.'),
    paragraph('There had been no bell in the village for a hundred years. That was what the old maps said, at least. Ren folded the map along its worn crease and put it back in her coat.'),
    figure('media-valley', 'The valley at dusk — original illustration for this sample.'),
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'A path beyond the map' }] },
    paragraph('The bridge was narrower than she remembered. On the other side, pale grass grew through the stones. Each step disturbed a small cloud of dust, and each cloud caught the sunset before settling again.'),
    { type: 'blockquote', content: [paragraph('Some roads only appear when you stop looking for the way home.')] },
    paragraph('She had laughed when her grandfather said that. Now, with the river behind her and the first star above the ridge, it seemed less like a proverb and more like directions.'),
    figure('media-gate', 'The gate after nightfall.'),
    paragraph('At the top of the hill stood a gate without a wall. A small lantern hung from its crossbeam. Ren reached for it, and the bell sounded again.')
  ] } } },
  { id: 'chapter-gate', book_id: 'book-embers', slug: 'a-lantern-in-the-dark', chapter_number: 2, sort_order: 1, status: 'published', published_snapshot_json: { title: 'A lantern in the dark', schema_version: 1, document: { type: 'doc', content: [
    paragraph('The lantern was warm. Not hot enough to burn, only warm enough to remind her of a cup held between both hands on a winter morning. Inside it, a single ember floated without a wick.'),
    figure('media-gate', 'A light at the threshold — sample illustration.'),
    paragraph('Ren lifted the lantern. The mountains beyond the gate did not move, but the path between them changed. Where there had been broken stone, there was now a staircase descending into blue mist.'),
    paragraph('She took one step. From somewhere below, a voice asked whether she had brought a story. Ren thought of the bridge, the river, and the map that had been wrong. Then she began to speak.')
  ] } } },
  { id: 'chapter-draft', book_id: 'book-embers', slug: 'unpublished', chapter_number: 3, sort_order: 2, status: 'draft', published_snapshot_json: null },
];
export const artworks = [
  { id: 'art-valley', slug: 'chakra-study', title: 'The golden hour', description: 'A landscape study in layered silhouettes, warm light, and quiet movement.', category: 'Landscape study', status: 'published', sort_order: 0, sample: true },
];
export const artworkMedia = [
  { artwork_id: 'art-valley', media_id: 'media-valley', sort_order: 0 },
  { artwork_id: 'art-valley', media_id: 'media-gate', sort_order: 1 },
];
export const projects = [
  { id: 'project-motion', slug: 'motion-study', title: 'Energy in motion', description: 'An exploration of rhythm and anime-inspired movement.', category: 'Motion study', cover_media_id: 'media-gate', video_media_id: null, external_url: null, status: 'published', sort_order: 0, sample: true },
];
export const reviews = []; // No fabricated visitor feedback; real approved reviews come from the API later.
export const socialPlatforms = ['Facebook', 'Instagram', 'YouTube', 'TikTok', 'X', 'Discord', 'LinkedIn', 'GitHub', 'Twitch', 'Reddit', 'Pinterest', 'Snapchat', 'Telegram', 'WhatsApp', 'Threads', 'Other'].map(name => ({ id: name.toLowerCase(), key: name.toLowerCase(), name, is_active: true }));
export const socialLinks = [
  { id: 'social-facebook', platform_id: 'facebook', label: 'Facebook', url: 'https://facebook.com/robby.barrows', is_active: true, show_in_navbar: true, show_in_footer: true, show_in_social_section: true, sort_order: 0 },
  { id: 'social-discord', platform_id: 'discord', label: 'Discord', url: null, is_active: false, show_in_navbar: true, show_in_footer: true, show_in_social_section: true, sort_order: 1 },
];
export const getMedia = id => mediaAssets.find(item => item.id === id && item.status === 'ready');
export function getChapters(bookId) {
  if (!books.some(book => book.id === bookId && book.status === 'published')) return [];
  return chapters.filter(chapter => chapter.book_id === bookId && chapter.status === 'published' && chapter.published_snapshot_json).sort((a, b) => a.sort_order - b.sort_order || a.chapter_number - b.chapter_number);
}
export function getApprovedReviews(type, id) {
  const collection = { book: books, artwork: artworks, project: projects }[type];
  if (!collection?.some(item => item.id === id && item.status === 'published')) return [];
  return reviews.filter(review => review[`${type}_id`] === id && review.status === 'approved');
}
// A presentation adapter combines independent entities without duplicating them in projects.
export const workItems = [
  ...books.filter(b => b.status === 'published').map(b => ({ ...b, category: 'Books', description: b.synopsis, href: `/books/${b.slug}`, tag: 'STORY COLLECTION', motif: 'whirlpool', number: '01' })),
  ...artworks.filter(a => a.status === 'published').map(a => ({ ...a, category: 'Artwork', cover_media_id: artworkMedia.find(m => m.artwork_id === a.id)?.media_id, href: `/artwork/${a.slug}`, tag: 'ARTWORK', motif: 'sun', number: '02' })),
  ...projects.filter(p => p.status === 'published').map(p => ({ ...p, category: 'Projects', href: `/projects/${p.slug}`, tag: 'MOTION / VIDEO', motif: 'motion', number: '03' })),
];
