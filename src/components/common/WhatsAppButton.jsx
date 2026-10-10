import { useId, useState } from 'react';
import { FileDown, MessageCircle } from 'lucide-react';
import Button from './Button.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { buildMessage, isWhatsAppReady, whatsappLink } from '../../utils/whatsapp.js';

// kind: 'episode' (needs `episode`) | 'novel' | 'contact'
// While no WhatsApp number is configured the button explains what to do
// instead of linking to an invalid address.
export default function WhatsAppButton({ kind, episode, variant = 'primary', disabled = false, children, className = '' }) {
  const { t, episodeLabel, novelTitle } = useLanguage();
  const [showSetup, setShowSetup] = useState(false);
  const noteId = useId();
  const Icon = kind === 'contact' ? MessageCircle : FileDown;
  const ready = isWhatsAppReady();

  if (disabled) {
    return <Button variant={variant} icon={Icon} className={className} disabled>{children}</Button>;
  }

  if (!ready) {
    return (
      <span className="wa">
        <Button variant={variant} icon={Icon} className={className} onClick={() => setShowSetup(true)} aria-describedby={showSetup ? noteId : undefined}>
          {children}
        </Button>
        {showSetup && <span id={noteId} role="status" className="wa__note">{t('wa.notConfigured')}</span>}
      </span>
    );
  }

  const message = buildMessage(kind, { t, novel: novelTitle, episode, episodeLabel });
  return (
    <Button href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" variant={variant} icon={Icon} className={className}>
      {children}
    </Button>
  );
}
