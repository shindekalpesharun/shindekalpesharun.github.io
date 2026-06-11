// ============================================================
//  PORTFOLIO DATA — Edit this file to update all content
// ============================================================

const PROFILE = {
  name: 'Kalpesh Shinde',
  tagline: '3+ yrs • Mobile Lead • Engineer • Builder',
  avatar: 'https://ui-avatars.com/api/?name=Kalpesh+Shinde&background=3b82f6&color=fff&size=120',
  about: `I architect high-performance mobile experiences and distributed systems. From Flutter and native Android to backend APIs and cloud infra, I focus on building software that's practical, reliable, and scalable for real users at real scale.`,
  socials: [
    { label: '✉', title: 'Email', url: 'mailto:shindekalpesharun@gmail.com' },
    { label: 'gh', title: 'GitHub', url: 'https://github.com/shindekalpesharun', icon: 'github' },
    { label: 'in', title: 'LinkedIn', url: 'https://www.linkedin.com/in/shindekalpesharun/' },
    { label: 'M', title: 'Medium', url: 'https://medium.com/@shindekalpesharun' },
  ],
};

// Each link: { label, url }
// thumb: CSS class name (defined in style.css)  OR  an image URL string
const PROJECTS = [
  {
    id: 'skilmex',
    name: 'Skilmex',
    thumb: 'skilmex-thumb',   // CSS gradient class
    desc: 'Full-stack EdTech ecosystem — Flutter app + Node.js backend handling 1,000+ concurrent users with Redis caching and real-time quiz engine.',
    tags: ['Flutter', 'Node.js', 'Redis', 'Next.js', 'PostgreSQL', 'Prisma', 'S3'],
    links: [
      { label: '↗ Live', url: 'https://www.skilmex.com/' },
      { label: '▶ Android', url: 'https://play.google.com/store/apps/details?id=com.skilmex.skilmex' },
    ],
  },
  {
    id: 'rasta-ai',
    name: 'Rasta AI',
    thumb: 'rasta-thumb',
    desc: 'Real-time road hazard detection. Flutter streams frames to a FastAPI + YOLO backend for sub-200ms inference. Used for road safety monitoring.',
    tags: ['Flutter', 'FastAPI', 'YOLO', 'Python'],
    links: [
      { label: '↗ Live', url: '#' },
      { label: '⎇ GitHub', url: 'https://github.com/shindekalpesharun' },
    ],
  },
  {
    id: 'prime-learning',
    name: 'Prime Learning',
    thumb: 'prime-thumb',
    desc: 'EdTech Android app with 100,000+ Play Store downloads. Real-time Firebase sync, offline mode, and adaptive learning paths.',
    tags: ['Android', 'Flutter', 'Firebase', 'Push Notifications', 'Real-time DB'],
    links: [
      { label: '▶ Android', url: 'https://play.google.com/store/apps/details?id=com.primelearn.android' },
    ],
  },
  {
    id: 'vocoxs',
    name: 'VOCOxS',
    thumb: 'vocoxs-thumb',
    desc: 'Enterprise security management system for real-time monitoring and access control. Built with Jetpack Compose, Hilt DI, and event-driven architecture.',
    tags: ['Android', 'Jetpack Compose', 'Hilt', 'Kotlin'],
    links: [
      // { label: '↗ Live',   url: '#' },
      // { label: '⎇ GitHub', url: 'https://github.com/shindekalpesharun' },
    ],
  },
  {
    id: 'db-debugger',
    name: 'Local DB Visual Debugger',
    thumb: 'debugger-thumb',
    desc: 'Flutter package: in-app overlay UI to inspect, query, and time-travel through local databases (Hive, ObjectBox, Floor, Realm). Release-mode safe.',
    tags: ['Flutter', 'Dart', 'pub.dev'],
    links: [
      { label: '↗ pub.dev', url: 'https://pub.dev/packages/local_database_visual_debugger' },
      { label: '⎇ GitHub', url: 'https://github.com/shindekalpesharun/local_database_visual_debugger' },
    ],
  },
];

// HOME_PROJECTS_LIMIT: how many projects to show on home page
const HOME_PROJECTS_LIMIT = 3;

const EXPERIENCE = [
  {
    id: 'exp-au',
    logo: 'AU',
    company: 'Ai Unika Technologies',
    role: 'Lead Android Developer',
    period: 'May 2024 – Jan 2026',
    openByDefault: true,
    points: [
      'Leading Android development for enterprise-grade EdTech platform Skilmex.',
      'Architecting scalable Flutter modules handling 1,000+ concurrent users.',
      'Integrated Razorpay, Firebase, and custom DRM video streaming.',
      'Mentoring junior developers and conducting code reviews.',
    ],
  },
  {
    id: 'exp-mc',
    logo: 'MC',
    company: 'MISCOS Technologies',
    role: 'Android Developer',
    period: 'Sept 2023 – Mar 2024',
    openByDefault: false,
    points: [
      'Built VOCOxS security management system using Jetpack Compose and Hilt.',
      'Developed real-time event-driven UI components for monitoring dashboards.',
      'Improved app startup time by 40% through modularization.',
    ],
  },
];

const OPEN_SOURCE = [
  {
    id: 'oss-1',
    iconClass: 'purple',
    repo: 'pub.dev/easy_local_secure_storage',
    repoBold: 'easy_local_secure_storage',
    summary: 'Secure, encrypted key-value storage for Flutter',
    detail: 'Published Flutter package on pub.dev. Provides AES-encrypted local storage with a simple API, supporting both Android Keystore and iOS Secure Enclave for key management.',
  },
  {
    id: 'oss-2',
    iconClass: 'green',
    repo: 'pub.dev/local_database_visual_debugger',
    repoBold: 'local_database_visual_debugger',
    summary: 'In-app visual debugger for local databases',
    detail: 'Flutter package providing an overlay UI to inspect, query, and time-travel through local databases (Hive, ObjectBox, Floor, Realm) without leaving the app. Release-mode safe.',
  },
];

const SKILLS = [
  'Flutter', 'Dart', 'Android', 'Kotlin', 'Java',
  'Node.js', 'FastAPI', 'Python', 'Next.js', 'React',
  'Firebase', 'AWS', 'Redis', 'PostgreSQL', 'MongoDB',
  'Docker', 'Jetpack Compose', 'Hilt',
];

// Articles / blog posts — url points to the actual Medium article
const BLOGS = [
  {
    title: 'Building a Scalable EdTech Backend with Node.js and Redis',
    excerpt: 'How we designed Skilmex\'s backend to handle 1,000+ concurrent quiz sessions using Redis pub/sub and horizontal scaling strategies.',
    date: '2025-10-12',
    url: 'https://medium.com/@shindekalpesharun',
  },
  {
    title: 'YOLO on Mobile: Real-time Road Hazard Detection with Flutter + FastAPI',
    excerpt: 'A walkthrough of streaming video frames from a Flutter app to a YOLO model served via FastAPI for sub-200ms inference.',
    date: '2025-07-28',
    url: 'https://medium.com/@shindekalpesharun',
  },
  {
    title: 'Securing Flutter Apps: AES Encryption with Android Keystore',
    excerpt: 'Deep dive into how easy_local_secure_storage leverages platform keystores to protect sensitive user data.',
    date: '2025-04-15',
    url: 'https://medium.com/@shindekalpesharun',
  },
  {
    title: 'Jetpack Compose for Enterprise: Lessons from Building VOCOxS',
    excerpt: 'How Compose\'s declarative model and Hilt DI enabled a 40% reduction in app startup time for a real-time security dashboard.',
    date: '2024-11-03',
    url: 'https://medium.com/@shindekalpesharun',
  },
  {
    title: 'Why I Publish Flutter Packages: Lessons from pub.dev',
    excerpt: 'Open-source contributions taught me more about API design and backwards compatibility than any course ever could.',
    date: '2024-12-20',
    url: 'https://medium.com/@shindekalpesharun',
  },
];

// HOME_BLOGS_LIMIT: how many blog posts to show on home page
const HOME_BLOGS_LIMIT = 3;
