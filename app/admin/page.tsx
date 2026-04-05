"use client";
import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import "@/components/style/admin.css";

type Tab = "hero" | "about" | "whyUs" | "faq" | "partners";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [tab, setTab] = useState<Tab>("hero");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("useld_token");
    if (t)
      fetch("/api/auth", { headers: { Authorization: `Bearer ${t}` } })
        .then((r) => r.json())
        .then((d) => {
          if (d.valid) {
            setToken(t);
            loadContent();
          } else {
            localStorage.removeItem("useld_token");
            setToken(null);
          }
        });
  }, []);

  const loadContent = async () => {
    const r = await fetch("/api/content");
    setContent(await r.json());
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const r = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", username: user, password: pass }),
    });
    const d = await r.json();
    if (d.token) {
      setToken(d.token);
      localStorage.setItem("useld_token", d.token);
      await loadContent();
    } else setErr("Invalid username or password");
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("useld_token");
    setToken(null);
    setContent(null);
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMsg("Everything saved!");
      } else {
        const d = await res.json();
        setErr(d.error || "Save failed");
      }
    } catch (e) {
      console.error(e);
      setErr("Save failed");
    } finally {
      setTimeout(() => { setMsg(""); setErr(""); }, 3000);
      setSaving(false);
    }
  };

  const upd = (path: string[], val: any) => {
    setContent((p: any) => {
      const n = JSON.parse(JSON.stringify(p)); // Deep copy to avoid mutation
      let o = n[tab];
      for (let i = 0; i < path.length - 1; i++) o = o[path[i]];
      o[path[path.length - 1]] = val;
      return n;
    });
  };

  if (!token)
    return (
      <Login onSubmit={login} err={err} loading={loading} user={user} pass={pass} setUser={setUser} setPass={setPass} />
    );
  if (!content) return <Loader />;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "hero", label: "Hero", icon: <Icons.Home size={18} /> },
    { id: "about", label: "About", icon: <Icons.BookOpen size={18} /> },
    { id: "whyUs", label: "Why Us", icon: <Icons.Star size={18} /> },
    { id: "faq", label: "FAQ", icon: <Icons.HelpCircle size={18} /> },
    { id: "partners", label: "Partners", icon: <Icons.Handshake size={18} /> },
  ];

  return (
    <>
      <div className="adm">
        {/* Sidebar */}
        <aside className="adm-side">
          <div className="adm-logo">
            <div className="adm-logo-top">
              <div className="adm-logo-box">ELD</div>
              <span className="adm-logo-name">US ELD</span>
            </div>
            <div className="adm-logo-sub">Admin Panel</div>
          </div>
          <nav className="adm-nav">
            <div className="adm-nav-lbl">Content Sections</div>
            {tabs.map((t) => (
              <button key={t.id} className={`adm-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
                <span className="adm-icon">{t.icon}</span> {t.label}
              </button>
            ))}
          </nav>
          <div className="adm-foot">
            <a href="/" target="_blank" className="adm-foot-btn" style={{ textDecoration: "none", display: "flex", gap: "6px", alignItems: "center" }}>
              <Icons.ExternalLink size={16} /> View Website
            </a>
            <button className="adm-foot-btn danger" onClick={logout}>
              ← Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="adm-main">
          <div className="adm-top">
            <span className="adm-top-title">Editing: {tabs.find((t) => t.id === tab)?.label}</span>
            <div className="adm-top-right">
              {msg && <span className="adm-save-msg">✓ {msg}</span>}
              <button className="adm-save-btn" onClick={save} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          <div className="adm-content">
            {tab === "hero" && <HeroEd content={content.hero} upd={upd} />}
            {tab === "about" && <AboutEd content={content.about} upd={upd} setContent={setContent} />}
            {tab === "whyUs" && <WhyUsEd content={content.whyUs} setContent={setContent} />}
            {tab === "faq" && <FaqEd content={content.faq} setContent={setContent} />}
            {tab === "partners" && <PartnersEd content={content.partners} setContent={setContent} token={token} />}
          </div>
        </main>
      </div>
    </>
  );
}

/* SUB EDITORS */
function HeroEd({ content, upd }: any) {
  return (
    <>
      <div className="adm-section-title">Hero Section</div>
      <div className="adm-section-desc">The first impression visitors get. Keep it bold and clear.</div>
      <div className="field">
        <label className="field-lbl">Main Headline</label>
        <textarea
          className="field-input"
          rows={2}
          value={content.headline}
          onChange={(e) => upd(["headline"], e.target.value)}
        />
      </div>
      <div className="field">
        <label className="field-lbl">Sub-headline</label>
        <textarea
          className="field-input"
          rows={2}
          value={content.subheadline}
          onChange={(e) => upd(["subheadline"], e.target.value)}
        />
      </div>
      <div className="two-col" style={{ marginBottom: 20 }}>
        <div className="field" style={{ marginBottom: 0 }}>
          <label className="field-lbl">Button 1 Text</label>
          <input className="field-input" value={content.btn1} onChange={(e) => upd(["btn1"], e.target.value)} />
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label className="field-lbl">Button 2 Text</label>
          <input className="field-input" value={content.btn2} onChange={(e) => upd(["btn2"], e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label className="field-lbl">Stats</label>
        <div className="stats-2col">
          {content.stats.map((s: any, i: number) => (
            <div className="list-card" key={i}>
              <div className="two-col">
                <div>
                  <label className="field-lbl">Value</label>
                  <input
                    className="field-input"
                    value={s.value}
                    onChange={(e) => {
                      const st = [...content.stats];
                      st[i] = { ...st[i], value: e.target.value };
                      upd(["stats"], st);
                    }}
                  />
                </div>
                <div>
                  <label className="field-lbl">Label</label>
                  <input
                    className="field-input"
                    value={s.label}
                    onChange={(e) => {
                      const st = [...content.stats];
                      st[i] = { ...st[i], label: e.target.value };
                      upd(["stats"], st);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AboutEd({ content, upd, setContent }: any) {
  return (
    <>
      <div className="adm-section-title">About Us</div>
      <div className="adm-section-desc">Company description paragraphs and key statistics.</div>
      <div className="field">
        <label className="field-lbl">Paragraphs</label>
        {content.paragraphs.map((p: string, i: number) => (
          <div key={i} style={{ position: "relative", marginBottom: 8 }}>
            <textarea
              className="field-input"
              rows={2}
              value={p}
              onChange={(e) => {
                const ps = [...content.paragraphs];
                ps[i] = e.target.value;
                upd(["paragraphs"], ps);
              }}
            />
          </div>
        ))}
      </div>
      <div className="field">
        <label className="field-lbl">Stats</label>
        {content.stats.map((s: any, i: number) => (
          <div className="list-card" key={i} style={{ marginBottom: 8 }}>
            <div className="two-col">
              <div>
                <label className="field-lbl">Value</label>
                <input
                  className="field-input"
                  value={s.value}
                  onChange={(e) => {
                    const st = [...content.stats];
                    st[i] = { ...st[i], value: e.target.value };
                    upd(["stats"], st);
                  }}
                />
              </div>
              <div>
                <label className="field-lbl">Label</label>
                <input
                  className="field-input"
                  value={s.label}
                  onChange={(e) => {
                    const st = [...content.stats];
                    st[i] = { ...st[i], label: e.target.value };
                    upd(["stats"], st);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function WhyUsEd({ content, setContent }: any) {
  const add = () =>
    setContent((p: any) => ({
      ...p,
      whyUs: {
        ...p.whyUs,
        items: [...p.whyUs.items, { icon: "Sparkles", title: "New Feature", description: "Description here." }],
      },
    }));
  const rm = (i: number) =>
    setContent((p: any) => ({
      ...p,
      whyUs: { ...p.whyUs, items: p.whyUs.items.filter((_: any, idx: number) => idx !== i) },
    }));
  const upd = (i: number, f: string, v: string) =>
    setContent((p: any) => {
      const items = [...p.whyUs.items];
      items[i] = { ...items[i], [f]: v };
      return { ...p, whyUs: { ...p.whyUs, items } };
    });
  return (
    <>
      <div className="adm-section-title">Why Choose Us</div>
      <div className="adm-section-desc">Feature cards shown in a 3-column grid.</div>
      <div className="field">
        <label className="field-lbl">Section Title</label>
        <input
          className="field-input"
          value={content.title}
          onChange={(e) => setContent((p: any) => ({ ...p, whyUs: { ...p.whyUs, title: e.target.value } }))}
        />
      </div>
      {content.items.map((item: any, i: number) => (
        <div className="list-card" key={i}>
          <button className="rm-btn" onClick={() => rm(i)}>
            ×
          </button>
          <div className="three-col" style={{ marginBottom: 10 }}>
            <div>
              <label className="field-lbl">Icon</label>
              <input className="field-input" value={item.icon} onChange={(e) => upd(i, "icon", e.target.value)} />
            </div>
            <div>
              <label className="field-lbl">Title</label>
              <input className="field-input" value={item.title} onChange={(e) => upd(i, "title", e.target.value)} />
            </div>
            <div style={{ gridColumn: "2/4" }}></div>
          </div>
          <label className="field-lbl">Description</label>
          <textarea
            className="field-input"
            rows={2}
            value={item.description}
            onChange={(e) => upd(i, "description", e.target.value)}
          />
        </div>
      ))}
      <button className="add-btn" onClick={add}>
        + Add Card
      </button>
    </>
  );
}

function FaqEd({ content, setContent }: any) {
  const add = () =>
    setContent((p: any) => ({ ...p, faq: [...p.faq, { question: "New Question?", answer: "Answer here." }] }));
  const rm = (i: number) => setContent((p: any) => ({ ...p, faq: p.faq.filter((_: any, idx: number) => idx !== i) }));
  const upd = (i: number, f: string, v: string) =>
    setContent((p: any) => {
      const faq = [...p.faq];
      faq[i] = { ...faq[i], [f]: v };
      return { ...p, faq };
    });
  return (
    <>
      <div className="adm-section-title">FAQ</div>
      <div className="adm-section-desc">Frequently asked questions shown as an accordion.</div>
      {content.map((item: any, i: number) => (
        <div className="list-card" key={i}>
          <button className="rm-btn" onClick={() => rm(i)}>
            ×
          </button>
          <div className="field" style={{ marginBottom: 10 }}>
            <label className="field-lbl">Question</label>
            <input className="field-input" value={item.question} onChange={(e) => upd(i, "question", e.target.value)} />
          </div>
          <label className="field-lbl">Answer</label>
          <textarea
            className="field-input"
            rows={3}
            value={item.answer}
            onChange={(e) => upd(i, "answer", e.target.value)}
          />
        </div>
      ))}
      <button className="add-btn" onClick={add}>
        + Add FAQ Item
      </button>
    </>
  );
}

function PartnersEd({ content, setContent, token }: any) {
  const add = () => setContent((p: any) => ({ ...p, partners: [...p.partners, { name: "Partner Name", logo: "" }] }));
  const rm = (i: number) =>
    setContent((p: any) => ({ ...p, partners: p.partners.filter((_: any, idx: number) => idx !== i) }));
  const upd = (i: number, f: string, v: string) =>
    setContent((p: any) => {
      const partners = [...p.partners];
      partners[i] = { ...partners[i], [f]: v };
      return { ...p, partners };
    });

  const handleUpload = async (e: any, i: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.url) upd(i, "logo", data.url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <>
      <div className="adm-section-title">Partners</div>
      <div className="adm-section-desc">Partner names and logos shown in a scrolling marquee.</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {content.map((p: any, i: number) => (
          <div className="list-card" key={i}>
            <button className="rm-btn" onClick={() => rm(i)}>
              ×
            </button>
            <label className="field-lbl">Partner Name</label>
            <input className="field-input" value={p.name} onChange={(e) => upd(i, "name", e.target.value)} />
            <label className="field-lbl" style={{ marginTop: 8 }}>Logo Upload</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
              {p.logo && <img src={p.logo} alt="logo" style={{ width: 40, height: 40, objectFit: 'contain', background: '#fff', borderRadius: 4 }} />}
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e, i)} style={{ fontSize: '12px' }} />
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={add}>
        + Add Partner
      </button>
    </>
  );
}

/* LOGIN */
function Login({ onSubmit, err, loading, user, pass, setUser, setPass }: any) {
  return (
    <>
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-logo">US ELD</div>
          <div className="login-sub">Admin Panel</div>
          <form onSubmit={onSubmit}>
            <label className="lbl">Username</label>
            <input
              className="inp"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
            <label className="lbl">Password</label>
            <input
              className="inp"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
            {err && <div className="login-err">{err}</div>}
          </form>
          <div className="login-hint">
            Please enter your secure administrator credentials to continue.
          </div>
          <a href="/" className="back">
            ← Back to website
          </a>
        </div>
      </div>
    </>
  );
}

function Loader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d1b2e",
      }}>
      <div
        style={{
          width: 28,
          height: 28,
          border: "2px solid #1e3a5f",
          borderTopColor: "#f5a623",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
    </div>
  );
}
