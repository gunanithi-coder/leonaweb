import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';
import LogoIntro   from './components/LogoIntro';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import HomePage    from './pages/HomePage';
import AboutPage   from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import BackToTop   from './components/BackToTop';

/* ── Page transition variants ───────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

/* ── Page components map ────────────────────────────────── */
const PAGES = {
  home:     HomePage,
  services: ServicesPage,
  about:    AboutPage,
  contact:  ContactPage,
};

function App() {
  const [page,      setPage]      = useState('home');
  const [introDone, setIntroDone] = useState(false);

  /* Scroll to top on page change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const navigate  = (p) => setPage(p);
  const PageComp  = PAGES[page] || HomePage;

  return (
    <div className="App">

      {/* Logo intro — shows until video ends */}
      {!introDone && (
        <LogoIntro onComplete={() => setIntroDone(true)} />
      )}

      {/* Main site — fades in after intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ pointerEvents: introDone ? 'all' : 'none' }}
      >
        {/* Navbar — waits for introDone before animating links */}
        <Navbar
          currentPage={page}
          navigate={navigate}
          introDone={introDone}
        />

        {/* Animated page transitions */}
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <PageComp navigate={navigate} />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer navigate={navigate} />

        {/* Back to top button */}
        <BackToTop />
      </motion.div>

    </div>
  );
}

export default App;