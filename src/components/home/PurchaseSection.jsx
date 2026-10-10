import { useState } from 'react';
import Container from '../common/Container.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import WhatsAppButton from '../common/WhatsAppButton.jsx';
import { siteConfig } from '../../data/siteConfig.js';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { getEpisode } from '../../data/episodeRegistry.js';
import { toAsciiDigits } from '../../utils/format.js';

export default function PurchaseSection() {
  const { t, num } = useLanguage();
  const [value, setValue] = useState('');
  const digits = toAsciiDigits(value).trim();
  const episode = /^\d+$/.test(digits) ? getEpisode(digits) : null;
  const invalid = digits !== '' && !episode;
  const { currency, episodePdf, completeNovelPdf } = siteConfig.prices;

  return (
    <section className="purchase" aria-labelledby="purchase-title">
      <Container>
        <SectionHeading mark={num(3)} id="purchase-title" title={t('purchase.heading')} intro={t('purchase.sub')} />
        <div className="purchase__grid">
          <div className="purchase__item">
            <h3>{t('purchase.episodeTitle')}</h3>
            <p>{t('purchase.episodeBody')}</p>
            {episodePdf && <p className="purchase__price">{t('purchase.price', { price: `${currency} ${num(episodePdf)}` })}</p>}
            <div className="field field--inline">
              <label htmlFor="purchase-number">{t('purchase.numberLabel')}</label>
              <input
                id="purchase-number"
                className="input input--short"
                inputMode="numeric"
                autoComplete="off"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-invalid={invalid}
                aria-describedby={invalid ? 'purchase-error' : undefined}
              />
            </div>
            {invalid && <p id="purchase-error" className="field__error" role="alert">{t('purchase.invalid', { n: value })}</p>}
            <WhatsAppButton kind="episode" episode={episode} disabled={!episode} variant="primary">{t('purchase.buyEpisode')}</WhatsAppButton>
          </div>

          <div className="purchase__item">
            <h3>{t('purchase.novelTitle')}</h3>
            <p>{t('purchase.novelBody')}</p>
            {completeNovelPdf && <p className="purchase__price">{t('purchase.price', { price: `${currency} ${num(completeNovelPdf)}` })}</p>}
            <WhatsAppButton kind="novel" variant="accent">{t('btn.buyNovel')}</WhatsAppButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
