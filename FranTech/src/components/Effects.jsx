import { useEffect, useRef, useState } from 'react';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Thin gradient bar at the top that fills as you scroll. */
export function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><span ref={barRef} /></div>;
}

/** Floating button that appears after scrolling down. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button type="button" className={visible ? 'back-to-top is-visible' : 'back-to-top'} aria-label="Back to top" tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
  );
}

/** Types and deletes a rotating list of phrases. Static text for reduced-motion users. */
export function Typewriter({ phrases, className = '' }) {
  const list = phrases.filter(Boolean);
  const [text, setText] = useState(list[0] || '');
  useEffect(() => {
    if (!list.length || reducedMotion()) return undefined;
    let phrase = 0, index = 0, deleting = false, timer;
    const tick = () => {
      const full = list[phrase];
      index += deleting ? -1 : 1;
      setText(full.slice(0, index));
      let delay = deleting ? 32 : 68;
      if (!deleting && index === full.length) { deleting = true; delay = 1700; }
      else if (deleting && index === 0) { deleting = false; phrase = (phrase + 1) % list.length; delay = 380; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.join('|')]);
  return <span className={`typewriter ${className}`} aria-label={list[0]}><span aria-hidden="true">{text}</span><i className="typewriter-caret" aria-hidden="true" /></span>;
}

/** Counts up to `value` once it scrolls into view. */
export function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (reducedMotion() || !('IntersectionObserver' in window)) { setShown(value); return undefined; }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now(), duration = 1300;
      const step = now => {
        const t = Math.min((now - start) / duration, 1);
        setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref}>{shown}{suffix}</span>;
}

/** Infinite horizontal ticker (pure CSS animation, pauses on hover). */
export function Marquee({ items }) {
  if (!items.length) return null;
  const row = items.map((item, i) => <span className="marquee-item" key={`${item}-${i}`}><i aria-hidden="true">✦</i>{item}</span>);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{row}{row}</div>
    </div>
  );
}

/** Pointer handlers giving a card a cursor spotlight and subtle 3D tilt. */
export function tiltHandlers() {
  if (typeof window === 'undefined') return {};
  return {
    onPointerMove(event) {
      if (event.pointerType !== 'mouse' || reducedMotion()) return;
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
      card.style.setProperty('--ry', `${(x - 0.5) * 7}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * 7}deg`);
    },
    onPointerLeave(event) {
      const card = event.currentTarget;
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    },
  };
}

/** Buttons drift slightly toward the cursor. Apply with {...magnetic}. */
export const magnetic = {
  onPointerMove(event) {
    if (event.pointerType !== 'mouse' || reducedMotion()) return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.translate = `${(event.clientX - rect.left - rect.width / 2) * 0.18}px ${(event.clientY - rect.top - rect.height / 2) * 0.28}px`;
  },
  onPointerLeave(event) { event.currentTarget.style.translate = ''; },
};

/** Small toast; pass a message string to show it briefly. */
export function Toast({ message }) {
  return <div className={message ? 'toast is-visible' : 'toast'} role="status" aria-live="polite">{message}</div>;
}
