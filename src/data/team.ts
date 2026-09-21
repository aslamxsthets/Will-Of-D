export interface TeamMember {
  id: string;
  name: string;
  role: string;
  domain: string;
  description: string;
  image?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}

const publicAsset = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Aslam Javeed M',
    role: 'Founder & President\n(Captain)',
    domain: 'Leadership',
    description: 'The genius behind the madness and somehow is still in charge.',
    image: publicAsset('aslam-profile.jpeg'),
    socials: {
      github: 'https://github.com/aslamxsthets/',
      linkedin: 'https://www.linkedin.com/in/aj49/',
      portfolio: 'https://aslamxsthets.github.io/Portfolio-Gear5/',
    },
  },
  {
    id: '2',
    name: 'Akash M',
    role: 'Co-Founder & Vice President\n(First-Mate)',
    domain: 'Leadership',
    description: 'The strategic mind behind every community operation.',
    image: publicAsset('akash-profile.jpeg'),
    socials: {
      github: 'https://github.com/Akash-iot',
      linkedin: 'https://www.linkedin.com/in/akash2201/',
      portfolio: 'https://public-eight-sigma-25.vercel.app/',
    },
  },

];