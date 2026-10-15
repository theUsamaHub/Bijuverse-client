import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router';
import { FiArrowUpRight, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import SocialLinks from '../components/SocialLinks';

export default function Contact() {
  const [receipt, setReceipt] = useState(null);
  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm({ defaultValues: { name: '', email: '', subject: '', message: '' } });
  const message = useWatch({ control, name: 'message', defaultValue: '' });
  const submit = async values => {
    // UI preview only. Future service maps these fields to contacts and sends notifications.
    await new Promise(resolve => setTimeout(resolve, 500));
    setReceipt({ name: values.name.trim(), subject: values.subject.trim() });
    reset();
  };
  return <div className="bv-page bv-contact-page"><title>Contact — The Bijuverse</title><header className="bv-work-header"><p className="bv-eyebrow">THE BIJUVERSE / CONTACT</p><h1>Great stories start<br /><span>with a hello.</span></h1><p>Share an idea, ask about the work, or leave a note.</p><span className="bv-header-seal" aria-hidden="true">話</span></header>
    <div className="bv-contact-layout"><aside className="bv-contact-aside"><FiMessageSquare className="bv-contact-symbol" size={42} aria-hidden="true" /><h2>Let’s make a connection.</h2><p>Give your message a little context. Mention a book, an artwork, or the idea you’d like to discuss.</p><div className="bv-contact-topics"><span>01</span><div><h3>Creative conversations</h3><p>Questions, ideas, and possible collaborations.</p></div><span>02</span><div><h3>About the work</h3><p>A story that stayed with you or a piece you want to know more about.</p></div></div><div className="bv-contact-social"><p className="bv-eyebrow">ELSEWHERE IN THE UNIVERSE</p><SocialLinks placement="social_section" /></div><Link to="/work" className="bv-text-link">Explore the work first ↗</Link></aside>
      <div className="bv-contact-panel"><div className="bv-section-heading"><h2>Leave a message.</h2><span className="bv-status">No account needed</span></div>
        <p className="bv-demo-banner">Form preview · messages aren’t delivered yet. Please use sample details.</p>
        {receipt ? <div className="bv-contact-receipt" role="status"><FiCheckCircle size={40} aria-hidden="true" /><h3>Your preview is ready, {receipt.name}.</h3><p>Subject: {receipt.subject}</p><p>The form passed validation. No message was sent or saved; delivery will be connected in the server phase.</p><button className="bv-button" onClick={() => setReceipt(null)}>Preview another message</button></div> : <form className="bv-form" onSubmit={handleSubmit(submit)} noValidate>
          <div className="bv-form-pair"><div><label htmlFor="contact-name">Your name</label><input id="contact-name" autoComplete="name" maxLength={100} placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} {...register('name', { validate: value => !!value.trim() || 'Please enter your name.' })} />{errors.name && <span id="contact-name-error" className="bv-field-error">{errors.name.message}</span>}</div><div><label htmlFor="contact-email">Email address</label><input id="contact-email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} {...register('email', { required: 'Please enter your email.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email.' } })} />{errors.email && <span id="contact-email-error" className="bv-field-error">{errors.email.message}</span>}</div></div>
          <label htmlFor="contact-subject">Subject</label><input id="contact-subject" maxLength={200} placeholder="What would you like to talk about?" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'contact-subject-error' : undefined} {...register('subject', { validate: value => !!value.trim() || 'Please add a subject.' })} />{errors.subject && <span id="contact-subject-error" className="bv-field-error">{errors.subject.message}</span>}
          <label htmlFor="contact-message">Your message</label><textarea id="contact-message" rows={7} maxLength={5000} placeholder="Tell me a little about your idea…" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-help'} {...register('message', { validate: value => !!value.trim() || 'Please write a message.' })} />{errors.message && <span id="contact-message-error" className="bv-field-error">{errors.message.message}</span>}<div className="bv-message-meta"><span id="contact-message-help">Your message will be private.</span><span>{message.length} / 5,000</span></div>
          <button className="bv-button" disabled={isSubmitting} type="submit">{isSubmitting ? 'Preparing preview…' : 'Preview message'}<FiArrowUpRight aria-hidden="true" /></button><p className="bv-form-help">Once connected, your email will only be used to respond to your enquiry.</p>
        </form>}
      </div>
    </div>
  </div>;
}
