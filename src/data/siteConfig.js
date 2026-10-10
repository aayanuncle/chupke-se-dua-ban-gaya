import coverImage from '../assets/images/novel-cover-placeholder.svg';
import authorImage from '../assets/images/author-placeholder.png';

export const siteConfig = {
  novelTitle: { en: 'Chupke se Dua ban gaya', ur: 'چپکے سے دعا بن گیا' },

  authorName: { en: 'Samra Mustafa', ur: 'سمرا مصطفیٰ' },

  // Images. To replace: overwrite the files in src/assets/images/
  // (keep the names) or import a different file above.
  coverImage,
  authorImage,

  // Thin line at the very top of every page. Set enabled: false to hide it.
  announcement: {
    enabled: true,
    text: {
      en: 'New episodes are published here as the novel continues.',
      ur: 'جیسے جیسے ناول آگے بڑھے گا، نئے ابواب یہاں شائع ہوتے رہیں گے۔',
    },
    link: '/episodes',
  },

  // Short biography. Leave empty to show a quiet placeholder line.
  authorBio: {
    en: [
      '**Samra Mustafa** is an emerging writer from Karachi, Pakistan, who brings stories to life through her words and imagination. Her writing invites readers into a world of emotions, heartfelt moments, and meaningful connections.',
      'Her first episode was released on **14 July 2025**, marking the beginning of her journey as a storyteller. Through her work, Samra hopes to connect with readers and leave a lasting impression on their hearts.',
    ],
    ur: [
      '**سمرہ مصطفیٰ** کراچی، پاکستان سے تعلق رکھنے والی ایک ابھرتی ہوئی مصنفہ ہیں، جو اپنے الفاظ اور تخیل کے ذریعے کہانیوں کو زندگی بخشتی ہیں۔ ان کی تحریریں جذبات، دل کو چھو لینے والے لمحات اور خوبصورت رشتوں کی عکاسی کرتی ہیں۔',
      'ان کی کہانی کی پہلی قسط **14 جولائی 2025ء** کو شائع ہوئی، جو ان کے سفرِ قلم کا آغاز تھا۔ سمرہ اپنی تحریروں کے ذریعے قارئین کے دلوں تک پہنچنے اور ان کے ذہنوں پر ایک خوبصورت تاثر چھوڑنے کی خواہش رکھتی ہیں۔',
    ],
  },

  whatsappNumber: '917525899794',

  // Optional. Leave '' to hide.
  email: '',
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
    website: '',
  },

  // Optional display prices, e.g. '500'. Leave '' to hide.
  prices: {
    currency: 'PKR',
    episodePdf: '',
    completeNovelPdf: '',
  },
};
