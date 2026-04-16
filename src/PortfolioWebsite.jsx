import { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
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
  ink: '#1a1a2e',
  panel: '#16213e',
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
      --ink: #1a1a2e;
      --panel: #16213e;
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

    /* Halftone dot pattern background */
    .halftone-bg {
      position: relative;
    }
    .halftone-bg::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
      z-index: 0;
    }

    /* Comic panel borders */
    .panel-border {
      border: 3px solid rgba(255,255,255,0.15);
      border-radius: 16px;
      box-shadow: 6px 6px 0px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
    }

    .panel-border-accent {
      border: 3px solid var(--accent1);
      border-radius: 16px;
      box-shadow: 6px 6px 0px rgba(233,69,96,0.3);
    }

    /* Speech bubble */
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

    /* Thought bubble */
    .thought-bubble {
      background: var(--bubble);
      color: var(--ink);
      border: 3px solid var(--ink);
      border-radius: 20px;
      box-shadow: 4px 4px 0 var(--ink);
      font-family: 'Comic Neue', cursive;
      font-weight: 700;
    }

    /* Comic headings */
    .comic-title {
      font-family: 'Bangers', cursive;
      letter-spacing: 3px;
      text-shadow: 4px 4px 0 rgba(0,0,0,0.5), -1px -1px 0 rgba(255,255,255,0.1);
    }

    /* Action word burst */
    .burst {
      display: inline-block;
      font-family: 'Bangers', cursive;
      letter-spacing: 2px;
      transform: rotate(-3deg);
      text-shadow: 3px 3px 0 rgba(0,0,0,0.5);
    }

    /* Zigzag border */
    .zigzag-top {
      position: relative;
    }
    .zigzag-top::before {
      content: '';
      position: absolute;
      top: -12px;
      left: 0;
      right: 0;
      height: 14px;
      background: linear-gradient(135deg, var(--ink) 25%, transparent 25%) -20px 0,
                  linear-gradient(225deg, var(--ink) 25%, transparent 25%) -20px 0,
                  linear-gradient(315deg, var(--ink) 25%, transparent 25%),
                  linear-gradient(45deg,  var(--ink) 25%, transparent 25%);
      background-size: 24px 14px;
    }

    /* Bounce animation */
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

    @keyframes slide-up {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes scan-line {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }

    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes dash {
      to { stroke-dashoffset: 0; }
    }

    .anim-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
    .anim-float { animation: float 3s ease-in-out infinite; }
    .anim-wiggle { animation: wiggle 2s ease-in-out infinite; }
    .anim-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
    .anim-slide-up { animation: slide-up 0.5s ease both; }
    .anim-spin { animation: spin-slow 8s linear infinite; }

    /* Nav link underline */
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

    /* Skill bar */
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

    /* Project card hover */
    .project-card {
      transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
    }
    .project-card:hover {
      transform: translateY(-8px) rotate(0.5deg);
      box-shadow: 10px 10px 0px rgba(0,0,0,0.5), 0 0 30px rgba(233,69,96,0.2) !important;
    }

    /* Sticker badge */
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

    /* Input styles */
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

    /* Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--ink); }
    ::-webkit-scrollbar-thumb { background: var(--accent1); border-radius: 4px; }

    /* Mobile nav overlay */
    .mobile-nav-overlay {
      position: fixed;
      inset: 0;
      background: rgba(26,26,46,0.98);
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 32px;
    }

    /* Onomatopoeia burst shapes */
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

    /* Responsive */
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
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
        background: scrolled ? 'rgba(26,26,46,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '2px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 68,
        }}>
          {/* Logo */}
          <div style={{ fontFamily: 'Bangers', fontSize: 28, letterSpacing: 3, cursor: 'pointer' }}
               onClick={() => go('home')}>
            <span style={{ color: COLORS.accent1 }}>FRAN</span>
            <span style={{ color: COLORS.text }}>TECH</span>
            <span style={{ color: COLORS.accent2 }}>DEV</span>
          </div>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {links.map(l => (
              <button key={l} className={`nav-link ${active === l ? 'active' : ''}`}
                      onClick={() => go(l)}>{l}</button>
            ))}
            <a href="./img/franzor cv.pdf" download style={{
              fontFamily: 'Bangers', letterSpacing: 2, fontSize: 16,
              background: COLORS.accent1, color: '#fff',
              border: '2.5px solid rgba(255,255,255,0.3)',
              padding: '8px 20px', borderRadius: 12,
              boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
              textDecoration: 'none', transition: 'transform 0.2s',
              display: 'inline-block',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >⬇ CV</a>
          </div>

          {/* Hamburger */}
          <button className="hide-desktop" onClick={() => setOpen(true)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.text, fontSize: 28 }}>
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
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
        </div>
      )}
    </>
  );
}

/* ──────────────── HERO ──────────────── */
function Hero() {
  const [typed, setTyped] = useState('');
  const roles = ['React Developer', 'UI Engineer', 'Frontend Architect', 'Digital Craftsman'];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const role = roles[roleRef.current];
      if (charRef.current <= role.length) {
        setTyped(role.slice(0, charRef.current));
        charRef.current++;
        timerRef.current = setTimeout(tick, 80);
      } else {
        timerRef.current = setTimeout(() => {
          charRef.current = 0;
          roleRef.current = (roleRef.current + 1) % roles.length;
          tick();
        }, 2000);
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
      {/* Decorative panels */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
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
          background: `linear-gradient(90deg, transparent, rgba(233,69,96,${0.03 + i * 0.015}), transparent)`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 48, alignItems: 'center',
        }}>
          {/* Left */}
          <div>
            {/* Status badge */}
            <div className="anim-bounce-in" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(78,205,196,0.12)',
              border: '2px solid rgba(78,205,196,0.3)',
              borderRadius: 999, padding: '6px 16px',
              marginBottom: 24, fontSize: 13, fontWeight: 700,
              color: COLORS.accent3,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.accent3, display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
              Open to opportunities
            </div>

            <h1 className="comic-title" style={{
              fontSize: 'clamp(52px, 8vw, 88px)',
              lineHeight: 1.05,
              marginBottom: 16,
            }}>
              <span style={{ color: COLORS.text }}>CRAFTING</span><br />
              <span style={{
                WebkitTextStroke: `3px ${COLORS.accent1}`,
                color: 'transparent',
              }}>DIGITAL</span><br />
              <span style={{ color: COLORS.accent2 }}>MAGIC</span>
            </h1>

            {/* Typed role */}
            <div style={{
              fontFamily: 'Bangers', letterSpacing: 3,
              fontSize: 24, color: COLORS.accent3,
              marginBottom: 24, minHeight: 36,
            }}>
              {typed}<span style={{ animation: 'wiggle 0.5s infinite', display: 'inline-block', color: COLORS.accent1 }}>|</span>
            </div>

            {/* Speech bubble intro */}
            <div className="speech-bubble anim-bounce-in" style={{
              padding: '16px 20px', marginBottom: 32,
              maxWidth: 420, fontSize: 15, lineHeight: 1.6,
              animationDelay: '0.3s',
            }}>
              Hi! I'm <strong>Francis Chinazor</strong> — a frontend developer from Lagos, Nigeria.
              I turn ideas into fast, beautiful web experiences with React & modern CSS. 🚀
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  fontFamily: 'Bangers', letterSpacing: 2, fontSize: 20,
                  background: COLORS.accent1, color: '#fff',
                  border: '3px solid rgba(255,255,255,0.2)',
                  padding: '14px 32px', borderRadius: 14,
                  cursor: 'pointer',
                  boxShadow: `5px 5px 0 rgba(0,0,0,0.4)`,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '7px 7px 0 rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0 rgba(0,0,0,0.4)'; }}
              >⚡ SEE MY WORK</button>

              <a href="./img/franzor cv.pdf" download style={{
                fontFamily: 'Bangers', letterSpacing: 2, fontSize: 20,
                background: 'transparent', color: COLORS.text,
                border: `3px solid rgba(255,255,255,0.25)`,
                padding: '14px 32px', borderRadius: 14,
                textDecoration: 'none', display: 'inline-block',
                boxShadow: '5px 5px 0 rgba(0,0,0,0.3)',
                transition: 'transform 0.15s, border-color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = COLORS.accent2; e.currentTarget.style.color = COLORS.accent2; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = COLORS.text; }}
              >⬇ GET CV</a>
            </div>

            {/* Tech pill badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'JavaScript'].map((t, i) => (
                <span key={t} style={{
                  ...techBadgeColors[i % techBadgeColors.length],
                  padding: '5px 14px', borderRadius: 999,
                  fontWeight: 800, fontSize: 13,
                  border: `2px solid ${techBadgeColors[i % techBadgeColors.length].border}`,
                  background: techBadgeColors[i % techBadgeColors.length].bg,
                  color: techBadgeColors[i % techBadgeColors.length].text,
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right — avatar panel */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            {/* Comic panel frame */}
            <div style={{
              position: 'relative',
              display: 'inline-block',
            }}>
              {/* Decorative rings */}
              <div className="anim-spin" style={{
                position: 'absolute', inset: -24,
                border: `3px dashed rgba(233,69,96,0.3)`,
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />
              <div className="anim-spin" style={{
                position: 'absolute', inset: -12,
                border: `2px dashed rgba(245,166,35,0.25)`,
                borderRadius: '50%',
                animationDirection: 'reverse',
                pointerEvents: 'none',
              }} />

              {/* Profile image */}
              <div className="anim-float" style={{
                width: 280, height: 280,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `5px solid ${COLORS.accent1}`,
                boxShadow: `8px 8px 0 ${COLORS.ink}, 8px 8px 0 2px ${COLORS.accent1}`,
                position: 'relative',
              }}>
                <img src={profileIMG} alt="Francis Chinazor"
                     style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* Screen overlay scan effect */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(233,69,96,0.15) 100%)',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Floating stat bubbles */}
              <div className="thought-bubble anim-bounce-in" style={{
                position: 'absolute', top: -20, right: -30,
                padding: '10px 16px', fontSize: 13,
                animationDelay: '0.6s', whiteSpace: 'nowrap',
                zIndex: 2,
              }}>
                ⚡ 45+ Projects
              </div>
              <div className="thought-bubble anim-bounce-in" style={{
                position: 'absolute', bottom: 10, left: -40,
                padding: '10px 16px', fontSize: 13,
                animationDelay: '0.9s', whiteSpace: 'nowrap',
                zIndex: 2,
              }}>
                🎯 32 Happy Clients
              </div>
              <div className="thought-bubble anim-bounce-in" style={{
                position: 'absolute', bottom: -20, right: -20,
                padding: '10px 16px', fontSize: 13,
                animationDelay: '1.1s', whiteSpace: 'nowrap',
                zIndex: 2,
              }}>
                🇳🇬 Lagos, NG
              </div>
            </div>
          </div>
        </div>

        {/* KPI strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 16, marginTop: 64,
        }}>
          {[
            { val: '45+', label: 'React Projects', icon: '⚛️', color: COLORS.accent3 },
            { val: '98%', label: 'Code Quality', icon: '✨', color: COLORS.accent2 },
            { val: '50+', label: 'UI Designs', icon: '🎨', color: COLORS.accent4 },
            { val: '32', label: 'Happy Clients', icon: '🤝', color: COLORS.accent1 },
          ].map((k, i) => (
            <div key={k.label} className="panel-border anim-slide-up" style={{
              background: COLORS.cardBg,
              padding: '20px 16px', textAlign: 'center',
              animationDelay: `${i * 0.1}s`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{k.icon}</div>
              <div className="comic-title" style={{ fontSize: 32, color: k.color }}>{k.val}</div>
              <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 600 }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── ABOUT / STORY PANEL ──────────────── */
function About() {
  return (
    <section id="about" style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="pow-burst" style={{ margin: '0 auto 16px' }}>WHO</div>
          <h2 className="comic-title" style={{ fontSize: 52, color: COLORS.text }}>
            THE <span style={{ color: COLORS.accent1 }}>ORIGIN</span> STORY
          </h2>
        </div>

        {/* Comic panels layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {[
            {
              panel: '01',
              title: 'CHAPTER 1',
              content: 'Born in Nigeria with a passion for computers. Discovered the web and never looked back.',
              icon: '🌟',
              color: COLORS.accent1,
            },
            {
              panel: '02',
              title: 'LEVEL UP',
              content: 'Mastered React, TypeScript & Tailwind. Built 45+ projects ranging from FinTech dashboards to real estate platforms.',
              icon: '⚡',
              color: COLORS.accent2,
            },
            {
              panel: '03',
              title: 'POWER UNLOCKED',
              content: 'Integrated AI chat assistants, built Pan-African travel platforms, and delivered pixel-perfect UIs for global clients.',
              icon: '🚀',
              color: COLORS.accent3,
            },
            {
              panel: '04',
              title: 'HERO STATUS',
              content: '3+ years of frontend excellence. Currently open for full-time roles, freelance work, and creative collaborations.',
              icon: '🏆',
              color: COLORS.accent4,
            },
          ].map((item, i) => (
            <div key={item.panel} className="panel-border" style={{
              background: COLORS.cardBg,
              padding: 28,
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.25s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px) rotate(-0.5deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              {/* Panel number */}
              <div style={{
                position: 'absolute', top: 12, right: 16,
                fontFamily: 'Bangers', fontSize: 60, color: 'rgba(255,255,255,0.04)',
                letterSpacing: 2,
              }}>{item.panel}</div>

              <div style={{ fontSize: 40, marginBottom: 12 }}>{item.icon}</div>
              <div className="sticker" style={{ marginBottom: 12 }}>{item.title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(248,244,227,0.8)' }}>
                {item.content}
              </p>

              {/* Accent bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 4,
                background: item.color,
                borderRadius: '0 0 13px 13px',
              }} />
            </div>
          ))}
        </div>

        {/* Availability badge */}
        <div style={{
          marginTop: 40,
          background: 'rgba(78,205,196,0.08)',
          border: `2px solid rgba(78,205,196,0.25)`,
          borderRadius: 16, padding: '24px 32px',
          display: 'flex', flexWrap: 'wrap', gap: 16,
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: COLORS.accent3,
              boxShadow: `0 0 0 4px rgba(78,205,196,0.2)`,
              animation: 'pulse-glow 2s infinite',
            }} />
            <span style={{ fontFamily: 'Bangers', letterSpacing: 2, fontSize: 22, color: COLORS.accent3 }}>
              AVAILABLE FOR HIRE
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Remote 🌍', 'Full-time 💼', 'Freelance 🎯'].map(tag => (
              <span key={tag} style={{
                background: 'rgba(78,205,196,0.12)',
                border: `1.5px solid rgba(78,205,196,0.3)`,
                color: COLORS.accent3,
                padding: '4px 14px', borderRadius: 999,
                fontSize: 13, fontWeight: 700,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── PROJECTS ──────────────── */
const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'React Dashboard',
    image: null, // will use ecommerce
    imgVar: 'ecommerce',
    desc: 'Modern e-commerce interface with product filtering and cart functionality',
    tech: ['React', 'Context API', 'Tailwind', 'Stripe'],
    metrics: { users: '50K+', rating: '4.8/5', speed: '95%' },
    live: 'https://paintlifeltd.com/',
    repo: 'https://github.com/ZorichDev',
    color: COLORS.accent1,
  },
  {
    title: 'FinTech Dashboard',
    category: 'Real-time UI',
    imgVar: 'pospadi',
    desc: 'Interactive financial dashboard with real-time charts and data visualization',
    tech: ['React', 'TypeScript', 'Chart.js', 'WebSocket'],
    metrics: { accuracy: '99.9%', speed: '0.2s', users: '25K' },
    live: 'https://pospadi.com.ng',
    repo: 'https://github.com/InternPulse-Frontend-March-2025',
    color: COLORS.accent2,
  },
  {
    title: 'Real Estate Platform',
    category: 'Responsive Web App',
    imgVar: 'betahomes',
    desc: 'Property listing platform with interactive maps and virtual tours',
    tech: ['React', 'Tailwind', 'Google Maps', '3D.js'],
    metrics: { properties: '5K+', views: '500K', mobile: '100%' },
    live: 'https://betamerchanthomesandmore.com/',
    repo: 'https://github.com/ZorichDev',
    color: COLORS.accent3,
  },
  {
    title: 'IT Solutions Hub',
    category: 'Admin Dashboard',
    imgVar: 'IT',
    desc: 'Service management dashboard with ticket system and analytics',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    metrics: { tickets: '100K+', clients: '200+', uptime: '99.9%' },
    live: 'https://iprolance-solutions.cyjustdeals.com/',
    repo: 'https://github.com/ZorichDev',
    color: COLORS.accent4,
  },
  {
    title: 'Finance Dashboard',
    category: 'Data Visualization',
    imgVar: 'freelancer',
    desc: 'Personal finance tracker with interactive charts and budgeting tools',
    tech: ['React', 'Chakra UI', 'Chart.js', 'LocalStorage'],
    metrics: { users: '10K+', rating: '4.7/5', load: '0.3s' },
    live: 'https://freelancer-dashboard5.netlify.app/profile',
    repo: 'https://github.com/ZorichDev/Freelancer-Dashboard5',
    color: COLORS.accent1,
  },
  {
    title: 'Branding Platform',
    category: 'E-commerce UI',
    imgVar: 'cyjust',
    desc: 'Modern e-commerce interface with product catalog and checkout',
    tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    metrics: { visitors: '100K+', sales: '$500K+', mobile: '95%' },
    live: 'https://www.cyjustdeals.com/',
    repo: 'https://github.com/Efezino218/cyjust_deals',
    color: COLORS.accent2,
  },
];

const imgMap = { ecommerce, pospadi, betahomes, IT, freelancer, cyjust };

function ProjectCard({ project, index }) {
  return (
    <div className="project-card panel-border" style={{
      background: COLORS.cardBg,
      borderRadius: 16, overflow: 'hidden',
      position: 'relative',
      animationDelay: `${index * 0.1}s`,
    }}>
      {/* Image */}
      <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
        <img src={imgMap[project.imgVar]} alt={project.title}
             style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
             onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
             onMouseLeave={e => e.target.style.transform = 'none'} />

        {/* Category sticker */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: project.color, color: '#fff',
          fontFamily: 'Bangers', letterSpacing: 1, fontSize: 13,
          padding: '4px 12px', borderRadius: 999,
          border: '2px solid rgba(255,255,255,0.3)',
          boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
        }}>{project.category}</div>
      </div>

      <div style={{ padding: '20px 20px 16px' }}>
        <h3 style={{ fontFamily: 'Bangers', fontSize: 24, letterSpacing: 1, marginBottom: 8, color: COLORS.text }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, marginBottom: 16 }}>
          {project.desc}
        </p>

        {/* Metrics */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8, marginBottom: 16,
          paddingBottom: 16, borderBottom: '1.5px dashed rgba(255,255,255,0.1)',
        }}>
          {Object.entries(project.metrics).map(([k, v]) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{k}</div>
              <div style={{ fontFamily: 'Bangers', fontSize: 18, color: project.color, letterSpacing: 1 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Tech */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              padding: '2px 10px', borderRadius: 8,
              fontSize: 12, fontWeight: 700, color: 'rgba(248,244,227,0.75)',
            }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 10 }}>
          <a href={project.live} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, padding: '10px 0', textAlign: 'center',
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
          >🌐 LIVE</a>
          <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{
            padding: '10px 16px',
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
            {/* GitHub icon */}
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
            MY <span style={{ color: COLORS.accent2 }}>EPIC</span> BUILDS
          </h2>
          <p style={{ color: COLORS.muted, fontSize: 16, marginTop: 8 }}>Real projects. Real results. Real impact.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
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
    { name: 'React Ecosystem', level: 95, icon: '⚛️', color: COLORS.accent3 },
    { name: 'JavaScript / TypeScript', level: 90, icon: '🟨', color: COLORS.accent2 },
    { name: 'CSS / Tailwind', level: 92, icon: '🎨', color: '#63b3ed' },
    { name: 'UI/UX Design', level: 88, icon: '✏️', color: COLORS.accent4 },
    { name: 'API Integration', level: 85, icon: '🔌', color: COLORS.accent1 },
    { name: 'Performance Opt.', level: 90, icon: '⚡', color: COLORS.accent2 },
  ];

  const stackItems = [
    { icon: '⚛️', name: 'React', sub: 'Hooks · Context · Redux' },
    { icon: '🟨', name: 'JavaScript', sub: 'ES6+ · TypeScript' },
    { icon: '💨', name: 'Tailwind CSS', sub: 'CSS3 · SASS · Animations' },
    { icon: '✏️', name: 'UI/UX', sub: 'Figma · Responsive · A11y' },
    { icon: '📊', name: 'Data Viz', sub: 'Chart.js · D3 · Recharts' },
    { icon: '🌐', name: 'API Layer', sub: 'REST · GraphQL · WS' },
    { icon: '🚀', name: 'Next.js', sub: 'SSR · ISR · App Router' },
    { icon: '🔧', name: 'DevOps', sub: 'Git · Netlify · Vercel' },
  ];

  return (
    <section id="skills" style={{ padding: '80px 24px', position: 'relative' }} ref={ref}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="pow-burst" style={{ margin: '0 auto 16px', background: COLORS.accent3, color: COLORS.ink }}>ZAP</div>
          <h2 className="comic-title" style={{ fontSize: 52, color: COLORS.text }}>
            POWER <span style={{ color: COLORS.accent3 }}>LEVELS</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 40, alignItems: 'start',
        }}>
          {/* Skill bars */}
          <div>
            <div style={{
              fontFamily: 'Bangers', fontSize: 22, letterSpacing: 2,
              color: COLORS.muted, marginBottom: 24,
            }}>PROFICIENCY METER</div>
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
                      background: `linear-gradient(90deg, ${s.color}aa, ${s.color})`,
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
            <div style={{
              fontFamily: 'Bangers', fontSize: 22, letterSpacing: 2,
              color: COLORS.muted, marginBottom: 24,
            }}>TECH ARSENAL</div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14,
            }}>
              {stackItems.map((item, i) => (
                <div key={item.name} className="panel-border" style={{
                  background: COLORS.cardBg,
                  padding: '16px 14px',
                  cursor: 'default',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.borderColor = COLORS.accent1; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                >
                  <div style={{ fontSize: 26, marginBottom: 4 }}>{item.icon}</div>
                  <div style={{ fontFamily: 'Bangers', fontSize: 18, letterSpacing: 1, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extra skills row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40,
          justifyContent: 'center',
        }}>
          {['Git/GitHub', 'Responsive Design', 'Web Performance', 'SEO', 'Testing', 'Agile/Scrum', 'CI/CD', 'Accessibility'].map((s, i) => (
            <div key={s} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,255,255,0.12)',
              borderRadius: 12, padding: '8px 18px',
              fontSize: 13, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'border-color 0.2s, color 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent2; e.currentTarget.style.color = COLORS.accent2; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = COLORS.text; }}
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
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: 'loading', msg: 'Sending your message...' });
    try {
      const now = new Date();
      const res = await emailjs.send('service_ptzp7rd', 'template_uvkbxrd', {
        to_email: 'francis1chinazor@gmail.com',
        to_name: 'Francis Chinazor',
        from_name: form.name,
        from_email: form.email,
        subject: form.subject || 'Portfolio Inquiry',
        message: form.message,
        date: now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }, '3PD5AyCly9DCyS4u1');
      if (res.status === 200) {
        setStatus({ type: 'success', msg: '✅ KABOOM! Message delivered successfully!' });
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setStatus({ type: 'error', msg: '💥 Oops! Failed. Email me directly: francis1chinazor@gmail.com' });
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 6000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: COLORS.muted }}>YOUR NAME</label>
          <input name="name" value={form.name} onChange={handleChange} required
                 className="comic-input" placeholder="John Doe" />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: COLORS.muted }}>EMAIL</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required
                 className="comic-input" placeholder="you@example.com" />
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: COLORS.muted }}>SUBJECT</label>
        <input name="subject" value={form.subject} onChange={handleChange}
               className="comic-input" placeholder="Project inquiry" />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: COLORS.muted }}>MESSAGE</label>
        <textarea name="message" value={form.message} onChange={handleChange} required
                  rows={5} className="comic-input" placeholder="Tell me about your project..."
                  style={{ resize: 'vertical' }} />
      </div>

      {status && (
        <div style={{
          padding: '12px 16px', borderRadius: 12, marginBottom: 16,
          background: status.type === 'success' ? 'rgba(78,205,196,0.12)' :
                      status.type === 'error' ? 'rgba(233,69,96,0.12)' : 'rgba(245,166,35,0.12)',
          border: `2px solid ${status.type === 'success' ? 'rgba(78,205,196,0.3)' :
                              status.type === 'error' ? 'rgba(233,69,96,0.3)' : 'rgba(245,166,35,0.3)'}`,
          fontFamily: 'Comic Neue', fontWeight: 700, fontSize: 14,
          color: status.type === 'success' ? COLORS.accent3 :
                 status.type === 'error' ? COLORS.accent1 : COLORS.accent2,
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
        {sending ? '⏳ SENDING...' : '🚀 FIRE MESSAGE!'}
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
            LET'S <span style={{ color: COLORS.accent4 }}>TEAM</span> UP
          </h2>
          <p style={{ color: COLORS.muted, fontSize: 16, marginTop: 8 }}>Have a project in mind? Let's create something epic together.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 40,
        }}>
          {/* Left */}
          <div>
            <div style={{ marginBottom: 28 }}>
              <div className="speech-bubble" style={{ padding: '16px 20px', marginBottom: 28, maxWidth: 360, fontSize: 14, lineHeight: 1.7 }}>
                I'm always down to chat about new projects, creative ideas, or opportunities to join your team! 💬
              </div>
            </div>

            {[
              { icon: '📧', label: 'Email', val: 'francis1chinazor@gmail.com', href: 'mailto:francis1chinazor@gmail.com', color: COLORS.accent1 },
              { icon: '💼', label: 'LinkedIn', val: 'Francis Chinazor', href: 'https://www.linkedin.com/in/francis-chinazor-081b8933b', color: '#0077b5' },
              { icon: '🐱', label: 'GitHub', val: '@ZorichDev', href: 'https://github.com/ZorichDev', color: COLORS.muted },
              { icon: '💬', label: 'WhatsApp', val: '+234 906 924 6577', href: 'https://wa.me/2349069246577', color: '#25D366' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                 style={{
                   display: 'flex', alignItems: 'center', gap: 16,
                   textDecoration: 'none', color: COLORS.text,
                   marginBottom: 16, padding: '16px 20px',
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
                  background: `${item.color}20`,
                  border: `2px solid ${item.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: item.color }}>{item.val}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Right — form */}
          <div className="panel-border" style={{ background: COLORS.cardBg, padding: 32, borderRadius: 16 }}>
            <div style={{ fontFamily: 'Bangers', fontSize: 24, letterSpacing: 2, marginBottom: 24, color: COLORS.text }}>
              SEND A MESSAGE 📨
            </div>
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
      borderTop: '3px solid rgba(255,255,255,0.08)',
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
            <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.7, marginBottom: 16 }}>
              Frontend Developer specializing in React & crafting exceptional user experiences.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
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
          borderTop: '2px dashed rgba(255,255,255,0.08)',
          paddingTop: 24, display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}>
          <p style={{ fontSize: 13, color: COLORS.muted }}>
            © {new Date().getFullYear()} Francis Chinazor. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: COLORS.muted, fontFamily: 'Comic Neue', fontWeight: 700 }}>
            Built with ❤️ using React + Tailwind CSS
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
      {/* WhatsApp */}
      <a href="https://wa.me/2349069246577" target="_blank" rel="noopener noreferrer"
         style={{
           position: 'fixed', bottom: 88, right: 24, zIndex: 90,
           width: 52, height: 52, borderRadius: '50%',
           background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
           boxShadow: '0 0 0 4px rgba(37,211,102,0.2), 4px 4px 0 rgba(0,0,0,0.3)',
           border: '2.5px solid rgba(255,255,255,0.25)',
           fontSize: 24, textDecoration: 'none',
           animation: 'pulse-glow 2s infinite',
           transition: 'transform 0.2s',
         }}
         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
         onMouseLeave={e => e.currentTarget.style.transform = 'none'}
      >💬</a>

      {/* Scroll top */}
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