import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoIcon from '../assets/logo-icon.png';
import LogoText from '../assets/logo-text.png';

const NAV_LINKS = [
  { label: 'Home',     page: 'home'     },
  { label: 'Services', page: 'services' },
  { label: 'About',    page: 'about'    },
  { label: 'Contact',  page: 'contact'  },
];

const Navbar = ({ currentPage, navigate }) => {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [hideNav,    setHideNav]    = useState(false);
  const [showItems,  setShowItems]  = useState(false);
  const lastScrollY  = useRef(0);
  const navRef       = useRef(null);

  /* ── Trigger staggered nav item entrance on mount ── */
  useEffect(() => {
    const t = setTimeout(() => setShowItems(true), 400);
    return () => clearTimeout(t);
  }, []);

  /* ── Scroll: shadow + hide-on-scroll-down ────────── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHideNav(y > lastScrollY.current && y > 80);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close drawer on page change ─────────────────── */
  useEffect(() => {
    setMenuOpen(false);
  }, [currentPage]);

  /* ── Close menu on outside click ─────────────────── */
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  /* ── Lock body scroll when drawer open ───────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (p) => {
    navigate(p);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`navbar ${scrolled ? 'scrolled' : ''} ${hideNav ? 'hidden' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-container">

          {/* ── LOGO ────────────────────────────────────── */}
          <motion.button
            className="nav-logo"
            onClick={() => handleNav('home')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nav-logo-icon">
              <img src={LogoIcon} alt="Leona Tech icon" />
            </div>
            <div className="nav-logo-text-img">
              <img src={LogoText} alt="LEONA" className="nav-logotext-img" />
            </div>
          </motion.button>

          {/* ── DESKTOP LINKS ───────────────────────────── */}
          <ul className="nav-links">
            {NAV_LINKS.map(({ label, page }, i) => (
              <motion.li
                key={page}
                initial={{ opacity: 0, y: -12 }}
                animate={showItems ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <button
                  className={`nav-link ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handleNav(page)}
                >
                  {label}
                  <span className="nav-link-dot" />
                </button>
              </motion.li>
            ))}

            {/* CTA pill */}
            <motion.li
              initial={{ opacity: 0, y: -12 }}
              animate={showItems ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              transition={{
                delay: 0.3 + NAV_LINKS.length * 0.1,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button className="nav-cta" onClick={() => handleNav('contact')}>
                Get a Quote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </motion.li>
          </ul>

          {/* ── HAMBURGER ───────────────────────────────── */}
          <motion.button
            className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <span className="ham-line ham-line--top"    />
            <span className="ham-line ham-line--mid"    />
            <span className="ham-line ham-line--bottom" />
          </motion.button>

        </div>
      </motion.nav>

      {/* ── MOBILE BACKDROP ─────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-backdrop open"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      {/* ── MOBILE DRAWER ───────────────────────────────── */}
      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`}>

        {/* Drawer header */}
        <div className="drawer-header">
          <div className="drawer-logo">
            <div className="nav-logo-icon nav-logo-icon--sm">
              <img src={LogoIcon} alt="Leona Tech icon" />
            </div>
            <div className="nav-logo-text-img">
              <img src={LogoText} alt="LEONA" className="nav-logotext-img" />
            </div>
          </div>
          <button
            className="drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6"  x2="6"  y2="18"/>
              <line x1="6"  y1="6"  x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <ul className="drawer-links">
          {NAV_LINKS.map(({ label, page }, i) => (
            <motion.li
              key={page}
              className="drawer-link-item"
              initial={{ opacity: 0, x: -16 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{
                delay: i * 0.07,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                className={`drawer-link ${currentPage === page ? 'active' : ''}`}
                onClick={() => handleNav(page)}
              >
                <span className="drawer-link-num">0{i + 1}</span>
                {label}
                <svg className="drawer-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Drawer CTA */}
        <div className="drawer-cta-wrap">
          <button className="drawer-cta" onClick={() => handleNav('contact')}>
            Get a Free Quote
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <div className="drawer-contact-info">
            <a href="tel:+919876543210" className="drawer-contact-link">
              📞 +91 98765 43210
            </a>
            <a href="mailto:info@leonatech.in" className="drawer-contact-link">
              ✉️ info@leonatech.in
            </a>
          </div>
        </div>

        {/* Decorative geo lines */}
        <div className="drawer-decoration" aria-hidden="true">
          <svg viewBox="0 0 300 200" fill="none">
            <circle cx="280" cy="180" r="120" stroke="rgba(13,110,110,0.08)" strokeWidth="40"/>
            <circle cx="280" cy="180" r="80"  stroke="rgba(37,99,235,0.06)"  strokeWidth="1"/>
            <path d="M0,80 C60,50 120,110 180,70 S260,90 300,60"
                  stroke="rgba(13,110,110,0.1)" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

      </div>
    </>
  );
};

export default Navbar;