import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import {
  profile,
  projects,
  otherWork,
  experience,
  earlierCareer,
  education,
  stack
} from './data.js';

const NAV = [
  ['work', 'Work'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['stack', 'Stack'],
  ['contact', 'Contact']
];

/* Fades sections in as they scroll into view (skipped for reduced motion). */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Highlights the nav link of the section currently on screen. */
function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const Arrow = () => <span aria-hidden="true">↗</span>;

function ExternalLink({ href, children, className = '' }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children} <Arrow />
    </a>
  );
}

/* ───────────────────────── NAV ───────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV.map(([id]) => id));

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="nav">
      <a className="brand" href="#top" onClick={() => setOpen(false)}>
        <span className="brand-dot" aria-hidden="true" /> {profile.name}
      </a>
      <button
        className="menu-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen(!open)}
      >
        {open ? '✕' : '☰'}
      </button>
      <nav id="nav-links" className={`nav-links ${open ? 'open' : ''}`}>
        {NAV.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a className="nav-cv" href={profile.cv} target="_blank" rel="noreferrer">
          CV <Arrow />
        </a>
      </nav>
    </header>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  return (
    <section id="top" className="hero pad">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="status">
            <span className="pulse" aria-hidden="true" /> {profile.available}
          </p>
          <p className="hello">Hi, I’m Peace. <span aria-hidden="true">👋</span></p>
          <h1>
            I write code,
            <br />
            <span className="grad">break code,</span>
            <br />
            fix code.
          </h1>
          <p className="hero-sub">
            {profile.role} in {profile.location}. I build APIs and the systems behind
            them with <strong>Python, Django and Go</strong>, and ship them to{' '}
            <strong>AWS</strong>. Most recently: a live loan platform for a Lagos
            finance firm.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#work">See my work ↓</a>
            <a className="btn ghost" href={profile.cv} download>Download CV</a>
          </div>
          <ul className="hero-links" aria-label="Profiles">
            <li><ExternalLink href={profile.github}>GitHub</ExternalLink></li>
            <li><ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink></li>
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          </ul>
        </div>

        <div className="code-card" aria-hidden="true">
          <div className="window-bar"><i /><i /><i /><span>peace.py</span></div>
          <pre className="code-body">
<span className="mute">01</span> <span className="pink">class</span> <span className="purple">Peace</span>(Engineer):{'\n'}
<span className="mute">02</span>     focus = [<span className="green">"backend"</span>, <span className="green">"APIs"</span>]{'\n'}
<span className="mute">03</span>     stack = [<span className="green">"Django"</span>, <span className="green">"Go"</span>, <span className="green">"AWS"</span>]{'\n'}
<span className="mute">04</span>     coffee = <span className="purple">True</span>{'\n'}
<span className="mute">05</span>{'\n'}
<span className="mute">06</span>     <span className="pink">def</span> <span className="purple">solve</span>(self, problem):{'\n'}
<span className="mute">07</span>         <span className="pink">return</span> self.build(problem){'\n'}
<span className="mute">08</span>  <span className="blink">▌</span>
          </pre>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── WORK ───────────────────────── */
function ProjectCard({ p, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `case-${p.id}`;
  return (
    <article className={`project reveal ${p.featured ? 'featured' : ''}`}>
      <a className="shot" href={p.live} target="_blank" rel="noreferrer" tabIndex={-1}>
        <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" />
      </a>
      <div className="project-body">
        <div className="project-meta">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{p.kicker}</span>
          <span>{p.year}</span>
        </div>
        <h3>{p.title}</h3>
        <p className="summary">{p.summary}</p>
        <ul className="tags" aria-label="Tech used">
          {p.stack.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <div className="project-actions">
          <button
            className="text-btn"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(!open)}
          >
            {open ? 'Hide details ↑' : 'How I built it →'}
          </button>
          <div className="project-links">
            {p.repo && <ExternalLink href={p.repo}>Code</ExternalLink>}
            {p.live && <ExternalLink href={p.live} className="live">Live site</ExternalLink>}
          </div>
        </div>

        <div id={panelId} className="case" hidden={!open}>
          <h4>The problem</h4>
          <p>{p.problem}</p>
          <h4>What I built</h4>
          <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
          {p.learned && (
            <>
              <h4>What I learned</h4>
              <p>{p.learned}</p>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="section pad">
      <div className="section-head reveal">
        <p className="label">01 / Selected work</p>
        <h2>Things I’ve <span className="grad">shipped.</span></h2>
        <p className="lede">
          What I built, why, and how. Open any project for the details.
        </p>
      </div>
      <div className="projects">
        {projects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
      </div>

      <h3 className="sub-head reveal">Smaller builds</h3>
      <div className="mini-grid">
        {otherWork.map((w) => (
          <article className="mini reveal" key={w.title}>
            <span className="mini-tag">{w.tag}</span>
            <h4>{w.title}</h4>
            <p>{w.text}</p>
            <div className="project-links">
              {w.repo && <ExternalLink href={w.repo}>Code</ExternalLink>}
              {w.live && <ExternalLink href={w.live}>Live</ExternalLink>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── ABOUT ───────────────────────── */
function About() {
  return (
    <section id="about" className="section pad band">
      <div className="two-col">
        <div className="reveal">
          <p className="label">02 / About</p>
          <h2>Not a straight line. <span className="grad">Still going forward.</span></h2>
        </div>
        <div className="prose reveal">
          <p className="lead">
            I’m a software engineer who enjoys turning messy problems into things that
            actually work.
          </p>
          <p>
            Before code, I spent years in customer service, sales, logistics and
            operations, eventually running operations at a health brand. That taught me
            how businesses actually run, how to work under pressure, and how to ask the
            right questions before building anything.
          </p>
          <p>
            Now I do the same thing with code. I’m happiest on the backend: designing
            APIs, modelling data, writing business logic and working out how systems
            should talk to each other. I also teach Django, which keeps my fundamentals
            honest.
          </p>
          <p className="aside">
            Django and I have a very healthy relationship. We argue sometimes, usually
            about serializers. But we’re good.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── EXPERIENCE ───────────────────────── */
function Experience() {
  return (
    <section id="experience" className="section pad">
      <div className="section-head reveal">
        <p className="label">03 / Experience</p>
        <h2>Where I’ve <span className="grad">worked.</span></h2>
      </div>

      <ol className="timeline">
        {experience.map((x) => (
          <li className="t-item reveal" key={x.role + x.org}>
            <span className="t-dot" aria-hidden="true" />
            <div className="t-date">{x.date}</div>
            <div>
              <h3>{x.role} <span className="t-org">· {x.org}</span></h3>
              <p className="t-meta">{x.meta}</p>
              <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="split reveal">
        <div className="panel">
          <h3>Before tech</h3>
          <p className="panel-note">Operations, sales and customer roles, 2020 – 2026</p>
          <ul className="rows">
            {earlierCareer.map(([d, r, o]) => (
              <li key={r + o}><span>{d}</span><strong>{r}</strong><em>{o}</em></li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Education</h3>
          <p className="panel-note">Plus a Certificate in Business from Henley Business School (2026)</p>
          <ul className="rows">
            {education.map(([o, r, d]) => (
              <li key={o}><span>{d}</span><strong>{r}</strong><em>{o}</em></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── STACK ───────────────────────── */
function Stack() {
  return (
    <section id="stack" className="section pad band">
      <div className="section-head reveal">
        <p className="label">04 / Stack</p>
        <h2>Things I’ve convinced computers <span className="grad">to cooperate with.</span></h2>
      </div>
      <div className="stack-grid">
        {stack.map((g) => (
          <div className="stack-group reveal" key={g.group}>
            <h3>{g.group}</h3>
            <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* the email is visible on the page, so nothing else to do */
    }
  };

  return (
    <section id="contact" className="section pad contact">
      <p className="label reveal">05 / Contact</p>
      <h2 className="reveal">Okay, enough about <span className="grad">me.</span></h2>
      <p className="contact-copy reveal">
        You’ve made it this far, so either you’re genuinely interested or you’re
        procrastinating. Either way, let’s talk. I’m open to backend and full-stack
        roles, remote or in Lagos.
      </p>
      <div className="email-row reveal">
        <a className="email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <button className="btn ghost small" onClick={copy} aria-live="polite">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <div className="contact-links reveal">
        <ExternalLink href={profile.linkedin} className="btn ghost">LinkedIn</ExternalLink>
        <ExternalLink href={profile.github} className="btn ghost">GitHub</ExternalLink>
        <a className="btn primary" href={profile.cv} download>Download CV ↓</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer pad">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>Built with React, curiosity and too much debugging.</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}

function App() {
  useReveal();
  return (
    <>
      <a className="skip" href="#work">Skip to projects</a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
