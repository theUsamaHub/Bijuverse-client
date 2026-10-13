import test from 'node:test';
import assert from 'node:assert/strict';
import { books, chapters, getChapters, workItems, artworkMedia, getMedia, reviews, getApprovedReviews } from '../src/data/portfolio.js';

test('public reading excludes draft chapters and chapters of hidden books', () => {
  assert.equal(getChapters('book-embers').length, 2);
  assert.equal(getChapters('unknown').length, 0);
  assert.ok(!getChapters('book-embers').some(c => c.slug === 'unpublished'));
  const book = books.find(b => b.id === 'book-embers');
  try { book.status = 'archived'; assert.deepEqual(getChapters(book.id), []); }
  finally { book.status = 'published'; }
});

test('feedback stays private until approved and remains isolated to its published target', () => {
  const book = books.find(b => b.id === 'book-embers');
  const review = { id: 'test-review', book_id: book.id, artwork_id: null, project_id: null, status: 'pending', rating: null };
  reviews.push(review);
  try {
    assert.deepEqual(getApprovedReviews('book', book.id), []);
    review.status = 'approved';
    assert.equal(getApprovedReviews('book', book.id).length, 1);
    assert.deepEqual(getApprovedReviews('book', 'book-whirlpool'), []);
    assert.deepEqual(getApprovedReviews('artwork', 'art-valley'), []);
    book.status = 'archived';
    assert.deepEqual(getApprovedReviews('book', book.id), []);
  } finally { book.status = 'published'; reviews.splice(reviews.indexOf(review), 1); }
});

test('sample content has resolvable parents/media and distinct canonical routes', () => {
  assert.ok(chapters.every(c => books.some(b => b.id === c.book_id)));
  assert.ok(artworkMedia.every(m => getMedia(m.media_id)));
  assert.equal(new Set(workItems.map(i => i.href)).size, workItems.length);
});
