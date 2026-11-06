import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { appWindows, hostOf } from '../data/appWindows';

const TASKBAR = 52;
const MIN_W = 300;
const MIN_H = 220;
const IFRAME_W = 1280; // render sites at desktop width, then scale down to fit the window

/* ---------- helpers ---------- */
function useMode() {
  const get = () => (window.innerWidth >= 1024 ? 'desktop' : window.innerWidth >= 640 ? 'tablet' : 'mobile');
  const [mode, setMode] = useState(get);
  useEffect(() => {
    const onResize = () => setMode(get());
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return mode;
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

const Icon = ({ project, size = 18 }) => (
  <span className="fw-icon" aria-hidden="true" style={{ '--accent-p': project.accent, width: size, height: size, fontSize: size * 0.46 }}>{project.monogram}</span>
);

/* ---------- static preview (fallback + loading state + mobile cards) ---------- */
function StaticPreview({ project, note }) {
  return (
    <div className="fw-static" style={{ '--accent-p': project.accent }}>
      <div className="fw-static-glow" aria-hidden="true" />
      <div className="fw-static-body">
        <Icon project={project} size={46} />
        <span className="fw-chip">{project.category}</span>
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <div className="fw-skeleton" aria-hidden="true"><i /><i /><i /></div>
        {note && <small>{note}</small>}
      </div>
    </div>
  );
}

/* ---------- live iframe preview ---------- */
function PreviewFrame({ project, load, interactive, forceStatic }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0.5);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [state, setState] = useState('loading'); // loading | loaded | failed

  useLayoutEffect(() => {
    const node = boxRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ w: width, h: height });
      setScale(width / IFRAME_W);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const useIframe = load && project.embed && !forceStatic;

  useEffect(() => {
    if (!useIframe || state !== 'loading') return undefined;
    const timer = setTimeout(() => setState(current => (current === 'loading' ? 'failed' : current)), 12000);
    return () => clearTimeout(timer);
  }, [useIframe, state]);

  return (
    <div className="fw-preview" ref={boxRef}>
      {(!useIframe || state !== 'loaded') && (
        <StaticPreview project={project} note={useIframe && state === 'failed' ? 'Live preview did not load. Use “Open project” to view the site.' : undefined} />
      )}
      {useIframe && state !== 'failed' && (
        <iframe
          className={state === 'loaded' ? 'is-loaded' : ''}
          src={project.url}
          title={`${project.title} live preview`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          tabIndex={interactive ? 0 : -1}
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
          style={{ width: IFRAME_W, height: box.h && scale ? box.h / scale : 800, transform: `scale(${scale})` }}
        />
      )}
      {useIframe && state === 'loading' && <span className="fw-spinner" aria-label="Loading preview" role="status" />}
    </div>
  );
}

/* ---------- a single window ---------- */
function AppWindow({ win, project, index, ready, stage, focused, dragging, loadFrames, handlers }) {
  const { id } = win;
  const hidden = win.status !== 'open';
  const maximized = win.max;
  const x = maximized ? 0 : win.x;
  const y = maximized ? 0 : win.y;
  const w = maximized ? stage.w : win.w;
  const h = maximized ? stage.h - TASKBAR : win.h;
  const classes = [
    'fw-window',
    focused && 'is-focused',
    dragging && 'is-dragging',
    maximized && 'is-maximized',
    hidden && `is-${win.status}`,
    ready && 'is-ready',
  ].filter(Boolean).join(' ');

  const onKeyDown = event => {
    const step = event.shiftKey ? 60 : 20;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[event.key]) { event.preventDefault(); handlers.nudge(id, ...moves[event.key]); }
    else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handlers.toggleMax(id); }
  };

  return (
    <div
      className={classes}
      role="group"
      aria-label={`${project.title} application window`}
      inert={hidden}
      style={{ width: w, height: h, transform: `translate3d(${x}px, ${y}px, 0)`, zIndex: win.z, '--i': index, '--float-d': `${7 + index * 1.3}s`, '--float-o': `${-index * 1.7}s`, '--accent-p': project.accent }}
      onPointerDownCapture={() => handlers.focus(id)}
    >
      <div className="fw-float">
        <div className="fw-inner">
          <header
            className="fw-chrome"
            onPointerDown={event => handlers.dragStart(event, id)}
            onPointerMove={handlers.dragMove}
            onPointerUp={handlers.dragEnd}
            onPointerCancel={handlers.dragEnd}
            onDoubleClick={event => { if (!event.target.closest('button, a')) handlers.toggleMax(id); }}
          >
            <div className="fw-titlebar">
              <div className="fw-controls" role="group" aria-label="Window controls">
                <button type="button" className="fw-dot fw-close" aria-label={`Close ${project.title}`} onClick={() => handlers.close(id)}><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2L2 8" /></svg></button>
                <button type="button" className="fw-dot fw-min" aria-label={`Minimize ${project.title}`} onClick={() => handlers.minimize(id)}><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 5h6" /></svg></button>
                <button type="button" className="fw-dot fw-max" aria-label={maximized ? `Restore ${project.title} size` : `Maximize ${project.title}`} onClick={() => handlers.toggleMax(id)}><svg viewBox="0 0 10 10" aria-hidden="true"><path d={maximized ? 'M3 2h5v5M2 3h5v5H2z' : 'M2 2h6v6H2z'} /></svg></button>
              </div>
              <div className="fw-title" tabIndex={0} onKeyDown={onKeyDown} aria-label={`${project.title}. Arrow keys move the window, Enter toggles maximize.`}>
                <Icon project={project} size={16} />
                <span>{project.title}</span>
              </div>
              <span className="fw-titlebar-spacer" aria-hidden="true" />
            </div>
            <div className="fw-toolbar">
              <div className="fw-address" title={project.url}>
                <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 5.5V4a2.5 2.5 0 015 0v1.5M2.5 5.5h7v5h-7z" /></svg>
                <span>{hostOf(project.url)}</span>
              </div>
              {project.embed && (
                <button type="button" className="fw-mode" aria-pressed={win.mode === 'live'} onClick={() => handlers.toggleMode(id)}
                  title={win.mode === 'live' ? 'Showing the live site. Switch to a static preview if it looks blank.' : 'Showing a static preview. Switch back to the live site.'}>
                  <i aria-hidden="true" />{win.mode === 'live' ? 'Live' : 'Static'}
                </button>
              )}
              <a className="fw-open" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} in a new tab`}>Open project <span aria-hidden="true">↗</span></a>
            </div>
          </header>
          <div className="fw-viewport">
            <PreviewFrame project={project} load={loadFrames && win.status !== 'closed'} interactive={focused && !dragging && !hidden} forceStatic={win.mode === 'static'} />
            {(!focused || dragging) && <div className="fw-shield" aria-hidden="true" />}
          </div>
          {!maximized && <span className="fw-resize" aria-hidden="true" onPointerDown={event => handlers.resizeStart(event, id)} onPointerMove={handlers.resizeMove} onPointerUp={handlers.resizeEnd} onPointerCancel={handlers.resizeEnd} />}
        </div>
      </div>
    </div>
  );
}

/* ---------- taskbar ---------- */
function Taskbar({ projects, wins, focusedId, onTaskClick, onRestoreAll }) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  const anyHidden = wins.some(win => win.status !== 'open');
  return (
    <nav className="fw-taskbar" aria-label="Open applications">
      <span className="fw-brand" aria-hidden="true"><i />FRANTECH<b>OS</b></span>
      <ul>
        {wins.map(win => {
          const project = projects[win.id];
          const state = win.status === 'open' ? (focusedId === win.id ? 'active' : 'open') : win.status;
          return (
            <li key={win.id}>
              <button type="button" className={`fw-task is-${state}`} aria-pressed={win.status === 'open'} onClick={() => onTaskClick(win.id)}
                title={win.status === 'open' ? (state === 'active' ? 'Minimize' : 'Bring to front') : 'Restore'}>
                <Icon project={project} size={20} />
                <span className="fw-task-label">{project.title}</span>
                <span className="fw-task-state" aria-hidden="true" />
                <span className="fw-sr">{win.status === 'open' ? 'open' : win.status}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="fw-tray">
        {anyHidden && <button type="button" className="fw-restore-all" onClick={onRestoreAll}>Restore all</button>}
        <time dateTime={time.toISOString()}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
      </div>
    </nav>
  );
}

/* ---------- mobile: swipeable application cards ---------- */
function MobileCards() {
  return (
    <div className="fw-cards" role="list" aria-label="Projects, swipe sideways">
      {appWindows.map(project => (
        <article className="fw-card" role="listitem" key={project.id} style={{ '--accent-p': project.accent }}>
          <div className="fw-card-bar">
            <span className="fw-card-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="fw-card-host">{hostOf(project.url)}</span>
          </div>
          <StaticPreview project={project} />
          <a className="button button-primary fw-card-open" href={project.url} target="_blank" rel="noreferrer">Open project <span aria-hidden="true">↗</span></a>
        </article>
      ))}
    </div>
  );
}

/* ---------- desktop / tablet: the floating window manager ---------- */
function Desktop({ mode }) {
  const stageRef = useRef(null);
  const [stage, setStage] = useState({ w: 0, h: 0 });
  const [wins, setWins] = useState([]);
  const [seen, setSeen] = useState(false);
  const [dragId, setDragId] = useState(null);
  const zRef = useRef(10);
  const winsRef = useRef(wins);
  const dragRef = useRef(null);
  const frame = useRef(0);
  winsRef.current = wins;

  const projects = useMemo(() => Object.fromEntries(appWindows.map(p => [p.id, p])), []);
  const visibleProjects = useMemo(() => appWindows.filter(p => p.layout[mode]), [mode]);

  useLayoutEffect(() => {
    const node = stageRef.current;
    if (!node) return undefined;
    const update = () => setStage({ w: node.clientWidth, h: node.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [mode]);

  // Lazy: only start loading iframes once the stage scrolls near the viewport.
  useEffect(() => {
    const node = stageRef.current;
    if (!node || !('IntersectionObserver' in window)) { setSeen(true); return undefined; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); observer.disconnect(); }
    }, { rootMargin: '200px 0px', threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [mode]);

  // Build initial layout once the stage has a size, and again if the breakpoint changes.
  const layoutKey = useRef('');
  useEffect(() => {
    if (!stage.w || layoutKey.current === mode) return;
    layoutKey.current = mode;
    const usableH = stage.h - TASKBAR;
    setWins(visibleProjects.map((project, index) => {
      const l = project.layout[mode];
      return {
        id: project.id, status: 'open', max: false, mode: 'live', z: 10 + index,
        x: Math.round(l.x * stage.w), y: Math.round(l.y * usableH),
        w: Math.max(MIN_W, Math.round(l.w * stage.w)), h: Math.max(MIN_H, Math.round(l.h * usableH)),
      };
    }));
    zRef.current = 10 + visibleProjects.length;
  }, [stage, mode, visibleProjects]);

  // Keep windows reachable when the stage shrinks.
  useEffect(() => {
    if (!stage.w) return;
    setWins(list => list.map(win => ({
      ...win,
      x: clamp(win.x, -win.w + 140, stage.w - 140),
      y: clamp(win.y, 0, stage.h - TASKBAR - 40),
    })));
  }, [stage.w, stage.h]);

  const patch = useCallback((id, changes) => setWins(list => list.map(win => (win.id === id ? { ...win, ...changes } : win))), []);
  const focus = useCallback(id => {
    const current = winsRef.current.find(win => win.id === id);
    if (!current || current.status !== 'open') return;
    const top = Math.max(...winsRef.current.map(win => win.z));
    if (current.z === top) return;
    zRef.current += 1;
    patch(id, { z: zRef.current });
  }, [patch]);
  const bringUp = useCallback(id => { zRef.current += 1; patch(id, { z: zRef.current, status: 'open' }); }, [patch]);

  const focusedId = useMemo(() => {
    const open = wins.filter(win => win.status === 'open');
    return open.length ? open.reduce((a, b) => (a.z > b.z ? a : b)).id : null;
  }, [wins]);

  const moveTo = useCallback((id, x, y) => {
    patch(id, { x: clamp(x, -winsRef.current.find(w => w.id === id).w + 140, stage.w - 140), y: clamp(y, 0, stage.h - TASKBAR - 44) });
  }, [patch, stage]);

  const handlers = useMemo(() => ({
    focus,
    close: id => patch(id, { status: 'closed', max: false }),
    minimize: id => patch(id, { status: 'minimized' }),
    toggleMode: id => setWins(list => list.map(win => (win.id === id ? { ...win, mode: win.mode === 'live' ? 'static' : 'live' } : win))),
    toggleMax: id => { bringUp(id); setWins(list => list.map(win => (win.id === id ? { ...win, max: !win.max } : win))); },
    nudge: (id, dx, dy) => { const win = winsRef.current.find(w => w.id === id); if (win && !win.max) moveTo(id, win.x + dx, win.y + dy); },
    dragStart: (event, id) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.target.closest('button, a, input')) return;
      const win = winsRef.current.find(w => w.id === id);
      if (!win || win.max) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = { id, sx: event.clientX, sy: event.clientY, ox: win.x, oy: win.y };
      setDragId(id);
    },
    dragMove: event => {
      const drag = dragRef.current;
      if (!drag || drag.resize) return;
      drag.px = event.clientX; drag.py = event.clientY;
      if (!frame.current) frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        if (dragRef.current === drag) moveTo(drag.id, drag.ox + drag.px - drag.sx, drag.oy + drag.py - drag.sy);
      });
    },
    dragEnd: event => {
      if (!dragRef.current) return;
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      dragRef.current = null;
      setDragId(null);
    },
    resizeStart: (event, id) => {
      event.stopPropagation();
      const win = winsRef.current.find(w => w.id === id);
      if (!win) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = { id, resize: true, sx: event.clientX, sy: event.clientY, ow: win.w, oh: win.h, x: win.x, y: win.y };
      setDragId(id);
    },
    resizeMove: event => {
      const drag = dragRef.current;
      if (!drag?.resize) return;
      drag.px = event.clientX; drag.py = event.clientY;
      if (!frame.current) frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        if (dragRef.current !== drag) return;
        patch(drag.id, {
          w: clamp(drag.ow + drag.px - drag.sx, MIN_W, stage.w - drag.x),
          h: clamp(drag.oh + drag.py - drag.sy, MIN_H, stage.h - TASKBAR - drag.y),
        });
      });
    },
    resizeEnd: event => {
      if (!dragRef.current?.resize) return;
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      dragRef.current = null;
      setDragId(null);
    },
  }), [focus, patch, bringUp, moveTo, stage]);

  const onTaskClick = id => {
    const win = wins.find(w => w.id === id);
    if (!win) return;
    if (win.status !== 'open') bringUp(id);
    else if (focusedId === id) patch(id, { status: 'minimized' });
    else focus(id);
  };
  const restoreAll = () => {
    setWins(list => list.map((win, i) => (win.status === 'open' ? win : { ...win, status: 'open', z: zRef.current + i + 1 })));
    zRef.current += wins.length + 1;
  };

  const ready = seen && stage.w > 0;

  return (
    <div className={`fw-stage fw-${mode}`} ref={stageRef}>
      <div className="fw-wallpaper" aria-hidden="true">
        <span className="fw-beam fw-beam-a" /><span className="fw-beam fw-beam-b" />
        <span className="fw-watermark">FULL-STACK<br />DEVELOPER</span>
      </div>
      <div className="fw-desk-label" aria-hidden="true"><i />LIVE WORKSPACE <span>/ {wins.filter(w => w.status === 'open').length} running</span></div>
      {wins.map((win, index) => (
        <AppWindow key={win.id} win={win} project={projects[win.id]} index={index} ready={ready} stage={stage}
          focused={focusedId === win.id} dragging={dragId === win.id} loadFrames={seen} handlers={handlers} />
      ))}
      {wins.length > 0 && wins.every(win => win.status !== 'open') && (
        <div className="fw-empty"><p>All windows are minimized.</p><button type="button" className="button button-secondary" onClick={restoreAll}>Restore all windows</button></div>
      )}
      <Taskbar projects={projects} wins={wins} focusedId={focusedId} onTaskClick={onTaskClick} onRestoreAll={restoreAll} />
    </div>
  );
}

export default function FloatingWindows() {
  const mode = useMode();
  return (
    <div className="fw-root">
      {mode === 'mobile' ? <MobileCards /> : <Desktop key={mode} mode={mode} />}
      <p className="fw-hint" aria-hidden={mode === 'mobile'}>
        {mode === 'mobile' ? 'Swipe sideways to browse. Tap Open project to visit the live site.' : 'Drag windows by the title bar · double-click to maximize · use the taskbar to restore.'}
      </p>
    </div>
  );
}
