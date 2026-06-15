import React, { useEffect, useRef, useState } from 'react';

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

const AboutPage = ({ navigate }) => {
  const [heroRef,    heroVisible]    = useReveal(0.05);
  const [storyRef,   storyVisible]   = useReveal(0.1);
  const [missionRef, missionVisible] = useReveal(0.1);
  const [teamRef,    teamVisible]    = useReveal(0.1);
  const [certsRef,   certsVisible]   = useReveal(0.1);

  const TEAM = [
    { initials: 'RK', name: 'Rajesh Kumar',   role: 'CEO & Founder',        bio: 'GIS expert with 10+ years in geospatial technology and UAV operations across South India.' },
    { initials: 'PM', name: 'Priya Meenakshi', role: 'Head of Operations',   bio: 'Specialises in large-scale drone survey planning, regulatory compliance, and project delivery.' },
    { initials: 'AV', name: 'Arun Vijay',      role: 'Lead GIS Analyst',     bio: 'Expert in photogrammetry, LiDAR processing, and GIS database development for infrastructure.' },
  ];

  const CERTS = [
    { icon: '🛡️', title: 'DGCA Certified',     sub: 'Drone Operations License'    },
    { icon: '📡', title: 'Remote Pilot',        sub: 'RPTO Certified Pilots'       },
    { icon: '🗺️', title: 'GIS Professional',   sub: 'Certified Analysts'          },
    { icon: '✅', title: 'ISO Compliant',       sub: 'Quality Management'          },
    { icon: '🏛️', title: 'Govt. Empanelled',   sub: 'State & Central Bodies'      },
  ];

  const TIMELINE = [
    { year: '2020', title: 'Company Founded',        desc: 'Started in Chennai with a vision to modernise India\'s surveying industry using drones.',  active: false },
    { year: '2021', title: 'First Major Contract',   desc: 'Delivered topographical surveys for 3 municipal corporations in Tamil Nadu.',               active: false },
    { year: '2022', title: 'DGCA Certification',     desc: 'Obtained full DGCA drone operation licenses and expanded to a fleet of 8 UAVs.',            active: false },
    { year: '2023', title: 'GIS Division Launch',    desc: 'Launched dedicated GIS analysis and 3D modelling services for urban planning clients.',     active: false },
    { year: '2024', title: '100+ Projects Milestone',desc: 'Crossed 100 successful project deliveries across infrastructure, water, and mining sectors.',active: true  },
  ];

  return (
    <div className="about-page">

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section ref={heroRef} className={`about-hero ${heroVisible ? 'revealed' : ''}`}>
        <div className="container">
          <div className="about-hero-inner">

            {/* LEFT: Content */}
            <div className="about-hero-content">
              <span className="section-tag">About Leona Tech</span>
              <h1 className="section-title">
                Mapping India's Future,<br />
                <span>One Survey at a Time</span>
              </h1>
              <p className="section-subtitle" style={{ marginBottom: '32px' }}>
                Founded in Chennai, Leona Tech & Geo Solutions Pvt Ltd is a
                technology-driven geospatial services company. We harness the
                power of advanced UAVs and GIS technology to deliver precise,
                actionable spatial data for India's growing infrastructure needs.
              </p>
              <div className="about-hero-actions">
                <button className="btn-teal" onClick={() => navigate('contact')}>
                  Work With Us
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

            {/* RIGHT: Clean drone image, no badges */}
            <div className="about-hero-visual">
              <div className="about-hero-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=900&q=80"
                  alt="Drone in action over survey site"
                  className="about-hero-img"
                />
                <div className="about-hero-img-overlay" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════ */}
      <section className="stats-band">
        <div className="container">
          <div className="stats-band-grid">
            {[
              { num: 120, suffix: '+', label: 'Projects Completed'  },
              { num: 50,  suffix: '+', label: 'Clients Served'      },
              { num: 5,   suffix: '+', label: 'Years Experience'    },
              { num: 9,   suffix: '',  label: 'Service Categories'  },
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

      {/* ══ STORY + TIMELINE ══════════════════════════════ */}
      <section className="story-section">
        <div className="container">
          <div ref={storyRef} className={`story-inner ${storyVisible ? 'revealed' : ''}`}>

            <div className="story-content">
              <span className="section-tag">Our Story</span>
              <h2>Built on Precision,<br />Driven by Purpose</h2>
              <p>
                Leona Tech was founded with a clear mission — to bring
                engineering-grade geospatial intelligence to India's rapidly
                growing infrastructure sector. What started as a small drone
                survey operation in Chennai has grown into a full-service
                geospatial company trusted by municipal corporations, mining
                firms, and government bodies across South India.
              </p>
              <p>
                We believe that accurate data is the foundation of every great
                infrastructure project. Our team of DGCA-certified pilots and
                GIS analysts work together to deliver not just data, but insights
                that drive better planning and smarter decisions.
              </p>
              <button className="btn-secondary" style={{ marginTop: '24px' }} onClick={() => navigate('contact')}>
                Get in Touch
              </button>
            </div>

            <div className="story-timeline">
              {TIMELINE.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className={`timeline-dot ${item.active ? 'active' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {item.active
                        ? <polyline points="20 6 9 17 4 12"/>
                        : <circle cx="12" cy="12" r="4"/>
                      }
                    </svg>
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-year">{item.year}</div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══ MISSION / VISION ══════════════════════════════ */}
      <section className="mission-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-tag">What Drives Us</span>
            <h2 className="section-title">Mission & Vision</h2>
          </div>
          <div ref={missionRef} className={`mission-grid ${missionVisible ? 'revealed' : ''}`}>
            <div className="mission-card mission">
              <div className="mission-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To deliver high-accuracy, technology-driven geospatial solutions
                that empower infrastructure planners, government bodies, and
                private enterprises with actionable spatial intelligence —
                making India's development faster, smarter, and more efficient.
              </p>
            </div>
            <div className="mission-card vision">
              <div className="mission-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To become India's most trusted geospatial intelligence partner —
                setting the benchmark for drone survey accuracy, GIS output
                quality, and project delivery speed across infrastructure,
                urban planning, and environmental sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════════════ */}
      <section className="team-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-tag">The Team</span>
            <h2 className="section-title">People Behind the Precision</h2>
          </div>
          <div ref={teamRef} className={`team-grid ${teamVisible ? 'revealed' : ''}`}>
            {TEAM.map((m, i) => (
              <div key={i} className="team-card">
                <div className="team-avatar">{m.initials}</div>
                <h4>{m.name}</h4>
                <p className="role">{m.role}</p>
                <p className="bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ════════════════════════════════ */}
      <section className="certs-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span className="section-tag">Credentials</span>
            <h2 className="section-title">Certified & Compliant</h2>
          </div>
          <div ref={certsRef} className={`certs-grid ${certsVisible ? 'revealed' : ''}`}>
            {CERTS.map((c, i) => (
              <div key={i} className="cert-badge">
                <div className="cert-badge-icon">
                  <span style={{ fontSize: '1.1rem' }}>{c.icon}</span>
                </div>
                <div className="cert-badge-text">
                  <h5>{c.title}</h5>
                  <p>{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner revealed">
            <div className="cta-text">
              <span className="section-tag">Let's Work Together</span>
              <h2>Ready to Start Your Project?</h2>
              <p>
                Talk to our survey engineers today and get a free site
                assessment for your next project.
              </p>
            </div>
            <div className="cta-actions">
              <button className="btn-teal" onClick={() => navigate('contact')}>
                Contact Us
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <button className="btn-secondary" onClick={() => navigate('services')}>
                Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;