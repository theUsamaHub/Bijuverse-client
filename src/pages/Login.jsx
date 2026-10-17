import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { FiArrowUpRight, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { adminPaths } from '../config/routes';

export default function Login({ recovery = false }) {
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState('');
  const { register, handleSubmit, resetField, formState: { errors, isSubmitting } } = useForm();
  const submit = async () => {
    setNotice('');
    await new Promise(resolve => setTimeout(resolve, 650));
    if (!recovery) resetField('password');
    setNotice(recovery ? 'Preview complete. No reset email was sent. Account recovery will be available when the server is connected.' : 'Preview complete. Sign-in is not connected yet. No credentials were sent or stored.');
  };
  return <div className="bv-access-page">
    <title>{`${recovery ? 'Recover access' : 'Studio access'} — The Bijuverse`}</title><meta name="robots" content="noindex, nofollow" />
    <header className="bv-access-header"><Link to="/" className="bv-footer-brand">The Bijuverse<span>THE CREATOR’S SPACE</span></Link><Link to="/" className="bv-text-link">Back to the universe ↗</Link></header>
    <div className="bv-access-layout">
      <section className="bv-access-art" aria-label="The creator’s studio">
        <div className="bv-access-grid" /><div className="bv-access-orbit"><div /><span aria-hidden="true">創</span></div><div className="bv-access-sparks" aria-hidden="true">✦</div>
        <div className="bv-access-story"><p className="bv-eyebrow">A WORLD ONLY YOU CAN CREATE</p><h1>Every universe<br />needs a <em>creator.</em></h1><p>Your stories. Your art. Your next chapter.<br />It all begins here.</p></div><span className="bv-access-edition">THE BIJUVERSE / CREATOR EDITION 01</span>
      </section>
      <section className="bv-access-card">
        <span className="bv-lock-icon"><FiLock size={23} /></span><p className="bv-eyebrow">{recovery ? 'FIND YOUR WAY BACK' : 'PRIVATE STUDIO'}</p>
        <h2>{recovery ? 'Recover your access.' : 'Welcome back.'}</h2><p>{recovery ? 'Use your admin email to request a password reset.' : 'Step inside. Your next creation is waiting.'}</p>
        <form className="bv-form" onSubmit={handleSubmit(submit)} noValidate>
          <div className="bv-demo-banner">Design preview · use sample details only</div>
          <label htmlFor="admin-email">Email address</label><div className="bv-input-wrap"><FiMail aria-hidden="true" /><input id="admin-email" type="email" autoComplete="off" placeholder="creator@example.com" maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} {...register('email', { required: 'Enter your email address.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' } })} /></div>
          {errors.email && <span className="bv-field-error" id="email-error">{errors.email.message}</span>}
          {!recovery && <><div className="bv-label-row"><label htmlFor="admin-password">Password</label><Link to={adminPaths.recovery}>Forgot password?</Link></div><div className="bv-input-wrap"><FiLock aria-hidden="true" /><input id="admin-password" type={visible ? 'text' : 'password'} autoComplete="off" placeholder="Enter your password" aria-invalid={!!errors.password} aria-describedby={errors.password ? 'password-error' : undefined} {...register('password', { required: 'Enter your password.' })} /><button className="bv-password-toggle" type="button" aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} onClick={() => setVisible(!visible)}>{visible ? <FiEyeOff /> : <FiEye />}</button></div>{errors.password && <span className="bv-field-error" id="password-error">{errors.password.message}</span>}</>}
          <button className="bv-button bv-login-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Checking preview…' : recovery ? 'Preview recovery' : 'Enter the studio'}<FiArrowUpRight /></button>
          {notice && <p className="bv-form-notice" role="status">{notice}</p>}
        </form>
        {recovery ? <Link to={adminPaths.login} className="bv-text-link bv-access-back">← Back to sign in</Link> : <><p className="bv-access-caption"><FiLock aria-hidden="true" /> One creator. A universe of possibilities.</p><Link to={adminPaths.base} className="bv-text-link">Explore admin design preview ↗</Link></>}
      </section>
    </div><footer className="bv-access-footer"><span>© {new Date().getFullYear()} The Bijuverse</span><span>CRAFTED WITH CHAKRA</span></footer>
  </div>;
}
