import { createContext, useContext } from 'react';
import { books, chapters, artworks, artworkMedia, projects, mediaAssets, socialLinks } from '../data/portfolio';
import { creatorProfile } from '../data/profile';

export const Context = createContext(null);
export const studioBase = '/studio';
export const emptyDoc = { type: 'doc', content: [{ type: 'paragraph' }] };
export const slugify = value => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const safeUrl = value => { try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password; } catch { return false; } };
export function initialData() {
  return structuredClone({ books, chapters: chapters.map(c => ({ ...c, title: c.published_snapshot_json?.title || 'An unwritten chapter', draft_content_json: c.published_snapshot_json?.document || emptyDoc })), artworks: artworks.map(a => ({ ...a, media_ids: artworkMedia.filter(m => m.artwork_id === a.id).sort((a,b) => a.sort_order-b.sort_order).map(m => m.media_id) })), projects, media: mediaAssets, socials: socialLinks, profile: { ...creatorProfile, status: 'draft' }, seo: ['home','work','artwork','about','contact'].map(page => ({ id: page, title: `${page === 'home' ? 'Home' : page[0].toUpperCase()+page.slice(1)} — The Bijuverse`, description: '', noindex: false, canonical_url: '' })),
    reviews: [
      { id: 'sample-review-1', book_id: books[1].id, name: 'Sample reader', comment: 'Sample feedback: I enjoyed the atmosphere in the opening chapter.', rating: 5, status: 'pending' },
      { id: 'sample-review-2', artwork_id: artworks[0].id, name: 'Sample visitor', comment: 'Sample feedback: The colours in this piece work beautifully together.', rating: null, status: 'pending' },
      { id: 'sample-review-3', project_id: projects[0].id, name: 'Sample viewer', comment: 'Sample feedback: Looking forward to seeing the finished piece.', rating: 4, status: 'approved' },
    ],
    contacts: [
      { id: 'sample-contact-1', name: 'Alex (sample)', email: 'alex@example.com', subject: 'An illustration idea', message: 'This is a sample enquiry for the inbox design. I would like to discuss an illustration for a story. Could you share how you usually work?', status: 'new' },
      { id: 'sample-contact-2', name: 'Sam (sample)', email: 'sam@example.com', subject: 'A question about your book', message: 'This is a sample message. Will new chapters be added to the collection?', status: 'read' },
    ], activity: [],
  });
}

export function useAdmin() { return useContext(Context); }

