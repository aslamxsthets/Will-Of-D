# Deadpool Crew — Comic Book Club Website

A modern, interactive comic-book themed website for the Deadpool Crew student organization.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📦 Production Build

```bash
npm run build
```

## 🔧 Environment Configuration

### Recruitment Form Endpoint

The recruitment form uses a third-party form submission service. Configure the endpoint in your environment:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Set your form endpoint:
   ```
   VITE_RECRUITMENT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
   ```

### Supported Form Services

- **Formspree**: `https://formspree.io/f/{form-id}`
- **Web3Forms**: `https://api.web3forms.com/submit`
- **FormSubmit**: `https://formsubmit.co/your@email.com`

If no endpoint is configured, the form will display a configuration message without faking a successful submission.

## 🏗️ Architecture

```
src/
├── components/
│   ├── Navbar/          - Sticky navigation with mobile menu
│   ├── Hero/            - Full-screen comic cover hero
│   ├── About/           - Club introduction panels
│   ├── WhatWeDo/        - Six domain panels
│   ├── WhyJoin/         - Benefits panels
│   ├── Recruitment/     - Recruitment info & roles
│   ├── RecruitmentForm/ - Full application form
│   ├── Team/            - Team member cards
│   └── Footer/          - Back cover & footer
├── data/
│   ├── domains.ts       - Club domains/teams data
│   ├── team.ts          - Team member data
│   └── navigation.ts    - Navigation items
├── services/
│   └── recruitmentForm.ts - Form submission service
├── hooks/
│   ├── usePageTurn.ts   - 3D page-turn scroll effect
│   └── useReducedMotion.ts - Accessibility hook
├── App.tsx              - Main application
├── main.tsx             - Entry point
└── index.css            - Global styles & comic theme
```

## 🎨 Design Features

- Comic-book page-turn scrolling (3D transforms)
- Custom comic cursor (desktop only)
- Hero cursor-following parallax
- Halftone textures & ink splatters
- Comic panels with hover effects
- Speech bubbles & caption boxes
- Responsive design (mobile-first)
- Reduced motion support
- Accessible form with validation

## 📱 Responsive Behavior

- **Desktop**: Full 3D page-turn, custom cursor, parallax
- **Tablet**: Reduced 3D depth, simplified transitions
- **Mobile**: Simplified transitions, no custom cursor
- **Reduced Motion**: Minimal animations, fade transitions

## 🔒 Security

- No secrets in frontend code
- HTTPS-only form endpoints
- Input validation & sanitization
- No fake database or localStorage

## 📄 License

Internal use for Deadpool Crew student organization.
