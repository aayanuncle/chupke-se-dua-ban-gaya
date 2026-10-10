import { useState } from 'react';
import { Mail } from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Button from '../components/common/Button.jsx';
import SocialLinks from '../components/common/SocialLinks.jsx';
import WhatsAppButton from '../components/common/WhatsAppButton.jsx';
import { siteConfig } from '../data/siteConfig.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { isWhatsAppReady, whatsappLink } from '../utils/whatsapp.js';
import { getSocialLinks } from '../utils/social.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { t, novelTitle } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState('');
  useDocumentTitle(`${t('contact.title')} · ${novelTitle}`);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = t('contact.errName');
    if (!EMAIL_PATTERN.test(form.email.trim())) next.email = t('contact.errEmail');
    if (!form.message.trim()) next.message = t('contact.errMessage');
    setErrors(next);
    setResult('');
    if (Object.keys(next).length) return;

    const intro = t('wa.form', { name: form.name.trim(), email: form.email.trim() });
    const body = `${intro}\n\n${form.message.trim()}`;
    if (siteConfig.email) {
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(novelTitle)}&body=${encodeURIComponent(body)}`;
      setResult(t('contact.sentEmail'));
    } else if (isWhatsAppReady()) {
      window.open(whatsappLink(body), '_blank', 'noopener,noreferrer');
      setResult(t('contact.sentWhatsapp'));
    } else {
      setResult(t('contact.notConfigured'));
    }
  };

  const hasSocial = getSocialLinks().length > 0;

  return (
    <section className="contact">
      <Container className="contact__grid">
        <div className="contact__info">
          <h1 className="contact__title">{t('contact.title')}</h1>
          <p className="contact__intro">{t('contact.intro')}</p>

          <div className="contact__method">
            <WhatsAppButton kind="contact" variant="accent">{t('contact.whatsapp')}</WhatsAppButton>
          </div>
          {siteConfig.email && (
            <div className="contact__method">
              <Button href={`mailto:${siteConfig.email}`} variant="outline" icon={Mail}>{siteConfig.email}</Button>
            </div>
          )}
          {hasSocial && (
            <div className="contact__method">
              <h2 className="contact__sub">{t('contact.social')}</h2>
              <SocialLinks />
            </div>
          )}
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <h2 className="form__title">{t('contact.formTitle')}</h2>

          <div className="field">
            <label htmlFor="c-name">{t('contact.name')}</label>
            <input id="c-name" className="input" value={form.name} onChange={update('name')} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-err' : undefined} />
            {errors.name && <p id="c-name-err" className="field__error" role="alert">{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="c-email">{t('contact.emailLabel')}</label>
            <input id="c-email" type="email" dir="ltr" className="input" value={form.email} onChange={update('email')} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-err' : undefined} />
            {errors.email && <p id="c-email-err" className="field__error" role="alert">{errors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor="c-message">{t('contact.message')}</label>
            <textarea id="c-message" className="input" rows="6" value={form.message} onChange={update('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-message-err' : undefined} />
            {errors.message && <p id="c-message-err" className="field__error" role="alert">{errors.message}</p>}
          </div>

          <button type="submit" className="btn btn--primary"><span>{t('contact.send')}</span></button>
          <p className="form__note">{t('contact.formNote')}</p>
          {result && <p className="form__result" role="status">{result}</p>}
        </form>
      </Container>
    </section>
  );
}
