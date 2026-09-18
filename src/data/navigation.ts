export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export const navItems: NavItem[] = [
  { label: 'HOME', href: '#hero', id: 'hero' },
  { label: 'ABOUT', href: '#about', id: 'about' },
  { label: 'WHAT WE DO', href: '#what-we-do', id: 'what-we-do' },
  { label: 'WHY JOIN', href: '#why-join', id: 'why-join' },
  { label: 'RECRUITMENT', href: '#recruitment', id: 'recruitment' },
  { label: 'TEAM', href: '#team', id: 'team' },
  { label: 'JOIN US', href: '#recruitment-form', id: 'recruitment-form' },
];
