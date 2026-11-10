import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/bricolage-grotesque/wdth.css';
import '@fontsource-variable/jetbrains-mono';
import './styles.css';
import { profile, projects, history, stack } from './data.js';

/* ───────────────────────── helpers ───────────────────────── */

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

/* Tiny JSON syntax highlighter → React nodes */
function Json({ value }) {
  const text = JSON.stringify(value, null, 2);
  const out = [];
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] && m[2]) out.push(<span key={k++} className="j-key">{m[1]}</span>, m[2]);
    else if (m[1]) out.push(<span key={k++} className="j-str">{m[1]}</span>);
    else if (m[3]) out.push(<span key={k++} className="j-bool">{m[3]}</span>);
    else out.push(<span key={k++} className="j-num">{m[4]}</span>);
    last = re.lastIndex;
  }
  out.push(text.slice(last));
  return <code>{out}</code>;
}

/* short, stable fake commit hash from a string */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

const ext = { target: '_blank', rel: 'noreferrer' };

/* ───────────────────────── the live system ───────────────────────── */

const NODES = {
  browser: { label: 'You', sub: 'browser' },
  nginx: { label: 'Nginx', sub: 'reverse proxy' },
  django: { label: 'Django', sub: 'REST API' },
  go: { label: 'Go', sub: 'service' },
  pg: { label: 'PostgreSQL', sub: 'database' },
  s3: { label: 'S3', sub: 'private bucket' }
};

const LAYOUT = {
  wide: {
    box: [960, 400], w: 150, h: 64,
    pos: { browser: [85, 200], nginx: [300, 200], django: [535, 120], go: [535, 290], s3: [810, 85], pg: [810, 255] }
  },
  tall: {
    box: [380, 600], w: 136, h: 60,
    pos: { browser: [190, 50], nginx: [190, 175], django: [100, 315], go: [282, 315], s3: [82, 490], pg: [272, 490] }
  }
};

const EDGES = [
  ['browser', 'nginx'],
  ['nginx', 'django'],
  ['nginx', 'go'],
  ['django', 's3'],
  ['django', 'pg'],
  ['go', 'pg']
];

const edgeKey = (a, b) => [a, b].sort().join('-');

function edgePath(a, b, vertical) {
  const [ax, ay] = a;
  const [bx, by] = b;
  if (vertical) {
    const my = (ay + by) / 2;
    return `M${ax} ${ay} C${ax} ${my}, ${bx} ${my}, ${bx} ${by}`;
  }
  const mx = (ax + bx) / 2;
  return `M${ax} ${ay} C${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`;
}

const ROUTES = [
  {
    id: 'me',
    method: 'GET',
    path: '/peace',
    hops: ['browser', 'nginx', 'django', 'pg', 'django', 'nginx', 'browser'],
    status: '200 OK',
    body: {
      name: profile.name,
      role: profile.role,
      location: profile.location,
      focus: ['APIs', 'data models', 'deployment'],
      currently: 'Backend Engineering Intern at Tavcorp',
      open_to: profile.openTo,
      coffee: true
    }
  },
  {
    id: 'stack',
    method: 'GET',
    path: '/peace/stack',
    hops: ['browser', 'nginx', 'go', 'pg', 'go', 'nginx', 'browser'],
    status: '200 OK',
    body: { ...stack, favourite: 'Django', relationship_status: 'we argue about serializers' }
  },
  {
    id: 'cv',
    method: 'GET',
    path: '/peace/cv',
    hops: ['browser', 'nginx', 'django', 's3', 'django', 'nginx', 'browser'],
    status: '302 Found',
    header: `location: ${profile.cv}`,
    body: { file: 'Peace-Udochi-CV.pdf', pages: 2 },
    action: { label: 'Open the CV', href: profile.cv, external: true }
  },
  {
    id: 'hire',
    method: 'POST',
    path: '/peace/hire',
    hops: ['browser', 'nginx', 'django', 'pg', 'django', 'nginx', 'browser'],
    status: '201 Created',
    body: { message: 'Request accepted. Fill in the form at /hire and it goes straight to my inbox.' },
    action: { label: 'Go to the form', href: '#hire' }
  }
];

function SystemDemo() {
  const vertical = useMedia('(max-width: 720px)');
  const L = vertical ? LAYOUT.tall : LAYOUT.wide;
  const pathRefs = useRef({});
  const packetRef = useRef(null);
  const rafRef = useRef(0);
  const [running, setRunning] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [hotEdge, setHotEdge] = useState(null);
  const [log, setLog] = useState([]);
  const [response, setResponse] = useState(null);

  const send = useCallback(
    (route) => {
      cancelAnimationFrame(rafRef.current);
      setRunning(route.id);
      setResponse(null);
      setLog((l) => [...l.slice(-3), { id: Date.now(), route }]);

      const finish = () => {
        setRunning(null);
        setActiveNode(null);
        setHotEdge(null);
        if (packetRef.current) packetRef.current.style.opacity = 0;
        setResponse(route);
      };

      if (reducedMotion()) return finish();

      const hops = route.hops;
      const HOP_MS = 360;
      let i = 0;
      let start = null;
      const packet = packetRef.current;
      packet.style.opacity = 1;
      setActiveNode(hops[0]);

      const step = (t) => {
        if (start === null) start = t;
        const a = hops[i];
        const b = hops[i + 1];
        const key = edgeKey(a, b);
        const path = pathRefs.current[key];
        const forward = EDGES.some(([x, y]) => x === a && y === b);
        const raw = Math.min(1, (t - start) / HOP_MS);
        const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
        const len = path.getTotalLength();
        const pt = path.getPointAtLength((forward ? eased : 1 - eased) * len);
        packet.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
        setHotEdge(key);
        if (raw >= 1) {
          i += 1;
          start = t;
          setActiveNode(b);
          if (i >= hops.length - 1) return finish();
        }
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    []
  );

  /* the one orchestrated page-load moment: a first request flows through */
  useEffect(() => {
    const t = setTimeout(() => send(ROUTES[0]), 700);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafRef.current);
    };
  }, [send, vertical]);

  const [vbW, vbH] = L.box;

  return (
    <div className="system">
      <div className="system-diagram">
        <div className="route-buttons" role="group" aria-label="Send a request">
          {ROUTES.map((r) => (
            <button
              key={r.id}
              className={`route-btn ${running === r.id ? 'is-running' : ''}`}
              onClick={() => send(r)}
              disabled={running !== null}
            >
              <span className={`verb verb-${r.method.toLowerCase()}`}>{r.method}</span>
              {r.path}
            </button>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${vbW} ${vbH}`}
          className="diagram"
          role="img"
          aria-label="Architecture diagram: your browser talks to Nginx, which routes to a Django REST API and a Go service. Django uses PostgreSQL and a private S3 bucket; Go uses PostgreSQL."
        >
          <defs>
            <linearGradient id="g-edge" x1="0" x2="1">
              <stop offset="0" stopColor="#7c3aed" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
            <radialGradient id="g-packet">
              <stop offset="0" stopColor="#fff" />
              <stop offset=".35" stopColor="#f0abfc" />
              <stop offset="1" stopColor="#ec4899" stopOpacity="0" />
            </radialGradient>
          </defs>

          {EDGES.map(([a, b]) => {
            const key = edgeKey(a, b);
            return (
              <path
                key={key}
                ref={(el) => (pathRefs.current[key] = el)}
                d={edgePath(L.pos[a], L.pos[b], vertical)}
                className={`edge ${hotEdge === key ? 'hot' : ''}`}
              />
            );
          })}

          {Object.entries(NODES).map(([id, n]) => {
            const [x, y] = L.pos[id];
            return (
              <g
                key={id}
                transform={`translate(${x - L.w / 2} ${y - L.h / 2})`}
                className={`node ${activeNode === id ? 'active' : ''} ${id === 'browser' ? 'is-you' : ''}`}
              >
                <rect width={L.w} height={L.h} rx="14" />
                <text x={L.w / 2} y={L.h / 2 - 3} className="node-label">{n.label}</text>
                <text x={L.w / 2} y={L.h / 2 + 15} className="node-sub">{n.sub}</text>
              </g>
            );
          })}

          <g ref={packetRef} className="packet" style={{ opacity: 0 }}>
            <circle r="18" fill="url(#g-packet)" />
            <circle r="4.5" fill="#fff" />
          </g>
        </svg>
      </div>

      <div className="console" aria-live="polite">
        <div className="console-bar">
          <span>responses</span>
          <span className="console-host">localhost:8000</span>
        </div>
        <div className="console-body">
          {log.map(({ id, route }) => (
            <p className="log-line" key={id}>
              <span className="prompt">$</span> curl -X {route.method} {route.path}
            </p>
          ))}
          {running && <p className="log-line waiting">…waiting for response</p>}
          {response && (
            <div className="response">
              <p className={`status ${response.status.startsWith('2') ? 'ok' : 'redirect'}`}>
                HTTP/1.1 {response.status}
              </p>
              {response.header && <p className="header-line">{response.header}</p>}
              <pre><Json value={response.body} /></pre>
              {response.action &&
                (response.action.external ? (
                  <a className="console-action" href={response.action.href} {...ext}>
                    {response.action.label}
                  </a>
                ) : (
                  <a className="console-action" href={response.action.href}>
                    {response.action.label}
                  </a>
                ))}
            </div>
          )}
          {!log.length && <p className="log-line muted">Pick a request above.</p>}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── sections ───────────────────────── */

function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  const links = [
    ['#projects', 'Projects'],
    ['#history', 'History'],
    ['#about', 'About'],
    ['#hire', 'Hire me']
  ];
  return (
    <header className="nav">
      <a href="#top" className="brand" onClick={() => setOpen(false)}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-mark">
          <circle cx="5" cy="12" r="3" /><circle cx="19" cy="5" r="3" /><circle cx="19" cy="19" r="3" />
          <path d="M8 12h3l5-6M11 12l5 6" />
        </svg>
        Peace Udochi
      </a>
      <button
        className="menu-btn"
        aria-expanded={open}
        aria-controls="menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        <span /><span />
      </button>
      <nav id="menu" className={`menu ${open ? 'open' : ''}`}>
        {links.map(([h, l]) => (
          <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>
        ))}
        <a className="menu-cv" href={profile.cv} {...ext}>CV</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero wrap">
      <div className="hero-intro">
        <h1 className="name">
          <span>Peace</span> <span>Udochi</span>
        </h1>
        <div className="hero-side">
          <p className="available"><i aria-hidden="true" /> Open to backend and full-stack roles</p>
          <p className="hero-lede">
            Backend engineer in Lagos. I build the part of the app you don’t see: the
            APIs, the data models and the servers they run on.
          </p>
          <div className="hero-actions">
            <a className="btn btn-fill" href="#projects">View projects</a>
            <a className="btn btn-line" href={profile.cv} download>Download CV</a>
          </div>
        </div>
      </div>
      <p className="system-caption">
        This is the kind of system I build. Send it a request and watch it travel.
      </p>
      <SystemDemo />
    </section>
  );
}

function SectionHead({ method = 'GET', path, title, children }) {
  return (
    <div className="section-head">
      <p className="route-label">
        <span className={`verb verb-${method.toLowerCase()}`}>{method}</span> {path}
      </p>
      <h2>{title}</h2>
      {children && <p className="section-lede">{children}</p>}
    </div>
  );
}

function ProjectPreview({ p }) {
  return (
    <div className="preview">
      {p.image ? (
        <a className="preview-shot" href={p.live || undefined} {...(p.live ? ext : {})}>
          <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" />
        </a>
      ) : (
        <div className="preview-type" aria-hidden="true">
          <span>{p.title}</span>
          <small>{p.stack.join('  /  ')}</small>
        </div>
      )}
      <div className="preview-text">
        <p className="preview-type-line">{p.type}, {p.year}</p>
        <h3>{p.title}</h3>
        <p className="preview-summary">{p.summary}</p>
        <div className="preview-cols">
          <div>
            <h4>The problem</h4>
            <p>{p.problem}</p>
            {p.learned && (
              <>
                <h4>What I learned</h4>
                <p>{p.learned}</p>
              </>
            )}
          </div>
          <div>
            <h4>What I built</h4>
            <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        </div>
        <ul className="chips" aria-label="Tech used">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <div className="preview-links">
          {p.live && <a className="btn btn-fill" href={p.live} {...ext}>Open live site</a>}
          {p.repo && <a className="btn btn-line" href={p.repo} {...ext}>Read the code</a>}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [sel, setSel] = useState(projects[0].id);
  const [view, setView] = useState('preview');
  const p = projects.find((x) => x.id === sel);
  const jsonBody = useMemo(
    () => ({
      id: p.id,
      title: p.title,
      type: p.type,
      year: p.year,
      stack: p.stack,
      problem: p.problem,
      built: p.built,
      links: { live: p.live || null, repo: p.repo || null }
    }),
    [p]
  );

  return (
    <section id="projects" className="block wrap">
      <SectionHead path="/projects" title="Things I’ve built">
        Pick a project. Read it as a page, or as the raw response.
      </SectionHead>

      <div className="explorer">
        <div className="endpoints" role="tablist" aria-label="Projects">
          {projects.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={x.id === sel}
              aria-controls="project-panel"
              className="endpoint"
              onClick={() => setSel(x.id)}
            >
              <span className="endpoint-path">/projects/<b>{x.id}</b></span>
              <span className="endpoint-title">{x.title}</span>
            </button>
          ))}
        </div>

        <div className="panel" id="project-panel" role="tabpanel">
          <div className="panel-bar">
            <p className="panel-req">
              <span className="verb verb-get">GET</span> /projects/{p.id}
              <span className="ok-pill">200 OK</span>
            </p>
            <div className="view-toggle" role="group" aria-label="View as">
              <button aria-pressed={view === 'preview'} onClick={() => setView('preview')}>Preview</button>
              <button aria-pressed={view === 'json'} onClick={() => setView('json')}>JSON</button>
            </div>
          </div>
          <div className="panel-body" key={p.id + view}>
            {view === 'preview' ? (
              <ProjectPreview p={p} />
            ) : (
              <pre className="json-view"><Json value={jsonBody} /></pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Graph({ row, i, mergeIdx, branchIdx, lastIdx }) {
  const engAlive = i <= branchIdx;
  const opsAlive = i >= mergeIdx;
  const aTop = engAlive && i > 0;
  const aBot = engAlive && i < branchIdx;
  const bTop = opsAlive && i > mergeIdx;
  const bBot = opsAlive && i < lastIdx;
  const curve = row.kind === 'merge' || row.kind === 'branch';
  return (
    <div className="graph" aria-hidden="true">
      {aTop && <span className="ln a top" />}
      {aBot && <span className="ln a bot" />}
      {bTop && <span className="ln b top" />}
      {bBot && <span className={`ln b bot ${row.kind === 'merge' ? 'from-curve' : ''}`} />}
      {curve && (
        <svg className="curve" viewBox="0 0 44 56">
          <path d="M12 24 C12 42, 30 34, 30 52" />
        </svg>
      )}
      <span className={`dot ${row.lane} ${row.kind || ''}`} />
    </div>
  );
}

function History() {
  const mergeIdx = history.findIndex((r) => r.kind === 'merge');
  const branchIdx = history.findIndex((r) => r.kind === 'branch');
  const lastIdx = history.length - 1;
  return (
    <section id="history" className="block wrap">
      <SectionHead path="/peace/history" title="How I got here">
        Five years of operations, sales and customer work, then engineering. They run in
        parallel for a while, and then they merge.
      </SectionHead>

      <div className="legend" aria-hidden="true">
        <span><i className="sw eng" /> engineering</span>
        <span><i className="sw ops" /> operations</span>
      </div>

      <ol className="gitlog">
        {history.map((r, i) => (
          <li key={r.msg} className={`commit lane-${r.lane} ${r.kind ? `is-${r.kind}` : ''}`}>
            <Graph row={r} i={i} mergeIdx={mergeIdx} branchIdx={branchIdx} lastIdx={lastIdx} />
            <div className="commit-main">
              <p className="commit-head">
                <span className="sha">{hash(r.msg)}</span>
                {r.ref && <span className={`ref ref-${r.lane}`}>{r.ref}</span>}
                <span className="commit-date">{r.date}</span>
              </p>
              <p className="commit-msg">
                {r.kind !== 'merge' && (
                  <span className="cc">{r.type}{r.scope && `(${r.scope})`}:</span>
                )}{' '}
                {r.msg}
              </p>
              {r.body.length > 0 && (
                <ul className="commit-body">{r.body.map((b) => <li key={b}>{b}</li>)}</ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="block wrap about">
      <SectionHead path="/peace/readme" title="The short version" />
      <div className="about-grid">
        <div className="about-text">
          <p className="about-lead">
            I like the problem more than the code. Give me something messy, I’ll ask a lot
            of questions, then I’ll build the thing.
          </p>
          <p>
            Before engineering, I ran operations, sales teams, call centers and deliveries.
            That’s where I learned how businesses actually work, and how to keep things
            moving when they aren’t working.
          </p>
          <p>
            Now I do it in code. I’m happiest on the backend: designing APIs, modelling
            data, writing business logic and getting it deployed properly. I also teach
            Django, which keeps my fundamentals honest.
          </p>
          <p className="about-aside">
            Django and I have a very healthy relationship. We argue sometimes, usually about
            serializers. But we’re good.
          </p>
        </div>
        <figure className="reqs">
          <figcaption>requirements.txt</figcaption>
          <pre>
            {Object.entries(stack).map(([group, items]) => (
              <React.Fragment key={group}>
                <span className="reqs-comment"># {group}</span>{'\n'}
                {items.map((it) => {
                  const [pkg, extra] = it.split(' (');
                  return (
                    <React.Fragment key={it}>
                      {pkg.toLowerCase().replace(/ /g, '-')}
                      {extra && <span className="reqs-comment">  # {extra.replace(')', '').toLowerCase()}</span>}
                      {'\n'}
                    </React.Fragment>
                  );
                })}
                {'\n'}
              </React.Fragment>
            ))}
          </pre>
        </figure>
      </div>
    </section>
  );
}

function Hire() {
  const [form, setForm] = useState({ name: '', company: '', role: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    setSent(false);
  };
  const body = {
    from: form.name || null,
    company: form.company || null,
    role: form.role || null,
    message: form.message || null
  };
  const submit = (e) => {
    e.preventDefault();
    const subject = `Hello from ${form.name || 'your portfolio'}${form.company ? ` (${form.company})` : ''}`;
    const text = `${form.message}\n\n${form.role ? `Role: ${form.role}\n` : ''}— ${form.name}${form.company ? `, ${form.company}` : ''}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    setSent(true);
  };

  return (
    <section id="hire" className="block wrap hire">
      <SectionHead method="POST" path="/peace/hire" title="Let’s build something">
        You’ve made it this far, so either you’re genuinely interested or you’re
        procrastinating. Either way, send a request.
      </SectionHead>

      <div className="hire-grid">
        <form className="hire-form" onSubmit={submit}>
          <label>
            <span>Your name</span>
            <input required value={form.name} onChange={set('name')} autoComplete="name" />
          </label>
          <div className="row2">
            <label>
              <span>Company <span className="opt">(optional)</span></span>
              <input value={form.company} onChange={set('company')} autoComplete="organization" />
            </label>
            <label>
              <span>Role <span className="opt">(optional)</span></span>
              <input value={form.role} onChange={set('role')} placeholder="Backend Engineer" />
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea required rows="5" value={form.message} onChange={set('message')} />
          </label>
          <button className="btn btn-fill" type="submit">Send request</button>
        </form>

        <div className="hire-preview" aria-live="polite">
          <p className="hire-req"><span className="verb verb-post">POST</span> /peace/hire</p>
          <pre><Json value={body} /></pre>
          {sent && (
            <div className="hire-res">
              <p className="status ok">HTTP/1.1 201 Created</p>
              <p>
                Your email app should open with this message. If it didn’t, write to{' '}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="direct">
        <a href={`mailto:${profile.email}`} className="direct-email">{profile.email}</a>
        <div className="direct-links">
          <a href={profile.linkedin} {...ext}>LinkedIn</a>
          <a href={profile.github} {...ext}>GitHub</a>
          <a href={profile.cv} download>CV (PDF)</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer wrap">
      <span>© {new Date().getFullYear()} Peace Udochi. Served from Lagos.</span>
      <span className="footer-conn">Connection: keep-alive</span>
      <a href="#top">Back to top</a>
    </footer>
  );
}

function App() {
  return (
    <>
      <a className="skip" href="#projects">Skip to projects</a>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <History />
        <About />
        <Hire />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
