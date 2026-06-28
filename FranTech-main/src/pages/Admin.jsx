import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const COLORS = {
  ink: '#0d0d1a',
  panel: '#12122a',
  accent1: '#e94560',
  accent2: '#f5a623',
  accent3: '#4ecdc4',
  accent4: '#a29bfe',
  text: '#f8f4e3',
  muted: '#9ca3af',
};

// ── Auth ──────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        onLogin(data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error — is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: COLORS.ink, display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif',
    }}>
      <div style={{
        background: COLORS.panel, padding: 40, borderRadius: 16,
        border: '2px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: 400,
      }}>
        <h1 style={{ color: COLORS.accent1, fontFamily: 'Bangers, cursive', fontSize: 36, marginBottom: 8, letterSpacing: 2 }}>
          🔐 ADMIN LOGIN
        </h1>
        <p style={{ color: COLORS.muted, marginBottom: 28, fontSize: 14 }}>FranzorPortfolio Dashboard</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email" placeholder="Email" required
            value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            style={inputStyle}
          />
          <input
            type="password" placeholder="Password" required
            value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            style={{ ...inputStyle, marginTop: 12 }}
          />
          {error && <p style={{ color: COLORS.accent1, marginTop: 12, fontSize: 14 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            width: '100%', marginTop: 20, padding: '14px',
            background: COLORS.accent1, color: '#fff',
            fontFamily: 'Bangers, cursive', fontSize: 20, letterSpacing: 2,
            border: 'none', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}>
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.06)',
  border: '2px solid rgba(255,255,255,0.12)', borderRadius: 10,
  color: '#f8f4e3', fontSize: 15, fontFamily: 'Nunito, sans-serif', outline: 'none',
  display: 'block',
};

// ── Analytics Panel ───────────────────────────────────
function Analytics({ token }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/api/analytics/summary`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(setData).catch(() => {});
  }, [token]);

  if (!data) return <p style={{ color: COLORS.muted }}>Loading analytics...</p>;

  const stats = [
    { label: 'Total Events', value: data.total, color: COLORS.accent4 },
    { label: 'Page Views', value: data.pageViews, color: COLORS.accent3 },
    { label: 'CV Downloads', value: data.cvDownloads, color: COLORS.accent2 },
    { label: 'Hire Me Clicks', value: data.hireMeClicks, color: COLORS.accent1 },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: COLORS.panel, padding: '20px 16px', borderRadius: 12,
            border: `2px solid ${s.color}44`, textAlign: 'center',
          }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <h3 style={{ color: COLORS.text, marginBottom: 12 }}>Recent Events (Last 7 Days)</h3>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {data.recentEvents.length === 0
          ? <p style={{ color: COLORS.muted }}>No events yet.</p>
          : data.recentEvents.map(ev => (
            <div key={ev._id} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              fontSize: 13,
            }}>
              <span style={{ color: COLORS.accent3 }}>{ev.event}</span>
              <span style={{ color: COLORS.muted }}>{new Date(ev.createdAt).toLocaleString()}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ── Messages Panel ────────────────────────────────────
function Messages({ token }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch(`${API_URL}/api/contact`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(data => { setMessages(data); setLoading(false); });
  };

  useEffect(load, [token]);

  const markRead = async (id) => {
    await fetch(`${API_URL}/api/contact/${id}/read`, {
      method: 'PATCH', headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  const deleteMsg = async (id) => {
    if (!confirm('Delete this message?')) return;
    await fetch(`${API_URL}/api/contact/${id}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  if (loading) return <p style={{ color: COLORS.muted }}>Loading messages...</p>;

  return (
    <div>
      {messages.length === 0
        ? <p style={{ color: COLORS.muted }}>No messages yet.</p>
        : messages.map(m => (
          <div key={m._id} style={{
            background: COLORS.panel, borderRadius: 12, padding: 20, marginBottom: 16,
            border: `2px solid ${m.read ? 'rgba(255,255,255,0.08)' : COLORS.accent1 + '66'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <span style={{ fontWeight: 700, color: COLORS.text }}>{m.name}</span>
                <span style={{ color: COLORS.muted, marginLeft: 12, fontSize: 13 }}>{m.email}</span>
                {!m.read && <span style={{ marginLeft: 10, background: COLORS.accent1, color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>NEW</span>}
              </div>
              <span style={{ fontSize: 12, color: COLORS.muted }}>{new Date(m.createdAt).toLocaleDateString()}</span>
            </div>
            {m.subject && <p style={{ color: COLORS.accent2, fontSize: 14, marginBottom: 6, fontWeight: 700 }}>{m.subject}</p>}
            <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.6 }}>{m.message}</p>
            <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
              <a href={`mailto:${m.email}`} style={btnStyle(COLORS.accent3)}>Reply</a>
              {!m.read && <button onClick={() => markRead(m._id)} style={btnStyle(COLORS.accent4)}>Mark Read</button>}
              <button onClick={() => deleteMsg(m._id)} style={btnStyle(COLORS.accent1)}>Delete</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

// ── Projects Panel ────────────────────────────────────
function Projects({ token }) {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', category: '', problem: '', desc: '', tech: '', liveUrl: '', repoUrl: '', imageUrl: '', color: '#e94560', order: 0, visible: true });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    fetch(`${API_URL}/api/projects/all`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setProjects);
  };

  useEffect(load, [token]);

  const save = async () => {
    const payload = { ...form, tech: form.tech.split(',').map(t => t.trim()).filter(Boolean) };
    const url = editing ? `${API_URL}/api/projects/${editing}` : `${API_URL}/api/projects`;
    const method = editing ? 'PUT' : 'POST';
    await fetch(url, {
      method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    setForm({ title: '', category: '', problem: '', desc: '', tech: '', liveUrl: '', repoUrl: '', imageUrl: '', color: '#e94560', order: 0, visible: true });
    setEditing(null);
    setShowForm(false);
    load();
  };

  const startEdit = (p) => {
    setForm({ ...p, tech: (p.tech || []).join(', ') });
    setEditing(p._id);
    setShowForm(true);
  };

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    load();
  };

  const toggleVisible = async (p) => {
    await fetch(`${API_URL}/api/projects/${p._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...p, visible: !p.visible }),
    });
    load();
  };

  const fields = [
    { key: 'title', placeholder: 'Project Title', required: true },
    { key: 'category', placeholder: 'Category (e.g. React App)', required: true },
    { key: 'problem', placeholder: 'Problem it solves', required: true },
    { key: 'desc', placeholder: 'Description', required: true },
    { key: 'tech', placeholder: 'Tech stack (comma separated: React, Tailwind, Node.js)' },
    { key: 'liveUrl', placeholder: 'Live URL' },
    { key: 'repoUrl', placeholder: 'GitHub Repo URL' },
    { key: 'imageUrl', placeholder: 'Image URL (or leave blank)' },
    { key: 'color', placeholder: 'Accent color (hex)', type: 'color' },
    { key: 'order', placeholder: 'Display order (number)', type: 'number' },
  ];

  return (
    <div>
      <button onClick={() => { setShowForm(!showForm); setEditing(null); }} style={btnStyle(COLORS.accent1)}>
        {showForm ? 'Cancel' : '+ Add Project'}
      </button>

      {showForm && (
        <div style={{ background: COLORS.panel, borderRadius: 14, padding: 24, margin: '20px 0', border: '2px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: COLORS.text, marginBottom: 16 }}>{editing ? 'Edit Project' : 'New Project'}</h3>
          {fields.map(f => (
            <input key={f.key} type={f.type || 'text'} placeholder={f.placeholder}
              value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))}
              style={{ ...inputStyle, marginBottom: 10 }}
            />
          ))}
          <label style={{ color: COLORS.muted, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <input type="checkbox" checked={form.visible} onChange={e => setForm(p => ({ ...p, visible: e.target.checked }))} />
            Visible on portfolio
          </label>
          <button onClick={save} style={btnStyle(COLORS.accent3)}>{editing ? 'Update Project' : 'Save Project'}</button>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {projects.map(p => (
          <div key={p._id} style={{
            background: COLORS.panel, borderRadius: 12, padding: 16, marginBottom: 12,
            border: `2px solid ${p.visible ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
            opacity: p.visible ? 1 : 0.6,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 700, color: COLORS.text }}>{p.title}</span>
                <span style={{ marginLeft: 10, fontSize: 12, color: p.color || COLORS.accent1, background: (p.color || COLORS.accent1) + '22', padding: '2px 8px', borderRadius: 20 }}>{p.category}</span>
                {!p.visible && <span style={{ marginLeft: 8, fontSize: 11, color: COLORS.muted }}>(hidden)</span>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => toggleVisible(p)} style={btnStyle(COLORS.accent2, true)}>{p.visible ? 'Hide' : 'Show'}</button>
                <button onClick={() => startEdit(p)} style={btnStyle(COLORS.accent4, true)}>Edit</button>
                <button onClick={() => deleteProject(p._id)} style={btnStyle(COLORS.accent1, true)}>Delete</button>
              </div>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 13, marginTop: 6 }}>{p.desc?.slice(0, 100)}...</p>
            <p style={{ color: COLORS.accent3, fontSize: 12, marginTop: 4 }}>{(p.tech || []).join(' · ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const btnStyle = (color, small = false) => ({
  padding: small ? '6px 14px' : '10px 20px',
  background: color + '22', color: color,
  border: `1.5px solid ${color}55`, borderRadius: 8,
  cursor: 'pointer', fontSize: small ? 12 : 14, fontWeight: 700,
  textDecoration: 'none', display: 'inline-block',
});

// ── Main Admin Dashboard ──────────────────────────────
export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [tab, setTab] = useState('analytics');

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
  };

  if (!token) return <LoginScreen onLogin={setToken} />;

  const tabs = ['analytics', 'messages', 'projects'];

  return (
    <div style={{ minHeight: '100vh', background: COLORS.ink, fontFamily: 'Nunito, sans-serif', color: COLORS.text }}>
      {/* Header */}
      <div style={{ background: COLORS.panel, borderBottom: '2px solid rgba(255,255,255,0.08)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: 28, color: COLORS.accent1, letterSpacing: 2, margin: '16px 0' }}>
          ⚡ FRANZOR ADMIN
        </h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: tab === t ? COLORS.accent1 : 'transparent',
              color: tab === t ? '#fff' : COLORS.muted,
              fontWeight: 700, fontSize: 13, textTransform: 'capitalize',
            }}>{t}</button>
          ))}
          <button onClick={logout} style={{ marginLeft: 16, padding: '8px 16px', background: 'rgba(255,255,255,0.06)', color: COLORS.muted, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
        <h2 style={{ color: COLORS.text, marginBottom: 24, textTransform: 'capitalize', fontFamily: 'Bangers, cursive', fontSize: 28, letterSpacing: 1 }}>
          {tab}
        </h2>
        {tab === 'analytics' && <Analytics token={token} />}
        {tab === 'messages' && <Messages token={token} />}
        {tab === 'projects' && <Projects token={token} />}
      </div>
    </div>
  );
}