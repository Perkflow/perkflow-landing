# Perkflow Landing Page

Marketing website for Perkflow - Employee Recognition & Rewards Platform.

## 🌐 Live Site

- **Production:** https://perkflow.io

## 🚀 Technology Stack

- **Framework:** Next.js 16
- **Language:** TypeScript 5
- **UI:** React 19
- **Styling:** Tailwind CSS 4
- **i18n:** next-intl
- **Animation:** Framer Motion
- **Icons:** Lucide React, React Icons

## 📁 Project Structure

```
perkflow-landing/
├── app/
│   ├── [locale]/              # i18n routes (en, es)
│   │   ├── page.tsx          # Home page
│   │   ├── automated-rewards/
│   │   ├── gifts/
│   │   ├── trips/
│   │   ├── award-ceremony/
│   │   ├── enterprise/
│   │   ├── company/
│   │   ├── careers/
│   │   ├── contact/
│   │   ├── news/
│   │   ├── articles/
│   │   ├── resources/
│   │   ├── terms/
│   │   ├── why-us/
│   │   └── waitlist/
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Shadcn UI components
│   ├── i18n/                 # Language switcher
│   ├── layouts/              # Layout components
│   └── analytics/            # Google Analytics
├── features/
│   └── (trip-website)/       # Marketing page components
├── i18n/
│   ├── request.ts           # i18n config
│   └── navigation.ts        # i18n routing
├── messages/
│   ├── en.json              # English translations
│   └── es.json              # Spanish translations
├── public/                  # Static assets
├── assets/                  # Images, icons, etc.
└── middleware.ts            # i18n middleware
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:Perkflow/perkflow-landing.git
cd perkflow-landing

# Install dependencies
npm install --legacy-peer-deps

# Create environment file
cp .env.example .env.local
```

### Environment Variables

```env
# App URL for CTAs
NEXT_PUBLIC_APP_URL=https://app.perkflow.io

# CMS (if using)
NEXT_PUBLIC_PAYLOAD_CMS_URL=

# Media CDN
NEXT_PUBLIC_CLOUDFRONT_URL=

# Analytics
NEXT_PUBLIC_GA_ID=
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🌍 Internationalization

The site supports multiple languages using `next-intl`:

- **English** (default): `/en/*`
- **Spanish**: `/es/*`

Routes automatically include the locale prefix. The middleware handles language detection and routing.

### Adding a New Language

1. Create a new translation file in `messages/[locale].json`
2. Add the locale to `i18n/request.ts` and `i18n/navigation.ts`
3. Update the middleware config in `middleware.ts`

## 🎨 Styling

Uses Tailwind CSS 4 with custom configuration:

- Design tokens defined in `tailwind.config.js`
- Global styles in `app/globals.css`
- Component-specific styles using Tailwind utilities

## 📝 Content Management

Marketing content is organized by feature:

- **Landing Pages:** `features/(trip-website)/landing-pages/`
- **Automated Rewards:** `features/(trip-website)/automated-rewards/`
- **Trips:** `features/(trip-website)/trips/`
- **Gifts:** `features/(trip-website)/gifts/`
- **Awards:** `features/(trip-website)/award-ceremony/`

## 🔗 Related Repositories

- **Application:** [perkflow-frontend](https://github.com/Perkflow/perkflow-frontend)
  - Admin & participant portals
  - Domain: app.perkflow.io

## 📦 Key Dependencies

```json
{
  "@radix-ui/react-*": "UI primitives",
  "next-intl": "Internationalization",
  "framer-motion": "Animations",
  "react-hook-form": "Forms",
  "zod": "Validation",
  "axios": "HTTP client",
  "sonner": "Toasts"
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Import repository in Vercel
2. Set environment variables
3. Configure domains:
   - perkflow.io
   - www.perkflow.io
4. Deploy

### Other Platforms

The project uses Next.js standalone output mode. Follow standard Next.js deployment guides for your platform.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting: `npm run lint`
4. Commit with conventional commits
5. Open a pull request

## 📄 License

Proprietary - Perkflow Inc.

## 🆘 Support

For issues or questions:

1. Check existing GitHub issues
2. Create a new issue with details
3. Contact the development team

---

Built with ❤️ by the Perkflow team
