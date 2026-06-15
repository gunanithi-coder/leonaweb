import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
};

const ContactPage = () => {
  const [heroRef,  heroVisible]  = useReveal(0.05);
  const [formRef,  formVisible]  = useReveal(0.1);
  const [infoRef,  infoVisible]  = useReveal(0.1);
  const [mapRef,   mapVisible]   = useReveal(0.1);
  const formElement = useRef(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [status,       setStatus]       = useState('idle');
  const [focusedField, setFocusedField] = useState(null);
  const [errorMsg,     setErrorMsg]     = useState('');

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formElement.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrorMsg(err?.text || 'Something went wrong. Please email us directly at info@leonatech.in');
    }
  };

  const services = [
    'Topographical Survey','Drone Aerial Survey','3D Reality Model',
    'Door to Door Survey','Underground Utility Mapping','Water Body Mapping',
    'Flood Mapping','Volumetric Analysis','Cadastral Georeferencing',
    'Project Monitoring','Other / Custom',
  ];

  /* Info cards data */
  const INFO_CARDS = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.71 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.58 2.81.71A2 2 0 0 1 22 16.92z"/></svg>,
      label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      label: 'Email Us', value: 'info@leonatech.in', href: 'mailto:info@leonatech.in',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      label: 'Visit Us', value: 'Coimbatore, Tamil Nadu, India', href: 'https://maps.google.com',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      label: 'Working Hours', value: 'Mon – Sat, 9:00 AM – 6:00 PM', href: '#',
    },
  ];

  return (
    <div className="contact-page">

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section ref={heroRef} className={`contact-hero ${heroVisible ? 'revealed' : ''}`}>
        <div className="contact-hero-grid-bg" aria-hidden="true">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="grid-dot" />
          ))}
        </div>
        <div className="contact-hero-content">
          <div className="contact-hero-tag">
            <span className="tag-dot" />
            Get In Touch
          </div>
          <h1 className="contact-hero-title">
            Let's Map Your
            <span className="title-highlight"> Next Project</span>
          </h1>
          <p className="contact-hero-sub">
            From drone surveys to full geospatial solutions — our team is ready
            to deliver precision data for your infrastructure, planning, or
            environmental needs.
          </p>
        </div>
        <div className="coord-badge" aria-hidden="true">
          <span className="coord-label">HQ Coordinates</span>
          <span className="coord-value">11.0168° N, 76.9558° E</span>
        </div>
      </section>

      {/* ══ FORM + SIDEBAR ════════════════════════════════ */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-main-grid">

            {/* FORM */}
            <div ref={formRef} className={`contact-form-wrapper ${formVisible ? 'revealed' : ''}`}>
              <div className="form-header">
                <h2 className="form-title">Send Us a Message</h2>
                <p className="form-subtitle">
                  Fill in the details below and our team will respond within 24 hours.
                </p>
              </div>

              {status === 'success' ? (
                <div className="form-success">
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3>Message Received!</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button className="btn-primary" onClick={() => setStatus('idle')}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formElement} className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className={`form-field ${focusedField === 'name' ? 'focused' : ''}`}>
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" name="from_name" type="text" value={formData.name}
                        onChange={handleChange} onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)} placeholder="John Doe" required />
                    </div>
                    <div className={`form-field ${focusedField === 'email' ? 'focused' : ''}`}>
                      <label htmlFor="email">Email Address *</label>
                      <input id="email" name="from_email" type="email" value={formData.email}
                        onChange={handleChange} onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)} placeholder="john@company.com" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className={`form-field ${focusedField === 'phone' ? 'focused' : ''}`}>
                      <label htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" value={formData.phone}
                        onChange={handleChange} onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)} placeholder="+91 98765 43210" />
                    </div>
                    <div className={`form-field ${focusedField === 'service' ? 'focused' : ''}`}>
                      <label htmlFor="service">Service Interested In</label>
                      <select id="service" name="service" value={formData.service}
                        onChange={handleChange} onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}>
                        <option value="">Select a service…</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <div className="select-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={`form-field form-field--full ${focusedField === 'message' ? 'focused' : ''}`}>
                    <label htmlFor="message">Project Details *</label>
                    <textarea id="message" name="message" rows={5} value={formData.message}
                      onChange={handleChange} onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your project — location, scope, timeline…" required />
                  </div>
                  <button type="submit" className={`btn-submit ${status === 'sending' ? 'sending' : ''}`} disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <><span className="spinner" /> Sending…</>
                    ) : (
                      <>Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>
                    )}
                  </button>
                  {status === 'error' && <p className="form-error-msg">{errorMsg}</p>}
                </form>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="contact-sidebar">
              <div className="sidebar-card sidebar-card--highlight">
                <div className="sidebar-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <strong>Quick Response</strong>
                  <p>We typically respond within <em>4–8 business hours</em></p>
                </div>
              </div>
              <div className="sidebar-card">
                <h3 className="sidebar-title">What to Expect</h3>
                <ul className="sidebar-list">
                  {[
                    { icon: '📍', text: 'Free site assessment consultation' },
                    { icon: '📄', text: 'Detailed project proposal within 48 hrs' },
                    { icon: '✅', text: 'Transparent pricing, no hidden costs' },
                    { icon: '🛩️', text: 'DGCA-certified drone operations' },
                    { icon: '📡', text: 'Deliverables in industry-standard formats' },
                  ].map((item, i) => (
                    <li key={i} className="sidebar-list-item">
                      <span className="list-icon">{item.icon}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sidebar-card">
                <h3 className="sidebar-title">Connect With Us</h3>
                <div className="social-links">
                  {[
                    { label: 'LinkedIn',  icon: 'in', href: '#' },
                    { label: 'Instagram', icon: '◈',  href: '#' },
                    { label: 'YouTube',   icon: '▶',  href: '#' },
                  ].map(s => (
                    <a key={s.label} href={s.href} className="social-link">
                      <span className="social-icon">{s.icon}</span>
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ══ INFO CARDS — moved to bottom ══════════════════ */}
      <section ref={infoRef} className={`contact-strip contact-strip--bottom ${infoVisible ? 'revealed' : ''}`}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-tag">Reach Us Directly</span>
            <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Other Ways to Connect</h2>
          </div>
          <div className="contact-strip-grid">
            {INFO_CARDS.map((card, i) => (
              <a
                key={i}
                href={card.href}
                className={`contact-info-card revealed`}
                style={{ transitionDelay: `${i * 0.1}s` }}
                target={card.href?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                <div className="contact-info-icon">{card.icon}</div>
                <div className="contact-info-text">
                  <span className="contact-info-label">{card.label}</span>
                  <span className="contact-info-value">{card.value}</span>
                </div>
                <div className="contact-info-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAP ═══════════════════════════════════════════ */}
      <section ref={mapRef} className={`contact-map-section ${mapVisible ? 'revealed' : ''}`}>
        <div className="container">
          <div className="map-header">
            <h2 className="section-title">Find Us On The Map</h2>
            <p className="section-sub">
              Located in Coimbatore — the heart of Tamil Nadu's technology corridor.
            </p>
          </div>
          <div className="map-wrapper">
            <iframe
              title="Leona Tech Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125323.25540520457!2d76.87355!3d11.01680!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%" height="420"
              style={{ border: 0 }}
              allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;