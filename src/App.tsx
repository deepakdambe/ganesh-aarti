import { useState, useEffect } from 'react';
import { NotesGrid } from './components/NotesGrid'
import { sampleNotes } from './types/Note'
import './App.css'

function App() {
  const [showBanner, setShowBanner] = useState(true);
  const [bannerClosing, setBannerClosing] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);

  const handleCloseBanner = () => {
    setBannerClosing(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 500); // Duration of slideUp animation
  };

  const handleScroll = () => {
    if (window.pageYOffset > 200) { // Show button after scrolling 300px
      setShowGoToTop(true);
    } else {
      setShowGoToTop(false);
    }
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Automatically hide the banner after 5 seconds
    const timer = setTimeout(() => {
      handleCloseBanner();
    }, 5000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      {showBanner && (
        <div className={`welcome-banner ${bannerClosing ? 'slide-up' : ''}`}>
          <div className="welcome-content">
            <img src="./ganesh.png" alt="Lord Ganesh" className="ganesh-icon" style={{ height: '5em', marginRight: '0.5em' }} />
            <div>
              <h2>Welcome to आरती संग्रह!</h2>
              <p>Explore our collection of beautiful aartis</p>
            </div>
            <button onClick={handleCloseBanner}>×</button>
          </div>
        </div>
      )}
      <header className="app-header">
        <h1>आरती संग्रह</h1>
      </header>
      <main>
        <NotesGrid notes={sampleNotes()} />
      </main>
      {showGoToTop && (
        <button onClick={goToTop} className="go-to-top-button">
          ↑
        </button>
      )}
    </div>
  )
}

export default App
