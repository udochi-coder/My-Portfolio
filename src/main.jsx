import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './styles.css';
import { profile, projects, smallWork, experience, capabilities } from './data.js';

const ext = { target: '_blank', rel: 'noreferrer' };
const pad = (n) => String(n).padStart(2, '0');
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ───────────── hooks ───────────── */

function useLagosTime() {
  const fmt = useRef(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: profile.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  );
  const [now, setNow] = useState(() => fmt.current.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.current.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* Adds .is-in to [data-reveal] elements as they enter the viewport. */
function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]')];
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ───────────── header ───────────── */

function Header({ time }) {
  return (
    <header className="masthead">
      <a href="#top" className="mh-name">Peace Udochi</a>
      <span className="mh-role">Software Engineer, Lagos</span>
      <nav className="mh-nav" aria-label="Main">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <span className="mh-time" aria-label={`Local time in Lagos: ${time}`}>
        <i aria-hidden="true" />
        {time}
      </span>
    </header>
  );
}

/* ───────────── hero ───────────── */

/* The name: each letter thickens as the pointer comes near it. */
function Name() {
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = useCallback((e) => {
    if (!finePointer() || prefersReducedMotion()) return;
    cancelAnimationFrame(raf.current);
    const { clientX, clientY } = e;
    raf.current = requestAnimationFrame(() => {
      ref.current?.querySelectorAll('.ch').forEach((ch) => {
        const r = ch.getBoundingClientRect();
        const d = Math.hypot(clientX - (r.left + r.width / 2), clientY - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / 320);
        ch.style.setProperty('--w', String(Math.round(520 + t * 380)));
      });
    });
  }, []);

  const onLeave = useCallback(() => {
    cancelAnimationFrame(raf.current);
    ref.current?.querySelectorAll('.ch').forEach((ch) => ch.style.removeProperty('--w'));
  }, []);

  let i = 0;
  return (
    <h1 className="name" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <span className="sr-only">Peace Udochi</span>
      {['Peace', 'Udochi'].map((word) => (
        <span className="word" aria-hidden="true" key={word}>
          {[...word].map((c) => (
            <span className="ch" style={{ '--i': i++ }} key={c + i}>{c}</span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <Name />
      <div className="hero-grid">
        <p className="identity">{profile.identity}</p>
        <div className="intro">
          <p>
            I like the unglamorous parts of software: the data model, the edge case, the
            deploy that has to work on Monday morning.
          </p>
          <p className="intro-quiet">
            Before I wrote code, I ran operations teams in Lagos. I still build like someone
            who has to answer the customer’s call.
          </p>
        </div>
        <dl className="status">
          <div>
            <dt>Currently</dt>
            {profile.currently.map((c) => (
              <dd key={c.org}>{c.text} {c.org}</dd>
            ))}
          </div>
          <div>
            <dt>Status</dt>
            <dd><span className="dot" aria-hidden="true" />{profile.available}</dd>
          </div>
        </dl>
      </div>
      <a className="scroll-cue" href="#work">Selected work <span aria-hidden="true">↓</span></a>
    </section>
  );
}

/* ───────────── work ───────────── */

function WorkIndex({ onOpen }) {
  const preview = useRef(null);
  const [hover, setHover] = useState(null);

  const move = (e) => {
    if (!preview.current) return;
    preview.current.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 120}px, 0)`;
  };

  const total = projects.length + smallWork.length;
  return (
    <div className="index" onPointerMove={finePointer() ? move : undefined}>
      <div className="index-head">
        <h2 id="work-title">Selected work <sup>({pad(total)})</sup></h2>
        <p>Things I’ve designed, built and shipped. Open any project for the full story.</p>
      </div>
      <ol className="index-list">
        {projects.map((p, n) => (
          <li key={p.id}>
            <button
              className="row"
              onClick={() => onOpen(p.id)}
              onPointerEnter={() => setHover(p)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(null)}
            >
              <span className="r-n">{pad(n + 1)}</span>
              <span className="r-t">{p.title}</span>
              <span className="r-k">{p.kind}</span>
              <span className="r-s">{p.stack.slice(0, 3).join(', ')}</span>
              <span className="r-y">{p.year}</span>
            </button>
          </li>
        ))}
        {smallWork.map((w, n) => {
          const inner = (
            <>
              <span className="r-n">{pad(projects.length + n + 1)}</span>
              <span className="r-t">{w.title}</span>
              <span className="r-k">{w.kind}</span>
              <span className="r-s">{w.live ? 'Live site ↗' : 'Code project'}</span>
              <span className="r-y">{w.year}</span>
            </>
          );
          return (
            <li key={w.title}>
              {w.live ? (
                <a className="row" href={w.live} {...ext}>{inner}</a>
              ) : (
                <div className="row is-static">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
      <div className={`float-preview ${hover ? 'on' : ''} ${hover?.shape || ''}`} ref={preview} aria-hidden="true">
        {projects.map((p) => (
          <img key={p.id} src={p.cover} alt="" className={hover?.id === p.id ? 'show' : ''} />
        ))}
      </div>
    </div>
  );
}

const LAYOUT = ['l7', 'l5', 'l12', 'l5', 'l7'];

function Gallery({ onOpen }) {
  return (
    <div className="gallery">
      {projects.map((p, n) => (
        <figure className={`piece ${LAYOUT[n % LAYOUT.length]} ${p.shape}`} key={p.id} data-reveal>
          <button className="plate" onClick={() => onOpen(p.id)} aria-label={`Open ${p.title} project details`}>
            <span className="screen">
              <img
                src={p.cover}
                alt={`${p.title}: ${p.summary}`}
                loading={n < 2 ? 'eager' : 'lazy'}
                decoding="async"
                width={p.shape === 'wide' ? 1400 : 900}
                height={p.shape === 'wide' ? 673 : 1200}
              />
            </span>
            <span className="plate-cta" aria-hidden="true">View project</span>
          </button>
          <figcaption>
            <span className="c-n">{pad(n + 1)}</span>
            <span className="c-t">{p.title}</span>
            <span className="c-k">{p.kind}, {p.year}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function ProjectView({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) {
      d.showModal();
      requestAnimationFrame(() => d.classList.add('open'));
      d.scrollTop = 0;
    }
    if (!project && d.open) {
      d.classList.remove('open');
      const done = () => d.close();
      prefersReducedMotion() ? done() : setTimeout(done, 380);
    }
  }, [project]);

  const p = project;
  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="sheet-title"
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {p && (
        <article className="sheet-inner">
          <div className="sheet-bar">
            <span className="sheet-k">{p.kind}, {p.year}</span>
            <button className="close" onClick={onClose}>Close <span aria-hidden="true">✕</span></button>
          </div>
          <h2 id="sheet-title" className="sheet-title">{p.title}</h2>
          <p className="sheet-summary">{p.summary}</p>

          <div className="sheet-links">
            {p.live && <a className="pill dark" href={p.live} {...ext}>Visit live site ↗</a>}
            {p.repo && <a className="pill" href={p.repo} {...ext}>Source code ↗</a>}
          </div>

          <div className={`sheet-media ${p.shape}`}>
            <img src={p.full || p.cover} alt={`Screenshot of ${p.title}`} loading="lazy" />
          </div>

          <div className="sheet-cols">
            <section>
              <h3>The problem</h3>
              <p>{p.problem}</p>
              {p.learned && (
                <>
                  <h3>What I learned</h3>
                  <p>{p.learned}</p>
                </>
              )}
            </section>
            <section>
              <h3>What I built</h3>
              <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
            </section>
            <section>
              <h3>Stack</h3>
              <ul className="stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            </section>
          </div>
        </article>
      )}
    </dialog>
  );
}

function Work() {
  const [openId, setOpenId] = useState(null);

  const open = useCallback((id) => {
    setOpenId(id);
    history.replaceState(null, '', `#${id}`);
  }, []);
  const close = useCallback(() => {
    setOpenId(null);
    history.replaceState(null, '', '#work');
  }, []);

  /* support shareable links like /#fooddash */
  useEffect(() => {
    const id = location.hash.slice(1);
    if (projects.some((p) => p.id === id)) setOpenId(id);
  }, []);

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <WorkIndex onOpen={open} />
      <Gallery onOpen={open} />
      <ProjectView project={projects.find((p) => p.id === openId) || null} onClose={close} />
    </section>
  );
}

/* ───────────── about ───────────── */

function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <h2 id="about-title" className="label">About</h2>
      <p className="statement" data-reveal>
        I’m a software engineer with one foot in the backend and one in the interface. I
        design the API, model the data, build the screens on top, and get the whole thing
        deployed. I also teach Django, which keeps my fundamentals honest.
      </p>

      <div className="about-grid">
        <div className="story" data-reveal>
          <p>
            My route into tech wasn’t a straight line. I started at a front desk, then worked
            through customer service, logistics, sales, a call center and, eventually,
            running operations for a health brand.
          </p>
          <p>
            That’s where I learned how businesses actually run, and what happens when the
            software behind them doesn’t. It’s why I ask a lot of questions before I build
            anything.
          </p>
          <p className="aside">
            Django and I have a very healthy relationship. We argue sometimes, usually about
            serializers. But we’re good.
          </p>
        </div>

        <div className="caps">
          {capabilities.map((c) => (
            <div className="cap" key={c.title} data-reveal>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <ul>{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>

      <div className="xp" data-reveal>
        <h3 className="label">Experience</h3>
        <ol>
          {experience.map((x) => (
            <li key={x.role + x.org}>
              <span className="x-r">{x.role}</span>
              <span className="x-o">{x.org}</span>
              <span className="x-y">{x.years}</span>
            </li>
          ))}
        </ol>
        <a className="text-link" href={profile.cv} download>Download full CV (PDF)</a>
      </div>
    </section>
  );
}

/* ───────────── contact & footer ───────────── */

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the address stays visible and clickable */
    }
  };
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="label">Contact</h2>
      <p className="contact-line" data-reveal>
        Have a role, a product or a messy problem? I’d like to hear about it.
      </p>
      <a className="email" href={`mailto:${profile.email}`} data-reveal>{profile.email}</a>
      <div className="contact-row">
        <button className="text-link" onClick={copy} aria-live="polite">
          {copied ? 'Email copied' : 'Copy email'}
        </button>
        <a className="text-link" href={profile.linkedin} {...ext}>LinkedIn ↗</a>
        <a className="text-link" href={profile.github} {...ext}>GitHub ↗</a>
        <a className="text-link" href={profile.cv} download>CV (PDF)</a>
      </div>
    </section>
  );
}

function Footer({ time }) {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Peace Udochi</span>
      <span>Lagos, {time}</span>
      <span>Designed and built by me</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}

function App() {
  const time = useLagosTime();
  useReveal();
  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <Header time={time} />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer time={time} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
