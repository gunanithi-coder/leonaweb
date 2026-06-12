import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const navigate = (p) => setPage(p);

  return (
    <div className="App">
      <Navbar currentPage={page} navigate={navigate} />
      {page === 'home'  && <HomePage navigate={navigate} />}
      {page === 'about' && <AboutPage navigate={navigate} />}
      {page === 'contact' && <ContactPage navigate={navigate} />}
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
