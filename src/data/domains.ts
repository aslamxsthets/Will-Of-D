export interface Domain {
  id: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  iconName: string;
  color: string;
}

export const domains: Domain[] = [
  {
    id: 'technical',
    title: 'TECHNICAL',
    tagline: 'Build it. Break it. Fix it. Repeat.',
    description: 'The backbone of the crew. From web development to cybersecurity, AI/ML to cloud computing — this is where ideas become reality.',
    items: ['Development', 'Cybersecurity', 'AI/ML', 'Cloud', 'Technical Projects'],
    iconName: 'Code2',
    color: '#c41e2a',
  },
  {
    id: 'creative',
    title: 'CREATIVE',
    tagline: 'Make ideas impossible to ignore.',
    description: 'Where aesthetics meet purpose. Designing interfaces, brands, and visual experiences that demand attention.',
    items: ['Graphic Design', 'UI/UX', 'Visual Design', 'Branding', 'Creative Direction'],
    iconName: 'Palette',
    color: '#e91e63',
  },
  {
    id: 'media',
    title: 'MEDIA',
    tagline: 'If it happened, we probably need a picture.',
    description: 'Capturing moments, creating content, and telling the crew\'s story through visual media.',
    items: ['Photography', 'Videography', 'Social Media', 'Visual Coverage', 'Media Production'],
    iconName: 'Camera',
    color: '#9c27b0',
  },
  {
    id: 'events',
    title: 'EVENTS / MANAGEMENT',
    tagline: 'Someone has to make the chaos organized.',
    description: 'Turning ambitious ideas into executed reality. Planning, coordinating, and delivering experiences.',
    items: ['Planning', 'Coordination', 'Hosting', 'Event Execution', 'Operations'],
    iconName: 'Calendar',
    color: '#ff5722',
  },
  {
    id: 'content',
    title: 'CONTENT & RESEARCH',
    tagline: 'Ideas are great. Documented ideas are better.',
    description: 'Researching, writing, and sharing knowledge. Making sure what we learn doesn\'t stay locked in our heads.',
    items: ['Writing', 'Documentation', 'Research', 'Technical Content', 'Knowledge Sharing'],
    iconName: 'FileText',
    color: '#2196f3',
  },
  {
    id: 'community',
    title: 'COMMUNITY',
    tagline: 'A crew works better together.',
    description: 'Building connections, fostering collaboration, and making sure everyone feels like they belong.',
    items: ['Collaboration', 'Peer Learning', 'Networking', 'Team Activities', 'Community Building'],
    iconName: 'Users',
    color: '#4caf50',
  },
];

export const recruitmentRoles = [
  {
    team: 'TECHNICAL TEAM',
    roles: ['Developers', 'Cybersecurity', 'AI/ML', 'Cloud'],
    iconName: 'Code2',
  },
  {
    team: 'CREATIVE TEAM',
    roles: ['Design', 'UI/UX', 'Graphics'],
    iconName: 'Palette',
  },
  {
    team: 'MEDIA TEAM',
    roles: ['Photography', 'Videography', 'Social Media'],
    iconName: 'Camera',
  },
  {
    team: 'CONTENT TEAM',
    roles: ['Writing', 'Documentation', 'Research'],
    iconName: 'FileText',
  },
  {
    team: 'MANAGEMENT TEAM',
    roles: ['Planning', 'Hosting', 'Coordination'],
    iconName: 'Calendar',
  },
];
