import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './hooks/useLanguage.jsx';
import AnnouncementBar from './components/layout/AnnouncementBar.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import PageTransition from './components/common/PageTransition.jsx';
import Home from './pages/Home.jsx';
import Episodes from './pages/Episodes.jsx';
import EpisodeReader from './pages/EpisodeReader.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function Shell() {
  const { t } = useLanguage();
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">{t('common.skip')}</a>
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/episode/:number" element={<EpisodeReader />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  );
}
