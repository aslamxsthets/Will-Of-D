export interface TeamMember {
  id: string;
  name: string;
  role: string;
  domain: string;
  description: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'President',
    domain: 'Leadership',
    description: 'Keeps the crew moving forward and the chaos organized.',
    socials: { github: '#', linkedin: '#' },
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    role: 'Vice President',
    domain: 'Leadership',
    description: 'The strategic mind behind every crew operation.',
    socials: { github: '#', linkedin: '#' },
  },
  {
    id: '3',
    name: 'Raj Patel',
    role: 'Technical Lead',
    domain: 'Technical',
    description: 'Builds things, breaks things, then fixes them better.',
    socials: { github: '#', linkedin: '#' },
  },
  {
    id: '4',
    name: 'Maya Johnson',
    role: 'Creative Lead',
    domain: 'Creative',
    description: 'Makes everything look like it belongs on a comic cover.',
    socials: { linkedin: '#' },
  },
  {
    id: '5',
    name: 'Jordan Kim',
    role: 'Media Lead',
    domain: 'Media',
    description: 'If it happened, there\'s probably a photo by Jordan.',
    socials: { linkedin: '#' },
  },
  {
    id: '6',
    name: 'Priya Sharma',
    role: 'Content Lead',
    domain: 'Content & Research',
    description: 'Turns complex ideas into readable stories.',
    socials: { github: '#', linkedin: '#' },
  },
  {
    id: '7',
    name: 'Marcus Williams',
    role: 'Events Lead',
    domain: 'Events / Management',
    description: 'The person who makes sure nothing falls through the cracks.',
    socials: { linkedin: '#' },
  },
  {
    id: '8',
    name: 'Luna Garcia',
    role: 'Community Lead',
    domain: 'Community',
    description: 'Makes sure everyone feels like they belong in the crew.',
    socials: { github: '#', linkedin: '#' },
  },
];
