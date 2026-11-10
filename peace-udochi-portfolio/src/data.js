// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE.
//  Edit this file to update text, projects and links.
//  You should rarely need to touch main.jsx or styles.css.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Peace Udochi',
  role: 'Backend & Full-Stack Engineer',
  location: 'Lagos, Nigeria',
  email: 'ashiegbuudochi@gmail.com',
  github: 'https://github.com/udochi-coder',
  linkedin: 'https://www.linkedin.com/in/udochi-peace',
  cv: '/Peace-Udochi-CV.pdf',
  available: 'Open to backend & full-stack roles'
};

// TODO: paste the GitHub link for each project into `repo`.
// A "Code" button appears automatically once `repo` is filled in.
// `learned` is optional: one or two honest sentences about what was
// hard or what you would do differently. It shows in the case study.
export const projects = [
  {
    id: 'manharrtan',
    featured: true,
    title: 'Manharrtan Capital',
    kicker: 'Client project · Live in production',
    year: '2026',
    summary:
      'Production website and loan application platform for a Lagos finance firm, built end to end in a one-month contract.',
    problem:
      'The firm needed a public website and a secure way for customers to apply for loans online, including uploading ID documents that must never be publicly reachable.',
    built: [
      'Next.js (React, TypeScript) frontend talking to a Django REST Framework API',
      'Loan application flow and an admin dashboard with role-based access',
      'Encrypted sensitive fields; applicant IDs stored in a private S3 bucket',
      'Dockerised and deployed on AWS (EC2, RDS PostgreSQL, S3, IAM) behind Nginx with HTTPS',
      'Single-command deployment from GitHub'
    ],
    learned: '',
    stack: ['Next.js', 'TypeScript', 'Django REST', 'PostgreSQL', 'Docker', 'AWS', 'Nginx'],
    image: '/images/manharrtan.jpeg',
    live: 'https://manharrtancapital.com',
    repo: ''
  },
  {
    id: 'oyawork',
    title: 'OyaWork',
    kicker: 'Job marketplace · In progress',
    year: '2026',
    summary:
      'Connects menial job workers in Lagos directly with employers.',
    problem:
      'A problem I actually care about: making it easy for employers to find and hire menial job workers directly.',
    built: [
      'Data models and REST API for onboarding, worker and employer profiles',
      'Job posting, hiring requests and worker–employer matching',
      'React + TypeScript frontend on top of Django REST Framework'
    ],
    learned: '',
    stack: ['Django REST', 'React', 'TypeScript', 'PostgreSQL'],
    image: '/images/oyawork.jpeg',
    live: 'https://oyawork-seven.vercel.app/',
    repo: ''
  },
  {
    id: 'fooddash',
    title: 'FoodDash',
    kicker: 'Food ordering & delivery',
    year: '2025',
    summary:
      'Full-stack food ordering platform with a Go backend and a React frontend.',
    problem:
      'Because apparently ordering food wasn’t complicated enough. Customers, restaurants, orders and payments all share the same data.',
    built: [
      'Go API endpoints for authentication, restaurant management, orders and payments',
      'React frontend for browsing, ordering and checkout'
    ],
    learned: '',
    stack: ['Go', 'React', 'REST APIs', 'Auth'],
    image: '/images/fooddash.jpeg',
    live: 'https://food-dash-app-nine.vercel.app/',
    repo: ''
  },
  {
    id: 'result',
    title: 'Result Portal',
    kicker: 'Academic results platform',
    year: '2025',
    summary:
      'A Django portal where students sign in and view their academic results.',
    problem:
      'Students should be able to see their results without suffering.',
    built: [
      'Backend logic and data models for managing academic results',
      'Student-facing portal for signing in and viewing results'
    ],
    learned: '',
    stack: ['Django', 'PostgreSQL', 'Data modelling'],
    image: '/images/result-portal.jpeg',
    live: 'https://northstar-uni.vercel.app/',
    repo: ''
  }
];

// Smaller builds, shown as compact cards.
export const otherWork = [
  {
    tag: 'API · Flask & FastAPI',
    title: 'Student Management API',
    text: 'The same student records API built twice, in Flask and in FastAPI, with CRUD for students, courses and enrolments, Pydantic validation, async endpoints and structured errors.',
    live: '',
    repo: ''
  },
  {
    tag: 'Frontend · React',
    title: 'E-commerce App',
    text: 'Responsive storefront with product listings, a cart (add, update, remove) and a checkout flow.',
    live: 'https://e-commerce-app-kappa-opal.vercel.app/',
    repo: ''
  },
  {
    tag: 'Frontend · React + Firebase',
    title: 'Budget Tracker',
    text: 'Tracks income, expenses and categories, with Firebase for storage and hosting.',
    live: 'https://budgettracker-632f3.web.app',
    repo: ''
  }
];

export const experience = [
  {
    role: 'Backend Engineering Intern',
    org: 'Tavcorp',
    meta: 'Remote',
    date: '2026 – Present',
    points: [
      'Build and maintain backend services and REST APIs in Python (Django, FastAPI)',
      'Design data models and write queries with a focus on data integrity',
      'Ship features with frontend developers; join code reviews and standups'
    ]
  },
  {
    role: 'AI Data Trainer',
    org: 'SuperAnnotate',
    meta: 'Contract · Remote',
    date: '2026 – Present',
    points: [
      'Review AI-generated code and content for correctness and edge cases',
      'Write clear, guideline-based feedback to improve model accuracy'
    ]
  },
  {
    role: 'Full-Stack Engineer',
    org: 'Manharrtan Capital',
    meta: 'Contract',
    date: '2026',
    points: [
      'Built and deployed the company’s production site and loan platform end to end (see Selected Work)'
    ]
  },
  {
    role: 'Full-Stack Python Instructor',
    org: 'EdPassare Tech School',
    meta: 'Contract',
    date: '2026',
    points: [
      'Teach Django: models, views, templates and URL routing',
      'Guide students through full-stack builds and review their code'
    ]
  },
  {
    role: 'Software Engineer Trainee',
    org: 'Semicolon Africa',
    meta: 'Lagos',
    date: '2025 – 2026',
    points: [
      'Built and consumed REST APIs in cross-functional teams',
      'Code reviews, Agile ceremonies and data structures & algorithms'
    ]
  }
];

// The pre-tech career, condensed into one line each.
export const earlierCareer = [
  ['2025 – 26', 'Head of Operations', 'Healthily Vitae NG'],
  ['2024 – 25', 'Head, Customer Fulfilment', 'Healthily Vitae NG'],
  ['2024', 'Sales Manager', 'Ejim Ltd'],
  ['2023 – 24', 'Call Center Manager', 'Intertrade Supply'],
  ['2023 – 24', 'Logistics Manager', 'Native Delight'],
  ['2020 – 23', 'Customer Service & Front Desk', 'Restaurants & retail']
];

export const education = [
  ['Semicolon Africa', 'Diploma in Software Engineering', '2025 – 26'],
  ['AltSchool Africa', 'Diploma in Cloud Engineering', '2024 – 25'],
  ['Imo State University', 'B.Sc. Accounting', '2023']
];

export const stack = [
  { group: 'Backend', items: ['Python', 'Django', 'Django REST Framework', 'FastAPI', 'Flask', 'Go'] },
  { group: 'Frontend', items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Redux'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'] },
  { group: 'Cloud & DevOps', items: ['AWS (EC2, RDS, S3, IAM)', 'Docker', 'Nginx', 'CI/CD', 'Vercel'] }
];
