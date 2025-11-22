import { Project, ProjectCategory, Experience, Comment } from './types';

export const PROFILE = {
  name: "Sagar Parmar",
  role: "YouTube Content Producer | Motion Graphics Artist",
  email: "parmarsagarsagar@gmail.com",
  location: "Rajkot, Gujarat",
  avatar: "https://picsum.photos/id/64/200/200",
  banner: "https://picsum.photos/id/180/1200/300",
  subscribers: "100K+",
  videos: "80+",
  bio: "Multi-skilled content creator with 8+ years in YouTube production, motion graphics, and AI-powered workflows. Proven track record growing channels from 5K to 100K+. Expert in blending creative motion design with technical AI proficiency."
};

export const SKILLS = [
  "Adobe After Effects", "Premiere Pro", "Figma", "React", "TypeScript", 
  "Gemini API", "Midjourney", "ElevenLabs", "Stable Diffusion", "YouTube Analytics"
];

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    role: "Visual Designer",
    company: "Lighthouse Media Communications",
    period: "Feb 2025 – Present",
    location: "Rajkot, India",
    description: [
      "Produce 3-5 motion graphics reels weekly for multiple brands.",
      "Design 10+ unique Instagram carousels per client monthly.",
      "Translate complex client briefs into compelling visual narratives."
    ]
  },
  {
    id: "2",
    role: "YouTube Content Producer",
    company: "Karuna Foundation Trust",
    period: "Jul 2023 – Feb 2025",
    location: "Rajkot, India",
    description: [
      "Scaled YouTube channel from 5K to 100K+ subscribers in 24 months.",
      "Created 2 viral videos generating 2-3M combined views.",
      "Deployed professional virtual studio setup for live streaming."
    ]
  },
  {
    id: "3",
    role: "Graphic & UI/UX Designer",
    company: "WeyBee Solutions Pvt Ltd",
    period: "Dec 2020 – Jul 2023",
    location: "Remote",
    description: [
      "Led motion graphics and UI design projects for healthcare clients.",
      "Produced engaging visual effects for advertisements."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "subtitle-studio",
    title: "Subtitle Studio – AI-Powered Transcription Web App",
    thumbnail: "https://picsum.photos/id/1/1280/720",
    duration: "Demo",
    views: "1.2K",
    uploadDate: "2 days ago",
    category: ProjectCategory.WEB_APPS,
    tags: ["React 19", "Google Gemini API", "TypeScript", "Tailwind"],
    skills: ["Full Stack Development", "UI/UX Design", "AI Integration"],
    description: "Conceptualized, designed, and deployed a full-featured web application for AI-powered subtitle generation with word-level timestamps. Solved personal production pain points by creating an accessible tool for content creators requiring accurate transcription in 15+ languages."
  },
  {
    id: "viral-animal-welfare",
    title: "Viral Animal Welfare Campaign (2M+ Views)",
    thumbnail: "https://picsum.photos/id/237/1280/720",
    duration: "12:45",
    views: "2.1M",
    uploadDate: "1 year ago",
    category: ProjectCategory.DOCUMENTARY,
    tags: ["Documentary", "Social Cause", "Viral"],
    skills: ["Scripting (Claude)", "Voiceover (ElevenLabs)", "Editing"],
    description: "Scripted, edited, and produced high-impact videos on controversial animal welfare topics. Utilized AI workflow: Claude for scriptwriting, ElevenLabs for voiceover, Runway ML for B-roll enhancement. Achieved organic viral reach through strategic thumbnail design."
  },
  {
    id: "motion-graphics-yas",
    title: "High-End Motion Graphics Showcase",
    thumbnail: "https://picsum.photos/id/250/1280/720",
    duration: "01:30",
    views: "5.4K",
    uploadDate: "3 months ago",
    category: ProjectCategory.MOTION_GRAPHICS,
    tags: ["After Effects", "Kinetic Typography", "Data Viz"],
    skills: ["Animation", "Visual Storytelling", "Adobe Creative Suite"],
    description: "Created high-production-value motion graphics demo showcasing infographic animation, kinetic typography, and data visualization skills. Delivered broadcast-quality output demonstrating technical proficiency."
  },
  {
    id: "virtual-studio-setup",
    title: "Virtual Studio Setup & Live Stream Config",
    thumbnail: "https://picsum.photos/id/48/1280/720",
    duration: "15:00",
    views: "8.9K",
    uploadDate: "8 months ago",
    category: ProjectCategory.VIDEO_PRODUCTION,
    tags: ["OBS Studio", "Live Streaming", "Virtual Sets"],
    skills: ["Technical Direction", "Hardware Setup", "Broadcast"],
    description: "Designed and deployed professional virtual studio setup for live news streaming across YouTube and Facebook, ensuring broadcast-quality output for Karuna Foundation Trust."
  },
  {
    id: "healthcare-ui-ux",
    title: "Healthcare App UI/UX Design System",
    thumbnail: "https://picsum.photos/id/180/1280/720",
    duration: "03:45",
    views: "3.2K",
    uploadDate: "2 years ago",
    category: ProjectCategory.WEB_APPS,
    tags: ["Figma", "Prototyping", "User Research"],
    skills: ["UI Design", "UX Research", "Mobile Design"],
    description: "Led motion graphics and UI design projects for healthcare industry clients, creating user-centric digital experiences across web and mobile platforms at WeyBee Solutions."
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: "c1",
    user: "Recruiter Dave",
    avatar: "https://picsum.photos/id/65/50/50",
    content: "Impressive use of the Gemini API in the Subtitle Studio project. Are you open to freelance work?",
    likes: 12,
    timestamp: "1 day ago",
    isPinned: true
  },
  {
    id: "c2",
    user: "Creative Lead Sarah",
    avatar: "https://picsum.photos/id/66/50/50",
    content: "The motion graphics on the intro are silky smooth. Did you use expressions for the typography?",
    likes: 5,
    timestamp: "4 hours ago"
  }
];
