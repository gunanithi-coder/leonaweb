import React, { useState, useEffect } from 'react';
import './index.css';
import LogoIntro from './components/LogoIntro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';

function App() {
  const [page, setPage] = useState('home');
  const [introDone, setIntroDone] = useState(false);

  // Scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const navigate = (p) => setPage(p);

  return (
    <div className="App">

      {/* ── Logo intro animation — shows once on first load ── */}
      {!introDone && (
        <LogoIntro onComplete={() => setIntroDone(true)} />
      )}

      {/* ── Main app — rendered behind intro, visible after ── */}
      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: introDone ? 'all' : 'none',
        }}
      >
        <Navbar currentPage={page} navigate={navigate} />

        <main>
          {page === 'home'     && <HomePage     navigate={navigate} />}
          {page === 'services' && <ServicesPage  navigate={navigate} />}
          {page === 'about'    && <AboutPage     navigate={navigate} />}
          {page === 'contact'  && <ContactPage   navigate={navigate} />}
        </main>

        <Footer navigate={navigate} />
      </div>

    </div>
  );
}

export default App;