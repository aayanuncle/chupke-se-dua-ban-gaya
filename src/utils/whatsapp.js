import { siteConfig } from '../data/siteConfig.js';

// True only when a plausible international number has been configured.
export const isWhatsAppReady = () => /^\d{8,15}$/.test(siteConfig.whatsappNumber);

export const whatsappLink = (message) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

// kind: 'episode' | 'novel' | 'contact'
export function buildMessage(kind, { t, novel, episode, episodeLabel }) {
  if (kind === 'episode' && episode) {
    let message = t('wa.episode', { novel, episode: episodeLabel(episode.number) });
    if (episode.title) message += '\n' + t('wa.titleLine', { title: episode.title });
    return message;
  }
  if (kind === 'novel') return t('wa.novel', { novel });
  return t('wa.contact', { novel });
}
