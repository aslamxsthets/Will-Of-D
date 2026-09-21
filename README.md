# Will Of D Crew — Comic Book Club Website

A modern, interactive comic-book themed website for the Will Of D Crew student organization.

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
│   └── UI/              - Reusable UI pieces: DomainIcon, BlurFade, NumberTicker,
│                          TextShimmer, WordPullUp, SectionHeading,
│                          ScrollProgress, BackToTop
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
└── index.css            - Global styles, comic theme & the 3D background scene
```

## 🎨 Design Features

- **Instant 3D Will Of D scene** — a local, preloaded asset painted on the very
  first frame (a `#dp-boot` layer renders it before React mounts), then handed
  over to the animated scene with no visible swap
- **Real 3D depth** — perspective stage, per-layer scroll parallax, and a small
  Y rotation that turns the artwork toward you as you scroll
- **GIF-like body motion** — mask, raised arm, torso, ink-drip tail and wordmark
  each pivot around their own joint, layered over an untouched base so the ink
  outline never tears (pure CSS, no per-frame JavaScript)
- Comic-book page-turn scrolling between sections
- Halftone textures, action lines & ink splatters
- Comic panels, speech bubbles & caption boxes
- Reading-progress bar and back-to-top control
- Responsive design (mobile-first)
- Reduced motion support — the scene falls back to the static artwork
- Accessible form with inline validation, error summary and focus management

## 📱 Responsive Behavior

- **Desktop**: Full 3D page-turn, full scene motion and parallax
- **Tablet**: Reduced 3D depth, simplified transitions
- **Mobile**: Simplified transitions; the expensive scene effects (sweep, glint,
  full-viewport blur) are dropped and the tilt is reduced
- **Reduced Motion**: All scene and page-turn animation disabled, so the visitor
  gets the original static artwork

## 🔒 Security

- No secrets in frontend code
- HTTPS-only form endpoints
- Input validation & sanitization
- No fake database or localStorage

## 📄 License

Internal use for Will Of D Crew student organization.