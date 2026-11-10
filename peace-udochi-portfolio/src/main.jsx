import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
 
const icons = {
  arrow: '↗',
  spark: '✦',
  check: '✓',
  github: 'GH',
  linkedin: 'in'
};
 
const skills = ['Python', 'Django', 'FastAPI', 'Flask', 'Go', 'JavaScript', 'TypeScript', 'React', 'Redux', 'PostgreSQL', 'MySQL', 'MongoDB', 'REST APIs', 'Docker', 'AWS'];
 
const projects = [
  {
    id: 'manharrtan',
    number: '01',
    emoji: '🏦',
    title: 'Manharrtan Capital',
    kicker: 'Production finance platform',
    description: 'A live website and loan application platform for a Lagos finance firm. A Next.js frontend talks to a Django REST API, with role-based admin access, encrypted ID storage and a deployment on AWS.',
    stack: ['Next.js', 'Django', 'Docker', 'AWS'],
    image: '/images/manharrtan.jpeg',
    link: 'https://manharrtancapital.com',
    label: 'Visit Manharrtan',
    note: 'Manharrtan Capital is a live client project. I took the system from a working backend to production: containerised it with Docker, set up AWS (EC2, RDS PostgreSQL, S3 and IAM), configured Nginx and HTTPS, locked applicants’ ID documents in a private bucket, set up role-based admin access, and moved deployment to GitHub so updates ship with one command.'
  },
  {
    id: 'fooddash',
    number: '02',
    emoji: '🍔',
    title: 'FoodDash',
    kicker: 'Full-stack food ordering & delivery',
    description: 'Because apparently ordering food wasn’t complicated enough. FoodDash combines a Go backend with a React frontend for authentication, restaurant management, orders and payments.',
    stack: ['Go', 'React', 'REST APIs', 'Authentication'],
    image: '/images/fooddash.jpeg',
    link: 'https://food-dash-app-nine.vercel.app/',
    label: 'Explore FoodDash'
  },
  {
    id: 'result',
    number: '03',
    emoji: '🎓',
    title: 'Result Portal',
    kicker: 'Academic results platform',
    description: 'Students should be able to see their results without suffering. This full-stack Django project handles backend logic and data models for academic results.',
    stack: ['Django', 'REST APIs', 'PostgreSQL', 'Data Modelling'],
    image: '/images/result-portal.jpeg',
    link: 'https://northstar-uni.vercel.app/',
    label: 'View Result Portal'
  },
  {
    id: 'budget',
    number: '04',
    emoji: '💰',
    title: 'Budget Tracker',
    kicker: 'Personal finance frontend',
    description: 'Where did my money go? A React and Firebase application for managing income, expenses and categories with a clean, responsive experience.',
    stack: ['React', 'Firebase', 'Frontend'],
    image: null,
    link: 'https://budgettracker-632f3.web.app',
    label: 'Open Budget Tracker'
  },
  {
    id: 'oya',
    number: '05',
    emoji: '🛠️',
    title: 'OyaWork',
    kicker: 'Worker ↔ employer platform',
    description: 'A problem I actually care about solving: connecting menial job workers directly with employers. The Django REST API supports onboarding, profiles, job posting, requests and matching.',
    stack: ['Django', 'DRF', 'APIs', 'Matching'],
    image: '/images/oyawork.jpeg',
    link: 'https://oyawork-seven.vercel.app/',
    label: 'Open OyaWork',
  }
];
 
const timeline = [
  ['2020', 'Receptionist', 'Learning people skills.'],
  ['2023', 'Customer Service → Logistics → Call Center', 'Learning how businesses actually operate.'],
  ['2024', 'Sales → Customer Fulfilment → Operations', 'Learning how to solve problems under pressure.'],
  ['2025', 'Data + Software Engineering', 'Okay… let’s build things.'],
  ['2025–26', 'Semicolon Africa', 'Officially deep in the code now.']
];
 
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [codeLove, setCodeLove] = useState(100);
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState(false);
  const [terminalLine, setTerminalLine] = useState(0);
 
  const sliderMessage = useMemo(() => {
    if (codeLove <= 20) return 'It’s a hobby.';
    if (codeLove <= 50) return 'Okay, I’m getting serious.';
    if (codeLove <= 80) return 'I have opened Stack Overflow.';
    return 'I have been debugging for 6 hours and I refuse to lose.';
  }, [codeLove]);
 
  useEffect(() => {
    const id = setInterval(() => setTerminalLine((v) => (v + 1) % 4), 1800);
    return () => clearInterval(id);
  }, []);
 
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };
 
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ashiegbuudochi@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:ashiegbuudochi@gmail.com';
    }
  };
 
  return (
    <div className="site-shell">
      <div className="noise" />
      <nav className="nav">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Back to top">
          <span className="brand-dot" /> Peace Udochi
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>☰</button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('projects')}>Projects</button>
          <button onClick={() => scrollTo('stack')}>Stack</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
          <a className="nav-resume" href="/Peace-Udochi-CV.pdf" target="_blank" rel="noreferrer">CV {icons.arrow}</a>
        </div>
      </nav>
 
      <main>
        <section id="home" className="hero section-pad">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="hero-grid" />
          <div className="hero-content reveal">
            <div className="eyebrow"><span className="pulse" /> Open to software engineering opportunities</div>
            <p className="hello">Hi, I’m Peace. <span>👋</span></p>
            <h1>I build backend<br /><span className="gradient-text">systems that</span><br />solve problems.</h1>
            <p className="hero-joke">I write code, break code, fix code… and occasionally wonder why I wrote the code in the first place.</p>
            <div className="hero-role">Python Developer <span>·</span> Backend Engineer <span>·</span> Full-Stack Builder</div>
            <p className="hero-specialty">Python · Django · FastAPI · REST APIs · PostgreSQL · React</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollTo('projects')}>Explore my projects <span>{icons.arrow}</span></button>
              <button className="ghost-btn" onClick={() => scrollTo('about')}>Get to know me ↓</button>
            </div>
          </div>
          <div className="hero-code-card reveal delay-1">
            <div className="window-bar"><i /><i /><i /><span>peace@portfolio ~</span></div>
            <div className="code-body">
              <span className="code-muted">01</span> <span className="pink">const</span> peace = {'{'}<br />
              <span className="code-muted">02</span> &nbsp;name: <span className="green">"Peace Udochi"</span>,<br />
              <span className="code-muted">03</span> &nbsp;role: <span className="green">"Backend Engineer"</span>,<br />
              <span className="code-muted">04</span> &nbsp;focus: [<span className="green">"backend"</span>, <span className="green">"APIs"</span>],<br />
              <span className="code-muted">05</span> &nbsp;coffee: <span className="purple">true</span><br />
              <span className="code-muted">06</span> {'}'};<br />
              <span className="code-muted">07</span> <span className="pink">console</span>.log(peace); <span className="cursor-blink">▌</span>
            </div>
          </div>
        </section>
 
        <div className="marquee-wrap" aria-label="Technologies">
          <div className="marquee">
            {[...Array(2)].flatMap((_, i) => skills.map((s) => <span key={`${s}-${i}`}>{s.toUpperCase()} <b>✦</b></span>))}
            <span>COFFEE <b>✦</b></span><span>DEBUGGING <b>✦</b></span><span>DJANGO <b>✦</b></span>
          </div>
        </div>
 
        <section id="about" className="section section-pad">
          <div className="section-label">01 / WHO IS PEACE?</div>
          <div className="two-col">
            <div>
              <h2>Okay… but <span className="gradient-text">who are you?</span></h2>
            </div>
            <div className="copy-block">
              <p className="lead">I’m Peace Udochi, a software engineer focused on building reliable backend systems, useful APIs and products that solve real problems.</p>
              <p>My journey into technology wasn’t exactly a straight line.</p>
              <p>Before software engineering, I worked across customer service, sales, logistics, operations and data-related roles. I think that background makes me a better engineer.</p>
              <p>I’ve spent years understanding customers, solving problems, coordinating people, dealing with pressure and figuring out how to make things work when things aren’t working.</p>
              <p>Now I get to do the same thing with code. Just with more semicolons… and significantly more debugging.</p>
            </div>
          </div>
        </section>
 
        <section className="section section-pad code-love-section">
          <div className="section-label">02 / MY RELATIONSHIP WITH CODE</div>
          <div className="love-card">
            <div className="love-head">
              <div><span className="mini-kicker">HOW MUCH DO I LIKE CODING?</span><h3>{codeLove}%</h3></div>
              <div className="love-face">{codeLove > 80 ? '🤓' : codeLove > 50 ? '😎' : '🧍'}</div>
            </div>
            <input aria-label="How much Peace likes coding" type="range" min="0" max="100" value={codeLove} onChange={(e) => setCodeLove(Number(e.target.value))} />
            <div className="range-labels"><span>0%</span><span>100%</span></div>
            <div className="slider-message">“{sliderMessage}”</div>
          </div>
          <div className="two-col after-love">
            <div><h2>I enjoy the <span className="gradient-text">problem.</span></h2></div>
            <div className="copy-block"><p>I love software engineering because I enjoy solving problems. There’s something satisfying about taking a problem that looks complicated, breaking it down, understanding how the pieces connect, and eventually watching everything work.</p><p>I particularly enjoy backend development: designing APIs, working with databases, building business logic and figuring out how systems should communicate. Django and Python are my strongest tools, alongside FastAPI, Flask and experience integrating React frontends.</p><p className="django-joke">And then there is Django. <strong>Django and I have a very healthy relationship.</strong><br />We argue sometimes. Usually about serializers. But we’re good. 😂</p></div>
          </div>
        </section>
 
        <section className="section section-pad dark-panel">
          <div className="section-label">03 / WHY I BUILD</div>
          <div className="why-build">
            <div><h2>I don’t just want to <span className="gradient-text">write code.</span></h2></div>
            <div><p className="lead">I want to build things that solve actual problems.</p><p>I’m interested in software that makes someone’s life easier ; whether that’s helping someone order food, manage information, access results, track finances, or connect people with opportunities.</p><p>Give me a messy problem. I’ll probably ask a lot of questions first. Then I’ll try to build something.</p></div>
          </div>
        </section>
 
        <section className="section section-pad" id="journey">
          <div className="section-label">04 / MY ENGINEERING JOURNEY</div>
          <h2 className="wide-title">Not a straight line.<br /><span className="gradient-text">Still going forward.</span></h2>
          <div className="timeline">
            {timeline.map(([year, title, text]) => <div className="timeline-item" key={year}><div className="timeline-dot" /><div className="timeline-year">{year}</div><div><h4>{title}</h4><p>{text}</p></div></div>)}
            <div className="timeline-item future"><div className="timeline-dot" /><div className="timeline-year">2026 → </div><div><h4>Next Chapter unlocked.. 🚀</h4><p>Better systems.Bigger problems.More things to build!!</p></div></div>
          </div>
        </section>
 
        <section id="stack" className="section section-pad stack-section">
          <div className="section-label">05 / MY TECH STACK</div>
          <div className="stack-heading"><h2>Things I have convinced<br /><span className="gradient-text">computers to cooperate with.</span></h2><p>My current favourite: <strong>Django ❤️</strong><br />My other favourites: Python, APIs, databases and anything that lets me solve a good problem.</p></div>
          <div className="skill-groups">
            <div className="skill-group"><h3>Backend development</h3><div className="skill-cloud">{['Python', 'Django', 'FastAPI', 'Flask', 'Go', 'REST APIs'].map((s, i) => <span className={`skill-pill pill-${i % 4}`} key={s}>{s}</span>)}</div></div>
            <div className="skill-group"><h3>Frontend development</h3><div className="skill-cloud">{['JavaScript', 'TypeScript', 'React', 'Redux'].map((s, i) => <span className={`skill-pill pill-${i % 4}`} key={s}>{s}</span>)}</div></div>
            <div className="skill-group"><h3>Data, infrastructure & tools</h3><div className="skill-cloud">{['PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'AWS'].map((s, i) => <span className={`skill-pill pill-${i % 4}`} key={s}>{s}</span>)}</div></div>
          </div>
        </section>
 
        <section id="projects" className="section section-pad projects-section">
          <div className="section-label">06 / SELECTED WORK</div>
          <div className="projects-intro"><h2>Projects with a <span className="gradient-text">story.</span></h2><p>I’d rather show what I built, why I built it and what I learned than throw a pile of technology names at you.</p></div>
          <div className="projects-grid">
            {projects.map((project) => {
              const isOpen = expanded === project.id;
              return <article className={`project-card ${isOpen ? 'expanded' : ''}`} key={project.id}>
                <div className="project-top"><span>{project.number}</span><span>{project.emoji}</span></div>
                {project.image ? <div className="project-image-wrap"><img src={project.image} alt={`${project.title} project screenshot`} loading="lazy" decoding="async" /></div> : <div className="project-placeholder"><span>₦</span><small>React × Firebase</small></div>}
                <div className="project-content"><span className="project-kicker">{project.kicker}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.stack.map(t => <span key={t}>{t}</span>)}</div><div className="project-actions"><button aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : project.id)}>{isOpen ? 'Close case study ↑' : 'Read the story →'}</button>{project.link ? <a href={project.link} target="_blank" rel="noreferrer">{project.label} {icons.arrow}</a> : <span className="building">🏗️ {project.label}</span>}</div>{isOpen && <div className="case-study"><span>CASE STUDY NOTE</span><p>{project.note ? project.note : project.id === 'oya' ? 'OyaWork is a work in progress. The product concept focuses on connecting workers and employers through profiles, job listings, hiring requests and skills-based matching. The live link and implemented features should be treated as a work in progress.' : project.id === 'result' ? 'A university results platform designed around separate teacher and student experiences. The intended workflow includes secure sign-in, teacher result submission, structured academic records and student result viewing. The application uses a Django backend, REST APIs and PostgreSQL.' : project.id === 'fooddash' ? 'A full-stack food ordering project with a Go API and React client. The application explores authentication, restaurant/menu data and order workflows. The stack demonstrates how a separately deployed frontend communicates with backend endpoints.' : project.id === 'budget' ? 'A personal finance interface for recording income and expenses, organising transactions by category and reviewing spending. Built with React and Firebase.' : 'This project demonstrates practical frontend and backend development, with an emphasis on building a usable product and connecting the interface to application logic.'}</p></div>}</div>
              </article>;
            })}
          </div>
        </section>
 
        <section className="section section-pad other-work">
          <div className="section-label">07 / OTHER THINGS I’VE BUILT</div>
          <h2>I have been <span className="gradient-text">busy.</span></h2>
          <div className="mini-projects">
            <div><span>API / Flask</span><h3>Student Records API</h3><p>A Flask API for creating, retrieving, updating and deleting student, course and enrolment records, with input validation and structured error responses.</p></div>
            <div><span>API / FastAPI</span><h3>Async Student API</h3><p>A separate FastAPI implementation exploring Pydantic validation, asynchronous request handling and typed API endpoints.</p></div>
            <div><span>Frontend / React</span><h3>E-commerce App</h3><p>Product listings, cart management and checkout flow.</p><a href="https://e-commerce-app-kappa-opal.vercel.app/cart" target="_blank" rel="noreferrer">Open project {icons.arrow}</a></div>
          </div>
        </section>
 
        <section className="section section-pad terminal-section">
          <div className="terminal-card">
            <div className="window-bar"><i /><i /><i /><span>~/peace/debugging</span></div>
            <div className="terminal-body">
              <p><span className="terminal-purple">peace@dev</span>:~$ whoami</p>
              <p className="terminal-white">software-engineer · problem-solver · builder</p>
              <p><span className="terminal-purple">peace@dev</span>:~$ {['git status', 'npm run build', 'python manage.py test', 'go test ./...'][terminalLine]}</p>
              <p className="terminal-green">✓ Looks good. Ship it.</p>
              <p><span className="terminal-purple">peace@dev</span>:~$ <span className="cursor-blink">▋</span></p>
            </div>
          </div>
        </section>
 
        <section className="ambition section-pad">
          <div className="ambition-grid" />
          <div className="ambition-content"><span className="section-label">08 / THE AMBITION</span><h2>I’M <span>NOT</span><br />DONE.</h2><div className="ambition-copy"><p>I want to become a stronger software engineer. I want to work on products that solve meaningful problems. I want to keep learning.</p><p>I want to work with people who challenge me to think better. I want to build systems that people actually use. And I want to keep pushing myself outside what I already know.</p><h3>So what’s next?</h3><div className="canada">New challenges. </div><p>New opportunities to build. Wherever the next chapter takes me, my goal stays the same: keep learning, contribute meaningfully and build software that makes a difference.</p><div className="principles"><span>Learn fast.</span><span>Build well.</span><span>Solve problems.</span><span>Keep growing.</span></div></div></div>
        </section>
 
        <section id="contact" className="section section-pad contact-section">
          <div className="section-label">09 / LET’S TALK</div>
          <h2>Okay, enough<br />about <span className="gradient-text">me.</span></h2>
          <p className="contact-copy">Interested in working together, discussing a project or exploring an opportunity? I’d be happy to hear from you. (And if you made it this far, thank you for reading.)</p>
          <div className="contact-actions">
            <a href="https://www.linkedin.com/in/udochi-peace" target="_blank" rel="noreferrer" className="contact-btn">LinkedIn <span>in</span> {icons.arrow}</a>
            <a href="https://github.com/udochi-coder" target="_blank" rel="noreferrer" className="contact-btn">GitHub <span>GH</span> {icons.arrow}</a>
            <a href="mailto:ashiegbuudochi@gmail.com" className="contact-btn">Email me <span>✉</span> {icons.arrow}</a>
            <button onClick={copyEmail} className="contact-btn copy-email">{copied ? 'Email copied ✓' : 'Copy email address'}</button>
          </div>
          <p className="open-to">Open to opportunities · Backend & Full-Stack Engineering</p>
          <a className="download-cv" href="/Peace-Udochi-CV.pdf" download>Download my CV ↓</a>
        </section>
      </main>
 
      <footer className="footer">
        <div className="footer-404"><strong>404</strong><span>Career path not found.</span><em>Just kidding. I’m still building it.</em></div>
        <div className="footer-bottom"><span>Peace Udochi © 2026</span><span>Built with React · curiosity · too much debugging</span><button onClick={() => scrollTo('home')}>Back to top ↑</button></div>
      </footer>
    </div>
  );
}
 
createRoot(document.getElementById('root')).render(<App />);
 