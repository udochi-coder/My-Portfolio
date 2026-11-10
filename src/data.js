// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE.
//  Edit this file to change text, projects and links.
// ─────────────────────────────────────────────────────────────

export const site = {
  url: 'https://my-portfolio-seven-lovat-26.vercel.app'
};

export const profile = {
  name: 'Peace Udochi',
  identity: 'Software Engineer & Problem Solver',
  location: 'Lagos, Nigeria',
  timeZone: 'Africa/Lagos',
  email: 'ashiegbuudochi@gmail.com',
  github: 'https://github.com/udochi-coder',
  linkedin: 'https://www.linkedin.com/in/udochi-peace',
  cv: '/Peace-Udochi-CV.pdf',
  currently: [
    { text: 'Backend Engineering Intern at', org: 'Tavcorp' },
    { text: 'Teaching Django at', org: 'EdPassare Tech School' }
  ],
  available: 'Open to backend and full-stack roles, in Lagos or remote.'
};

/*
  PROJECTS
  - `cover`  image shown in the gallery
  - `full`   long screenshot shown in the project view (optional)
  - `shape`  'phone' for tall mobile screenshots, 'wide' for desktop ones
  - `repo`   paste a GitHub link and a "Source code" link appears
  - `learned` optional sentence shown in the project view

  To add Campus Haven: copy one of the blocks below, fill in the real
  details, and drop its screenshot into /public/work/.
*/
export const projects = [
  {
    id: 'fooddash',
    title: 'FoodDash',
    kind: 'Food ordering & delivery',
    year: '2025',
    summary: 'A full-stack food ordering platform: a Go backend and a React frontend.',
    problem:
      'Because apparently ordering food wasn’t complicated enough. Customers, restaurants, orders and payments all share the same data, and all of it has to stay consistent.',
    built: [
      'Go API endpoints for authentication, restaurant management, orders and payments',
      'React frontend for browsing the menu, building a cart and checking out'
    ],
    stack: ['Go', 'React', 'REST APIs', 'Auth'],
    cover: '/work/fooddash-cover.webp',
    full: '/work/fooddash-full.webp',
    shape: 'phone',
    live: 'https://food-dash-app-nine.vercel.app/',
    repo: '',
    learned: ''
  },
  {
    id: 'result-portal',
    title: 'Result Portal',
    kind: 'Academic results platform',
    year: '2025',
    summary: 'A Django portal where students sign in and check their academic results.',
    problem: 'Students should be able to see their results without suffering.',
    built: [
      'Backend logic and data models for managing academic results',
      'A student-facing portal for signing in and viewing results'
    ],
    stack: ['Django', 'PostgreSQL', 'Data modelling'],
    cover: '/work/result-portal-cover.webp',
    full: '/work/result-portal-full.webp',
    shape: 'phone',
    live: 'https://northstar-uni.vercel.app/',
    repo: '',
    learned: ''
  },
  {
    id: 'manharrtan',
    title: 'Manharrtan Capital',
    kind: 'Client project, live in production',
    year: '2026',
    summary:
      'The production website and loan application platform for a Lagos finance firm, built end to end in a one-month contract.',
    problem:
      'The firm needed a public website and a secure way for customers to apply for loans online, including uploading ID documents that must never be publicly reachable.',
    built: [
      'Next.js (React, TypeScript) frontend talking to a Django REST Framework API',
      'Loan application flow and an admin dashboard with role-based access',
      'Encrypted sensitive fields; applicant IDs stored in a private S3 bucket',
      'Dockerised and deployed on AWS (EC2, RDS PostgreSQL, S3, IAM) behind Nginx with HTTPS',
      'Single-command deployment from GitHub'
    ],
    stack: ['Next.js', 'TypeScript', 'Django REST', 'PostgreSQL', 'Docker', 'AWS'],
    cover: '/work/manharrtan-cover.webp',
    full: '',
    shape: 'wide',
    live: 'https://manharrtancapital.com',
    repo: '',
    learned: ''
  },
  {
    id: 'oyawork',
    title: 'OyaWork',
    kind: 'Job marketplace, in progress',
    year: '2026',
    summary: 'Connects menial job workers in Lagos directly with the people who need them.',
    problem:
      'A problem I actually care about: making it easy for employers to find and hire menial job workers directly.',
    built: [
      'Data models and a REST API for onboarding and worker and employer profiles',
      'Job posting, hiring requests and worker–employer matching',
      'React + TypeScript frontend on top of Django REST Framework'
    ],
    stack: ['Django REST', 'React', 'TypeScript', 'PostgreSQL'],
    cover: '/work/oyawork-cover.webp',
    full: '/work/oyawork-full.webp',
    shape: 'phone',
    live: 'https://oyawork-seven.vercel.app/',
    repo: '',
    learned: ''
  },
  {
    id: 'ecommerce',
    title: 'PeaceStore',
    kind: 'E-commerce storefront',
    year: '2025',
    summary: 'A responsive React storefront with product listings, a cart and a checkout flow.',
    problem: 'A storefront that covers the whole shopping flow, from browsing to checkout.',
    built: ['Product listings', 'A cart with add, update and remove', 'Checkout flow'],
    stack: ['React', 'Redux'],
    cover: '/work/ecommerce-cover.webp',
    full: '/work/ecommerce-full.webp',
    shape: 'phone',
    live: 'https://e-commerce-app-kappa-opal.vercel.app/',
    repo: '',
    learned: ''
  }
];

// Smaller builds without screenshots: listed in the index only.
export const smallWork = [
  {
    title: 'Budget Tracker',
    kind: 'React + Firebase',
    year: '2025',
    live: 'https://budgettracker-632f3.web.app'
  },
  {
    title: 'Student Management API',
    kind: 'Built twice: Flask, then FastAPI',
    year: '2025',
    live: ''
  }
];

export const experience = [
  { role: 'Backend Engineering Intern', org: 'Tavcorp', years: '2026 – now' },
  { role: 'AI Data Trainer (code review)', org: 'SuperAnnotate', years: '2026 – now' },
  { role: 'Full-Stack Engineer, contract', org: 'Manharrtan Capital', years: '2026' },
  { role: 'Full-Stack Python Instructor', org: 'EdPassare Tech School', years: '2026' },
  { role: 'Software Engineering Diploma', org: 'Semicolon Africa', years: '2025 – 26' },
  { role: 'Head of Operations', org: 'Healthily Vitae NG', years: '2025 – 26' },
  { role: 'Sales, logistics & call-center management', org: 'Various', years: '2023 – 25' }
];

export const capabilities = [
  {
    title: 'Backend',
    text: 'APIs, data models and business logic.',
    items: ['Python', 'Django & DRF', 'FastAPI', 'Flask', 'Go', 'PostgreSQL', 'MySQL', 'MongoDB']
  },
  {
    title: 'Frontend',
    text: 'Interfaces people can actually use.',
    items: ['TypeScript', 'React', 'Next.js', 'Redux']
  },
  {
    title: 'Shipping',
    text: 'Getting it live, and keeping it there.',
    items: ['AWS (EC2, RDS, S3, IAM)', 'Docker', 'Nginx', 'CI/CD', 'Vercel']
  }
];
