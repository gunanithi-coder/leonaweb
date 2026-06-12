import React, { useState, useEffect } from 'react';

export default function Navbar({ currentPage, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { key: 'home',     label: 'Home' },
    { key: 'about',    label: 'About' },
    { key: 'services', label: 'Services' },
    { key: 'contact',  label: 'Contact' },
  ];

  const handleNav = (key) => {
    navigate(key);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNav('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">Leona Tech</span>
            <span className="logo-sub">& Geo Solutions</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="navbar-links">
          {links.map(l => (
            <span
              key={l.key}
              className={`nav-link${currentPage === l.key ? ' active' : ''}`}
              onClick={() => handleNav(l.key)}
            >
              {l.label}
            </span>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="navbar-cta">
          <button className="btn-secondary" onClick={() => handleNav('contact')} style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            Contact Us
          </button>
          <button className="btn-primary" onClick={() => handleNav('contact')} style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            Get a Quote
          </button>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <span
            key={l.key}
            className={`mobile-nav-link${currentPage === l.key ? ' active' : ''}`}
            onClick={() => handleNav(l.key)}
          >
            {l.label}
          </span>
        ))}
        <button className="btn-primary" onClick={() => handleNav('contact')} style={{ marginTop: '8px', justifyContent: 'center' }}>
          Get a Quote
        </button>
      </div>
    </nav>
  );
}
