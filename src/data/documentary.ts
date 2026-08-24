export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  location: string;
  content: string[];
  highlights: string[];
  quote?: string;
  mediaCategory: 'assets' | 'images' | 'project photos' | 'achivements' | 'videos' | 'certificate';
  imagePlaceholder?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  impact: string;
  techStack: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  timeline: string;
  image?: string;
  featured?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  level: 'National' | 'State' | 'District' | 'International';
  description: string;
  badge: string;
  image?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description: string;
  credentialUrl?: string;
  image?: string;
}

export const DHANANJAY_BIO = {
  name: "Dhananjay Misal",
  title: "Entrepreneur • Startup Founder • Student",
  tagline: "Building Ideas. Creating Impact. Inspiring Innovation.",
  location: "Maharashtra, India",
  email: "misaldhananjay26@gmail.com",
  socials: {
    github: "https://github.com/misaldhananjay26-beep",
    linkedin: "https://www.linkedin.com/in/dhananjay-misal-74a926307?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/dhananjay_misal_official?igsh=MTdpcDQ0dDFxZWFqeg==",
    email: "mailto:misaldhananjay26@gmail.com"
  },
  typingWords: [
    "Building Innovation",
    "Creating Impact",
    "Creating for Society",
    "Learning Every Day",
    "Leading Through Technology"
  ],
  stats: [
    { label: "Students Mentored", value: "300+", suffix: "" },
    { label: "National Recognitions", value: "Top 10", suffix: " @ IIT Delhi" },
    { label: "Runner-Up Finish", value: "1st", suffix: " Runner-Up @ IIT Delhi" },
    { label: "Innovations Built", value: "12+", suffix: " Projects" }
  ]
};

export const DOCUMENTARY_CHAPTERS: Chapter[] = [
  {
    id: 1,
    slug: "where-it-all-began",
    title: "Chapter 1: Where It All Began",
    subtitle: "Discovering Curiosity at PPS ATL Lab",
    period: "Class 9",
    location: "Pravara Public School Atal Tinkering Lab",
    content: [
      "My journey into technology began during Class 9 when I became deeply fascinated by Artificial Intelligence, Robotics, Electronics, Programming, and Innovation.",
      "Everything changed when I joined the Pravara Public School Atal Tinkering Lab (PPS ATL Lab). It wasn't just a lab — it became the sanctuary where I transformed raw curiosity into real-world innovation.",
      "Instead of only studying technology in textbooks, I started building it. Every single day became an opportunity to experiment, create, fail, improve, and learn."
    ],
    highlights: ["Class 9 Genesis", "PPS ATL Lab", "Artificial Intelligence", "First Experiments"],
    quote: "Technology is not just something to study — it is a canvas to build solutions for human problems.",
    mediaCategory: "assets",
    imagePlaceholder: "/images/Official photo of Dhananjay Misal atl.jpg"
  },
  {
    id: 2,
    slug: "learning-by-building",
    title: "Chapter 2: Learning by Building",
    subtitle: "Hands-on Mastery Across Emerging Tech",
    period: "Class 9 - Class 10",
    location: "PPS ATL Innovation Hub",
    content: [
      "At PPS ATL Lab, I systematically explored emerging technology domains: Artificial Intelligence, Robotics, Electronics, IoT, Embedded Systems, Product Development, Entrepreneurship, and Large Language Models (LLMs).",
      "I rejected passive learning in favor of practical, project-first execution. Every hardware prototype and software algorithm made me a more resilient problem solver.",
      "Building physical circuits, debugging firmware, and training neural networks taught me that real engineering lies in the iteration process."
    ],
    highlights: ["IoT & Embedded Systems", "Robotics & Hardware", "LLMs & AI Software", "Product Prototyping"],
    quote: "Theoretical knowledge provides the blueprint, but building with your hands creates the foundation.",
    mediaCategory: "project photos",
    imagePlaceholder: "/project photos/making rocket.jpg"
  },
  {
    id: 3,
    slug: "first-national-achievement",
    title: "Chapter 3: My First National Achievement",
    subtitle: "Smart Glasses for Visually Impaired People at IIT Delhi",
    period: "Class 9",
    location: "IIT Delhi, New Delhi",
    content: [
      "Towards the end of Class 9, I received the monumental opportunity to represent my school at IIT Delhi.",
      "We conceptualized and developed Smart Glasses for Visually Impaired People. Our goal was to make navigation safer, intuitive, and independent for blind individuals using real-time ultrasonic and AI vision assistance.",
      "Competing against top innovation teams from across India was a transformative milestone. Our startup was selected among the Top 10 Best Teams in India.",
      "For the first time in my life, I realized that age is never a barrier to innovation."
    ],
    highlights: ["Top 10 in India", "IIT Delhi Stage", "Smart Glasses Assistive Tech", "National Recognition"],
    quote: "When you build technology that helps someone see or navigate the world, innovation becomes deeply human.",
    mediaCategory: "achivements",
    imagePlaceholder: "/project photos/presenting ai smart glasses for blind people.jpg"
  },
  {
    id: 4,
    slug: "becoming-a-mentor",
    title: "Chapter 4: Becoming a Mentor",
    subtitle: "Empowering 300+ Students Across Schools",
    period: "Class 10",
    location: "Regional Schools & ATL Hubs",
    content: [
      "During Class 10, my journey underwent a profound shift. I was no longer only learning and building for myself — I started teaching.",
      "I conducted workshops and hands-on sessions on Artificial Intelligence, Robotics, Innovation, INSPIRE MANAK, Electronics, ATL Competitions, and Startup Thinking.",
      "Many visiting schools toured our ATL Lab. Over time, I had the privilege of mentoring more than 300 students, guiding them through their very first steps in technology and ideation.",
      "Sharing knowledge and watching a younger student's eyes light up with understanding became one of the most meaningful highlights of my entire journey."
    ],
    highlights: ["300+ Students Mentored", "INSPIRE MANAK Workshops", "ATL Competition Guidance", "Knowledge Sharing"],
    quote: "The highest goal of learning is not keeping knowledge to yourself, but empowering others to build their own dreams.",
    mediaCategory: "images",
    imagePlaceholder: "/project photos/guiding students on robotics and AI.jpg"
  },
  {
    id: 5,
    slug: "competitions-and-growth",
    title: "Chapter 5: Competitions and Growth",
    subtitle: "From District to National Arenas",
    period: "Class 10 - Present",
    location: "District • State • National Level",
    content: [
      "Alongside mentoring, I continued building hardware and software solutions and competing in innovation forums.",
      "Our innovations steadily progressed through the hierarchy: District Level → State Level → National Level.",
      "Every competition provided invaluable lessons in technical rigor, leadership, teamwork, clear communication, and calm execution under pressure."
    ],
    highlights: ["District → State → National", "Pitch Presentations", "Team Leadership", "Technical Rigor"],
    quote: "Competitions are not about defeating others; they are about pressure-testing your ideas against real-world challenges.",
    mediaCategory: "achivements",
    imagePlaceholder: "/achivements/Official photo of Dhananjay Misal iit delhi 1st runner up.jpg"
  },
  {
    id: 6,
    slug: "entrepreneurship-journey",
    title: "Chapter 6: Entrepreneurship Journey",
    subtitle: "Expanding Horizons into Startups & Business Strategy",
    period: "Ongoing",
    location: "COEP Pune, IMUN, Varroc, NIBE",
    content: [
      "My curiosity expanded beyond technology into business strategy, venture creation, and startup operations.",
      "I attended startup workshops, entrepreneurship bootcamps, industrial visits, and high-impact forums.",
      "Key milestones include participating in the COEP I2I Entrepreneurship Competition, representing India, Turkey, and Israel in International Model United Nations (IMUN), an industrial visit to Varroc, and visiting the inauguration ceremony of NIBE Private Limited as a student to explore defense technology and industrial innovations.",
      "These multi-dimensional experiences forged my strategic entrepreneurial mindset."
    ],
    highlights: ["COEP I2I Competition", "International Model UN", "Varroc Industrial Visit", "NIBE Pvt Ltd Student Visit"],
    quote: "An idea without a sustainable model is a project; an idea executed with vision and strategy becomes a startup.",
    mediaCategory: "images",
    imagePlaceholder: "/project photos/attending first imun.jpg"
  },
  {
    id: 7,
    slug: "returning-to-iit-delhi",
    title: "Chapter 7: Returning to IIT Delhi",
    subtitle: "CleanSense AutoSan — 1st Runner-Up at IIT Delhi",
    period: "Class 10 / High School",
    location: "IIT Delhi, New Delhi",
    content: [
      "I returned to the prestigious halls of IIT Delhi for a second time — this time bringing CleanSense AutoSan.",
      "CleanSense AutoSan is an AI and IoT-powered smart sanitation monitoring system engineered specifically for railway compartments and public facilities.",
      "The device continuously monitors Water Levels, Odor Levels, Overall Hygiene Scores, and Cleaning Status in real-time to streamline municipal and railway maintenance.",
      "This innovation earned the First Runner-Up position in India. Holding that trophy at IIT Delhi remains one of the proudest moments of my life."
    ],
    highlights: ["1st Runner-Up @ IIT Delhi", "CleanSense AutoSan", "IoT & AI Sanitation Tech", "Railway & Public Hygiene"],
    quote: "True innovation targets ignored problems — like public sanitation — and transforms them with smart engineering.",
    mediaCategory: "achivements",
    imagePlaceholder: "/achivements/Official photo of Dhananjay Misal iit delhi.jpg"
  },
  {
    id: 8,
    slug: "building-arjuna",
    title: "Chapter 8: Building Arjuna",
    subtitle: "Democratizing AI & Technology Education for All",
    period: "Current Focus",
    location: "India / Global Online Platform",
    content: [
      "I believe deeply that quality education should be accessible to every passionate student regardless of background or financial status.",
      "That conviction inspired me to found Arjuna — a free AI-powered learning platform designed for young minds who are eager to learn technology but don't know where to start.",
      "Arjuna empowers students through practical, project-based learning in Artificial Intelligence, Programming, Robotics, Electronics, IoT, and Entrepreneurship.",
      "Its core mission is to eradicate learning barriers and equip every curious student with high-grade technical mastery."
    ],
    highlights: ["Arjuna Founder", "Free AI Education", "Project-Based Learning", "Social Entrepreneurship"],
    quote: "Arjuna is built on a simple promise: passion should be the only requirement to learn technology, never privilege.",
    mediaCategory: "project photos",
    imagePlaceholder: "/project photos/taking students session on inspire Manak.jpg"
  },
  {
    id: 9,
    slug: "the-journey-continues",
    title: "Chapter 9: The Journey Continues",
    subtitle: "Creating Technology That Improves Human Lives",
    period: "Future Unfolding",
    location: "Global Impact",
    content: [
      "Innovation is not a temporary destination for me. It is my way of life.",
      "Every obstacle teaches a vital lesson. Every project creates measurable social impact. Every student I mentor reminds me why I started this path.",
      "Every new idea brings me one step closer to engineering technology that uplifts society.",
      "And this is only the beginning."
    ],
    highlights: ["Lifelong Learning", "Social Impact Tech", "Global Vision", "Next Generation Startups"],
    quote: "This is not the end of a portfolio — it is the beginning of a lifelong mission to innovate for humanity.",
    mediaCategory: "assets",
    imagePlaceholder: "/images/Official photo of Dhananjay Misal.jpg"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "arjuna-ai",
    title: "Arjuna — AI Learning Ecosystem",
    category: "EdTech & Artificial Intelligence",
    tagline: "Free AI-powered project-based learning platform for young innovators.",
    description: "Arjuna democratizes technical education by providing free interactive learning modules in AI, Robotics, Electronics, IoT, and Entrepreneurship. Features adaptive AI tutoring, interactive circuit simulators, and guided project roadmaps.",
    impact: "Impacted 300+ students across schools with zero-cost access to hands-on technology education.",
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Gemini API", "Python", "WebSockets"],
    features: ["Adaptive AI Mentor", "Interactive Electronics Labs", "Project Milestone Tracker", "Peer Innovation Hub"],
    demoUrl: "https://arjunaedu.vercel.app",
    timeline: "2024 - Present",
    featured: true
  },
  {
    id: "smart-glasses",
    title: "Smart Glasses for Visually Impaired",
    category: "Assistive Hardware & AI Vision",
    tagline: "Top 10 Best Innovation in India @ IIT Delhi",
    description: "Wearable assistive smart glasses equipped with ultrasonic distance sensors, computer vision object detection, and auditory feedback to enable blind and visually impaired individuals to navigate independently.",
    impact: "Awarded Top 10 Team in India out of thousands of national entries at IIT Delhi.",
    techStack: ["Embedded C++", "Raspberry Pi / Arduino", "Ultrasonic Sensors", "OpenCV", "Text-to-Speech"],
    features: ["Real-time Obstacle Avoidance", "Audio Navigation Prompts", "Lightweight Frame Design", "Emergency SOS Alert"],
    timeline: "Class 9",
    featured: true
  },
  {
    id: "cleansense-autosan",
    title: "CleanSense AutoSan",
    category: "Smart Sanitation & IoT",
    tagline: "1st Runner-Up @ IIT Delhi National Competition",
    description: "AI and IoT-powered automated sanitation monitoring unit engineered for railway toilets and public facilities. Monitors water levels, odor intensity, cleaning intervals, and alerts maintenance staff automatically.",
    impact: "Recognized as 1st Runner-Up at IIT Delhi for solving critical public health and railway sanitation issues.",
    techStack: ["ESP32 / IoT Node", "Gas & Odor Sensors", "Ultrasonic Liquid Level", "MQTT / Firebase", "React Dashboard"],
    features: ["Real-time Air Quality & Odor Index", "Automated Water Tank Monitoring", "Maintenance Staff SMS/Push Dispatch", "Predictive Hygiene Scoring"],
    demoUrl: "https://cleansenseautosan.in/",
    timeline: "Class 10",
    featured: true
  },
  {
    id: "atl-mentor-hub",
    title: "ATL Student Mentorship Network",
    category: "Social Leadership & STEM Mentorship",
    tagline: "Empowered 300+ students in AI & Robotics",
    description: "A structured hands-on curriculum and workshop program developed at Pravara Public School ATL Lab to guide middle and high school students through INSPIRE MANAK, regional science fairs, and robotics competitions.",
    impact: "Guided 300+ students to build their first circuits, code AI models, and compete nationally.",
    techStack: ["Arduino", "MIT App Inventor", "Python", "Tinkercad", "Raspberry Pi"],
    features: ["Hands-on Tinkering Labs", "INSPIRE MANAK Pitch Preparation", "3D Printing & Electronics Basics"],
    timeline: "Class 10 - Ongoing",
    featured: false
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "iit-delhi-autosan",
    title: "1st Runner-Up — CleanSense AutoSan",
    organization: "IIT Delhi National Innovation Challenge",
    year: "National Level",
    level: "National",
    description: "Awarded 1st Runner-Up trophy at IIT Delhi for CleanSense AutoSan, an AI & IoT smart sanitation system designed for public and railway hygiene.",
    badge: "1st Runner-Up @ IIT Delhi"
  },
  {
    id: "iit-delhi-smart-glasses",
    title: "Top 10 Best Teams in India — Smart Glasses",
    organization: "IIT Delhi National Startup Summit",
    year: "National Level",
    level: "National",
    description: "Selected among the Top 10 Best Teams across India for developing assistive Smart Glasses for visually impaired navigation.",
    badge: "Top 10 in India"
  },
  {
    id: "coep-i2i",
    title: "COEP I2I Entrepreneurship Competition",
    organization: "College of Engineering Pune (COEP)",
    year: "State/National Level",
    level: "State",
    description: "Pitched startup ideas at COEP Ideas to Implementation (I2I), gaining mentorship from top investors and industry leaders.",
    badge: "Startup Pitch Finalist"
  },
  {
    id: "imun-diplomacy",
    title: "International Model United Nations (IMUN)",
    organization: "IMUN Global Conference",
    year: "International",
    level: "International",
    description: "Represented India, Turkey, and Israel across multiple international committees, developing strategic negotiation, public speaking, and policy analysis skills.",
    badge: "International Delegate"
  },
  {
    id: "nibe-inauguration",
    title: "Student Visit — NIBE Pvt Ltd Inauguration",
    organization: "NIBE Private Limited",
    year: "Defense Tech Exploration",
    level: "National",
    description: "Visited the inauguration ceremony of NIBE Private Limited as a student explorer, gaining firsthand exposure to advanced defense technology, manufacturing setups, and industrial innovation.",
    badge: "Defense Tech Exploration"
  }
];

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "cert-iit-delhi-1",
    title: "National Innovation Finalist & Runner-Up",
    issuer: "IIT Delhi",
    date: "National Recognition",
    category: "Innovation & Robotics",
    description: "Certificate of excellence for ranking 1st Runner-Up in National Innovation Challenge."
  },
  {
    id: "cert-iit-delhi-2",
    title: "Top 10 National Startup Innovator",
    issuer: "IIT Delhi",
    date: "National Recognition",
    category: "Assistive Technology",
    description: "Certificate for Top 10 position in India for Smart Glasses for Visually Impaired."
  },
  {
    id: "cert-atl-mentor",
    title: "Certified ATL Student Innovator & Mentor",
    issuer: "Pravara Public School ATL Lab / NITI Aayog Network",
    date: "Mentorship",
    category: "Leadership & Education",
    description: "Recognition for outstanding contributions in mentoring 300+ students in AI, Robotics & Electronics."
  },
  {
    id: "cert-imun",
    title: "International Delegate Certificate",
    issuer: "International Model United Nations",
    date: "Diplomacy",
    category: "Global Leadership",
    description: "Certificate of participation and diplomacy representing multiple nation committees."
  }
];
