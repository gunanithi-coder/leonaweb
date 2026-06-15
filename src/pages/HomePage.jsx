import React, { useEffect, useRef, useState } from 'react';
import { SERVICES } from './services';

/* ── Reveal hook ────────────────────────────────────────── */
const useReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

/* ── Animated counter ───────────────────────────────────── */
const Counter = ({ target, suffix = '', duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ── Service preview card ───────────────────────────────── */
const ServicePreviewCard = ({ service, index, navigate }) => {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`home-svc-card ${visible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
      onClick={() => navigate('services')}
    >
      <div className="home-svc-card-top">
        <span className="home-svc-icon">{service.icon}</span>
        <span className="home-svc-num">{service.num}</span>
      </div>
      {service.image && (
        <div className="home-svc-img">
          <img src={service.image} alt={service.title} loading="lazy" />
          <div className="home-svc-img-overlay" />
        </div>
      )}
      <div className="home-svc-body">
        <span className="home-svc-category">{service.category}</span>
        <h3 className="home-svc-title">{service.title}</h3>
        <p className="home-svc-sub">{service.sub}</p>
        <div className="home-svc-learn">
          View Details
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════════ */
const HomePage = ({ navigate }) => {
  const [whyRef, whyVisible]   = useReveal(0.1);
  const [ctaRef, ctaVisible]   = useReveal(0.1);
  const [stripRef, stripVisible] = useReveal(0.1);

  const STRIP_ITEMS = [
    'Drone Aerial Survey','LiDAR Mapping','GIS Analysis',
    'Photogrammetry','Flood Mapping','Volumetric Analysis',
    'Cadastral Survey','Project Monitoring','3D Reality Model',
    'DGCA Certified Operations',
  ];

  const WHY_FEATURES = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'DGCA Certified',
      desc: 'All drone operations are fully licensed and compliant with Indian aviation regulations.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      ),
      title: '±2cm Accuracy',
      desc: 'Sub-centimetre precision using RTK-GPS and GCP ground control point networks.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title: 'GIS-Ready Outputs',
      desc: 'Deliverables in industry-standard formats — SHP, DWG, GeoTIFF, LAS, and more.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: '48-hr Turnaround',
      desc: 'Rapid data processing and report delivery without compromising on quality.',
    },
  ];

  return (
    <div className="home-page">

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-blob-1" />
          <div className="hero-blob-2" />
          <div className="hero-blob-3" />
        </div>

        <div className="container">
          <div className="hero-inner">

            {/* LEFT: Content */}
            <div className="hero-content">
              <div className="hero-badge">
                <div className="hero-badge-dot">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                DGCA Certified · Tamil Nadu, India
              </div>

              <h1 className="hero-title">
                Precision
                <span className="highlight"> Drone Surveys</span>
                <br />
                for the <span className="accent">Digital Age</span>
              </h1>

              <p className="hero-desc">
                Leona Tech delivers high-accuracy drone surveying and geospatial
                solutions for infrastructure development, urban planning, and
                environmental assessment across India.
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={() => navigate('services')}>
                  Explore Services
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
                <button className="btn-secondary" onClick={() => navigate('contact')}>
                  Get a Free Quote
                </button>
              </div>
            </div>

            {/* RIGHT: Real drone image */}
            <div className="hero-visual">
              <div className="hero-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80"
                  alt="Drone surveying landscape"
                  className="hero-drone-img"
                />
                <div className="hero-img-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCROLLING STRIP ═══════════════════════════════ */}
      <div ref={stripRef} className={`services-strip ${stripVisible ? 'strip-visible' : ''}`}>
        <div className="services-strip-inner">
          {[...STRIP_ITEMS, ...STRIP_ITEMS].map((item, i) => (
            <React.Fragment key={i}>
              <span className="strip-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {item}
              </span>
              <span className="strip-divider" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ══ STATS BAND ════════════════════════════════════ */}
      <section className="stats-band">
        <div className="container">
          <div className="stats-band-grid">
            {[
              { num: 120, suffix: '+', label: 'Projects Completed'  },
              { num: 50,  suffix: '+', label: 'Clients Served'      },
              { num: 9,   suffix: '',  label: 'Service Categories'  },
              { num: 5,   suffix: '+', label: 'Years of Excellence' },
            ].map((s, i) => (
              <div key={i} className="stats-band-item">
                <div className="stats-band-num">
                  <Counter target={s.num} suffix={s.suffix} />
                </div>
                <div className="stats-band-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES PREVIEW ══════════════════════════════ */}
      <section className="home-services-section">
        <div className="container">
          <div className="home-services-header">
            <div>
              <span className="section-tag">What We Do</span>
              <h2 className="section-title">
                Geospatial Services <span>Built for Precision</span>
              </h2>
            </div>
            <p className="section-subtitle">
              From topographic surveys to 3D digital twins — nine specialised
              drone and GIS services engineered to deliver.
            </p>
          </div>

          <div className="home-svc-grid">
            {SERVICES.slice(0, 6).map((s, i) => (
              <ServicePreviewCard key={s.id} service={s} index={i} navigate={navigate} />
            ))}
          </div>

          <div className="home-services-footer">
            <button className="btn-teal home-view-all-btn" onClick={() => navigate('services')}>
              View All 9 Services
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════ */}
      <section className="why-section">
        <div className="container">
          <div ref={whyRef} className={`why-inner ${whyVisible ? 'revealed' : ''}`}>

            {/* LEFT: Real project aerial image */}
            <div className="why-visual">
              <div className="why-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                  alt="Aerial survey project"
                  className="why-project-img"
                />
                </div>
            </div>

            {/* RIGHT: Features */}
            <div className="why-content">
              <span className="section-tag">Why Choose Us</span>
              <h2 className="section-title">
                Where Technology Meets <span>Ground Truth</span>
              </h2>
              <p className="section-subtitle" style={{ marginBottom: '8px' }}>
                We combine cutting-edge drone hardware with expert GIS processing
                to deliver outputs that meet engineering-grade standards.
              </p>

              <div className="why-features">
                {WHY_FEATURES.map((f, i) => (
                  <div key={i} className="why-feature-item">
                    <div className="why-feature-icon">{f.icon}</div>
                    <div className="why-feature-body">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="btn-primary"
                style={{ marginTop: '32px' }}
                onClick={() => navigate('about')}
              >
                Learn More About Us
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ════════════════════════════════════ */}
      <section className="cta-section">
        <div className="container">
          <div ref={ctaRef} className={`cta-inner ${ctaVisible ? 'revealed' : ''}`}>
            <div className="cta-text">
              <span className="section-tag">Start Your Project</span>
              <h2>Ready to Survey Your Site?</h2>
              <p>
                Get a detailed project proposal within 48 hours. Free site
                assessment included for all new projects.
              </p>
            </div>
            <div className="cta-actions">
              <button className="btn-teal" onClick={() => navigate('contact')}>
                Request a Quote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <button className="btn-secondary" onClick={() => navigate('services')}>
                View Services
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;