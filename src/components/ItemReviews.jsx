import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getApprovedReviews } from '../data/portfolio';

export default function ItemReviews({ type, itemId, title }) {
  const approved = getApprovedReviews(type, itemId);
  const rated = approved.filter(review => review.rating !== null);
  const [receipt, setReceipt] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const submit = values => {
    // Demo receipt only: never append an unmoderated comment to the public list.
    setReceipt({ book_id: null, artwork_id: null, project_id: null, [`${type}_id`]: itemId, status: 'pending', name: values.name.trim(), comment: values.comment.trim(), rating: values.rating ? Number(values.rating) : null });
    reset();
  };
  return (
    <section className="bv-comments" aria-labelledby="comments-title">
      <div className="bv-section-heading">
        <div><p className="bv-eyebrow">THE CONVERSATION / {type}</p><h2 id="comments-title">Leave your mark<span>.</span></h2><p>Thoughts on {title}? This is the place.</p></div>
        <span className="bv-status">{approved.length} approved comments{rated.length ? ` · ${(rated.reduce((sum, r) => sum + r.rating, 0) / rated.length).toFixed(1)} / 5` : ''}</span>
      </div>
      <div className="bv-comments-grid">
        <div className="bv-comment-list">
          {approved.length ? approved.map(review => <article key={review.id}><h3>{review.name}</h3>{review.rating && <span>{review.rating} / 5</span>}<p>{review.comment}</p></article>) : <div className="bv-comment-empty"><span aria-hidden="true">“</span><h3>A quiet corner, for now.</h3><p>No approved comments yet.<br />Your perspective could be the first.</p></div>}
        </div>
        <form className="bv-form bv-comment-form" onSubmit={handleSubmit(submit)} noValidate>
          <p className="bv-demo-label">Interactive sample · nothing is sent or saved</p>
          <label htmlFor="review-name">Your name</label>
          <input id="review-name" autoComplete="name" maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} {...register('name', { required: 'Please enter your name.', validate: value => !!value.trim() || 'Please enter your name.' })} placeholder="What should we call you?" />
          {errors.name && <span className="bv-field-error" id="name-error">{errors.name.message}</span>}
          <label htmlFor="review-rating">Rating <span className="bv-optional">optional</span></label>
          <select id="review-rating" {...register('rating')}><option value="">Just a comment</option>{[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{'★'.repeat(n)} — {n} out of 5</option>)}</select>
          <label htmlFor="review-message">Your comment</label>
          <textarea id="review-message" rows={4} maxLength={3000} aria-invalid={!!errors.comment} aria-describedby={errors.comment ? 'comment-error' : undefined} {...register('comment', { required: 'Write a comment first.', validate: value => !!value.trim() || 'Write a comment first.' })} placeholder="What stayed with you?" />
          {errors.comment && <span className="bv-field-error" id="comment-error">{errors.comment.message}</span>}
          <p className="bv-form-help">No account needed. Comments will be reviewed before appearing publicly.</p>
          <button className="bv-button" type="submit">Preview submission <span aria-hidden="true">↗</span></button>
          {receipt && <p className="bv-form-notice" role="status">Thanks, {receipt.name}. This demo shows the pending-approval state for this {type}. Nothing was submitted; server integration is still to come.</p>}
        </form>
      </div>
    </section>
  );
}
