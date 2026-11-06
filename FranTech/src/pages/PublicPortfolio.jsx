import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { initialCertifications, initialExperience, initialProfile, initialProjects, initialSkills } from '../data/portfolioContent';
import { AnimatedBackground, InteractiveCursor, ScrollReveals } from '../components/AnimatedBackground';
import { ScrollProgress, BackToTop, Typewriter, CountUp, Marquee, Toast, tiltHandlers, magnetic } from '../components/Effects';
import { apiUrl } from '../config/api';
import Resume from '../img/franzor cv.pdf';
import profilePhoto from '../img/techboy.jpg.jpeg';

const categories = ['All Projects', 'Full-Stack Applications', 'Frontend Applications', 'Backend/API Projects', 'E-commerce', 'Business Solutions'];
const skillGroups = ['Frontend', 'Backend', 'Databases', 'Tools and Deployment', 'Currently Developing'];

const FloatingWindows = lazy(() => import('../components/FloatingWindows'));
const tilt = tiltHandlers();

const fallbackProjects = initialProjects.map(project => ({
  ...project,
  imageUrl: project.image,
  repoUrl: project.repoUrl,
  liveUrl: project.liveUrl,
}));

const projectMatches = (project, filter) => {
  if (filter === 'All Projects') return true;
  const type = (project.projectType || '').toLowerCase();
  const category = (project.category || '').toLowerCase();
  if (filter === 'Full-Stack Applications') return type === 'fullstack' || category.includes('full-stack');
  if (filter === 'Frontend Applications') return type === 'frontend' || category.includes('frontend');
  if (filter === 'Backend/API Projects') return type === 'backend' || category.includes('backend') || category.includes('api');
  if (filter === 'E-commerce') return type === 'ecommerce' || category.includes('commerce');
  return type === 'business' || category.includes('business');
};

function ExternalLink({ href, children, className = '' }) {
  if (!href) return null;
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

function ProjectCaseStudy({ project, onClose }) {
  useEffect(() => {
    const closeOnEscape = event => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="case-study" role="dialog" aria-modal="true" aria-labelledby="case-title">
        <button className="icon-button modal-close" type="button" aria-label="Close project details" onClick={onClose}>×</button>
        {project.imageUrl && <img className="case-image" src={project.imageUrl} alt={project.imageAlt || `${project.title} project preview`} />}
        <div className="case-content">
          <p className="eyebrow">{project.category}</p>
          <h2 id="case-title">{project.title}</h2>
          <p className="case-description">{project.desc}</p>
          {project.problem && <div className="case-block"><h3>Problem</h3><p>{project.problem}</p></div>}
          {project.contribution && <div className="case-block"><h3>Contribution</h3><p>{project.contribution}</p></div>}
          {project.features?.length > 0 && <div className="case-block"><h3>Selected features</h3><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>}
          <div className="project-tags">{(project.tech || []).map(tech => <span key={tech}>{tech}</span>)}</div>
          <div className="case-actions">
            <ExternalLink className="button button-primary" href={project.liveUrl}>Visit live site <span aria-hidden="true">↗</span></ExternalLink>
            <ExternalLink className="button button-secondary" href={project.repoUrl}>View repository <span aria-hidden="true">↗</span></ExternalLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PublicPortfolio() {
  const [profile, setProfile] = useState(initialProfile);
  const [skills, setSkills] = useState(initialSkills);
  const [experience, setExperience] = useState(initialExperience);
  const [certifications, setCertifications] = useState(initialCertifications);
  const [projects, setProjects] = useState(fallbackProjects);
  const [filter, setFilter] = useState('All Projects');
  const [activeProject, setActiveProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', projectType: '', budget: '', companyWebsite: '' });
  const [siteSettings, setSiteSettings] = useState({});
  const [contactState, setContactState] = useState({ status: 'idle', message: '' });
  const [sending, setSending] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [toast, setToast] = useState('');

  useEffect(() => {
    let scrolled = window.scrollY > 24;
    setHeaderScrolled(scrolled);
    const updateHeader = () => {
      const next = window.scrollY > 24;
      if (next !== scrolled) {
        scrolled = next;
        setHeaderScrolled(next);
      }
    };
    window.addEventListener('scroll', updateHeader, { passive: true });

    const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact']
      .map(id => document.getElementById(id)).filter(Boolean);
    const sectionObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActiveSection(current.target.id);
    }, { rootMargin: '-24% 0px -62% 0px', threshold: [0, 0.15, 0.4] }) : null;
    sections.forEach(section => sectionObserver?.observe(section));

    return () => {
      window.removeEventListener('scroll', updateHeader);
      sectionObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    let active = true;
    fetch(apiUrl('/content'))
      .then(response => response.ok ? response.json() : null)
      .then(content => {
        if (!active || !content) return;
        setProfile(current => ({ ...current, ...(content.profile || {}) }));
        setSiteSettings(content.settings || {});
        if (content.configured) {
          setSkills(content.skills || []);
          setExperience(content.experience || []);
          setCertifications(content.certifications || []);
        }
      })
      .catch(() => {});

  fetch(apiUrl('/projects'))
  .then(response => {
    if (!response.ok) return null;

    const configured =
      response.headers.get('X-Portfolio-Configured') === 'true';

    return response.json().then(records => ({
      records,
      configured,
    }));
  })
  .then(result => {
    if (
      active &&
      result &&
      Array.isArray(result.records) &&
      (result.configured || result.records.length)
    ) {
      setProjects(result.records);
    }
  })
  .catch(error => console.error('Projects API error:', error));

    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (/^#[0-9a-f]{6}$/i.test(siteSettings.accentColor || '')) {
      document.documentElement.style.setProperty('--accent', siteSettings.accentColor);
      document.documentElement.style.setProperty('--accent-strong', siteSettings.accentColor);
    }
    document.title = siteSettings.siteTitle || 'FRANTECH | Full-Stack Software Engineer';
    const description = siteSettings.metaDescription || 'Francis Chinazor builds modern web applications and backend services from Lagos, Nigeria.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.append(meta);
    }
    meta.content = description;
    const updateProperty = (property, value) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.append(tag);
      }
      tag.content = value;
    };
    updateProperty('og:title', document.title);
    updateProperty('og:description', description);
    if (siteSettings.ogImageUrl) updateProperty('og:image', siteSettings.ogImageUrl);
  }, [siteSettings]);

  useEffect(() => {
    const key = 'frantech-visitor-session';
    let visitorId;
    try {
      visitorId = sessionStorage.getItem(key);
      if (!visitorId) {
        visitorId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        sessionStorage.setItem(key, visitorId);
      }
    } catch {
      visitorId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    fetch(apiUrl('/analytics/track'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'page_view', page: 'home', visitorId, referrer: document.referrer }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  const visibleProjects = useMemo(() => projects.filter(project => projectMatches(project, filter)), [projects, filter]);
  const groupedSkills = useMemo(() => skillGroups.map(group => ({
    name: group,
    skills: skills.filter(skill => skill.category === group),
  })).filter(group => group.skills.length), [skills]);

  const track = event => {
    let visitorId;
    try { visitorId = sessionStorage.getItem('frantech-visitor-session'); } catch { visitorId = undefined; }
    if (!visitorId) visitorId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    fetch(apiUrl('/analytics/track'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, page: 'home', visitorId, referrer: document.referrer }),
      keepalive: true,
    }).catch(() => {});
  };

  const handleContact = async event => {
    event.preventDefault();
    setSending(true);
    setContactState({ status: 'sending', message: 'Sending your message…' });
    try {
      const response = await fetch(apiUrl('/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const responseText = await response.text();

      let data = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = { error: responseText || 'The server returned an empty or invalid response.' };
      }

      if (!response.ok) throw new Error(data.error || `Request failed (${response.status}). Please try again.`);
      setForm({ name: '', email: '', subject: '', message: '', projectType: '', budget: '', companyWebsite: '' });
      setContactState({ status: 'success', message: 'Message received. I’ll be in touch soon.' });
    } catch (error) {
      setContactState({ status: 'error', message: error.message || 'Network error. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  const scrollTo = id => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast('Email copied to clipboard');
    } catch {
      setToast('Press and hold the address to copy it');
    }
    setTimeout(() => setToast(''), 2200);
  };

  const roles = useMemo(() => [profile.title, 'React & Vite front ends', 'Node.js & Express APIs', 'MongoDB data models', 'Products people enjoy using'], [profile.title]);
  const tickerItems = useMemo(() => [...new Set(skills.map(skill => skill.name))].slice(0, 24), [skills]);

  const resumeHref = profile.cvUrl || Resume;

  return (
    <div className="portfolio-shell">
      <AnimatedBackground />
      <InteractiveCursor />
      <ScrollReveals />
      <ScrollProgress />
      <BackToTop />
      <Toast message={toast} />
      <header className={headerScrolled ? 'site-header is-scrolled' : 'site-header'}>
        <a className="wordmark" href="#home" aria-label="FranTech home"><span>FRAN</span>TECH<span className="wordmark-dot">.</span></a>
        <button className="menu-toggle" type="button" aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(value => !value)}>
          <span /><span />
        </button>
        <nav className={mobileMenuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
          {['About', 'Work', 'Expertise', 'Experience'].map((item, index) => {
            const id = ['about', 'projects', 'skills', 'experience'][index];
            return <a key={item} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMobileMenuOpen(false)}>{item}</a>;
          })}
          <a className="nav-contact" href="#contact" onClick={() => { setMobileMenuOpen(false); track('hire_me_click'); }}>Let’s talk <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-grid-mark" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="availability-dot" /> {profile.availability || 'Open to remote opportunities'} <span className="eyebrow-divider">/</span> {profile.location}</p>
            <h1>{(profile.heroHeadline || initialProfile.heroHeadline).trim().split(/\s+/).map((word, index) => <span className={index === 0 ? 'headline-primary' : ''} key={`${index}-${word}`} style={{ '--word-index': Math.min(index, 6) }}>{word}</span>)}</h1>
            <p className="hero-role">{profile.title}</p>
            <p className="hero-typed"><span>{'>'} I build</span><Typewriter phrases={roles.slice(1)} /></p>
            <p className="hero-lede">{profile.heroDescription || initialProfile.heroDescription}</p>
            <p className="hero-support">{profile.heroSupporting || initialProfile.heroSupporting}</p>
            <div className="hero-actions">
              <a className="button button-primary" {...magnetic} href="#projects">View my projects <span aria-hidden="true">↓</span></a>
              <a className="button button-secondary" {...magnetic} href={resumeHref} download onClick={() => track('cv_download')}>Download my CV <span aria-hidden="true">↗</span></a>
            </div>
            <div className="stats-row">
              <div className="stat"><strong><CountUp value={projects.length} suffix="+" /></strong><span>Projects shipped</span></div>
              <div className="stat"><strong><CountUp value={skills.length} suffix="+" /></strong><span>Technologies</span></div>
              <div className="stat"><strong><CountUp value={certifications.length} /></strong><span>Certifications</span></div>
            </div>
            <div className="hero-meta">
              <span>Remote opportunities welcome</span>
              <span className="meta-separator" />
              <span>Lagos, Nigeria · WAT (UTC+1)</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <img src={profile.photoUrl || profilePhoto} alt={`${profile.name}, Full-Stack Software Engineer`} />
              <div className="portrait-caption"><span>FRANCIS CHINAZOR</span><span>SOFTWARE ENGINEER</span></div>
            </div>
            <div className="hero-code" aria-hidden="true"><span>01</span><code>const impact = build(ideas);</code><i>↗</i></div>
            <span className="visual-index" aria-hidden="true">NG / 06.°</span>
          </div>
        </section>

        <section className="intro-band">
          <div className="section-wrap intro-band-inner" data-reveal><p>{profile.brand}</p><h2>“{profile.tagline || initialProfile.tagline}”</h2><span>Product thinking. Thoughtful engineering. Real-world utility.</span></div>
        </section>

        <Marquee items={tickerItems} />

        <section className="content-section section-wrap" id="about">
          <SectionHeading eyebrow="01 / About" title="Engineering with purpose." copy="A curious mind, practical approach, and a focus on work that makes a difference." />
          <div className="about-grid">
            <div className="about-lead" data-reveal><p className="large-copy">I’m {profile.name}, a software engineer based in Lagos. I build modern web applications and backend services that help people and businesses get more from technology.</p><p>{profile.biography}</p><p>My background in Philosophy shaped how I reason through complex problems: question assumptions, understand context, and look for the clearest path forward. I bring that perspective into product development, collaboration, and continuous learning.</p></div>
            <aside className="about-aside" data-reveal><div><span className="aside-label">CURRENT FOCUS</span><p>Full-stack web applications<br />Backend architecture<br />Reliable product delivery</p></div><div><span className="aside-label">BASED IN</span><p>{profile.location}<br />Available for remote work</p></div><div className="social-links"><ExternalLink href={profile.githubUrl}>GitHub ↗</ExternalLink><ExternalLink href={profile.linkedinUrl}>LinkedIn ↗</ExternalLink><a href={`mailto:${profile.email}`}>Email ↗</a></div></aside>
          </div>
        </section>

        <section className="content-section project-section" id="projects">
          <div className="section-wrap">
            <SectionHeading eyebrow="02 / Selected work" title="Products, built for people." copy="A selection of live work and practical applications. Open a project to see its context, contribution and stack." />
            <div className="filter-row" role="group" aria-label="Filter projects by category">
              {categories.map(category => <button key={category} className={filter === category ? 'filter-chip active' : 'filter-chip'} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}
            </div>
            {visibleProjects.length ? <div className="project-grid">
              {visibleProjects.map((project, index) => <article className="project-card" data-reveal {...tilt} key={project._id || project.title} style={{ '--card-index': Math.min(index, 8) }}>
                <button className="project-image-button" type="button" onClick={() => setActiveProject(project)} aria-label={`View ${project.title} case study`}>
                  {project.imageUrl ? <img src={project.imageUrl} alt={project.imageAlt || `${project.title} screenshot`} loading="lazy" /> : <div className="image-placeholder"><span>{project.title?.slice(0, 2).toUpperCase()}</span></div>}
                  <span className="image-open" aria-hidden="true">↗</span>
                  <span className="image-hint" aria-hidden="true">Explore case study</span>
                </button>
                <div className="project-card-body"><div className="project-card-top"><span>{project.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div><h3>{project.title}</h3><p>{project.desc}</p><div className="project-tags">{(project.tech || []).slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div><button className="text-link" type="button" onClick={() => setActiveProject(project)}>View case study <span aria-hidden="true">↗</span></button></div>
              </article>)}
            </div> : <div className="empty-projects"><p>No verified projects in this category yet.</p><a href="https://github.com/ZorichDev" target="_blank" rel="noreferrer">Explore GitHub ↗</a></div>}
            <div className="projects-foot"><span>More work and source code</span><ExternalLink className="text-link" href={profile.githubUrl}>GitHub profile ↗</ExternalLink></div>
          </div>
        </section>

        <section className="content-section section-wrap" id="workspace">
          <SectionHeading eyebrow="03 / Live workspace" title="Real software, running live." copy="A mini desktop of products I have built and shipped. Drag the windows, minimize them to the taskbar, or open any project in its own tab." />
          <Suspense fallback={<div className="fw-stage" aria-busy="true" />}>
            <FloatingWindows />
          </Suspense>
        </section>

        <section className="content-section section-wrap" id="skills">
          <SectionHeading eyebrow="04 / Expertise" title="A full-stack toolkit." copy="Practical tools across the product lifecycle, with current learning areas clearly marked." />
          <div className="skills-grid">
            {groupedSkills.map(group => <section className={`skill-group ${group.name === 'Currently Developing' ? 'learning-group' : ''}`} data-reveal key={group.name}><div className="skill-group-heading"><h3>{group.name}</h3><span>{String(group.skills.length).padStart(2, '0')}</span></div><div className="skill-list">{group.skills.map(skill => <article className="skill-item" key={skill.name}><div className="skill-monogram" aria-hidden="true">{skill.name.slice(0, 2).toUpperCase()}</div><div><h4>{skill.name}</h4><p>{skill.description}</p></div><span className="skill-level">{skill.level}</span></article>)}</div></section>)}
          </div>
        </section>

        <section className="content-section experience-section" id="experience">
          <div className="section-wrap experience-grid">
            <div><SectionHeading eyebrow="05 / Experience" title="Experience & learning." copy="A professional timeline based on the details currently on file. Dates and organizations can be completed in the admin CMS." />
              <div className="timeline">{experience.map((entry, index) => <article className="timeline-entry" data-reveal key={`${entry.title}-${entry.organization}-${index}`} style={{ '--timeline-index': Math.min(index, 8) }}><span className="timeline-dot" /><div className="timeline-meta"><span>{entry.type || 'Experience'}</span><span>{entry.startDate || 'Dates not listed'}{entry.endDate ? ` — ${entry.endDate}` : entry.current ? ' — Present' : ''}</span></div><h3>{entry.title}</h3>{entry.organization && <p className="timeline-org">{entry.organization}{entry.location ? ` · ${entry.location}` : ''}</p>}<p>{entry.summary}</p>{entry.responsibilities?.length > 0 && <ul>{entry.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>}</article>)}</div>
            </div>
            <aside className="certifications" data-reveal><p className="eyebrow">CONTINUOUS LEARNING</p><h3>Certifications & training</h3>{certifications.map(certificate => <article className="cert-item" key={`${certificate.name}-${certificate.issuer}`}>{certificate.imageUrl ? <img className="cert-image" src={certificate.imageUrl} alt={`${certificate.name} certificate`} loading="lazy" /> : <span className="cert-mark">{certificate.issuer?.slice(0, 2).toUpperCase() || 'ED'}</span>}<div><h4>{certificate.name}</h4><p>{certificate.issuer || 'Issuing organization not listed'}{certificate.date ? ` · ${certificate.date}` : ''}</p>{certificate.description && <span>{certificate.description}</span>}</div></article>)}<a className="cv-inline" href={resumeHref} download onClick={() => track('cv_download')}>Download curriculum vitae <span aria-hidden="true">↓</span></a></aside>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-wrap"><div className="contact-copy" data-reveal><p className="eyebrow">06 / Contact</p><h2>{profile.contactHeading || initialProfile.contactHeading}</h2><p>{profile.contactDescription || initialProfile.contactDescription}</p><div className="contact-direct"><a href={`mailto:${profile.email}`}>{profile.email} <span>↗</span></a><button className="copy-email" type="button" onClick={copyEmail}>Copy email</button><ExternalLink href={profile.whatsappUrl}>WhatsApp <span>↗</span></ExternalLink><ExternalLink href={profile.linkedinUrl}>LinkedIn <span>↗</span></ExternalLink></div></div>
            <form className="contact-form" data-reveal onSubmit={handleContact}>
              <input className="honeypot" name="companyWebsite" tabIndex="-1" autoComplete="off" aria-hidden="true" value={form.companyWebsite} onChange={event => setForm({ ...form, companyWebsite: event.target.value })} />
              <div className="form-two"><label>Name<input name="name" autoComplete="name" required maxLength="100" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} /></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength="254" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} /></label></div>
              <label>Subject<input name="subject" maxLength="160" value={form.subject} onChange={event => setForm({ ...form, subject: event.target.value })} /></label>
              <div className="form-two"><label>Project type<select name="projectType" value={form.projectType} onChange={event => setForm({ ...form, projectType: event.target.value })}><option value="">Select a type</option><option>Web application</option><option>API / backend</option><option>E-commerce</option><option>Business website</option><option>Employment opportunity</option><option>Other</option></select></label><label>Budget <span className="optional-label">(optional)</span><select name="budget" value={form.budget} onChange={event => setForm({ ...form, budget: event.target.value })}><option value="">Prefer not to say</option><option>Under $1,000</option><option>$1,000–$5,000</option><option>$5,000+</option><option>To discuss</option></select></label></div>
              <label>Message<textarea name="message" required minLength="10" maxLength="4000" rows="5" value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} /></label>
              {contactState.status !== 'idle' && <p className={`form-feedback ${contactState.status}`} role={contactState.status === 'error' ? 'alert' : 'status'}>{contactState.message}</p>}
              <button className="button button-primary submit-button" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a className="wordmark" href="#home"><span>FRAN</span>TECH<span className="wordmark-dot">.</span></a><p>We Build User Happiness Digitally.</p><div className="footer-social"><ExternalLink href={profile.githubUrl}>GitHub</ExternalLink><ExternalLink href={profile.linkedinUrl}>LinkedIn</ExternalLink><a href={`mailto:${profile.email}`}>Email</a></div><small>© {new Date().getFullYear()} {profile.name}. Built with care in Lagos, Nigeria.</small></footer>
      {activeProject && <ProjectCaseStudy project={activeProject} onClose={() => setActiveProject(null)} />}
    </div>
  );
}