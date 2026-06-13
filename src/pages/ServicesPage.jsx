import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, SERVICE_TABS, CATEGORY_META } from './services';
import './services.js';

/* ── Reveal hook ───────────────────────────────────────── */
const useReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, visible];
};

/* ── Scroll progress hook ──────────────────────────────── */
const useScrollProgress = (ref) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const winH  = window.innerHeight;
      const total = rect.height + winH;
      const gone  = winH - rect.top;
      setProgress(Math.min(1, Math.max(0, gone / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
  return progress;
};

/* ═══════════════════════════════════════════════════════════
   SERVICE CARD
   ═══════════════════════════════════════════════════════════ */
const ServiceCard = ({ service, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [ref, visible] = useReveal(0.08);

  return (
    <article
      ref={ref}
      className={`svc-card ${visible ? 'revealed' : ''} ${expanded ? 'expanded' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 0.08}s` }}
    >
      {/* Image strip */}
      <div className="svc-card-img">
        {service.image ? (
          <img src={service.image} alt={service.title} loading="lazy" />
        ) : (
          <div className="svc-card-img-placeholder">
            <span>{service.icon}</span>
          </div>
        )}
        <div className="svc-card-img-overlay" />
        <span className="svc-card-num">{service.num}</span>
        <span className="svc-card-category">{service.category}</span>
      </div>

      {/* Body */}
      <div className="svc-card-body">
        <div className="svc-card-icon-wrap">{service.icon}</div>
        <h3 className="svc-card-title">{service.title}</h3>
        <p className="svc-card-sub">{service.sub}</p>
        <p className="svc-card-desc">{service.desc}</p>

        {/* Expand toggle */}
        <button
          className="svc-card-toggle"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
        >
          {expanded ? 'Hide Details' : 'View Process & Deliverables'}
          <span className={`toggle-chevron ${expanded ? 'up' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        {/* Expandable details */}
        <div className={`svc-card-details ${expanded ? 'open' : ''}`}>
          <div className="svc-detail-grid">
            {/* Process */}
            <div className="svc-detail-col">
              <h4 className="svc-detail-heading">
                <span className="detail-dot detail-dot--teal" />
                Our Process
              </h4>
              <ol className="svc-process-list">
                {service.process.map((step, i) => (
                  <li key={i} className="svc-process-item">
                    <span className="process-step-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Deliverables */}
            <div className="svc-detail-col">
              <h4 className="svc-detail-heading">
                <span className="detail-dot detail-dot--blue" />
                Deliverables
              </h4>
              <ul className="svc-deliverables-list">
                {service.deliverables.map((d, i) => (
                  <li key={i} className="svc-deliverable-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="check-icon">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a href="#contact" className="svc-cta-btn">
            Request This Service
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

/* ═══════════════════════════════════════════════════════════
   CATEGORY HERO BANNER
   ═══════════════════════════════════════════════════════════ */
const CategoryHero = ({ category, services }) => {
  const ref = useRef(null);
  const progress = useScrollProgress(ref);
  const meta = CATEGORY_META[category] || {};

  return (
    <section
      ref={ref}
      className="cat-hero"
      style={{
        '--hero-color':  meta.heroColor  || '#0D6E6E',
        '--hero-accent': meta.heroAccent || '#2563EB',
      }}
    >
      {/* Parallax BG */}
      <div
        className="cat-hero-bg"
        style={{
          backgroundImage: `url(${meta.bgImage})`,
          transform: `translateY(${progress * 60}px)`,
        }}
      />
      <div className="cat-hero-overlay" />

      {/* Contour lines decoration */}
      <div className="cat-hero-contours" aria-hidden="true">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          {[40, 80, 120, 160].map((y, i) => (
            <path
              key={i}
              d={`M0,${y} C360,${y - 30 + i * 10} 720,${y + 40 - i * 8} 1440,${y - 20 + i * 5}`}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="cat-hero-content">
        <div className="cat-hero-tag">
          <span className="cat-tag-line" />
          {category}
        </div>
        <h2 className="cat-hero-title">{meta.tagline || category}</h2>
        <div className="cat-hero-stats">
          <div className="cat-stat">
            <span className="cat-stat-num">{services.length}</span>
            <span className="cat-stat-label">Services</span>
          </div>
          <div className="cat-stat-divider" />
          <div className="cat-stat">
            <span className="cat-stat-num">100%</span>
            <span className="cat-stat-label">DGCA Certified</span>
          </div>
          <div className="cat-stat-divider" />
          <div className="cat-stat">
            <span className="cat-stat-num">±2cm</span>
            <span className="cat-stat-label">Accuracy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('All Services');
  const [stickyTab, setStickyTab] = useState(false);
  const tabBarRef = useRef(null);
  const [pageRef, pageVisible] = useReveal(0.01);

  /* Sticky tab bar on scroll */
  useEffect(() => {
    const onScroll = () => {
      if (!tabBarRef.current) return;
      setStickyTab(tabBarRef.current.getBoundingClientRect().top <= 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Filtered services */
  const filtered = activeTab === 'All Services'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeTab);

  /* Group by category for the scroll sections */
  const grouped = SERVICE_TABS.slice(1).reduce((acc, cat) => {
    const items = (activeTab === 'All Services' ? SERVICES : filtered)
      .filter(s => s.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  /* If a specific tab is active, just show those services flat */
  const isSingleCat = activeTab !== 'All Services';

  return (
    <div ref={pageRef} className={`services-page ${pageVisible ? 'page-visible' : ''}`}>

      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <header className="svc-page-hero">
        <div className="svc-page-hero-bg" aria-hidden="true">
          {/* Animated grid */}
          <svg className="hero-grid-svg" viewBox="0 0 1440 560" preserveAspectRatio="none">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 130} y1="0" x2={i * 130} y2="560" stroke="rgba(13,110,110,0.07)" strokeWidth="1" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 80} x2="1440" y2={i * 80} stroke="rgba(13,110,110,0.07)" strokeWidth="1" />
            ))}
            {/* Accent circle */}
            <circle cx="1200" cy="100" r="200" fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="40" />
            <circle cx="1200" cy="100" r="280" fill="none" stroke="rgba(13,110,110,0.04)" strokeWidth="1" />
          </svg>
        </div>

        <div className="container">
          <div className="svc-page-hero-content">
            <div className="svc-hero-badge">
              <span className="badge-icon">🛩</span>
              Geospatial Services
            </div>
            <h1 className="svc-page-hero-title">
              What We
              <em> Survey,</em>
              <br />What We
              <em> Deliver</em>
            </h1>
            <p className="svc-page-hero-desc">
              Nine specialised drone &amp; GIS services — from urban digital twins
              to flood-risk models — engineered for accuracy, speed, and
              regulatory compliance across Tamil Nadu and beyond.
            </p>
            <div className="svc-hero-pills">
              <span className="svc-pill">⚡ 48-hr Turnaround</span>
              <span className="svc-pill">📡 DGCA Certified</span>
              <span className="svc-pill">🗺 GIS-Ready Outputs</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── STICKY FILTER TABS ────────────────────────────── */}
      <div ref={tabBarRef} className={`svc-tabs-bar ${stickyTab ? 'sticky' : ''}`}>
        <div className="container">
          <div className="svc-tabs-scroll">
            {SERVICE_TABS.map(tab => (
              <button
                key={tab}
                className={`svc-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab !== 'All Services' && (
                  <span className="svc-tab-count">
                    {SERVICES.filter(s => s.category === tab).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICE SECTIONS ─────────────────────────────── */}
      <main className="svc-main">
        {isSingleCat ? (
          /* Single category view — no hero, just cards */
          <section className="svc-section">
            <div className="container">
              <div className="svc-grid">
                {filtered.map((s, i) => (
                  <ServiceCard key={s.id} service={s} index={i} />
                ))}
              </div>
            </div>
          </section>
        ) : (
          /* All Services — grouped by category with hero banners */
          Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="svc-category-block">
              <CategoryHero category={cat} services={items} />
              <section className="svc-section">
                <div className="container">
                  <div className="svc-grid">
                    {items.map((s, i) => (
                      <ServiceCard key={s.id} service={s} index={i} />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          ))
        )}
      </main>

      {/* ── BOTTOM CTA ────────────────────────────────────── */}
      <section className="svc-bottom-cta">
        <div className="container">
          <div className="svc-cta-card">
            <div className="svc-cta-decoration" aria-hidden="true">
              <svg viewBox="0 0 500 200" fill="none">
                <circle cx="420" cy="40"  r="120" fill="rgba(13,110,110,0.08)" />
                <circle cx="80"  cy="160" r="80"  fill="rgba(37,99,235,0.06)" />
                <path d="M0,100 C120,60 240,140 360,80 S480,120 500,100" stroke="rgba(13,110,110,0.2)" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="svc-cta-text">
              <h2 className="svc-cta-title">Don't see what you need?</h2>
              <p className="svc-cta-desc">
                We tailor geospatial solutions to your exact project requirements.
                Talk to our survey engineers today.
              </p>
            </div>
            <div className="svc-cta-actions">
              <a href="#contact" className="btn-cta-primary">Request a Custom Quote</a>
              <a href="tel:+919876543210" className="btn-cta-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.71 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.58 2.81.71A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;