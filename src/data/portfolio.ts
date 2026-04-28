export const personalInfo = {
  name: 'Kalpesh Shinde',
  title: 'Freelance Full-Stack Developer & Android Developer',
  osName: 'Shindekalpesharun',
  location: 'Pune, Maharashtra, India',
  email: 'shindekalpesharun@gmail.com',
  phone: '+91 98765 43210',
  bio: `Passionate Full-Stack Developer & Android Specialist with 3+ years of experience building exceptional digital experiences.

Based in Pune, I craft beautiful, performant mobile and web applications that "feel premium." From Android apps with millions of downloads to modern web platforms, I bring ideas to life with clean code and intuitive design.

Always excited to take on new challenges and collaborate on innovative projects.`,
  availability: 'Available for Freelance Projects',
  social: {
    github: 'https://github.com/shindekalpesharun',
    linkedin: 'https://www.linkedin.com/in/shindekalpesharun/',
    twitter: 'https://x.com/shindekalpesh_',
    medium: 'https://medium.com/@shindekalpesharun',
    whatsapp: 'https://wa.me/919876543210',
  },
  resumeUrl: 'https://drive.google.com/file/d/1tbcS8S26ivK55MT3a9U1UmuopUwk_sE9/view?usp=sharing',
};

export const skills = [
  {
    category: 'Mobile Development',
    items: [
      { name: 'Android', level: 95, icon: 'https://img.icons8.com/color/96/android-os.png' },
      { name: 'Kotlin', level: 90, icon: 'https://img.icons8.com/nolan/96/kotlin.png' },
      { name: 'Java', level: 92, icon: 'https://img.icons8.com/nolan/96/java-coffee-cup-logo.png' },
      { name: 'Flutter', level: 85, icon: 'https://img.icons8.com/color/96/flutter.png' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 90, icon: 'https://img.icons8.com/color/96/react-native.png' },
      { name: 'Next.js', level: 88, icon: 'https://img.icons8.com/ios-filled/96/nextjs.png' },
      { name: 'TypeScript', level: 85, icon: 'https://img.icons8.com/color/96/typescript.png' },
      { name: 'Tailwind CSS', level: 92, icon: 'https://img.icons8.com/color/96/tailwindcss.png' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 82, icon: 'https://img.icons8.com/color/96/nodejs.png' },
      { name: 'Express', level: 80, icon: 'https://img.icons8.com/nolan/96/express.png' },
      { name: 'Firebase', level: 88, icon: 'https://img.icons8.com/color/96/firebase.png' },
      { name: 'MongoDB', level: 75, icon: 'https://img.icons8.com/color/96/mongodb.png' },
    ],
  },
  {
    category: 'Tools & DevOps',
    items: [
      { name: 'Git', level: 90, icon: 'https://img.icons8.com/color/96/git.png' },
      { name: 'Docker', level: 70, icon: 'https://img.icons8.com/color/96/docker.png' },
      { name: 'Figma', level: 78, icon: 'https://img.icons8.com/color/96/figma.png' },
      { name: 'REST APIs', level: 92, icon: 'https://img.icons8.com/nolan/96/api-settings.png' },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'VOCOxS Guard App',
    description: 'Enterprise security guard management with face detection attendance, role-based login, complaint management, and real-time sync.',
    tech: ['Android', 'Kotlin', 'Jetpack Compose', 'MVVM', 'ROOM', 'Hilt', 'RestAPI'],
    images: ['https://img.icons8.com/ios/500/no-image.png'],
    liveUrl: '#',
    githubUrl: '#',
    category: 'Android App',
  },
  {
    id: 2,
    title: 'VOCOxS Security Agency',
    description: 'Multi-campus security management system with agency, branch, and license management. Google Maps integration.',
    tech: ['Android', 'Java', 'Retrofit', 'Google Maps', 'Material Design 3'],
    images: ['https://img.icons8.com/ios/500/no-image.png'],
    liveUrl: '#',
    githubUrl: '#',
    category: 'Android App',
  },
  {
    id: 3,
    title: 'Prime Learning',
    description: 'Educational platform for elementary students (Grades 1-5) with interactive lessons, progress tracking, and engaging UI.',
    tech: ['Flutter', 'REST APIs', 'Firebase', 'BLoC'],
    images: [
      'https://play-lh.googleusercontent.com/Ny0UIKsnbx6joLiqDmkypcN61IhVKhUDLqpYT5Yor28tBljbbbOthJIwXQx3ud0U-qIa=w2560-h1440-rw',
    ],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.primelearn.android',
    githubUrl: '#',
    category: 'Mobile App',
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with cart, checkout, payment integration, and admin dashboard.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'],
    images: [],
    liveUrl: '#',
    githubUrl: '#',
    category: 'Web App',
  },
];

export const services = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹15,000',
    description: 'Perfect for small projects and MVPs',
    features: [
      'Single Platform (Android OR Web)',
      'Up to 5 screens',
      'Basic UI/UX design',
      'Standard components',
      '1 month support',
      'Source code included',
    ],
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '₹40,000',
    description: 'Best for businesses and startups',
    features: [
      'Android + Web Backend',
      'Up to 15 screens',
      'Custom UI/UX design',
      'API integration',
      'Database setup',
      '3 months support',
      'Source code included',
      'Play Store deployment',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale applications',
    features: [
      'Full-stack development',
      'Unlimited screens',
      'Premium UI/UX',
      'Advanced integrations',
      'Cloud infrastructure',
      '6 months support',
      'Source code included',
      'App Store deployment',
      'Dedicated developer',
    ],
    popular: false,
  },
];

export const experience = [
  {
    role: 'Freelance Developer',
    company: 'Self-employed',
    period: '2022 - Present',
    description: 'Building custom mobile and web applications for clients across various industries.',
  },
  {
    role: 'Android Developer',
    company: 'Tech Solutions Inc.',
    period: '2020 - 2022',
    description: 'Developed and maintained enterprise-level Android applications for Fortune 500 clients.',
  },
  {
    role: 'Junior Developer',
    company: 'StartUp Hub',
    period: '2019 - 2020',
    description: 'Full-stack development using React, Node.js, and mobile apps with Flutter.',
  },
];

export const wallpaperOptions = [
  { id: 'cosmic', name: 'Cosmic Space', gradient: 'from-purple-900 via-indigo-900 to-black', accent: '#8B5CF6' },
  { id: 'aurora', name: 'Northern Lights', gradient: 'from-green-600 via-teal-500 to-blue-600', accent: '#10B981' },
  { id: 'gradient', name: 'Sunset Gradient', gradient: 'from-orange-500 via-pink-500 to-purple-600', accent: '#F97316' },
  { id: 'minimal', name: 'Minimal Dark', gradient: 'from-gray-900 via-gray-800 to-gray-900', accent: '#6B7280' },
  { id: 'abstract', name: 'Abstract Art', gradient: 'from-pink-600 via-purple-600 to-blue-600', accent: '#EC4899' },
];

export const aiResponses = {
  greetings: [
    "Hello! I'm Shindekalpesharun's AI assistant. How can I help you today?",
    "Hi there! Ask me anything about Kalpesh's work!",
    "Welcome! I'm here to help you learn more about Kalpesh's expertise.",
  ],
  about: [
    "Kalpesh Shinde is a Freelance Full-Stack Developer & Android Developer based in Pune, India. He has 3+ years of experience building mobile apps and web platforms.",
    "Kalpesh specializes in Android (Kotlin, Java), Flutter, React, Next.js, and modern web technologies. He's passionate about clean code and intuitive design.",
  ],
  skills: [
    "Kalpesh's top skills include:\n• Android Development (Kotlin, Java)\n• Flutter & Cross-platform\n• React & Next.js\n• Node.js & Firebase\n• UI/UX Design",
    "He's highly proficient in mobile development (Android, Flutter) and frontend technologies (React, Next.js, TypeScript).",
  ],
  projects: [
    "Some of Kalpesh's notable projects:\n• VOCOxS Guard App - Security attendance with face detection\n• Prime Learning - Educational app for students\n• VOCOxS Security Agency - Multi-campus management",
    "His projects include enterprise Android apps, Flutter educational platforms, and full-stack web applications.",
  ],
  contact: [
    "You can reach Kalpesh at: shindekalpesharun@gmail.com",
    "Contact him via:\n• Email: shindekalpesharun@gmail.com\n• LinkedIn: linkedin.com/in/shindekalpesharun\n• GitHub: github.com/shindekalpesharun",
  ],
  hire: [
    "Great choice! Kalpesh is available for freelance projects. Check out the Services window for pricing tiers, or email him directly at shindekalpesharun@gmail.com",
    "He's currently accepting new projects! Visit the Contact window to reach out.",
  ],
  default: [
    "I'm not sure about that. Try asking about:\n• 'about' - Learn about Kalpesh\n• 'skills' - See his tech stack\n• 'projects' - View his work\n• 'contact' - Get in touch\n• 'hire' - Hire him!",
  ],
};