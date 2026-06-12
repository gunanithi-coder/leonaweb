import React, { useEffect } from 'react';

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

const IconTarget  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const IconEye     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconMap     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
const IconShield  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconAward   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
const IconGlobe   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
const IconStar    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconArrow   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconDrone   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0"/><path d="M4.93 4.93l2.83 2.83M16.24 7.76l2.83-2.83M7.76 16.24l-2.83 2.83M19.07 19.07l-2.83-2.83"/><circle cx="5" cy="5" r="1.5"/><circle cx="19" cy="5" r="1.5"/><circle cx="5" cy="19" r="1.5"/><circle cx="19" cy="19" r="1.5"/></svg>;
const IconCheck   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const timeline = [
  { year: '2020', title: 'Company Founded', desc: 'Leona Tech established in Chennai with a small team of passionate geospatial engineers and a single survey drone.', active: false },
  { year: '2021', title: 'First Major Contract', desc: 'Secured our first large-scale infrastructure survey contract — 1,200 hectares for a highway development project.', active: false },
  { year: '2022', title: 'DGCA Certification', desc: 'Achieved full DGCA certification for all pilot operators. Expanded fleet to 6 advanced UAV systems.', active: false },
  { year: '2023', title: 'GIS Lab Established', desc: 'Opened a dedicated GIS processing lab with advanced photogrammetry and LiDAR processing capabilities.', active: false },
  { year: '2024', title: '200+ Projects Milestone', desc: 'Crossed 200 completed survey missions and 50+ satisfied clients across Tamil Nadu, Karnataka, and Andhra Pradesh.', active: true },
];

const team = [
  { name: 'Demo Lead', role: 'Founder & CEO', bio: 'Geospatial engineering expert with 10+ years in drone survey and GIS. Certified remote pilot and licensed surveyor.', initials: 'DL' },
  { name: 'Demo Engineer', role: 'Chief Survey Officer', bio: 'Specializes in photogrammetry and 3D reconstruction. Led 100+ large-scale survey missions across South India.', initials: 'DE' },
  { name: 'Demo Analyst', role: 'GIS Analyst Lead', bio: 'GIS software specialist with expertise in QGIS, ArcGIS, and custom geospatial data pipelines for clients.', initials: 'DA' },
];

const certs = [
  { title: 'DGCA Certified', sub: 'Drone Operations', icon: <IconShield /> },
  { title: 'ISO 9001:2015', sub: 'Quality Management', icon: <IconAward /> },
  { title: 'NSDI Compliant', sub: 'Spatial Data Standards', icon: <IconGlobe /> },
  { title: 'Survey of India', sub: 'Licensed Partner', icon: <IconMap /> },
];

export default function AboutPage({ navigate }) {
  useReveal();

  return (
    <main>
      {/* ══ ABOUT HERO ══ */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-inner">
            <div className="about-hero-content">
              <div className="section-tag">About Leona Tech</div>
              <h1 className="section-title">
                Mapping India's Future,<br />
                <span>One Survey at a Time</span>
              </h1>
              <p className="section-subtitle">
                Founded in Chennai, Leona Tech & Geo Solutions Pvt Ltd is a technology-driven geospatial services company. We harness the power of advanced UAVs and GIS technology to deliver precise, actionable spatial data for India's growing infrastructure needs.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                <button className="btn-teal" onClick={() => navigate('contact')}>
                  Work With Us <IconArrow />
                </button>
                <button className="btn-secondary">
                  View Projects
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="about-hero-visual">
              <div className="about-img-card">
                <div className="about-img-pattern" />
                <div className="about-img-icon">
                  <IconDrone />
                </div>
              </div>
              <div className="about-float f1">
                <div className="about-float-label">Est.</div>
                <div className="about-float-val">2020</div>
              </div>
              <div className="about-float f2">
                <div className="about-float-label">HQ</div>
                <div className="about-float-val">Chennai, TN</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STORY + TIMELINE ══ */}
      <section className="story-section">
        <div className="container">
          <div className="story-inner">
            {/* Story text */}
            <div className="story-content reveal">
              <div className="section-tag">Our Story</div>
              <h2>Built on Precision, Driven by Purpose</h2>
              <p>
                Leona Tech & Geo Solutions was born from a simple belief: that India's infrastructure boom deserved better spatial data — faster, more accurate, and more accessible than traditional survey methods could provide.
              </p>
              <p>
                Starting with a single drone and a team of three in 2020, we've grown into a full-service geospatial firm trusted by government bodies, private developers, and environmental agencies. Our DGCA-certified pilots and GIS analysts work as a seamless unit, from flight planning to final deliverable.
              </p>
              <p>
                Today, we operate across Tamil Nadu, Karnataka, and Andhra Pradesh — covering thousands of hectares for highway projects, urban planning studies, industrial site surveys, and environmental impact assessments.
              </p>
              <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {['Precision-first approach', 'Certified pilots & analysts', 'End-to-end delivery', 'Client-focused outcomes'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--teal-50)', border: '1px solid var(--teal-100)', borderRadius: 8, padding: '7px 12px' }}>
                    <span style={{ color: 'var(--teal-600)', width: 14, height: 14, flexShrink: 0, display: 'flex' }}><IconCheck /></span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--teal-800)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="story-timeline">
              {timeline.map((t, i) => (
                <div className="timeline-item reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className={`timeline-dot${t.active ? ' active' : ''}`}>
                    <IconCheck />
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-year">{t.year}</div>
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MISSION & VISION ══ */}
      <section className="mission-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-tag reveal">Our Purpose</div>
            <h2 className="section-title reveal">Mission & <span>Vision</span></h2>
          </div>
          <div className="mission-grid">
            <div className="mission-card mission reveal">
              <div className="mission-card-icon"><IconTarget /></div>
              <h3>Our Mission</h3>
              <p>
                To deliver the most accurate, efficient, and reliable geospatial data services in India — empowering engineers, planners, and decision-makers with the spatial intelligence they need to build better infrastructure and protect natural environments.
              </p>
            </div>
            <div className="mission-card vision reveal">
              <div className="mission-card-icon"><IconEye /></div>
              <h3>Our Vision</h3>
              <p>
                To be India's most trusted name in drone-based geospatial services — recognized for our precision, innovation, and commitment to sustainable development. We envision a future where accurate spatial data is accessible to every project, regardless of size or geography.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="team-section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-tag reveal">The Team</div>
            <h2 className="section-title reveal">The People Behind <span>Every Survey</span></h2>
            <p className="section-subtitle reveal" style={{ margin: '12px auto 0' }}>
              Our team of certified pilots, GIS analysts, and project managers bring deep domain expertise to every engagement.
            </p>
          </div>
          <div className="team-grid">
            {team.map((m, i) => (
              <div className="team-card reveal" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="team-avatar">{m.initials}</div>
                <h4>{m.name}</h4>
                <div className="role">{m.role}</div>
                <p className="bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ══ */}
      <section className="certs-section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-tag reveal">Credentials</div>
            <h2 className="section-title reveal">Certified & <span>Compliant</span></h2>
          </div>
          <div className="certs-grid">
            {certs.map((c, i) => (
              <div className="cert-badge reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="cert-badge-icon">{c.icon}</div>
                <div className="cert-badge-text">
                  <h5>{c.title}</h5>
                  <p>{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner reveal">
            <div className="cta-text">
              <div className="section-tag">Start a Project</div>
              <h2>Ready to Work Together?</h2>
              <p>Tell us about your project and we'll provide a free consultation and detailed quote within 24 hours.</p>
            </div>
            <div className="cta-actions">
              <button className="btn-primary" onClick={() => navigate('contact')}>
                Contact Us <IconArrow />
              </button>
              <button
                className="btn-secondary"
                style={{ background: 'transparent', color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.2)' }}
                onClick={() => navigate('home')}
              >
                View Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
