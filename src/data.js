// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE.
//  Edit this file to update text, projects and links.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Peace Udochi',
  role: 'Backend & Full-Stack Engineer',
  location: 'Lagos, Nigeria',
  email: 'ashiegbuudochi@gmail.com',
  github: 'https://github.com/udochi-coder',
  linkedin: 'https://www.linkedin.com/in/udochi-peace',
  cv: '/Peace-Udochi-CV.pdf',
  openTo: ['backend roles', 'full-stack roles', 'remote', 'Lagos']
};

// Main projects.
// TODO: paste each GitHub link into `repo`. A "Code" link appears once filled.
// `learned` is optional: one honest sentence about what was hard.
export const projects = [
  {
    id: 'manharrtan',
    title: 'Manharrtan Capital',
    type: 'Client project, live in production',
    year: 2026,
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
    type: 'Job marketplace, in progress',
    year: 2026,
    summary: 'Connects menial job workers in Lagos directly with employers.',
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
    type: 'Food ordering and delivery',
    year: 2025,
    summary: 'Full-stack food ordering platform with a Go backend and a React frontend.',
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
    id: 'result-portal',
    title: 'Result Portal',
    type: 'Academic results platform',
    year: 2025,
    summary: 'A Django portal where students sign in and view their academic results.',
    problem: 'Students should be able to see their results without suffering.',
    built: [
      'Backend logic and data models for managing academic results',
      'Student-facing portal for signing in and viewing results'
    ],
    learned: '',
    stack: ['Django', 'PostgreSQL', 'Data modelling'],
    image: '/images/result-portal.jpeg',
    live: 'https://northstar-uni.vercel.app/',
    repo: ''
  },
  {
    id: 'student-api',
    title: 'Student Management API',
    type: 'API, built twice',
    year: 2025,
    summary:
      'The same student records API, built in Flask and again in FastAPI.',
    problem: 'One student records API, built in two Python frameworks.',
    built: [
      'CRUD for students, courses and enrolments',
      'Request validation and structured error responses',
      'Pydantic schemas and async endpoints in the FastAPI version'
    ],
    learned: '',
    stack: ['Flask', 'FastAPI', 'Pydantic'],
    image: null,
    live: '',
    repo: ''
  },
  {
    id: 'ecommerce',
    title: 'E-commerce App',
    type: 'React storefront',
    year: 2025,
    summary: 'Responsive storefront with product listings, a cart and a checkout flow.',
    problem: 'A storefront that covers the whole shopping flow, from listing to checkout.',
    built: ['Product listings', 'Cart with add, update and remove', 'Checkout flow'],
    learned: '',
    stack: ['React', 'Redux'],
    image: '/images/ecommerce.jpeg',
    live: 'https://e-commerce-app-kappa-opal.vercel.app/',
    repo: ''
  },
  {
    id: 'budget-tracker',
    title: 'Budget Tracker',
    type: 'Personal finance app',
    year: 2025,
    summary: 'Tracks income, expenses and categories. Where did my money go?',
    problem: 'Where did my money go? I wanted an answer with categories.',
    built: ['Income and expense tracking by category', 'Firebase for storage and hosting'],
    learned: '',
    stack: ['React', 'Firebase'],
    image: null,
    live: 'https://budgettracker-632f3.web.app',
    repo: ''
  }
];

// Career as a git log, newest first.
// lane: 'eng' (engineering branch) or 'ops' (operations branch).
// kind: 'merge' | 'branch' | 'root' for the special graph rows.
export const history = [
  {
    lane: 'eng', ref: 'HEAD → engineering', type: 'feat', scope: 'tavcorp',
    msg: 'join as Backend Engineering Intern', date: '2026 – now',
    body: [
      'Build and maintain backend services and REST APIs in Python (Django, FastAPI)',
      'Design data models and write queries with a focus on data integrity',
      'Ship features with frontend developers; join code reviews and standups'
    ]
  },
  {
    lane: 'eng', type: 'feat', scope: 'superannotate',
    msg: 'review AI-generated code as an AI Data Trainer', date: '2026 – now',
    body: [
      'Review AI-generated code and content for correctness and edge cases',
      'Write clear, guideline-based feedback to improve model accuracy'
    ]
  },
  {
    lane: 'eng', type: 'feat', scope: 'manharrtan',
    msg: 'ship a production loan platform on AWS', date: '2026',
    body: ['Full-stack contract: Next.js, Django REST, Docker, EC2, RDS, S3, Nginx']
  },
  {
    lane: 'eng', type: 'docs', scope: 'edpassare',
    msg: 'teach Django as a Full-Stack Python Instructor', date: '2026',
    body: [
      'Teach models, views, templates and URL routing',
      'Review students’ code with written feedback'
    ]
  },
  {
    lane: 'eng', kind: 'merge', type: 'merge', scope: '',
    msg: 'Merge branch ‘operations’ into engineering', date: '2026',
    body: ['Everything I learned running teams, customers and logistics comes with me.']
  },
  {
    lane: 'ops', ref: 'operations', type: 'feat', scope: 'healthily-vitae',
    msg: 'promoted to Head of Operations', date: '2025 – 26', body: []
  },
  {
    lane: 'eng', type: 'feat', scope: 'semicolon',
    msg: 'start Software Engineering diploma at Semicolon Africa', date: '2025 – 26',
    body: ['Built and consumed REST APIs in cross-functional teams', 'Code reviews, Agile, data structures and algorithms']
  },
  {
    lane: 'ops', type: 'feat', scope: 'healthily-vitae',
    msg: 'run customer fulfilment and logistics', date: '2024 – 25', body: []
  },
  {
    lane: 'ops', type: 'feat', scope: 'ejim',
    msg: 'sell, with targets and metrics, as Sales Manager', date: '2024', body: []
  },
  {
    lane: 'eng', kind: 'branch', type: 'feat', scope: 'altschool',
    msg: 'branch off: Cloud Engineering diploma at AltSchool Africa', date: '2024 – 25', body: []
  },
  {
    lane: 'ops', type: 'feat', scope: 'intertrade',
    msg: 'lead a call center team as Call Center Manager', date: '2023 – 24', body: []
  },
  {
    lane: 'ops', type: 'feat', scope: 'native-delight',
    msg: 'manage inventory and deliveries as Logistics Manager', date: '2023 – 24', body: []
  },
  {
    lane: 'ops', type: 'chore', scope: 'imsu',
    msg: 'graduate with a B.Sc. in Accounting', date: '2023', body: []
  },
  {
    lane: 'ops', type: 'feat', scope: 'midnight-city',
    msg: 'handle customers as a Customer Service Rep', date: '2023', body: []
  },
  {
    lane: 'ops', kind: 'root', type: 'init', scope: '',
    msg: 'first job: front desk at C&A Bakery', date: '2020', body: []
  }
];

export const stack = {
  backend: ['Python', 'Django', 'Django REST Framework', 'FastAPI', 'Flask', 'Go'],
  frontend: ['TypeScript', 'React', 'Next.js', 'Redux'],
  data: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'],
  infra: ['AWS (EC2, RDS, S3, IAM)', 'Docker', 'Nginx', 'CI/CD', 'Vercel']
};
