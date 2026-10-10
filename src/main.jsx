import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/variables.css';
import './styles/global.css';
import './styles/typography.css';
import './styles/animations.css';
import './styles/layout.css';
import './styles/home.css';
import './styles/episodes.css';
import './styles/reader.css';
import './styles/pages.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
  </BrowserRouter>
);
