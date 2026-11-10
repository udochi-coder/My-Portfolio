import React, { useEffect, useState } from 'react';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/geist';
import './styles.css';
import {
  site,
  profile,
  projects,
  moreWork,
  experience,
  earlierCareer,
  education,
  tools,
  alsoUse
} from './data.js';

const ext = { target: '_blank', rel: 'noopener noreferrer' };
const pad = (n) => String(n).padStart(2, '0');
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────────── icons (simple line icons, decorative) ───────────── */
const I = {
  home: <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />,
  work: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  exp: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" /></>,
  tools: <path d="M14.5 4a4.5 4.5 0 0 0-4.2 6.1L4 16.4V20h3.6l6.3-6.3A4.5 4.5 0 0 0 20 9.5l-2.7 2.7-3-3L17 6.5A4.5 4.5 0 0 0 14.5 4z" />,
  me: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>,
  arrow: <path d="M7 17L17 7M9 7h8v8" />
};
const Icon = ({ name, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {I[name]}
  </svg>
);

/* ───────────── hooks ───────────── */

function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]')];
    if (reduced() || !('IntersectionObserver' in window)) {
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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const SECTIONS = [
  ['home', 'Home', 'home'],
  ['projects', 'Projects', 'work'],
  ['experience', 'Experience', 'exp'],
  ['tools', 'Tools', 'tools'],
  ['about', 'About', 'me'],
  ['contact', 'Contact', 'mail']
];

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ───────────── pieces ───────────── */

function Heading({ id, top, bottom, children }) {
  return (
    <header className="sec-head" data-reveal>
      <h2 id={id} className="display">
        <span>{top}</span>
        <span className="dim">{bottom}</span>
      </h2>
      {children && <p className="sec-lede">{children}</p>}
    </header>
  );
}

function Dock() {
  const active = useActiveSection();
  return (
    <nav className="dock" aria-label="Sections">
      <ul>
        {SECTIONS.map(([id, label, icon]) => (
          <li key={id}>
            <a href={`#${id}`} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>
              <Icon name={icon} />
              <span className="tip">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Opens a new message in Gmail (the Gmail app on most phones, Gmail in the browser on desktop).
const gmailCompose = (to) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent('Hello from your portfolio')}`;

function ProfileCard() {
  return (
    <aside className="card" aria-label="About Peace Udochi">
      <div className="card-photo">
        <picture>
          <source type="image/webp" srcSet={`${profile.photo.srcSmall} 640w, ${profile.photo.src} 1000w`} sizes="(max-width: 1000px) 88vw, 340px" />
          <img
            src={profile.photo.jpg}
            alt={profile.photo.alt}
            width="1000"
            height="1250"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <span className="card-status"><i aria-hidden="true" /><span className="st-full">{profile.available}</span><span className="st-short" aria-hidden="true">Open to roles</span></span>
      </div>
      <h1 className="card-name">{profile.name}</h1>
      <p className="card-title">{profile.title}<br /><span>{profile.specialty}</span></p>
      <p className="card-loc">Based in {profile.location}</p>

      <a className="card-email" href={gmailCompose(profile.email)} {...ext} aria-label={`Email ${profile.name} in Gmail: ${profile.email}`}>
        <span className="card-email-addr">{profile.email}</span>
        <span className="card-email-go" aria-hidden="true"><Icon name="mail" size={16} /></span>
      </a>

      <div className="card-links">
        <a href={profile.github} {...ext}>GitHub <Icon name="arrow" size={14} /></a>
        <a href={profile.linkedin} {...ext}>LinkedIn <Icon name="arrow" size={14} /></a>
        <a href={profile.cv} download>CV <Icon name="arrow" size={14} /></a>
      </div>

      <a className="btn btn-accent card-cta" href="#contact">Let’s work together</a>
    </aside>
  );
}

function Hero() {
  const live = projects.filter((p) => p.live).length + moreWork.filter((w) => w.live).length;
  const facts = [
    [pad(projects.length + moreWork.length), 'projects built'],
    [pad(live), 'live online'],
    ['01', 'client platform in production']
  ];
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <h2 id="hero-title" className="display hero-display">
        <span className="line"><span>Software</span></span>
        <span className="line dim"><span>Engineer</span></span>
      </h2>
      <p className="hero-sub">{profile.specialty}</p>
      <div className="hero-copy">
        <p className="lead">{profile.intro}</p>
        <p>{profile.introMore}</p>
      </div>
      <dl className="facts">
        {facts.map(([n, label]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{n}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <Heading id="projects-title" top="Selected" bottom="Projects">
        Things I’ve designed, built and shipped, from client work in production to products I’m
        still growing.
      </Heading>

      <div className="projects">
        {projects.map((p, n) => (
          <article className={`project ${p.shape}`} key={p.id} id={p.id} aria-labelledby={`${p.id}-t`} data-reveal>
            <a className="project-media" href={p.live || undefined} {...(p.live ? ext : {})} tabIndex={-1} aria-hidden="true">
              {p.cover ? (
                <span className="screen">
                  <img src={p.cover} alt="" loading={n < 1 ? 'eager' : 'lazy'} decoding="async" width={p.shape === 'wide' ? 1400 : 900} height={p.shape === 'wide' ? 673 : 1200} />
                </span>
              ) : (
                <span className="tile-art">
                  <span className="tile-name">{p.title}</span>
                  <span className="tile-stack">{p.stack.join(' · ')}</span>
                </span>
              )}
              <span className="media-arrow"><Icon name="arrow" size={22} /></span>
            </a>
            <div className="project-body">
              <p className="project-meta"><span>{pad(n + 1)}</span>{p.kind} · {p.year}</p>
              <h3 id={`${p.id}-t`} className="project-title">{p.title}</h3>
              <p className="project-summary">{p.summary}</p>
              {p.shot && <p className="sr-only">Screenshot: {p.shot}</p>}
              <ul className="chips" aria-label={`${p.title} technologies`}>
                {p.stack.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <div className="project-links">
                {p.live && <a className="link" href={p.live} {...ext}>Live site <Icon name="arrow" size={15} /></a>}
                {p.repo && <a className="link" href={p.repo} {...ext}>GitHub <Icon name="arrow" size={15} /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="more" data-reveal>
        <h3 className="sub">More builds</h3>
        <ul>
          {moreWork.map((w) => (
            <li key={w.title}>
              <div>
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </div>
              <p className="more-stack">{w.stack.join(', ')}</p>
              {w.live ? <a className="link" href={w.live} {...ext}>Live <Icon name="arrow" size={15} /></a> : <span className="more-na">API project</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <Heading id="experience-title" top="Work" bottom="Experience" />
      <ol className="timeline">
        {experience.map((x) => (
          <li key={x.role + x.org} data-reveal>
            <div className="tl-head">
              <h3>{x.role}</h3>
              <span className="tl-years">{x.years}</span>
            </div>
            <p className="tl-org">{x.org} · {x.meta}</p>
            <p className="tl-text">{x.text}</p>
          </li>
        ))}
        <li className="tl-earlier" data-reveal>
          <div className="tl-head">
            <h3>Operations, sales & customer roles</h3>
            <span className="tl-years">{earlierCareer.years}</span>
          </div>
          <p className="tl-text">{earlierCareer.text}</p>
        </li>
      </ol>

      <div className="edu" data-reveal>
        <h3 className="sub">Education</h3>
        <ul>
          {education.map((e) => (
            <li key={e.school}>
              <span className="edu-award">{e.award}</span>
              <span className="edu-school">{e.school}</span>
              <span className="edu-years">{e.years}</span>
            </li>
          ))}
        </ul>
        <a className="link" href={profile.cv} download>Download full CV <Icon name="arrow" size={15} /></a>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools" className="section" aria-labelledby="tools-title">
      <Heading id="tools-title" top="Tools &" bottom="Technologies">
        The languages, frameworks and services I reach for most.
      </Heading>
      <ul className="tools">
        {tools.map((t) => (
          <li key={t.name} className="tool" data-reveal>
            <span className="tool-mark" aria-hidden="true">{t.mark}</span>
            <span className="tool-text">
              <strong>{t.name}</strong>
              <span>{t.use}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="also" data-reveal>
        <h3 className="sub">Also comfortable with</h3>
        <ul className="chips">{alsoUse.map((a) => <li key={a}>{a}</li>)}</ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <Heading id="about-title" top="About" bottom="Me" />
      <div className="about" data-reveal>
        <p className="lead">
          I enjoy building useful things, and I enjoy them more when they keep working on a busy
          Monday.
        </p>
        <p>
          Most of my work sits on the backend: designing REST APIs, modelling data in PostgreSQL,
          writing the business logic in Go or Python, and getting it deployed properly. When a
          project needs an interface, I build that too, usually in React.
        </p>
        <p>
          I came to software from operations. I’ve run customer fulfilment, call centers,
          logistics and sales teams, which means I’ve been on the receiving end of software that
          didn’t quite work. I ask a lot of questions before I build, and I like simple, reliable
          systems more than clever ones.
        </p>
        <p>
          These days I’m a backend engineering intern at Tavcorp, and I teach Django at EdPassare
          Tech School, which keeps my fundamentals honest.
        </p>
        <p className="aside">
          Django and I have a very healthy relationship. We argue sometimes, usually about
          serializers. But we’re good.
        </p>
      </div>
    </section>
  );
}

function ContactForm() {
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // bot trap

    // No key configured yet: fall back to a pre-filled Gmail message.
    if (!site.web3formsKey) {
      const url = `${gmailCompose(profile.email)}&body=${encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`)}`;
      window.open(url, '_blank', 'noopener');
      return;
    }

    setState('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `Portfolio message from ${data.name}`,
          from_name: 'Peace Udochi portfolio',
          name: data.name,
          email: data.email,
          message: data.message
        })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || 'send failed');
      setState('sent');
      form.reset();
    } catch {
      setState('error');
    }
  };

  return (
    <form className="form" onSubmit={submit} data-reveal>
      <div className="field">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input id="f-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="f-msg">Message</label>
        <textarea id="f-msg" name="message" rows="5" required placeholder="A role, a project, or a problem you’d like help with" />
      </div>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button className="btn btn-accent" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {state === 'sent' && 'Message sent. I’ll reply by email soon.'}
        {state === 'error' && (
          <>
            The message didn’t go through. Email me directly at{' '}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </>
        )}
      </p>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <Heading id="contact-title" top="Let’s work" bottom="Together" />
      <div className="contact">
        <div className="contact-side" data-reveal>
          <p className="lead">
            If you’re hiring for a backend or full-stack role, or you have a product that needs a
            careful engineer, I’d like to hear about it.
          </p>
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd><a href={profile.linkedin} {...ext}>linkedin.com/in/udochi-peace</a></dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd><a href={profile.github} {...ext}>github.com/udochi-coder</a></dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{profile.location}, open to remote</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
      <p className="closing" data-reveal>
        Good software is mostly careful decisions, made one at a time. Let’s make some.
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span suppressHydrationWarning>© {new Date().getFullYear()} {profile.name}</span>
      <span>{profile.title} · {profile.specialty}</span>
      <a href="#home">Back to top ↑</a>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <a className="skip" href="#projects">Skip to projects</a>
      <div className="layout">
        <ProfileCard />
        <main className="main">
          <Hero />
          <Projects />
          <Experience />
          <Tools />
          <About />
          <Contact />
          <Footer />
        </main>
      </div>
      <Dock />
    </>
  );
}
