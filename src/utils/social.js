import { Facebook, Globe, Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';

const META = {
  instagram: { label: 'Instagram', Icon: Instagram },
  facebook: { label: 'Facebook', Icon: Facebook },
  youtube: { label: 'YouTube', Icon: Youtube },
  website: { label: 'Website', Icon: Globe },
};

// Only links that have actually been configured are returned.
export const getSocialLinks = () =>
  Object.entries(META)
    .filter(([key]) => siteConfig.social[key])
    .map(([key, m]) => ({ key, url: siteConfig.social[key], ...m }));
