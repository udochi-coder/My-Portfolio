// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE.
//  Edit this file to change text, projects, links and SEO settings.
//  Everything here is rendered into the page's HTML at build time,
//  so search engines and AI tools can read it without running JS.
// ─────────────────────────────────────────────────────────────

export const site = {
  url: 'https://my-portfolio-seven-lovat-26.vercel.app',
  // Google Search Console → "HTML tag" method: paste only the content="…" value here.
  googleSiteVerification: '',
  // Contact form delivery (Web3Forms). Paste your Web3Forms access key here.
  // It is safe to be public: it only lets people send messages to you.
  // Until a key is set, the form opens a pre-filled Gmail message instead.
  web3formsKey: ''
};

export const profile = {
  name: 'Peace Udochi',
  title: 'Software Engineer',
  specialty: 'Backend & Full-Stack Engineer',
  location: 'Lagos, Nigeria',
  email: 'ashiegbuudochi@gmail.com',
  github: 'https://github.com/udochi-coder',
  linkedin: 'https://www.linkedin.com/in/udochi-peace',
  cv: '/Peace-Udochi-CV.pdf',
  photo: {
    src: '/me/peace-udochi-1000.webp',
    srcSmall: '/me/peace-udochi-640.webp',
    jpg: '/me/peace-udochi.jpg',
    square: '/me/peace-udochi-square.jpg',
    alt: 'Portrait of Peace Udochi, with long copper braids and a black T-shirt, in front of a colourful painting of a waterfront'
  },
  intro:
    'I build the parts of software people rely on without seeing: APIs, data models and the services behind them, plus the interfaces on top when a project needs them.',
  introMore:
    'Before engineering, I spent years in operations, logistics and customer-facing roles in Lagos. It taught me to ask what happens after launch, and that habit shapes how I build.',
  available: 'Open to backend and full-stack roles'
};

/*
  PROJECTS
  - `shot`   alt text: what the screenshot actually shows
  - `shape`  'phone' for tall mobile screenshots, 'wide' for desktop ones,
             'tile' (with cover: null) for a project without a screenshot yet
  - `repo`   paste the GitHub link and a "GitHub" button appears

  To add Campus Haven: copy a block, fill in the real details and put
  its screenshot in /public/work/ (phone shots work best at 900 × 1200).
*/
export const projects = [
  {
    id: 'oyawork',
    title: 'OyaWork',
    kind: 'Job marketplace, in progress',
    year: '2026',
    summary:
      'Connects menial job workers in Lagos directly with employers. A Django REST API for onboarding, worker and employer profiles, job posting, hiring requests and matching, with a React and TypeScript frontend.',
    stack: ['Django REST', 'React', 'TypeScript', 'PostgreSQL'],
    shot: 'OyaWork welcome screen reading “Find trusted workers near you” with an illustration of a worker and an employer shaking hands',
    cover: '/work/oyawork-cover.webp',
    shape: 'phone',
    live: 'https://oyawork-seven.vercel.app/',
    repo: ''
  },
  {
    id: 'manharrtan',
    title: 'Manharrtan Capital',
    kind: 'Client project, live in production',
    year: '2026',
    summary:
      'The production website and loan application platform for a Lagos finance firm, built end to end in a one-month contract: Next.js frontend, Django REST API, role-based admin dashboard, encrypted fields and private S3 storage for applicant IDs, deployed on AWS behind Nginx.',
    stack: ['Next.js', 'TypeScript', 'Django REST', 'PostgreSQL', 'Docker', 'AWS'],
    shot: 'Manharrtan Capital homepage with the headline “Bridge the gap in your cash flow” and buttons to apply for bridge finance',
    cover: '/work/manharrtan-cover.webp',
    shape: 'wide',
    live: 'https://manharrtancapital.com',
    repo: ''
  },
  {
    id: 'result-portal',
    title: 'Result Portal',
    kind: 'Academic results platform',
    year: '2025',
    summary:
      'A Django portal where students sign in and view their academic results. I built the backend logic and data models for managing results, and the student-facing sign-in and results pages.',
    stack: ['Python', 'Django', 'PostgreSQL', 'Data modelling'],
    shot: 'Result Portal sign-in screen for Northstar University, asking for a student email or ID and password',
    cover: '/work/result-portal-cover.webp',
    shape: 'phone',
    live: 'https://northstar-uni.vercel.app/',
    repo: ''
  },
  {
    id: 'fooddash',
    title: 'FoodDash',
    kind: 'Food ordering & delivery platform',
    year: '2025',
    summary:
      'A full-stack food ordering platform. Customers browse the menu, build a cart and check out; a Go API handles authentication, restaurant management, orders and payments.',
    stack: ['Go', 'React', 'REST APIs', 'Authentication'],
    shot: 'FoodDash mobile home screen: a “What are you craving?” banner, menu categories and a burger listing priced in naira',
    cover: '/work/fooddash-cover.webp',
    shape: 'phone',
    live: 'https://food-dash-app-nine.vercel.app/',
    repo: ''
  },
  {
    id: 'budget-tracker',
    title: 'Budget Tracker',
    kind: 'Personal finance app',
    year: '2025',
    summary:
      'Where did my money go? A React app for tracking income, expenses and categories, with Firebase for data storage and hosting.',
    stack: ['React', 'Firebase', 'JavaScript'],
    shot: '',
    cover: null,
    shape: 'tile',
    live: 'https://budgettracker-632f3.web.app',
    repo: ''
  },
  {
    id: 'peacestore',
    title: 'PeaceStore',
    kind: 'E-commerce storefront',
    year: '2025',
    summary:
      'A responsive React storefront with product listings, a cart where items can be added, updated and removed, and a checkout flow.',
    stack: ['React', 'Redux', 'JavaScript'],
    shot: 'PeaceStore “Featured products” page showing product cards with category, name and price',
    cover: '/work/ecommerce-cover.webp',
    shape: 'phone',
    live: 'https://e-commerce-app-kappa-opal.vercel.app/',
    repo: ''
  }
];

// Smaller builds without screenshots.
export const moreWork = [
  {
    title: 'Student Management API',
    text: 'The same student records API built twice, in Flask and in FastAPI: CRUD for students, courses and enrolments, request validation and structured errors.',
    stack: ['Python', 'Flask', 'FastAPI'],
    live: ''
  }
];

// From the CV. Newest first.
export const experience = [
  {
    role: 'Backend Engineering Intern',
    org: 'Tavcorp',
    meta: 'Remote',
    years: '2026 – Present',
    text: 'Build and maintain backend services and REST APIs in Python (Django, FastAPI), design data models, and ship features with the frontend team through code reviews and standups.'
  },
  {
    role: 'AI Data Trainer',
    org: 'SuperAnnotate',
    meta: 'Contract, remote',
    years: '2026 – Present',
    text: 'Review AI-generated code and content for correctness and edge cases, and write guideline-based feedback that improves model accuracy.'
  },
  {
    role: 'Full-Stack Engineer',
    org: 'Manharrtan Capital',
    meta: 'Contract',
    years: '2026',
    text: 'Built and deployed the company’s production website and loan application platform end to end on AWS.'
  },
  {
    role: 'Full-Stack Python Instructor',
    org: 'EdPassare Tech School',
    meta: 'Contract',
    years: '2026',
    text: 'Teach Django (models, views, templates, URL routing) and review students’ code with written feedback.'
  },
  {
    role: 'Software Engineer Trainee',
    org: 'Semicolon Africa',
    meta: 'Lagos',
    years: '2025 – 2026',
    text: 'Built and consumed REST APIs in cross-functional teams, took part in code reviews and Agile ceremonies, and strengthened data structures and algorithms.'
  }
];

export const earlierCareer = {
  years: '2020 – 2026',
  text: 'Before and alongside engineering: Head of Operations and Head of Customer Fulfilment at Healthily Vitae NG, data entry for KIRRO.AI, Sales Manager at Ejim Ltd, Call Center Manager at Intertrade Supply, Logistics Manager at Native Delight, and customer service and front-desk roles where it started.'
};

export const education = [
  { school: 'Semicolon Africa', award: 'Diploma in Software Engineering', years: '2025 – 2026' },
  { school: 'AltSchool Africa', award: 'Diploma in Cloud Engineering', years: '2024 – 2025' },
  { school: 'Imo State University', award: 'B.Sc. Accounting', years: '2023' }
];

// Tools: `mark` is a short monogram drawn in the tile (no brand logos).
export const tools = [
  { name: 'Go', mark: 'Go', use: 'Golang backend services and APIs' },
  { name: 'Python', mark: 'Py', use: 'Backend, scripting and data work' },
  { name: 'Django', mark: 'Dj', use: 'Web apps and REST APIs with DRF' },
  { name: 'Java', mark: 'Jv', use: 'Object-oriented programming' },
  { name: 'React', mark: 'Re', use: 'Interfaces and single-page apps' },
  { name: 'JavaScript', mark: 'JS', use: 'Frontend logic and tooling' },
  { name: 'REST APIs', mark: '{ }', use: 'Design, build and document' },
  { name: 'PostgreSQL', mark: 'Pg', use: 'Data modelling and queries' }
];

export const alsoUse = ['FastAPI', 'Flask', 'TypeScript', 'Next.js', 'Redux', 'MySQL', 'MongoDB', 'Firebase', 'Docker', 'AWS (EC2, RDS, S3, IAM)', 'Nginx', 'Git & GitHub', 'CI/CD'];
