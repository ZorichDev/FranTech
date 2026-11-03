import { useCallback, useEffect, useMemo, useState } from 'react';
import { initialCertifications, initialExperience, initialProfile, initialProjects, initialSkills } from '../data/portfolioContent';
import { apiUrl } from '../config/api';
import './admin.css';

const navigation = [
  ['overview', 'Overview', '01'], ['projects', 'Projects', '02'], ['skills', 'Skills', '03'],
  ['experience', 'Experience', '04'], ['certifications', 'Certifications', '05'],
  ['profile', 'Profile & SEO', '06'], ['messages', 'Messages', '07'],
];

const emptyProject = {
  title: '', category: '', projectType: 'frontend', problem: '', desc: '', contribution: '',
  features: '', tech: '', liveUrl: '', repoUrl: '', imageUrl: '', order: 0,
  visible: true, featured: false, status: 'published',
};

const baseContent = {
  profile: initialProfile,
  skills: initialSkills,
  experience: initialExperience,
  certifications: initialCertifications,
  settings: { siteTitle: 'FranTech | Full-Stack Software Engineer', metaDescription: 'Francis Chinazor builds modern web applications and backend services from Lagos, Nigeria.', accentColor: '#60a5fa' },
};

async function request(path, token, options = {}) {
  let response;
  try {
    response = await fetch(apiUrl(path), {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Unable to reach the admin API. Check that the backend is running and VITE_API_URL points to it.');
  }
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('The admin API is not configured for this site. Set VITE_API_URL to the deployed API origin and redeploy the frontend.');
  }
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status}).`);
  return data;
}

async function imageAsDataUrl(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Choose a JPG, PNG or WebP image.');
  if (file.size > 512 * 1024) throw new Error('Images must be 512 KB or smaller.');
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('The image could not be read.'));
    reader.readAsDataURL(file);
  });
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const submit = async event => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const data = await request('/auth/login', '', { method: 'POST', body: JSON.stringify({ email, password }) });
      if (!data.token) throw new Error('The admin API did not return a sign-in token.');
      onLogin(data.token);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  return <main className="admin-login"><form className="login-panel" onSubmit={submit}>
    <a className="admin-brand" href="/">FRANTECH<span>.</span></a>
    <p className="admin-kicker">CONTENT MANAGEMENT</p>
    <h1>Administrator sign in</h1>
    <p className="login-description">Use your existing administrator credentials to manage portfolio content.</p>
    <label>Email address<input type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} /></label>
    <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} /></label>
    {error && <p className="admin-error" role="alert">{error}</p>}
    <button className="admin-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <span>↗</span></button>
  </form></main>;
}

function Metric({ label, value, note, index }) {
  return <article className="metric-card"><span className="metric-index">{index}</span><p>{label}</p><strong>{value ?? '—'}</strong><small>{note}</small></article>;
}

function DashboardHome({ projects, content, messages, analytics, activity, onImport, importing }) {
  const unread = messages.filter(message => !message.read && !message.archived).length;
  const published = projects.filter(project => project.status !== 'draft' && project.visible !== false).length;
  const drafts = projects.length - published;
  const recentMessages = messages.filter(message => !message.archived).slice(0, 4);
  const recentActivity = activity.slice(0, 5);
  const hasContent = Boolean(content.configured);

  return <div className="admin-page-body">
    {!projects.length || !hasContent ? <section className="setup-banner"><div><p className="admin-kicker">INITIAL CONTENT</p><h2>Bring your existing portfolio into the CMS</h2><p>The checked-in project list and verified profile, skills, experience and training details can be saved into MongoDB. Existing records will not be overwritten.</p></div><button className="admin-primary" onClick={onImport} disabled={importing}>{importing ? 'Importing…' : 'Import verified content'} <span>↗</span></button></section> : null}
    <div className="metrics-grid">
      <Metric index="01" label="Total projects" value={projects.length} note="Stored in MongoDB" />
      <Metric index="02" label="Published" value={published} note={`${drafts} draft${drafts === 1 ? '' : 's'}`} />
      <Metric index="03" label="Skills" value={content.skills.length} note="Across all categories" />
      <Metric index="04" label="Experience entries" value={content.experience.length} note="Work and education" />
      <Metric index="05" label="Unread messages" value={unread} note={`${messages.length} total messages`} />
      <Metric index="06" label="Page views" value={analytics?.pageViews ?? 0} note={`${analytics?.uniqueVisitors ?? 0} unique sessions`} />
    </div>
    <div className="dashboard-columns">
      <section className="admin-panel"><div className="panel-heading"><div><p className="admin-kicker">INBOX</p><h2>Recent messages</h2></div><span className="count-badge">{unread} unread</span></div>
        {recentMessages.length ? <div className="activity-list">{recentMessages.map(message => <article className="inbox-preview" key={message._id}><span className={message.read ? 'message-indicator read' : 'message-indicator'} /><div><h3>{message.name}<span>{message.subject || 'Portfolio inquiry'}</span></h3><p>{message.message}</p><time>{new Date(message.createdAt).toLocaleString()}</time></div></article>)}</div> : <p className="empty-state">No messages have been received yet.</p>}
      </section>
      <section className="admin-panel"><div className="panel-heading"><div><p className="admin-kicker">AUDIT TRAIL</p><h2>Recent admin activity</h2></div></div>
        {recentActivity.length ? <div className="activity-list">{recentActivity.map(item => <article className="audit-item" key={item._id}><span className="audit-mark">↗</span><div><p><strong>{item.action}</strong> {item.entity}</p><span>{item.title}</span><time>{new Date(item.createdAt).toLocaleString()}</time></div></article>)}</div> : <p className="empty-state">No administrative actions recorded yet.</p>}
      </section>
    </div>
    <section className="admin-panel analytics-panel"><div className="panel-heading"><div><p className="admin-kicker">AUDIENCE</p><h2>Portfolio activity</h2></div><span className="panel-caption">Live database data</span></div>
      <div className="analytics-strip"><div><strong>{analytics?.cvDownloads ?? 0}</strong><span>CV downloads</span></div><div><strong>{analytics?.hireMeClicks ?? 0}</strong><span>Contact actions</span></div><div><strong>{analytics?.total ?? 0}</strong><span>Tracked events</span></div></div>
    </section>
  </div>;
}

function ProjectManager({ token, projects, refresh, notify }) {
  const [form, setForm] = useState(emptyProject);
  const [editing, setEditing] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const filtered = projects.filter(project => `${project.title} ${project.category} ${project.tech?.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));

  const edit = project => {
    setEditing(project._id);
    setForm({ ...emptyProject, ...project, features: (project.features || []).join('\n'), tech: (project.tech || []).join(', ') });
    setError('');
  };
  const reset = () => { setEditing(''); setForm(emptyProject); setError(''); };

  const save = async event => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const payload = { ...form, order: Number(form.order) || 0, features: form.features.split('\n').map(item => item.trim()).filter(Boolean), tech: form.tech.split(',').map(item => item.trim()).filter(Boolean) };
    try {
      await request(editing ? `/projects/${editing}` : '/projects', token, { method: editing ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      notify(editing ? 'Project updated.' : 'Project created.');
      reset();
      await refresh();
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  };

  const remove = async project => {
    if (!window.confirm(`Delete “${project.title}”? This cannot be undone.`)) return;
    try { await request(`/projects/${project._id}`, token, { method: 'DELETE' }); notify('Project deleted.'); await refresh(); }
    catch (requestError) { notify(requestError.message, 'error'); }
  };

  const uploadImage = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try { update('imageUrl', await imageAsDataUrl(file)); notify('Image attached to project.'); }
    catch (imageError) { notify(imageError.message, 'error'); }
    event.target.value = '';
  };

  return <div className="admin-page-body">
    <section className="admin-panel form-panel"><div className="panel-heading"><div><p className="admin-kicker">PROJECT CMS</p><h2>{editing ? 'Edit project' : 'Add project'}</h2></div>{editing && <button className="admin-quiet" type="button" onClick={reset}>Cancel edit</button>}</div>
      <form className="cms-form" onSubmit={save}>
        <div className="cms-grid"><label>Project name<input required maxLength="120" value={form.title} onChange={event => update('title', event.target.value)} /></label><label>Category<input required maxLength="80" placeholder="E-commerce, Business Solutions…" value={form.category} onChange={event => update('category', event.target.value)} /></label>
          <label>Project type<select value={form.projectType} onChange={event => update('projectType', event.target.value)}><option value="fullstack">Full-stack</option><option value="frontend">Frontend</option><option value="backend">Backend / API</option><option value="ecommerce">E-commerce</option><option value="business">Business solution</option></select></label><label>Status<select value={form.status} onChange={event => update('status', event.target.value)}><option value="published">Published</option><option value="draft">Draft</option></select></label>
          <label className="cms-span">Problem addressed<textarea required maxLength="1500" rows="2" value={form.problem} onChange={event => update('problem', event.target.value)} /></label><label className="cms-span">Project description<textarea required maxLength="2500" rows="3" value={form.desc} onChange={event => update('desc', event.target.value)} /></label><label className="cms-span">My contribution<textarea maxLength="1500" rows="2" value={form.contribution} onChange={event => update('contribution', event.target.value)} /></label>
          <label>Technologies <small>Comma separated</small><input value={form.tech} onChange={event => update('tech', event.target.value)} /></label><label>Features <small>One per line</small><textarea rows="3" value={form.features} onChange={event => update('features', event.target.value)} /></label>
          <label>Live website URL<input type="url" value={form.liveUrl} onChange={event => update('liveUrl', event.target.value)} /></label><label>Repository URL<input type="url" value={form.repoUrl} onChange={event => update('repoUrl', event.target.value)} /></label>
          <label>Image URL<input type="url" placeholder="Or attach an image below" value={form.imageUrl.startsWith('data:') ? '' : form.imageUrl} onChange={event => update('imageUrl', event.target.value)} /></label><label>Upload preview image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadImage} /><small>JPG, PNG or WebP · maximum 512 KB</small></label>
          <label>Display order<input type="number" value={form.order} onChange={event => update('order', event.target.value)} /></label><div className="check-row"><label className="check-label"><input type="checkbox" checked={Boolean(form.featured)} onChange={event => update('featured', event.target.checked)} /> Featured</label><label className="check-label"><input type="checkbox" checked={Boolean(form.visible)} onChange={event => update('visible', event.target.checked)} /> Visible</label></div>
        </div>
        {form.imageUrl.startsWith('data:image') && <img className="upload-preview" src={form.imageUrl} alt="Project preview" />}
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="admin-primary" disabled={busy}>{busy ? 'Saving…' : editing ? 'Save changes' : 'Create project'} <span>↗</span></button>
      </form>
    </section>
    <section className="admin-panel"><div className="panel-heading"><div><p className="admin-kicker">PORTFOLIO</p><h2>Projects <span className="count-badge">{projects.length}</span></h2></div><input className="search-input" aria-label="Search projects" placeholder="Search projects" value={query} onChange={event => setQuery(event.target.value)} /></div>
      <div className="table-scroll"><table className="cms-table"><thead><tr><th>Project</th><th>Category</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{filtered.map(project => <tr key={project._id}><td><strong>{project.title}</strong>{project.featured && <span className="table-mark">Featured</span>}</td><td>{project.category}</td><td><span className={project.status === 'draft' || project.visible === false ? 'status-pill draft' : 'status-pill published'}>{project.status === 'draft' || project.visible === false ? 'Draft' : 'Published'}</span></td><td>{new Date(project.updatedAt || project.createdAt).toLocaleDateString()}</td><td><div className="table-actions"><button className="admin-quiet" onClick={() => edit(project)}>Edit</button><button className="admin-danger" onClick={() => remove(project)}>Delete</button></div></td></tr>)}</tbody></table>{!filtered.length && <p className="empty-state">No projects match this search.</p>}</div>
    </section>
  </div>;
}

const collectionDefinitions = {
  skills: {
    title: 'Skills', description: 'Organize technologies by category and label current learning clearly.',
    blank: { name: '', category: 'Frontend', level: 'Working knowledge', description: '' },
    fields: [{ key: 'name', label: 'Skill name', required: true }, { key: 'category', label: 'Category', required: true }, { key: 'level', label: 'Proficiency label' }, { key: 'description', label: 'Description', kind: 'textarea' }],
  },
  experience: {
    title: 'Experience & education', description: 'Add verified roles, responsibilities, education and dates.',
    blank: { title: '', organization: '', type: 'Work', location: '', startDate: '', endDate: '', current: false, summary: '', responsibilities: [] },
    fields: [{ key: 'title', label: 'Role / qualification', required: true }, { key: 'organization', label: 'Organization' }, { key: 'type', label: 'Type' }, { key: 'location', label: 'Location' }, { key: 'startDate', label: 'Start date' }, { key: 'endDate', label: 'End date' }, { key: 'summary', label: 'Summary', kind: 'textarea' }, { key: 'responsibilities', label: 'Responsibilities', kind: 'list' }],
  },
  certifications: {
    title: 'Certifications & training', description: 'Manage verified courses and credentials; dates remain optional if unknown.',
    blank: { name: '', issuer: '', date: '', credentialUrl: '', description: '', imageUrl: '' },
    fields: [{ key: 'name', label: 'Certification / course', required: true }, { key: 'issuer', label: 'Issuing organization' }, { key: 'date', label: 'Date' }, { key: 'credentialUrl', label: 'Credential URL' }, { key: 'description', label: 'Description', kind: 'textarea' }],
  },
};

function CollectionManager({ type, content, saveContent, notify }) {
  const definition = collectionDefinitions[type];
  const records = content[type] || [];
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState(definition.blank);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const edit = (record, index) => {
    const next = { ...definition.blank, ...record };
    for (const field of definition.fields) {
      if (field.kind === 'list') next[field.key] = (record[field.key] || []).join('\n');
    }
    setForm(next);
    setEditingIndex(index);
    setError('');
  };
  const reset = () => { setForm(definition.blank); setEditingIndex(null); setError(''); };
  const save = async event => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const record = { ...form };
    for (const field of definition.fields) if (field.kind === 'list') record[field.key] = String(record[field.key] || '').split('\n').map(item => item.trim()).filter(Boolean);
    try {
      const updated = records.slice();
      if (editingIndex === null) updated.push(record);
      else updated[editingIndex] = record;
      await saveContent({ ...content, [type]: updated });
      reset();
      notify(`${definition.title} saved.`);
    } catch (saveError) { setError(saveError.message); }
    finally { setBusy(false); }
  };
  const remove = async index => {
    if (!window.confirm('Delete this entry?')) return;
    const updated = records.filter((_, itemIndex) => itemIndex !== index);
    try { await saveContent({ ...content, [type]: updated }); notify('Entry deleted.'); }
    catch (saveError) { notify(saveError.message, 'error'); }
  };
  const uploadCertificate = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try { const imageUrl = await imageAsDataUrl(file); setForm(current => ({ ...current, imageUrl })); notify('Certificate image attached.'); }
    catch (uploadError) { notify(uploadError.message, 'error'); }
    event.target.value = '';
  };

  return <div className="admin-page-body collection-layout"><section className="admin-panel form-panel"><div className="panel-heading"><div><p className="admin-kicker">CONTENT COLLECTION</p><h2>{editingIndex === null ? `Add ${type === 'skills' ? 'skill' : type === 'experience' ? 'entry' : 'certification'}` : 'Edit entry'}</h2></div>{editingIndex !== null && <button className="admin-quiet" onClick={reset}>Cancel</button>}</div><p className="panel-caption">{definition.description}</p>
    <form className="cms-form" onSubmit={save}><div className="cms-grid">{definition.fields.map(field => <label className={field.kind === 'textarea' || field.kind === 'list' ? 'cms-span' : ''} key={field.key}>{field.label}{field.kind === 'list' && <small>One item per line</small>}{field.kind === 'textarea' || field.kind === 'list' ? <textarea required={field.required} rows={field.kind === 'list' ? 4 : 3} value={typeof form[field.key] === 'string' ? form[field.key] : ''} onChange={event => setForm(current => ({ ...current, [field.key]: event.target.value }))} /> : <input required={field.required} value={form[field.key] || ''} onChange={event => setForm(current => ({ ...current, [field.key]: event.target.value }))} />}</label>)}{type === 'experience' && <label className="check-label cms-span"><input type="checkbox" checked={Boolean(form.current)} onChange={event => setForm(current => ({ ...current, current: event.target.checked }))} /> This is a current role</label>}{type === 'certifications' && <label className="cms-span">Certificate image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadCertificate} /><small>Optional · maximum 512 KB</small>{form.imageUrl?.startsWith('data:image') && <img className="upload-preview certificate-preview" src={form.imageUrl} alt="Certificate preview" />}</label>}</div>{error && <p className="admin-error" role="alert">{error}</p>}<button className="admin-primary" disabled={busy}>{busy ? 'Saving…' : editingIndex === null ? 'Add entry' : 'Save entry'} <span>↗</span></button></form>
    </section><section className="admin-panel"><div className="panel-heading"><div><p className="admin-kicker">SAVED CONTENT</p><h2>{definition.title} <span className="count-badge">{records.length}</span></h2></div></div><div className="managed-records">{records.map((record, index) => <article className="managed-record" key={`${record.name || record.title}-${index}`}>{type === 'certifications' && record.imageUrl?.startsWith('data:image') && <img src={record.imageUrl} alt="" />}{type === 'skills' && <span className="skill-record-icon">{record.name?.slice(0, 2).toUpperCase()}</span>}<div className="managed-record-copy"><strong>{record.name || record.title}</strong><span>{type === 'skills' ? `${record.category} · ${record.level}` : type === 'experience' ? `${record.organization || record.type}${record.startDate ? ` · ${record.startDate}` : ''}` : `${record.issuer || 'Issuer not listed'}${record.date ? ` · ${record.date}` : ''}`}</span><p>{record.description || record.summary || record.responsibilities?.join(' · ') || ''}</p></div><div className="table-actions"><button className="admin-quiet" onClick={() => edit(record, index)}>Edit</button><button className="admin-danger" onClick={() => remove(index)}>Delete</button></div></article>)}{!records.length && <p className="empty-state">No entries yet. Add the first verified item using the form.</p>}</div></section></div>;
}

function ProfileSettings({ content, saveContent, notify }) {
  const [profile, setProfile] = useState(content.profile || initialProfile);
  const [settings, setSettings] = useState(content.settings || {});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { setProfile(content.profile || initialProfile); setSettings(content.settings || {}); }, [content]);
  const field = (target, key, label, multiline = false) => <label className={multiline ? 'cms-span' : ''} key={key}>{label}{multiline ? <textarea rows={5} value={target[key] || ''} onChange={event => (target === profile ? setProfile : setSettings)(current => ({ ...current, [key]: event.target.value }))} /> : <input value={target[key] || ''} onChange={event => (target === profile ? setProfile : setSettings)(current => ({ ...current, [key]: event.target.value }))} />}</label>;
  const save = async event => { event.preventDefault(); setBusy(true); setError(''); try { await saveContent({ ...content, profile, settings }); notify('Profile and SEO settings saved.'); } catch (saveError) { setError(saveError.message); } finally { setBusy(false); } };
  const upload = async event => { const file = event.target.files?.[0]; if (!file) return; try { const photoUrl = await imageAsDataUrl(file); setProfile(current => ({ ...current, photoUrl })); notify('Profile image attached.'); } catch (uploadError) { notify(uploadError.message, 'error'); } event.target.value = ''; };
  const profileFields = {
    name: 'Professional name', brand: 'Brand name', title: 'Job title', tagline: 'Brand tagline',
    location: 'Location', availability: 'Availability', email: 'Contact email', githubUrl: 'GitHub URL',
    linkedinUrl: 'LinkedIn URL', whatsappUrl: 'WhatsApp URL', cvUrl: 'CV download URL',
  };

  return <div className="admin-page-body"><section className="admin-panel"><div className="panel-heading"><div><p className="admin-kicker">SITE IDENTITY</p><h2>Profile and SEO settings</h2></div></div><form className="cms-form" onSubmit={save}><div className="cms-grid">
    {Object.entries(profileFields).map(([key, label]) => field(profile, key, label))}
    {field(profile, 'heroHeadline', 'Homepage headline', true)}
    {field(profile, 'heroDescription', 'Homepage introduction', true)}
    {field(profile, 'heroSupporting', 'Homepage supporting copy', true)}
    {field(profile, 'contactHeading', 'Contact section heading')}
    {field(profile, 'contactDescription', 'Contact section description', true)}
    {field(profile, 'biography', 'Professional biography', true)}
    <label>Profile image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} /><small>JPG, PNG or WebP · maximum 512 KB</small>{profile.photoUrl?.startsWith('data:image') && <img className="upload-preview profile-preview" src={profile.photoUrl} alt="Profile preview" />}</label>
    <div />{field(settings, 'siteTitle', 'Website title')}{field(settings, 'metaDescription', 'Meta description', true)}{field(settings, 'ogImageUrl', 'Open Graph image URL')}<label>Theme accent color<input type="color" value={settings.accentColor || '#60a5fa'} onChange={event => setSettings(current => ({ ...current, accentColor: event.target.value }))} /></label>
  </div>{error && <p className="admin-error" role="alert">{error}</p>}<button className="admin-primary" disabled={busy}>{busy ? 'Saving…' : 'Save profile settings'} <span>↗</span></button></form></section></div>;
}

function MessageManager({ token, messages, refresh, notify }) {
  const [view, setView] = useState('inbox');
  const [query, setQuery] = useState('');
  const [busyId, setBusyId] = useState('');
  const filtered = useMemo(() => messages.filter(message => (view === 'archive' ? message.archived : !message.archived) && `${message.name} ${message.email} ${message.subject} ${message.message}`.toLowerCase().includes(query.toLowerCase())), [messages, query, view]);
  const mutate = async (message, action, method = 'PATCH', readValue) => {
    setBusyId(message._id);
    try { await request(`/contact/${message._id}${action}`, token, { method, ...(readValue === undefined ? {} : { body: JSON.stringify({ read: readValue }) }) }); await refresh(); notify('Message updated.'); }
    catch (error) { notify(error.message, 'error'); }
    finally { setBusyId(''); }
  };
  const remove = message => { if (window.confirm(`Delete the message from ${message.name}?`)) mutate(message, '', 'DELETE'); };
  return <div className="admin-page-body"><section className="admin-panel"><div className="panel-heading"><div><p className="admin-kicker">CONTACT INBOX</p><h2>Messages <span className="count-badge">{messages.length}</span></h2></div><input className="search-input" placeholder="Search messages" value={query} onChange={event => setQuery(event.target.value)} /></div><div className="inbox-tabs"><button className={view === 'inbox' ? 'selected' : ''} onClick={() => setView('inbox')}>Inbox ({messages.filter(message => !message.archived).length})</button><button className={view === 'archive' ? 'selected' : ''} onClick={() => setView('archive')}>Archived ({messages.filter(message => message.archived).length})</button></div>
    <div className="messages-list">{filtered.map(message => <article className={`message-card ${message.read ? '' : 'unread'}`} key={message._id}><div className="message-card-head"><div><h3>{message.name} {!message.read && <span className="status-pill unread-pill">Unread</span>}</h3><a href={`mailto:${message.email}`}>{message.email}</a></div><time>{new Date(message.createdAt).toLocaleString()}</time></div><p className="message-subject">{message.subject || 'Portfolio inquiry'}</p><p className="message-body">{message.message}</p><div className="message-context">{message.projectType && <span>{message.projectType}</span>}{message.budget && <span>{message.budget}</span>}</div><div className="table-actions"><a className="admin-quiet" href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject || 'Portfolio inquiry'}`)}`}>Reply by email</a><button className="admin-quiet" disabled={busyId === message._id} onClick={() => mutate(message, '/read', 'PATCH', !message.read)}>{message.read ? 'Mark unread' : 'Mark read'}</button>{view === 'archive' ? <button className="admin-quiet" disabled={busyId === message._id} onClick={() => mutate(message, '/unarchive')}>Restore</button> : <button className="admin-quiet" disabled={busyId === message._id} onClick={() => mutate(message, '/archive')}>Archive</button>}<button className="admin-danger" disabled={busyId === message._id} onClick={() => remove(message)}>Delete</button></div></article>)}{!filtered.length && <p className="empty-state">{query ? 'No messages match your search.' : `No messages in the ${view}.`}</p>}</div>
  </section></div>;
}

export default function AdminDashboard() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [authorized, setAuthorized] = useState(false);
  const [active, setActive] = useState('overview');
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [projects, setProjects] = useState([]);
  const [content, setContent] = useState({ ...baseContent, skills: [], experience: [], certifications: [], configured: false });
  const [messages, setMessages] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [pageError, setPageError] = useState('');
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, type = 'success') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 4200);
  }, []);

  const refreshProjects = useCallback(async () => setProjects(await request('/projects/all', token)), [token]);
  const refreshMessages = useCallback(async () => setMessages(await request('/contact', token)), [token]);
  const saveContent = useCallback(async next => {
    const saved = await request('/content', token, { method: 'PUT', body: JSON.stringify(next) });
    setContent(saved);
    return saved;
  }, [token]);

  const refreshAll = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setPageError('');
    try {
      const [projectData, contentData, messageData, analyticsData, activityData] = await Promise.all([
        request('/projects/all', token), request('/content/admin', token), request('/contact', token),
        request('/analytics/summary', token), request('/admin/activity', token),
      ]);
      setProjects(projectData);
      setContent({ ...contentData, profile: { ...initialProfile, ...(contentData.profile || {}) }, configured: Boolean(contentData.configured) });
      setMessages(messageData);
      setAnalytics(analyticsData);
      setActivity(activityData);
      setAuthorized(true);
    } catch (error) {
      setPageError(error.message);
      if (/token|admin account|access denied/i.test(error.message)) signOut();
    } finally { setLoading(false); }
  }, [token]);

  const signOut = useCallback(() => {
    localStorage.removeItem('admin_token');
    setToken('');
    setAuthorized(false);
  }, []);

  useEffect(() => { if (token) refreshAll(); else setAuthorized(false); }, [token, refreshAll]);

  const login = value => {
    localStorage.setItem('admin_token', value);
    setToken(value);
  };

  const importExisting = async () => {
    setImporting(true);
    try {
      const currentTitles = new Set(projects.map(project => project.title));
      for (const [index, project] of initialProjects.entries()) {
        if (!currentTitles.has(project.title)) {
          await request('/projects', token, { method: 'POST', body: JSON.stringify({
            title: project.title, category: project.category, projectType: project.projectType,
            problem: project.problem, desc: project.desc, contribution: project.contribution,
            features: project.features, tech: project.tech, liveUrl: project.liveUrl,
            repoUrl: project.repoUrl, imageUrl: project.image, order: index,
            status: 'published', visible: true,
          }) });
        }
      }
      await saveContent({ ...baseContent });
      await refreshAll();
      notify('Verified portfolio content imported into MongoDB.');
    } catch (error) { notify(error.message, 'error'); }
    finally { setImporting(false); }
  };

  const title = navigation.find(item => item[0] === active)?.[1] || 'Overview';
  if (!token || !authorized) return token && loading ? <main className="admin-login"><div className="login-panel"><a className="admin-brand" href="/">FRANTECH<span>.</span></a><p className="admin-kicker">SECURE WORKSPACE</p><h1>Checking administrator session</h1><div className="loading-lines"><i /><i /><i /></div>{pageError && <p className="admin-error" role="alert">{pageError} <button className="inline-link" onClick={signOut}>Sign in again</button></p>}</div></main> : !token ? <Login onLogin={login} /> : <Login onLogin={login} />;

  return <div className="admin-shell">
    {mobileSidebar && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileSidebar(false)} />}
    <aside className={`admin-sidebar ${mobileSidebar ? 'sidebar-open' : ''}`}><a className="admin-brand" href="/">FRANTECH<span>.</span></a><p className="sidebar-caption">ADMINISTRATION</p><nav aria-label="Admin navigation">{navigation.map(([id, label, number]) => <button key={id} className={active === id ? 'sidebar-link active' : 'sidebar-link'} onClick={() => { setActive(id); setMobileSidebar(false); }}><span>{number}</span>{label}{id === 'messages' && messages.some(message => !message.read && !message.archived) && <i />}</button>)}</nav><div className="sidebar-bottom"><a href="/" target="_blank" rel="noreferrer">View portfolio ↗</a><button onClick={signOut}>Sign out <span>↗</span></button></div></aside>
    <main className="admin-workspace"><header className="admin-topbar"><button className="admin-menu-button" aria-label="Open admin navigation" onClick={() => setMobileSidebar(true)}>☰</button><div><p className="admin-kicker">FRANTECH / CMS</p><h1>{title}</h1></div><button className="admin-quiet refresh-button" onClick={refreshAll} disabled={loading}>{loading ? 'Refreshing…' : 'Refresh data ↻'}</button></header>
      {pageError && <div className="admin-alert" role="alert">{pageError}<button onClick={() => setPageError('')}>Dismiss</button></div>}
      {active === 'overview' && <DashboardHome projects={projects} content={content} messages={messages} analytics={analytics} activity={activity} onImport={importExisting} importing={importing} />}
      {active === 'projects' && <ProjectManager token={token} projects={projects} refresh={refreshProjects} notify={notify} />}
      {['skills', 'experience', 'certifications'].includes(active) && <CollectionManager type={active} content={content} saveContent={saveContent} notify={notify} />}
      {active === 'profile' && <ProfileSettings content={content} saveContent={saveContent} notify={notify} />}
      {active === 'messages' && <MessageManager token={token} messages={messages} refresh={refreshMessages} notify={notify} />}
    </main>
    {toast && <div className={`admin-toast ${toast.type}`} role={toast.type === 'error' ? 'alert' : 'status'}>{toast.message}</div>}
  </div>;
}