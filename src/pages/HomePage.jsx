import React, { useEffect, useRef } from 'react';

/* ── Reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Icons ── */
const IconDrone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0"/>
    <path d="M4.93 4.93l2.83 2.83M16.24 7.76l2.83-2.83M7.76 16.24l-2.83 2.83M19.07 19.07l-2.83-2.83"/>
    <circle cx="5" cy="5" r="1.5"/><circle cx="19" cy="5" r="1.5"/>
    <circle cx="5" cy="19" r="1.5"/><circle cx="19" cy="19" r="1.5"/>
  </svg>
);

const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const IconScan = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
  </svg>
);

const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);

const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

/* ── SERVICES DATA ── */
const services = [
  { icon: <IconDrone />, title: 'Drone Surveying', desc: 'High-accuracy aerial surveys using advanced UAV technology. Capture detailed topographic data across vast areas with centimeter-level precision.' },
  { icon: <IconMap />, title: 'GIS Mapping & Analysis', desc: 'Comprehensive geographic information systems mapping. Transform raw spatial data into actionable intelligence for smarter decision-making.' },
  { icon: <IconScan />, title: 'Orthophoto Mapping', desc: 'Georeferenced aerial imagery with distortion removed. Precise, measurable orthophotos for urban planning and land management.' },
  { icon: <IconLayers />, title: '3D Terrain Modeling', desc: 'Detailed digital elevation models and 3D terrain reconstructions for construction planning, flood modeling, and site analysis.' },
  { icon: <IconShield />, title: 'Infrastructure Inspection', desc: 'Safe, efficient inspection of bridges, pipelines, towers, and buildings. Identify defects early with high-resolution drone imaging.' },
  { icon: <IconGlobe />, title: 'Environmental Assessment', desc: 'Vegetation mapping, habitat analysis, and environmental monitoring using multispectral and thermal drone sensors.' },
];

/* ── WHY US DATA ── */
const whyFeatures = [
  { icon: <IconTarget />, title: 'Centimeter-Level Accuracy', desc: 'Our RTK-enabled drone systems achieve ±1–3 cm positional accuracy, meeting the most demanding survey specifications.' },
  { icon: <IconBolt />, title: 'Faster Turnaround', desc: 'Cover 500+ acres per day vs. days with traditional survey methods. Rapid data processing with same-week deliverables.' },
  { icon: <IconClock />, title: 'End-to-End Service', desc: 'From flight planning and data capture to GIS processing and final deliverables — we handle everything in-house.' },
  { icon: <IconStar />, title: 'Certified & Compliant', desc: 'DGCA-certified pilots, fully licensed operations, comprehensive insurance, and adherence to all Indian airspace regulations.' },
];

/* ── STATS ── */
const stats = [
  { num: '200+', label: 'Projects Completed' },
  { num: '50+', label: 'Clients Served' },
  { num: '10K+', label: 'Hectares Surveyed' },
  { num: '99.8%', label: 'Data Accuracy' },
];

/* ── STRIP ITEMS ── */
const stripItems = ['Drone Surveying', 'GIS Mapping', '3D Modeling', 'Orthophoto Processing', 'Infrastructure Inspection', 'Environmental Assessment', 'Topographic Surveys', 'Aerial Photography'];

export default function HomePage({ navigate }) {
  useReveal();

  return (
    <main>
      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-blob-1" />
          <div className="hero-blob-2" />
          <div className="hero-blob-3" />
        </div>

        <div className="container">
          <div className="hero-inner">
            {/* Content */}
            <div className="hero-content">
              <div className="hero-badge">
                <div className="hero-badge-dot">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                DGCA Certified · Trusted by 50+ Clients
              </div>

              <h1 className="hero-title">
                Precision <span className="highlight">Geospatial</span><br />
                Intelligence from the <span className="accent">Sky</span>
              </h1>

              <p className="hero-desc">
                Leona Tech & Geo Solutions delivers cutting-edge drone surveying, GIS mapping, and 3D terrain modeling for infrastructure projects, urban development, and environmental monitoring across India.
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={() => navigate('contact')}>
                  Get a Free Quote <IconArrow />
                </button>
                <button className="btn-secondary" onClick={() => navigate('about')}>
                  Our Story
                </button>
              </div>

              <div className="hero-stats">
                {stats.map((s, i) => (
                  <div className="hero-stat-item" key={i}>
                    <div className="hero-stat-num">{s.num}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="hero-visual">
              <div className="hero-card-stack">
                {/* Float top-right */}
                <div className="hero-float-card card-top-right">
                  <div className="float-card-label">Accuracy</div>
                  <div className="float-card-value">±1.5 cm</div>
                </div>

                {/* Main card */}
                <div className="hero-main-card">
                  <div className="hero-map-placeholder">
                    <div className="map-grid-overlay" />
                    <div className="map-contour" style={{ width: 180, height: 180, top: '10%', left: '10%' }} />
                    <div className="map-contour" style={{ width: 130, height: 130, top: '25%', left: '25%' }} />
                    <div className="map-contour" style={{ width: 80, height: 80, top: '40%', left: '40%' }} />
                    <div className="map-pin" />
                  </div>
                  <div className="hero-card-meta">
                    <div className="hero-card-info">
                      <h4>Survey Mission Active</h4>
                      <p>Chennai Industrial Zone · 240 ha</p>
                    </div>
                    <div className="hero-card-badge">Live</div>
                  </div>
                </div>

                {/* Float bottom-left */}
                <div className="hero-float-card card-bottom-left">
                  <div className="float-card-icon">
                    <IconDrone />
                  </div>
                  <div className="float-card-label">Coverage Rate</div>
                  <div className="float-card-value">500 ha/day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES STRIP ══ */}
      <div className="services-strip">
        <div className="services-strip-inner">
          {[...stripItems, ...stripItems].map((item, i) => (
            <React.Fragment key={i}>
              <div className="strip-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {item}
              </div>
              <div className="strip-divider" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section className="services-section">
        <div className="container">
          <div className="services-header reveal">
            <div className="section-tag">What We Do</div>
            <h2 className="section-title">Comprehensive <span>Geospatial</span> Services</h2>
            <p className="section-subtitle" style={{ marginTop: 12 }}>
              From aerial data capture to final GIS deliverables, we provide end-to-end geospatial solutions tailored to your project requirements.
            </p>
          </div>

          <div className="services-grid">
            {services.map((s, i) => (
              <div className="service-card reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="service-learn-more">
                  Learn More <IconArrow />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS BAND ══ */}
      <div className="stats-band">
        <div className="container">
          <div className="stats-band-grid">
            {stats.map((s, i) => (
              <div className="stats-band-item reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="stats-band-num">{s.num}</div>
                <div className="stats-band-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ WHY US ══ */}
      <section className="why-section">
        <div className="container">
          <div className="why-inner">
            {/* Visual */}
            <div className="why-visual">
              <div className="why-visual-card">
                <div className="why-card-stat">
                  <div className="big-num">200<span>+</span></div>
                  <p>Successful survey missions across Tamil Nadu and beyond</p>
                </div>
              </div>
              <div className="why-float-stat stat-right">
                <div className="stat-n">50+</div>
                <div className="stat-l">Happy Clients</div>
              </div>
              <div className="why-float-stat stat-bottom">
                <div className="stat-n">4+</div>
                <div className="stat-l">Years Experience</div>
              </div>
            </div>

            {/* Content */}
            <div className="why-content">
              <div className="section-tag reveal">Why Choose Us</div>
              <h2 className="section-title reveal">
                The Precision You Need.<br />
                <span>The Trust You Deserve.</span>
              </h2>
              <p className="section-subtitle reveal" style={{ marginTop: 12 }}>
                We combine advanced drone technology with deep geospatial expertise to deliver survey-grade results — on time, every time.
              </p>

              <div className="why-features">
                {whyFeatures.map((f, i) => (
                  <div className="why-feature-item reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="why-feature-icon">{f.icon}</div>
                    <div className="why-feature-body">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner reveal">
            <div className="cta-text">
              <div className="section-tag">Ready to Start?</div>
              <h2>Let's Map Your Next Project Together</h2>
              <p>Get a free consultation and project quote from our team of certified drone survey specialists.</p>
            </div>
            <div className="cta-actions">
              <button className="btn-primary" onClick={() => navigate('contact')}>
                Get a Free Quote <IconArrow />
              </button>
              <button className="btn-secondary" onClick={() => navigate('about')} style={{ background: 'transparent', color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.2)' }}>
                Learn About Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
