import { useState, useEffect, useRef } from 'react';
import profileIMG from "./img/techboy.jpg";
import Resume from "./img/franzor cv.pdf";
import certificate from "./img/TECHACADEMY.pdf";
import ecommerce from "./img/E-Commerce.PNG";
import pospadi from "./img/pospadi.PNG";
import betahomes from "./img/betahomes.PNG";
import freelancer from "./img/franzor.PNG";
import IT from "./img/IT.PNG";
import cyjust from "./img/cyjust.PNG";

const COLORS = {
  ink: '#0d0d1a',
  panel: '#12122a',
  accent1: '#e94560',
  accent2: '#f5a623',
  accent3: '#4ecdc4',
  accent4: '#a29bfe',
  sky: '#0f3460',
  bubble: '#fffdf7',
  bubbleStroke: '#1a1a2e',
  text: '#f8f4e3',
  muted: '#9ca3af',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.1)',
};

const techBadgeColors = [
  { bg: 'rgba(233,69,96,0.15)', border: 'rgba(233,69,96,0.4)', text: '#f87171' },
  { bg: 'rgba(245,166,35,0.15)', border: 'rgba(245,166,35,0.4)', text: '#fbbf24' },
  { bg: 'rgba(78,205,196,0.15)', border: 'rgba(78,205,196,0.4)', text: '#4ecdc4' },
  { bg: 'rgba(162,155,254,0.15)', border: 'rgba(162,155,254,0.4)', text: '#a29bfe' },
  { bg: 'rgba(99,179,237,0.15)', border: 'rgba(99,179,237,0.4)', text: '#63b3ed' },
];

/* ──────────────── GLOBAL STYLES ──────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@400;600;700;800;900&family=Comic+Neue:wght@400;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink: #0d0d1a;
      --panel: #12122a;
      --accent1: #e94560;
      --accent2: #f5a623;
      --accent3: #4ecdc4;
      --accent4: #a29bfe;
      --sky: #0f3460;
      --bubble: #fffdf7;
      --text: #f8f4e3;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--ink);
      color: var(--text);
      font-family: 'Nunito', sans-serif;
      overflow-x: hidden;
    }

    .halftone-bg {
      position: relative;
    }
    .halftone-bg::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
      z-index: 0;
    }

    .panel-border {
      border: 3px solid rgba(255,255,255,0.12);
      border-radius: 16px;
      box-shadow: 6px 6px 0px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
    }

    .speech-bubble {
      background: var(--bubble);
      color: var(--ink);
      border: 3px solid var(--ink);
      border-radius: 20px;
      box-shadow: 4px 4px 0 var(--ink);
      position: relative;
      font-family: 'Comic Neue', cursive;
      font-weight: 700;
    }
    .speech-bubble::after {
      content: '';
      position: absolute;
      bottom: -20px;
      left: 32px;
      border: 10px solid transparent;
      border-top-color: var(--ink);
    }
    .speech-bubble::before {
      content: '';
      position: absolute;
      bottom: -14px;
      left: 33px;
      border: 9px solid transparent;
      border-top-color: var(--bubble);
      z-index: 1;
    }

    .thought-bubble {
      background: var(--bubble);
      color: var(--ink);
      border: 3px solid var(--ink);
      border-radius: 20px;
      box-shadow: 4px 4px 0 var(--ink);
      font-family: 'Comic Neue', cursive;
      font-weight: 700;
    }

    .comic-title {
      font-family: 'Bangers', cursive;
      letter-spacing: 3px;
      text-shadow: 4px 4px 0 rgba(0,0,0,0.5), -1px -1px 0 rgba(255,255,255,0.08);
    }

    .burst {
      display: inline-block;
      font-family: 'Bangers', cursive;
      letter-spacing: 2px;
      transform: rotate(-3deg);
      text-shadow: 3px 3px 0 rgba(0,0,0,0.5);
    }

    @keyframes bounce-in {
      0% { transform: scale(0) rotate(-5deg); opacity: 0; }
      60% { transform: scale(1.1) rotate(2deg); }
      80% { transform: scale(0.95) rotate(-1deg); }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(-1deg); }
      50% { transform: translateY(-12px) rotate(1deg); }
    }

    @keyframes wiggle {
      0%, 100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(233,69,96,0.4); }
      50% { box-shadow: 0 0 0 12px rgba(233,69,96,0); }
    }

    @keyframes pulse-green {
      0%, 100% { box-shadow: 0 0 0 0 rgba(78,205,196,0.5); }
      50% { box-shadow: 0 0 0 8px rgba(78,205,196,0); }
    }

    @keyframes slide-up {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes hero-reveal {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .anim-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
    .anim-float { animation: float 3s ease-in-out infinite; }
    .anim-wiggle { animation: wiggle 2s ease-in-out infinite; }
    .anim-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
    .anim-slide-up { animation: slide-up 0.5s ease both; }
    .anim-spin { animation: spin-slow 8s linear infinite; }
    .anim-hero { animation: hero-reveal 0.7s ease both; }

    .nav-link {
      position: relative;
      font-family: 'Bangers', cursive;
      letter-spacing: 2px;
      font-size: 18px;
      color: var(--text);
      background: none;
      border: none;
      cursor: pointer;
      transition: color 0.2s;
      text-transform: uppercase;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0; right: 100%;
      height: 3px;
      background: var(--accent1);
      border-radius: 2px;
      transition: right 0.25s ease;
    }
    .nav-link:hover::after, .nav-link.active::after { right: 0; }
    .nav-link:hover, .nav-link.active { color: var(--accent1); }

    .skill-bar-fill {
      height: 100%;
      border-radius: 999px;
      position: relative;
      transition: width 1.2s cubic-bezier(0.34,1.56,0.64,1);
    }
    .skill-bar-fill::after {
      content: '';
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      background: white;
      border-radius: 50%;
      border: 2px solid rgba(0,0,0,0.3);
    }

    .project-card {
      transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
    }
    .project-card:hover {
      transform: translateY(-8px) rotate(0.5deg);
      box-shadow: 10px 10px 0px rgba(0,0,0,0.5), 0 0 30px rgba(233,69,96,0.15) !important;
    }

    .sticker {
      display: inline-block;
      background: var(--accent2);
      color: var(--ink);
      font-family: 'Bangers', cursive;
      letter-spacing: 1px;
      padding: 4px 12px;
      border-radius: 999px;
      border: 2px solid var(--ink);
      box-shadow: 2px 2px 0 var(--ink);
      font-size: 13px;
      transform: rotate(-2deg);
    }

    .comic-input {
      width: 100%;
      background: rgba(255,255,255,0.06);
      border: 2.5px solid rgba(255,255,255,0.15);
      border-radius: 12px;
      color: var(--text);
      font-family: 'Nunito', sans-serif;
      font-size: 15px;
      padding: 12px 16px;
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }
    .comic-input:focus {
      border-color: var(--accent1);
      box-shadow: 3px 3px 0 var(--accent1);
    }
    .comic-input::placeholder { color: rgba(248,244,227,0.35); }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--ink); }
    ::-webkit-scrollbar-thumb { background: var(--accent1); border-radius: 4px; }

    .mobile-nav-overlay {
      position: fixed;
      inset: 0;
      background: rgba(13,13,26,0.99);
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 32px;
    }

    .pow-burst {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--accent2);
      color: var(--ink);
      font-family: 'Bangers', cursive;
      font-size: 22px;
      letter-spacing: 2px;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      width: 80px;
      height: 80px;
    }

    .hire-btn {
      position: relative;
      overflow: hidden;
    }
    .hire-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transition: left 0.4s ease;
    }
    .hire-btn:hover::before { left: 100%; }

    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
      .hero-grid { grid-template-columns: 1fr !important; }
      .hero-avatar { display: none !important; }
      .form-grid { grid-template-columns: 1fr !important; }
    }
    @media (min-width: 769px) {
      .hide-desktop { display: none !important; }
    }
  `}</style>
);

/* ──────────────── NAV ──────────────── */
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const links = ['home', 'about', 'projects', 'skills', 'contact'];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(13,13,26,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '2px solid rgba(233,69,96,0.15)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 68,
        }}>
          <div style={{ fontFamily: 'Bangers', fontSize: 28, letterSpacing: 3, cursor: 'pointer' }}
               onClick={() => go('home')}>
            <span style={{ color: COLORS.accent1 }}>FRAN</span>
            <span style={{ color: COLORS.text }}>TECH</span>
            <span style={{ color: COLORS.accent2 }}>DEV</span>
          </div>

          <div className="hide-mobile" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {links.map(l => (
              <button key={l} className={`nav-link ${active === l ? 'active' : ''}`}
                      onClick={() => go(l)}>{l}</button>
            ))}
            {/* Primary CTA in nav */}
            <button onClick={() => { track('hire_me_click'); go('contact'); }} style={{
              fontFamily: 'Bangers', letterSpacing: 2, fontSize: 16,
              background: COLORS.accent1, color: '#fff',
              border: '2.5px solid rgba(255,255,255,0.25)',
              padding: '8px 22px', borderRadius: 12,
              boxShadow: '4px 4px 0 rgba(0,0,0,0.35)',
              cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              animation: 'pulse-glow 3s infinite',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.35)'; }}
            >🔥 HIRE ME</button>
          </div>

          <button className="hide-desktop" onClick={() => setOpen(true)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.text, fontSize: 28 }}>
            ☰
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-nav-overlay">
          <button onClick={() => setOpen(false)}
                  style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: COLORS.text, fontSize: 32, cursor: 'pointer' }}>
            ✕
          </button>
          {links.map((l, i) => (
            <button key={l} className="nav-link"
                    style={{ fontSize: 36, animationDelay: `${i * 0.08}s` }}
                    onClick={() => go(l)}>{l}</button>
          ))}
          <button onClick={() => { track('hire_me_click'); go('contact'); }} style={{
            fontFamily: 'Bangers', letterSpacing: 2, fontSize: 28,
            background: COLORS.accent1, color: '#fff',
            border: '3px solid rgba(255,255,255,0.25)',
            padding: '12px 32px', borderRadius: 14, cursor: 'pointer',
          }}>🔥 HIRE ME</button>
        </div>
      )}
    </>
  );
}

/* ──────────────── HERO ──────────────── */
function Hero() {
  const [typed, setTyped] = useState('');
  const roles = [
    'React Developer',
    'UI/UX Engineer',
    'Frontend Architect',
    'Web App Builder',
  ];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const timerRef = useRef(null);

  // FIX 3: Added track('page_view', 'home') at the top of the typing useEffect
  useEffect(() => {
    track('page_view', 'home');
    const tick = () => {
      const role = roles[roleRef.current];
      if (charRef.current <= role.length) {
        setTyped(role.slice(0, charRef.current));
        charRef.current++;
        timerRef.current = setTimeout(tick, 75);
      } else {
        timerRef.current = setTimeout(() => {
          charRef.current = 0;
          roleRef.current = (roleRef.current + 1) % roles.length;
          tick();
        }, 2200);
      }
    };
    tick();
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      padding: '100px 24px 60px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Speed lines */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${10 + i * 11}%`,
          left: 0, right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, rgba(233,69,96,${0.025 + i * 0.012}), transparent)`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: 48, alignItems: 'center',
        }}>
          {/* Left */}
          <div>
            {/* Open to work badge */}
            <div className="anim-bounce-in" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(78,205,196,0.1)',
              border: '2px solid rgba(78,205,196,0.35)',
              borderRadius: 999, padding: '6px 18px',
              marginBottom: 24, fontSize: 13, fontWeight: 800,
              color: COLORS.accent3,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.accent3, display: 'inline-block', animation: 'pulse-green 2s infinite' }} />
              Open to work — Available now
            </div>

            <h1 className="comic-title" style={{
              fontSize: 'clamp(46px, 7vw, 82px)',
              lineHeight: 1.05,
              marginBottom: 16,
            }}>
              <span style={{ color: COLORS.text }}>REACT</span><br />
              <span style={{
                WebkitTextStroke: `3px ${COLORS.accent1}`,
                color: 'transparent',
              }}>DEVELOPER</span><br />
              <span style={{ color: COLORS.accent2 }}>FOR HIRE.</span>
            </h1>

            {/* Typed role */}
            <div style={{
              fontFamily: 'Bangers', letterSpacing: 3,
              fontSize: 22, color: COLORS.accent3,
              marginBottom: 20, minHeight: 34,
            }}>
              {typed}<span style={{ animation: 'wiggle 0.5s infinite', display: 'inline-block', color: COLORS.accent1 }}>|</span>
            </div>

            {/* The VALUE PROP — most important text on the page */}
            <div className="speech-bubble anim-bounce-in" style={{
              padding: '18px 22px', marginBottom: 36,
              maxWidth: 480, fontSize: 15, lineHeight: 1.75,
              animationDelay: '0.3s',
            }}>
              Hi! I'm <strong>Francis Chinazor</strong> — a frontend developer from Lagos 🇳🇬 who builds
              <strong> fast, responsive, production-ready web apps</strong> using React and modern CSS.
              I've shipped dashboards, e-commerce platforms, and real estate portals for real clients.
              <br /><br />
              <span style={{ color: COLORS.accent1, fontWeight: 900 }}>Looking for a developer who delivers? Let's talk. 👇</span>
            </div>

            {/* CTA buttons — clear hierarchy */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 32 }}>
              {/* PRIMARY CTA — FIX 2: added track('hire_me_click') */}
              <button className="hire-btn" onClick={() => { track('hire_me_click'); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  fontFamily: 'Bangers', letterSpacing: 2, fontSize: 20,
                  background: COLORS.accent1, color: '#fff',
                  border: '3px solid rgba(255,255,255,0.25)',
                  padding: '14px 36px', borderRadius: 14,
                  cursor: 'pointer',
                  boxShadow: `5px 5px 0 rgba(0,0,0,0.4), 0 0 20px rgba(233,69,96,0.3)`,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  animation: 'pulse-glow 3s infinite',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '7px 7px 0 rgba(0,0,0,0.4), 0 0 30px rgba(233,69,96,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0 rgba(0,0,0,0.4), 0 0 20px rgba(233,69,96,0.3)'; }}
              >🔥 HIRE ME NOW</button>

              {/* SECONDARY CTA */}
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  fontFamily: 'Bangers', letterSpacing: 2, fontSize: 20,
                  background: 'transparent', color: COLORS.text,
                  border: `3px solid rgba(255,255,255,0.2)`,
                  padding: '14px 32px', borderRadius: 14,
                  cursor: 'pointer',
                  boxShadow: '5px 5px 0 rgba(0,0,0,0.3)',
                  transition: 'transform 0.15s, border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = COLORS.accent3; e.currentTarget.style.color = COLORS.accent3; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = COLORS.text; }}
              >⚡ SEE MY WORK</button>

              {/* TERTIARY — FIX 1: added track('cv_download') */}
              <a href={Resume} download onClick={() => track('cv_download')} style={{
                fontFamily: 'Bangers', letterSpacing: 2, fontSize: 20,
                background: 'transparent', color: COLORS.muted,
                border: `3px solid rgba(255,255,255,0.12)`,
                padding: '14px 28px', borderRadius: 14,
                textDecoration: 'none', display: 'inline-block',
                boxShadow: '5px 5px 0 rgba(0,0,0,0.2)',
                transition: 'transform 0.15s, border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = COLORS.accent2; e.currentTarget.style.color = COLORS.accent2; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = COLORS.muted; }}
              >⬇ DOWNLOAD CV</a>
            </div>

            {/* Tech badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'JavaScript'].map((t, i) => (
                <span key={t} style={{
                  padding: '5px 14px', borderRadius: 999,
                  fontWeight: 800, fontSize: 13,
                  border: `2px solid ${techBadgeColors[i % techBadgeColors.length].border}`,
                  background: techBadgeColors[i % techBadgeColors.length].bg,
                  color: techBadgeColors[i % techBadgeColors.length].text,
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right — avatar */}
          <div className="hero-avatar" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div className="anim-spin" style={{
                position: 'absolute', inset: -24,
                border: `3px dashed rgba(233,69,96,0.3)`,
                borderRadius: '50%', pointerEvents: 'none',
              }} />
              <div className="anim-spin" style={{
                position: 'absolute', inset: -12,
                border: `2px dashed rgba(245,166,35,0.25)`,
                borderRadius: '50%', animationDirection: 'reverse', pointerEvents: 'none',
              }} />

              <div className="anim-float" style={{
                width: 280, height: 280,
                borderRadius: '50%', overflow: 'hidden',
                border: `5px solid ${COLORS.accent1}`,
                boxShadow: `8px 8px 0 ${COLORS.ink}, 8px 8px 0 2px ${COLORS.accent1}`,
                position: 'relative',
              }}>
                <img src={profileIMG} alt="Francis Chinazor — React Developer for hire"
                     style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(233,69,96,0.12) 100%)',
                  pointerEvents: 'none',
                }} />
              </div>

              <div className="thought-bubble anim-bounce-in" style={{
                position: 'absolute', top: -20, right: -40,
                padding: '10px 16px', fontSize: 13,
                animationDelay: '0.6s', whiteSpace: 'nowrap', zIndex: 2,
              }}>⚡ 3+ Years Experience</div>
              <div className="thought-bubble anim-bounce-in" style={{
                position: 'absolute', bottom: 10, left: -50,
                padding: '10px 16px', fontSize: 13,
                animationDelay: '0.9s', whiteSpace: 'nowrap', zIndex: 2,
              }}>🎯 Real Client Projects</div>
              <div className="thought-bubble anim-bounce-in" style={{
                position: 'absolute', bottom: -20, right: -30,
                padding: '10px 16px', fontSize: 13,
                animationDelay: '1.1s', whiteSpace: 'nowrap', zIndex: 2,
              }}>🇳🇬 Lagos, NG</div>
            </div>
          </div>
        </div>

        {/* KPI strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 16, marginTop: 64,
        }}>
          {[
            { val: '3+', label: 'Years Building', icon: '⚛️', color: COLORS.accent3 },
            { val: '15+', label: 'Shipped Projects', icon: '🚀', color: COLORS.accent2 },
            { val: '10+', label: 'Happy Clients', icon: '🤝', color: COLORS.accent4 },
            { val: '100%', label: 'Remote-Ready', icon: '🌍', color: COLORS.accent1 },
          ].map((k, i) => (
            <div key={k.label} className="panel-border anim-slide-up" style={{
              background: COLORS.cardBg,
              padding: '20px 16px', textAlign: 'center',
              animationDelay: `${i * 0.1}s`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{k.icon}</div>
              <div className="comic-title" style={{ fontSize: 36, color: k.color }}>{k.val}</div>
              <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 700 }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── ABOUT ──────────────── */
function About() {
  return (
    <section id="about" style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="pow-burst" style={{ margin: '0 auto 16px' }}>WHO</div>
          <h2 className="comic-title" style={{ fontSize: 52, color: COLORS.text }}>
            THE <span style={{ color: COLORS.accent1 }}>ORIGIN</span> STORY
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {[
            {
              panel: '01', title: 'CHAPTER 1',
              content: 'Self-taught frontend developer from Lagos, Nigeria. Started with curiosity, stayed for the craft. Turned a love for design into a career building real products for real businesses.',
              icon: '🌟', color: COLORS.accent1,
            },
            {
              panel: '02', title: 'LEVELLED UP',
              content: 'Mastered the modern React stack — hooks, Context, TypeScript, Tailwind. Built production apps for FinTech, real estate, e-commerce, and IT services clients across Nigeria.',
              icon: '⚡', color: COLORS.accent2,
            },
            {
              panel: '03', title: 'POWER SKILLS',
              content: 'Strong at translating Figma designs into pixel-perfect code, integrating REST APIs, building reusable component libraries, and delivering fast, accessible, mobile-first UIs.',
              icon: '🚀', color: COLORS.accent3,
            },
            {
              panel: '04', title: 'AVAILABLE NOW',
              content: '3+ years of frontend experience. Open to full-time remote roles, contract work, and long-term freelance partnerships. I communicate well, I deliver on time, and I care about the details.',
              icon: '🏆', color: COLORS.accent4,
            },
          ].map((item) => (
            <div key={item.panel} className="panel-border" style={{
              background: COLORS.cardBg,
              padding: 28, position: 'relative', overflow: 'hidden',
              transition: 'transform 0.25s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px) rotate(-0.5deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <div style={{
                position: 'absolute', top: 12, right: 16,
                fontFamily: 'Bangers', fontSize: 60, color: 'rgba(255,255,255,0.04)', letterSpacing: 2,
              }}>{item.panel}</div>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{item.icon}</div>
              <div className="sticker" style={{ marginBottom: 12 }}>{item.title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(248,244,227,0.82)' }}>
                {item.content}
              </p>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 4, background: item.color, borderRadius: '0 0 13px 13px',
              }} />
            </div>
          ))}
        </div>

        {/* Availability + quick contact strip */}
        <div style={{
          marginTop: 40,
          background: 'rgba(78,205,196,0.07)',
          border: `2px solid rgba(78,205,196,0.22)`,
          borderRadius: 16, padding: '24px 32px',
          display: 'flex', flexWrap: 'wrap', gap: 16,
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: COLORS.accent3,
              animation: 'pulse-green 2s infinite',
            }} />
            <span style={{ fontFamily: 'Bangers', letterSpacing: 2, fontSize: 22, color: COLORS.accent3 }}>
              AVAILABLE FOR HIRE — RIGHT NOW
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {['Remote 🌍', 'Full-time 💼', 'Freelance 🎯', 'Contract 📄'].map(tag => (
              <span key={tag} style={{
                background: 'rgba(78,205,196,0.1)',
                border: `1.5px solid rgba(78,205,196,0.3)`,
                color: COLORS.accent3, padding: '4px 14px',
                borderRadius: 999, fontSize: 13, fontWeight: 700,
              }}>{tag}</span>
            ))}
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: 'Bangers', letterSpacing: 2, fontSize: 15,
                background: COLORS.accent1, color: '#fff',
                border: '2px solid rgba(255,255,255,0.2)',
                padding: '7px 20px', borderRadius: 10,
                cursor: 'pointer', boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
              }}>
              → GET IN TOUCH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── PROJECTS ──────────────── */
const projects = [
  {
    title: 'PaintLife E-Commerce',
    category: 'E-Commerce Platform',
    imgVar: 'ecommerce',
    problem: 'Client needed an online store to sell art & décor products with a seamless checkout experience.',
    desc: 'Full-featured e-commerce site with product filtering, cart management, and Stripe payment integration. Built for a real Nigerian business with mobile-first design.',
    features: ['Product filtering & search', 'Cart & checkout flow', 'Stripe payment integration', 'Fully responsive'],
    tech: ['React', 'Context API', 'Tailwind CSS', 'Stripe'],
    live: 'https://paintlifeltd.com/',
    repo: 'https://github.com/ZorichDev',
    color: COLORS.accent1,
  },
  {
    title: 'Pospadi FinTech Dashboard',
    category: 'FinTech Dashboard',
    imgVar: 'pospadi',
    problem: 'A payments company needed a real-time dashboard for agents to track transactions and performance.',
    desc: 'Interactive financial dashboard featuring live transaction tables, charts, and role-based views. Handling thousands of records with smooth, fast UI.',
    features: ['Real-time data tables', 'Chart.js visualizations', 'Role-based access', 'TypeScript typed'],
    tech: ['React', 'TypeScript', 'Chart.js', 'REST API'],
    live: 'https://pospadi.com.ng',
    repo: 'https://github.com/InternPulse-Frontend-March-2025',
    color: COLORS.accent2,
  },
  {
    title: 'Beta Homes Real Estate',
    category: 'Property Platform',
    imgVar: 'betahomes',
    problem: 'A Lagos real estate firm needed a modern, searchable property listing site to grow their online presence.',
    desc: 'Property listing platform with search, filtering by location and price, contact forms, and Google Maps integration. Clean, professional design that builds client trust.',
    features: ['Property search & filters', 'Google Maps integration', 'Inquiry / contact forms', 'SEO-optimised structure'],
    tech: ['React', 'Tailwind CSS', 'Google Maps API', 'EmailJS'],
    live: 'https://betamerchanthomesandmore.com/',
    repo: 'https://github.com/ZorichDev',
    color: COLORS.accent3,
  },
  {
    title: 'IProlance IT Solutions',
    category: 'IT Services Website',
    imgVar: 'IT',
    problem: 'An IT company needed a professional web presence to showcase services and convert visitors to leads.',
    desc: 'Multi-page service website with an animated hero, service showcases, testimonials, and a working inquiry system. Designed to communicate professionalism and build trust.',
    features: ['Services showcase', 'Lead inquiry form', 'Testimonial section', 'Mobile responsive'],
    tech: ['React', 'Tailwind CSS', 'EmailJS', 'CSS Animations'],
    live: 'https://iprolance-solutions.cyjustdeals.com/',
    repo: 'https://github.com/ZorichDev',
    color: COLORS.accent4,
  },
  {
    title: 'Freelancer Finance Tracker',
    category: 'Data Visualization App',
    imgVar: 'freelancer',
    problem: 'Freelancers needed a simple way to track income, expenses, and financial health without complex software.',
    desc: 'Personal finance dashboard with interactive Chart.js graphs, income/expense tracking, budget alerts, and a clean profile view — all running in the browser with zero backend.',
    features: ['Income & expense tracking', 'Interactive charts', 'Budget alerts', 'Local storage persistence'],
    tech: ['React', 'Chakra UI', 'Chart.js', 'LocalStorage'],
    live: 'https://freelancer-dashboard5.netlify.app/profile',
    repo: 'https://github.com/ZorichDev/Freelancer-Dashboard5',
    color: COLORS.accent1,
  },
  {
    title: 'CyJust Deals — Branding Platform',
    category: 'E-Commerce & Branding',
    imgVar: 'cyjust',
    problem: 'A Nigerian design and branding business needed an online storefront to drive WhatsApp-based orders.',
    desc: 'Modern product catalog and marketing website for a branding business. Features category browsing, WhatsApp ordering integration, and a polished visual identity.',
    features: ['Product catalogue', 'WhatsApp order integration', 'Custom visual identity', 'Category filtering'],
    tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    live: 'https://www.cyjustdeals.com/',
    repo: 'https://github.com/Efezino218/cyjust_deals',
    color: COLORS.accent2,
  },
];

const imgMap = { ecommerce, pospadi, betahomes, IT, freelancer, cyjust };

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="project-card panel-border" style={{
      background: COLORS.cardBg,
      borderRadius: 16, overflow: 'hidden',
      position: 'relative',
      animationDelay: `${index * 0.1}s`,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Image */}
      <div style={{ height: 185, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <img src={imgMap[project.imgVar]} alt={project.title}
             style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
             onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
             onMouseLeave={e => e.target.style.transform = 'none'} />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: project.color, color: '#fff',
          fontFamily: 'Bangers', letterSpacing: 1, fontSize: 13,
          padding: '4px 12px', borderRadius: 999,
          border: '2px solid rgba(255,255,255,0.3)',
          boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
        }}>{project.category}</div>
      </div>

      <div style={{ padding: '20px 20px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: 'Bangers', fontSize: 24, letterSpacing: 1, marginBottom: 8, color: COLORS.text }}>
          {project.title}
        </h3>

        {/* Problem / purpose */}
        <div style={{
          background: 'rgba(233,69,96,0.07)',
          border: `1.5px solid rgba(233,69,96,0.2)`,
          borderRadius: 10, padding: '10px 14px', marginBottom: 12,
          fontSize: 13, color: 'rgba(248,244,227,0.75)', lineHeight: 1.6,
        }}>
          <span style={{ fontWeight: 800, color: COLORS.accent1 }}>Problem: </span>
          {project.problem}
        </div>

        <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.65, marginBottom: 12 }}>
          {project.desc}
        </p>

        {/* Key features toggle */}
        <button onClick={() => setExpanded(v => !v)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: COLORS.accent3, fontSize: 13, fontWeight: 800,
          textAlign: 'left', padding: 0, marginBottom: expanded ? 12 : 14,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {expanded ? '▾' : '▸'} {expanded ? 'HIDE' : 'SHOW'} KEY FEATURES
        </button>

        {expanded && (
          <div style={{ marginBottom: 14 }}>
            {project.features.map(f => (
              <div key={f} style={{
                fontSize: 13, color: 'rgba(248,244,227,0.8)',
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
              }}>
                <span style={{ color: COLORS.accent3, fontWeight: 900 }}>✓</span> {f}
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16, marginTop: 'auto' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '3px 10px', borderRadius: 8,
              fontSize: 12, fontWeight: 700, color: 'rgba(248,244,227,0.75)',
            }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 10 }}>
          <a href={project.live} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, padding: '11px 0', textAlign: 'center',
            background: project.color, color: '#fff',
            fontFamily: 'Bangers', letterSpacing: 1, fontSize: 16,
            borderRadius: 10, textDecoration: 'none',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
            border: '2px solid rgba(255,255,255,0.2)',
            transition: 'transform 0.15s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >🌐 VIEW LIVE</a>
          <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{
            padding: '11px 16px',
            background: 'rgba(255,255,255,0.07)',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: 10, color: COLORS.text,
            fontFamily: 'Bangers', letterSpacing: 1, fontSize: 16,
            textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
            transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = project.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="pow-burst" style={{ margin: '0 auto 16px', background: COLORS.accent2 }}>POW</div>
          <h2 className="comic-title" style={{ fontSize: 52, color: COLORS.text }}>
            REAL <span style={{ color: COLORS.accent2 }}>PROJECTS</span> SHIPPED
          </h2>
          <p style={{ color: COLORS.muted, fontSize: 16, marginTop: 8, maxWidth: 500, margin: '8px auto 0' }}>
            Every project below was built for a real client or a real use case — not just UI practice.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>

        {/* GitHub CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="https://github.com/ZorichDev" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            fontFamily: 'Bangers', letterSpacing: 2, fontSize: 18,
            color: COLORS.text, textDecoration: 'none',
            border: '2.5px solid rgba(255,255,255,0.15)',
            padding: '12px 28px', borderRadius: 12,
            background: COLORS.cardBg,
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
            transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent2; e.currentTarget.style.color = COLORS.accent2; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = COLORS.text; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            SEE MORE ON GITHUB →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── SKILLS ──────────────── */
function Skills() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const skills = [
    { name: 'React & Ecosystem', level: 90, icon: '⚛️', color: COLORS.accent3 },
    { name: 'JavaScript / TypeScript', level: 88, icon: '🟨', color: COLORS.accent2 },
    { name: 'CSS / Tailwind CSS', level: 92, icon: '🎨', color: '#63b3ed' },
    { name: 'Responsive & Mobile UI', level: 90, icon: '📱', color: COLORS.accent4 },
    { name: 'REST API Integration', level: 85, icon: '🔌', color: COLORS.accent1 },
    { name: 'Performance & Best Practices', level: 82, icon: '⚡', color: COLORS.accent2 },
  ];

  const stackItems = [
    { icon: '⚛️', name: 'React', sub: 'Hooks · Context · React Router' },
    { icon: '🟨', name: 'JavaScript', sub: 'ES6+ · TypeScript' },
    { icon: '💨', name: 'Tailwind CSS', sub: 'CSS3 · SASS · Animations' },
    { icon: '✏️', name: 'UI/UX', sub: 'Figma → Code · Responsive · A11y' },
    { icon: '📊', name: 'Data Viz', sub: 'Chart.js · Recharts' },
    { icon: '🌐', name: 'API Integration', sub: 'REST · Axios · Fetch' },
    { icon: '🚀', name: 'Deployment', sub: 'Netlify · Vercel · Git' },
    { icon: '🔧', name: 'Tooling', sub: 'Vite · npm · ESLint' },
  ];

  return (
    <section id="skills" style={{ padding: '80px 24px', position: 'relative' }} ref={ref}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="pow-burst" style={{ margin: '0 auto 16px', background: COLORS.accent3, color: COLORS.ink }}>ZAP</div>
          <h2 className="comic-title" style={{ fontSize: 52, color: COLORS.text }}>
            SKILLS & <span style={{ color: COLORS.accent3 }}>STACK</span>
          </h2>
          <p style={{ color: COLORS.muted, fontSize: 15, marginTop: 8 }}>
            Tools I use every day to ship production-quality frontend.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 40, alignItems: 'start',
        }}>
          {/* Skill bars */}
          <div>
            <div style={{ fontFamily: 'Bangers', fontSize: 20, letterSpacing: 2, color: COLORS.muted, marginBottom: 24 }}>
              PROFICIENCY LEVELS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>{s.icon}</span> {s.name}
                    </span>
                    <span style={{ fontFamily: 'Bangers', fontSize: 18, color: s.color, letterSpacing: 1 }}>
                      {s.level}%
                    </span>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: 999, height: 14,
                    border: '2px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                  }}>
                    <div className="skill-bar-fill" style={{
                      background: `linear-gradient(90deg, ${s.color}99, ${s.color})`,
                      width: inView ? `${s.level}%` : '0%',
                      transitionDelay: `${i * 0.1}s`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack grid */}
          <div>
            <div style={{ fontFamily: 'Bangers', fontSize: 20, letterSpacing: 2, color: COLORS.muted, marginBottom: 24 }}>
              TECH I USE DAILY
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {stackItems.map((item) => (
                <div key={item.name} className="panel-border" style={{
                  background: COLORS.cardBg, padding: '16px 14px', cursor: 'default',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.borderColor = COLORS.accent1; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                >
                  <div style={{ fontSize: 26, marginBottom: 4 }}>{item.icon}</div>
                  <div style={{ fontFamily: 'Bangers', fontSize: 18, letterSpacing: 1, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extra skills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40, justifyContent: 'center' }}>
          {['Git & GitHub', 'Responsive Design', 'Web Performance', 'EmailJS', 'Framer Motion', 'Accessibility', 'Cross-browser', 'Agile/Scrum'].map((s) => (
            <div key={s} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,255,255,0.1)',
              borderRadius: 12, padding: '8px 18px',
              fontSize: 13, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'border-color 0.2s, color 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent2; e.currentTarget.style.color = COLORS.accent2; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = COLORS.text; }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.accent1, display: 'inline-block' }} />
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── CONTACT ──────────────── */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const track = (event, page = 'home') => {
  fetch(`${API_URL}/api/analytics/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, page }),
  }).catch(() => {});
};

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: 'loading', msg: '⏳ Sending your message...' });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', msg: "✅ Message sent! I'll get back to you within 24 hours." });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: `💥 ${data.error || 'Send failed. Email me directly: francis1chinazor@gmail.com'}` });
      }
    } catch {
      setStatus({ type: 'error', msg: '💥 Network error. Email me directly: francis1chinazor@gmail.com' });
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 7000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: COLORS.muted }}>YOUR NAME *</label>
          <input name="name" value={form.name} onChange={handleChange} required
                 className="comic-input" placeholder="John Doe" />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: COLORS.muted }}>EMAIL *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required
                 className="comic-input" placeholder="you@company.com" />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: COLORS.muted }}>SUBJECT</label>
        <input name="subject" value={form.subject} onChange={handleChange}
               className="comic-input" placeholder="e.g. Hiring inquiry / Project collaboration" />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: COLORS.muted }}>MESSAGE *</label>
        <textarea name="message" value={form.message} onChange={handleChange} required
                  rows={5} className="comic-input"
                  placeholder="Tell me about the role or project — I'll get back to you within 24 hours."
                  style={{ resize: 'vertical' }} />
      </div>

      {status && (
        <div style={{
          padding: '12px 16px', borderRadius: 12, marginBottom: 16,
          background: status.type === 'success' ? 'rgba(78,205,196,0.12)' :
                      status.type === 'error'   ? 'rgba(233,69,96,0.12)' : 'rgba(245,166,35,0.1)',
          border: `2px solid ${
            status.type === 'success' ? 'rgba(78,205,196,0.3)' :
            status.type === 'error'   ? 'rgba(233,69,96,0.3)'  : 'rgba(245,166,35,0.3)'
          }`,
          fontFamily: 'Comic Neue', fontWeight: 700, fontSize: 14,
          color: status.type === 'success' ? COLORS.accent3 :
                 status.type === 'error'   ? COLORS.accent1  : COLORS.accent2,
        }}>{status.msg}</div>
      )}

      <button type="submit" disabled={sending} style={{
        width: '100%', padding: '16px',
        background: sending ? 'rgba(233,69,96,0.5)' : COLORS.accent1,
        color: '#fff', fontFamily: 'Bangers', letterSpacing: 3, fontSize: 22,
        border: '3px solid rgba(255,255,255,0.2)',
        borderRadius: 14, cursor: sending ? 'not-allowed' : 'pointer',
        boxShadow: sending ? 'none' : '5px 5px 0 rgba(0,0,0,0.3)',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
        onMouseEnter={e => { if (!sending) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '7px 7px 0 rgba(0,0,0,0.3)'; }}}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0 rgba(0,0,0,0.3)'; }}
      >
        {sending ? '⏳ SENDING...' : '🚀 SEND MESSAGE'}
      </button>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: '80px 24px 100px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="pow-burst" style={{ margin: '0 auto 16px', background: COLORS.accent4 }}>YO!</div>
          <h2 className="comic-title" style={{ fontSize: 52, color: COLORS.text }}>
            LET'S <span style={{ color: COLORS.accent4 }}>WORK</span> TOGETHER
          </h2>
          <p style={{ color: COLORS.muted, fontSize: 16, marginTop: 8 }}>
            Hiring? Have a project? Want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
        }}>
          {/* Left */}
          <div>
            <div className="speech-bubble" style={{ padding: '18px 22px', marginBottom: 32, fontSize: 15, lineHeight: 1.75 }}>
              I'm actively looking for <strong>frontend / React developer</strong> roles — full-time, remote, or contract.
              Whether you're a recruiter, a startup, or a business owner with a project,
              I'm ready to start a conversation. <strong>Response time: under 24 hours. 🤝</strong>
            </div>

            {[
              { icon: '📧', label: 'Email (preferred)', val: 'francis1chinazor@gmail.com', href: 'mailto:francis1chinazor@gmail.com', color: COLORS.accent1 },
              { icon: '💼', label: 'LinkedIn', val: 'Francis Chinazor', href: 'https://www.linkedin.com/in/francis-chinazor-081b8933b', color: '#0077b5' },
              { icon: '🐱', label: 'GitHub', val: '@ZorichDev', href: 'https://github.com/ZorichDev', color: COLORS.muted },
              { icon: '💬', label: 'WhatsApp', val: '+234 906 924 6577', href: 'https://wa.me/2349069246577', color: '#25D366' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                 style={{
                   display: 'flex', alignItems: 'center', gap: 16,
                   textDecoration: 'none', color: COLORS.text,
                   marginBottom: 14, padding: '14px 18px',
                   background: COLORS.cardBg,
                   border: '2px solid rgba(255,255,255,0.1)',
                   borderRadius: 14,
                   transition: 'border-color 0.2s, transform 0.2s',
                   boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
                 }}
                 onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = 'translateX(4px)'; }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${item.color}20`, border: `2px solid ${item.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: item.color }}>{item.val}</div>
                </div>
              </a>
            ))}

            {/* Resume download CTA */}
            <a href={Resume} download onClick={() => track('cv_download')} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              marginTop: 8, padding: '14px 20px',
              fontFamily: 'Bangers', letterSpacing: 2, fontSize: 18,
              background: 'rgba(245,166,35,0.1)', color: COLORS.accent2,
              border: `2.5px solid rgba(245,166,35,0.35)`,
              borderRadius: 14, textDecoration: 'none',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
              transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,166,35,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,166,35,0.1)'; e.currentTarget.style.transform = 'none'; }}
            >⬇ DOWNLOAD MY CV / RESUME</a>
          </div>

          {/* Right — form */}
          <div className="panel-border" style={{ background: COLORS.cardBg, padding: 32, borderRadius: 16 }}>
            <div style={{ fontFamily: 'Bangers', fontSize: 22, letterSpacing: 2, marginBottom: 6, color: COLORS.text }}>
              SEND A MESSAGE 📨
            </div>
            <p style={{ fontSize: 13, color: COLORS.muted, marginBottom: 22, lineHeight: 1.6 }}>
              Fill the form and I'll reply within 24 hours. You can also reach me directly via email or WhatsApp.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── FOOTER ──────────────── */
function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{
      background: COLORS.panel,
      borderTop: '3px solid rgba(255,255,255,0.07)',
      padding: '48px 24px 32px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32, marginBottom: 40,
        }}>
          <div>
            <div style={{ fontFamily: 'Bangers', fontSize: 28, letterSpacing: 3, marginBottom: 12 }}>
              <span style={{ color: COLORS.accent1 }}>FRAN</span>
              <span style={{ color: COLORS.text }}>TECH</span>
              <span style={{ color: COLORS.accent2 }}>DEV</span>
            </div>
            <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.75, marginBottom: 16 }}>
              React Developer from Lagos, Nigeria — building fast, responsive, production-ready web apps for real clients.
            </p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              {[
                { href: 'https://github.com/ZorichDev', icon: '🐱' },
                { href: 'https://www.linkedin.com/in/francis-chinazor-081b8933b', icon: '💼' },
                { href: 'mailto:francis1chinazor@gmail.com', icon: '📧' },
                { href: 'https://wa.me/2349069246577', icon: '💬' },
              ].map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(255,255,255,0.07)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, textDecoration: 'none',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent1; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'Bangers', fontSize: 18, letterSpacing: 2, marginBottom: 16, color: COLORS.muted }}>NAVIGATE</div>
            {['home', 'about', 'projects', 'skills', 'contact'].map(l => (
              <button key={l} onClick={() => go(l)} style={{
                display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                color: COLORS.muted, fontSize: 14, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, padding: 0,
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.accent1}
                onMouseLeave={e => e.currentTarget.style.color = COLORS.muted}
              >{l}</button>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: 'Bangers', fontSize: 18, letterSpacing: 2, marginBottom: 16, color: COLORS.muted }}>RESOURCES</div>
            {[
              { label: '⬇ Download Resume', href: Resume, download: true },
              { label: '🏆 View Certificate', href: certificate, download: true },
              { label: '🐱 GitHub Portfolio', href: 'https://github.com/ZorichDev', download: false },
              { label: '💼 LinkedIn Profile', href: 'https://www.linkedin.com/in/francis-chinazor-081b8933b', download: false },
            ].map(r => (
              <a key={r.label} href={r.href} {...(r.download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
                 style={{
                   display: 'block', color: COLORS.muted, fontSize: 13, fontWeight: 700,
                   marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s',
                 }}
                 onMouseEnter={e => e.currentTarget.style.color = COLORS.accent2}
                 onMouseLeave={e => e.currentTarget.style.color = COLORS.muted}
              >{r.label}</a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '2px dashed rgba(255,255,255,0.07)',
          paddingTop: 24, display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}>
          <p style={{ fontSize: 13, color: COLORS.muted }}>
            © {new Date().getFullYear()} Francis Chinazor — React Frontend Developer. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: COLORS.muted, fontFamily: 'Comic Neue', fontWeight: 700 }}>
            Built with ❤️ using React + Vite + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────── FLOATING BUTTONS ──────────────── */
function FloatingButtons({ showScrollTop }) {
  return (
    <>
      <a href="https://wa.me/2349069246577" target="_blank" rel="noopener noreferrer"
         style={{
           position: 'fixed', bottom: 88, right: 24, zIndex: 90,
           width: 52, height: 52, borderRadius: '50%',
           background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
           boxShadow: '0 0 0 4px rgba(37,211,102,0.2), 4px 4px 0 rgba(0,0,0,0.3)',
           border: '2.5px solid rgba(255,255,255,0.25)',
           fontSize: 24, textDecoration: 'none',
           animation: 'pulse-green 2s infinite',
           transition: 'transform 0.2s',
         }}
         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
         onMouseLeave={e => e.currentTarget.style.transform = 'none'}
      >💬</a>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  position: 'fixed', bottom: 24, right: 24, zIndex: 90,
                  width: 52, height: 52, borderRadius: '50%',
                  background: COLORS.accent1, color: '#fff',
                  border: '2.5px solid rgba(255,255,255,0.25)',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                  cursor: 'pointer', fontSize: 22,
                  transition: 'transform 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Bangers',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >↑</button>
      )}
    </>
  );
}

/* ──────────────── ROOT ──────────────── */
export default function FranzorPortfolio() {
  const [active, setActive] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fn = () => {
      setShowScrollTop(window.scrollY > 400);
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (window.scrollY + 120 >= offsetTop && window.scrollY + 120 < offsetTop + offsetHeight) {
            setActive(s);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="halftone-bg" style={{ position: 'relative' }}>
      <GlobalStyles />
      <Nav active={active} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons showScrollTop={showScrollTop} />
    </div>
  );
}