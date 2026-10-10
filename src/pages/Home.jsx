import Hero from '../components/home/Hero.jsx';
import EpisodeShowcase from '../components/home/EpisodeShowcase.jsx';
import AuthorSection from '../components/home/AuthorSection.jsx';
import PurchaseSection from '../components/home/PurchaseSection.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useLanguage } from '../hooks/useLanguage.jsx';

export default function Home() {
  const { novelTitle, authorName } = useLanguage();
  useDocumentTitle(`${novelTitle} · ${authorName}`);
  return (
    <>
      <Hero />
      <EpisodeShowcase />
      <AuthorSection />
      <PurchaseSection />
    </>
  );
}
