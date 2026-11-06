import { useEffect, useRef } from 'react';

function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const pointer = { x: -1000, y: -1000, active: false };
    const mobile = window.matchMedia('(max-width: 700px), (pointer: coarse)').matches;
    const lowPower = (navigator.hardwareConcurrency || 8) <= 4;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let particles = [];
    let frame = 0;
    let running = false;
    let lastFrame = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const desiredCount = Math.round((width * height) / (mobile ? 14500 : 8200));
      const count = Math.round(Math.max(mobile ? 38 : 105, Math.min(mobile ? 76 : 205, desiredCount)) * (lowPower ? 0.62 : 1));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        phase: Math.random() * Math.PI * 2,
        size: Math.random() < 0.07 ? 1.7 : 0.65 + Math.random() * 0.65,
        alpha: 0.18 + Math.random() * 0.48,
        glow: Math.random() < 0.09,
      }));
    };

    const render = timestamp => {
      if (!running) return;
      frame = window.requestAnimationFrame(render);
      if (timestamp - lastFrame < 32) return;
      lastFrame = timestamp;

      context.clearRect(0, 0, width, height);
      if (pointer.active) {
        const light = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 210);
        light.addColorStop(0, 'rgba(32, 132, 255, 0.075)');
        light.addColorStop(1, 'rgba(32, 132, 255, 0)');
        context.fillStyle = light;
        context.fillRect(pointer.x - 210, pointer.y - 210, 420, 420);
      }

      for (const particle of particles) {
        particle.x += particle.vx + Math.sin(timestamp * 0.00028 + particle.phase) * 0.035;
        particle.y += particle.vy + Math.cos(timestamp * 0.00024 + particle.phase) * 0.035;
        if (particle.x < -8) particle.x = width + 8;
        if (particle.x > width + 8) particle.x = -8;
        if (particle.y < -8) particle.y = height + 8;
        if (particle.y > height + 8) particle.y = -8;

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 145) {
            const force = (1 - distance / 145) * 0.24;
            particle.x += (dx / distance) * force;
            particle.y += (dy / distance) * force;
          }
        }
      }

      const baseDistance = mobile ? 88 : 118;
      for (let first = 0; first < particles.length; first += 1) {
        const particle = particles[first];
        for (let second = first + 1; second < particles.length; second += 1) {
          const neighbor = particles[second];
          const dx = particle.x - neighbor.x;
          const dy = particle.y - neighbor.y;
          const distance = Math.hypot(dx, dy);
          const cursorNear = pointer.active && Math.hypot((particle.x + neighbor.x) / 2 - pointer.x, (particle.y + neighbor.y) / 2 - pointer.y) < 150;
          const maxDistance = baseDistance + (cursorNear ? 24 : 0);
          if (distance >= maxDistance) continue;
          const opacity = (1 - distance / maxDistance) * (cursorNear ? 0.2 : 0.12);
          context.strokeStyle = `rgba(72, 166, 255, ${opacity})`;
          context.lineWidth = 0.65;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(neighbor.x, neighbor.y);
          context.stroke();
        }
      }

      for (const particle of particles) {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particle.glow
          ? `rgba(112, 220, 255, ${Math.min(particle.alpha + 0.18, 0.78)})`
          : `rgba(184, 216, 255, ${particle.alpha})`;
        context.shadowBlur = particle.glow ? 9 : 0;
        context.shadowColor = 'rgba(66, 180, 255, 0.8)';
        context.fill();
      }
      context.shadowBlur = 0;
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };
    const movePointer = event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const leavePointer = () => { pointer.active = false; };
    const handleVisibility = () => document.hidden ? stop() : start();

    resize();
    start();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', movePointer, { passive: true });
    window.addEventListener('pointerleave', leavePointer, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      window.removeEventListener('pointerleave', leavePointer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return <canvas className="particle-network" ref={canvasRef} aria-hidden="true" />;
}

export function AnimatedBackground() {
  const spotlightRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return undefined;
    let frame = 0;
    const move = event => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        spotlightRef.current?.style.setProperty('--sx', `${event.clientX}px`);
        spotlightRef.current?.style.setProperty('--sy', `${event.clientY}px`);
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); };
  }, []);

  return (
    <div className="animated-background" aria-hidden="true">
      <div className="bg-aurora"><span className="blob blob-a" /><span className="blob blob-b" /><span className="blob blob-c" /></div>
      <div className="bg-dots" />
      <ParticleNetwork />
      <div className="bg-spotlight" ref={spotlightRef} />
      <div className="bg-noise" />
      <div className="bg-vignette" />
    </div>
  );
}

export function InteractiveCursor() {
  const trailRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return undefined;

    const target = { x: -40, y: -40 };
    const current = { x: -40, y: -40 };
    let frame = 0;
    const root = document.documentElement;
    root.classList.add('cursor-enabled');

    const animate = () => {
      current.x += (target.x - current.x) * 0.23;
      current.y += (target.y - current.y) * 0.23;
      if (trailRef.current) trailRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (coreRef.current) coreRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.4) frame = window.requestAnimationFrame(animate);
      else frame = 0;
    };
    const move = event => {
      target.x = event.clientX;
      target.y = event.clientY;
      trailRef.current?.classList.add('is-visible');
      coreRef.current?.classList.add('is-visible');
      const interactive = event.target.closest('a, button, input, select, textarea, [role="button"]');
      trailRef.current?.classList.toggle('is-interactive', Boolean(interactive));
      coreRef.current?.classList.toggle('is-interactive', Boolean(interactive));
      if (!frame) frame = window.requestAnimationFrame(animate);
    };
    const leave = () => {
      trailRef.current?.classList.remove('is-visible', 'is-interactive');
      coreRef.current?.classList.remove('is-visible', 'is-interactive');
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      root.classList.remove('cursor-enabled');
    };
  }, []);

  return <><span className="cursor-trail" ref={trailRef} aria-hidden="true" /><span className="cursor-core" ref={coreRef} aria-hidden="true" /></>;
}

export function ScrollReveals() {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    const observed = new WeakSet();
    const observe = node => {
      if (!(node instanceof Element)) return;
      if (node.matches('[data-reveal]') && !observed.has(node)) {
        observed.add(node);
        observer.observe(node);
      }
      node.querySelectorAll?.('[data-reveal]').forEach(target => {
        if (observed.has(target)) return;
        observed.add(target);
        observer.observe(target);
      });
    };
    targets.forEach(observe);
    const mutations = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(observe)));
    const main = document.querySelector('main');
    if (main) mutations.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}