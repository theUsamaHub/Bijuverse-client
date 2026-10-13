import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { books, getChapters, workItems } from '../data/portfolio';
import ProjectVisual from '../components/ProjectVisual';
import ChapterDocument from '../components/ChapterDocument';
import ItemReviews from '../components/ItemReviews';
import ErrorPage from './ErrorPage';

export function BookDetail() {
  const { bookSlug } = useParams();
  const book = books.find(item => item.slug === bookSlug && item.status === 'published');
  if (!book) return <ErrorPage code="404" />;
  const chapters = getChapters(book.id);
  return <article className="bv-page bv-detail">
    <title>{`${book.title} — The Bijuverse`}</title>
    <Link to="/work?category=Books" className="bv-text-link">← Back to the collection</Link>
    <div className="bv-book-intro"><div><p className="bv-eyebrow">THE READING ROOM / {book.sample ? 'ORIGINAL SAMPLE' : 'BOOK'}</p><h1>{book.title}</h1><p>{book.synopsis}</p><div className="bv-book-stats"><span>{chapters.length} published chapters</span><span>{book.sample ? 'Sample fiction' : 'Fanfiction'}</span></div>{chapters.length > 0 && <Link className="bv-button" to={`/books/${book.slug}/chapters/${chapters[0].slug}`}>Start reading ↗</Link>}</div><ProjectVisual project={workItems.find(item => item.id === book.id)} /></div>
    <section className="bv-chapters"><div className="bv-section-heading"><div><p className="bv-eyebrow">YOUR NEXT CHAPTER</p><h2>The journey so far<span>.</span></h2></div><span className="bv-status">{chapters.length ? 'Read at your own pace' : 'Chapters coming soon'}</span></div>
      {chapters.length ? <ol className="bv-chapter-list">{chapters.map(chapter => <li key={chapter.id}><Link to={`/books/${book.slug}/chapters/${chapter.slug}`}><span className="bv-chapter-number">{String(chapter.chapter_number).padStart(2, '0')}</span><div><span className="bv-eyebrow">CHAPTER {chapter.chapter_number}</span><h3>{chapter.published_snapshot_json.title}</h3></div><span aria-hidden="true">↗</span></Link></li>)}</ol> : <p>The chapter list will appear here when the author publishes the story.</p>}
    </section>
    <ItemReviews type="book" itemId={book.id} title={book.title} />
  </article>;
}

export function ChapterReader() {
  const { bookSlug, chapterSlug } = useParams();
  const [fontSize, setFontSize] = useState('regular');
  const book = books.find(item => item.slug === bookSlug && item.status === 'published');
  const chapters = book ? getChapters(book.id) : [];
  const index = chapters.findIndex(chapter => chapter.slug === chapterSlug);
  if (!book || index < 0) return <ErrorPage code="404" />;
  const chapter = chapters[index];
  const snapshot = chapter.published_snapshot_json;
  return <div className="bv-page bv-reader">
    <title>{`${snapshot.title} — ${book.title}`}</title>
    <div className="bv-reader-top"><Link className="bv-text-link" to={`/books/${book.slug}`}>← {book.title}</Link><div className="bv-reading-controls" aria-label="Reading text size"><button aria-pressed={fontSize === 'regular'} onClick={() => setFontSize('regular')}>A <span className="bv-sr-only">Regular text</span></button><button aria-pressed={fontSize === 'large'} onClick={() => setFontSize('large')}>A+ <span className="bv-sr-only">Large text</span></button></div></div>
    <div className="bv-reader-layout"><aside className="bv-reader-toc"><p className="bv-eyebrow">IN THIS BOOK</p>{chapters.map(c => <Link key={c.id} to={`/books/${book.slug}/chapters/${c.slug}`} aria-current={c.id === chapter.id ? 'page' : undefined}><span>{String(c.chapter_number).padStart(2, '0')}</span>{c.published_snapshot_json.title}</Link>)}</aside>
      <article className={`bv-reading-sheet bv-reading-sheet--${fontSize}`}><p className="bv-eyebrow">CHAPTER {String(chapter.chapter_number).padStart(2, '0')} / {chapters.length}</p><h1>{snapshot.title}</h1><p className="bv-demo-label">Original sample story · preview content</p><div className="bv-reading-rule" /><ChapterDocument document={snapshot.document} />
        <nav className="bv-reader-pagination" aria-label="Chapter navigation">{chapters[index - 1] ? <Link to={`/books/${book.slug}/chapters/${chapters[index - 1].slug}`}>← Previous chapter</Link> : <Link to={`/books/${book.slug}`}>← Book overview</Link>}{chapters[index + 1] ? <Link to={`/books/${book.slug}/chapters/${chapters[index + 1].slug}`}>Next chapter →</Link> : <Link to={`/books/${book.slug}`}>Back to the book →</Link>}</nav>
        <p className="bv-form-help">Want to share your thoughts? Join the conversation on the book’s overview page.</p>
      </article>
    </div>
  </div>;
}
