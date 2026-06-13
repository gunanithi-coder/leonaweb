import React from 'react';
import LogoIcon from '../assets/logo-icon.png';
import LogoText from '../assets/logo-text.png';

const SERVICES_LINKS = [
  'Topographical Survey',
  '3D Reality Model',
  'Water Body Mapping',
  'Flood Mapping',
  'Volumetric Analysis',
  'Project Monitoring',
];

const COMPANY_LINKS = [
  { label: 'Home',     page: 'home'     },
  { label: 'About Us', page: 'about'    },
  { label: 'Services', page: 'services' },
  { label: 'Contact',  page: 'contact'  },
];

const Footer = ({ navigate }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">

        {/* ── TOP CTA BANNER ──────────────────────────── */}
        <div className="footer-cta-banner">
          <div className="footer-cta-text">
            <h3 className="footer-cta-title">
              Ready to map your next project?
            </h3>
            <p className="footer-cta-sub">
              Get a free consultation with our geospatial experts.
            </p>
          </div>
          <div className="footer-cta-actions">
            <button
              className="footer-cta-btn-primary"
              onClick={() => navigate('contact')}
            >
              Get a Free Quote
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <a href="tel:+919876543210" className="footer-cta-btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.71 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.58 2.81.71A2 2 0 0 1 22 16.92z"/>
              </svg>
              +91 98765 43210
            </a>
          </div>
        </div>

        {/* ── DIVIDER ─────────────────────────────────── */}
        <div className="footer-divider" />

        {/* ── MAIN GRID ───────────────────────────────── */}
        <div className="footer-grid">

          {/* Brand col */}
          <div className="footer-brand">
            <button className="footer-logo" onClick={() => navigate('home')}>
              <div className="footer-logo-icon">
                <img src={LogoIcon} alt="Leona Tech icon" />
              </div>
              <div className="footer-logo-text">
                <img src={LogoText} alt="LEONA" className="footer-logotext-img" />
              </div>
            </button>

            <p className="footer-brand-desc">
              DGCA-certified drone survey and geospatial solutions for
              infrastructure, urban planning, and environmental projects
              across Tamil Nadu and beyond.
            </p>

            {/* Certifications row */}
            <div className="footer-certs">
              <span className="footer-cert-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                DGCA Certified
              </span>
              <span className="footer-cert-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                ISO Compliant
              </span>
            </div>

            {/* Socials */}
            <div className="footer-socials">
              {[
                {
                  label: 'LinkedIn',
                  href: '#',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  href: '#',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                  ),
                },
                {
                  label: 'YouTube',
                  href: '#',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.5a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer-social-btn"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services col */}
          <div className="footer-col">
            <h5 className="footer-col-title">Our Services</h5>
            <ul className="footer-col-links">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <button
                    className="footer-col-link"
                    onClick={() => navigate('services')}
                  >
                    <span className="footer-link-arrow">→</span>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company col */}
          <div className="footer-col">
            <h5 className="footer-col-title">Company</h5>
            <ul className="footer-col-links">
              {COMPANY_LINKS.map(({ label, page }) => (
                <li key={page}>
                  <button
                    className="footer-col-link"
                    onClick={() => navigate(page)}
                  >
                    <span className="footer-link-arrow">→</span>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="footer-col">
            <h5 className="footer-col-title">Contact Us</h5>
            <div className="footer-contact-list">
              <a href="tel:+919876543210" className="footer-contact-item">
                <div className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.71 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.58 2.81.71A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <span className="footer-contact-label">Phone</span>
                  <span className="footer-contact-value">+91 98765 43210</span>
                </div>
              </a>

              <a href="mailto:info@leonatech.in" className="footer-contact-item">
                <div className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span className="footer-contact-label">Email</span>
                  <span className="footer-contact-value">info@leonatech.in</span>
                </div>
              </a>

              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span className="footer-contact-label">Location</span>
                  <span className="footer-contact-value">Coimbatore, Tamil Nadu</span>
                </div>
              </div>

              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <span className="footer-contact-label">Working Hours</span>
                  <span className="footer-contact-value">Mon–Sat, 9AM–6PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ──────────────────────────────── */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} Leona Tech & Geo Solutions Pvt. Ltd. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <span className="footer-bottom-link">Privacy Policy</span>
            <span className="footer-bottom-divider">·</span>
            <span className="footer-bottom-link">Terms of Service</span>
            <span className="footer-bottom-divider">·</span>
            <span className="footer-bottom-link">Sitemap</span>
          </div>
          <p className="footer-made-with">
            Built with precision in 🇮🇳 India
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;