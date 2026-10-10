import { useEffect, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage.jsx';

// Thin bar fixed to the top of the window. `targetRef` is the article being read.
export default function ReaderProgress({ targetRef }) {
  const { t } = useLanguage();
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = targetRef.current;
      const bar = barRef.current;
      if (!el || !bar) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : rect.top < 0 ? 1 : 0;
      bar.style.transform = `scaleX(${ratio})`;
      bar.parentElement.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetRef]);

  return (
    <div className="progress" role="progressbar" aria-label={t('reader.progress')} aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <div className="progress__bar" ref={barRef} />
    </div>
  );
}
