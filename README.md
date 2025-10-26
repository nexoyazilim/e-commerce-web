# E-Commerce Demo

A modern, responsive e-commerce demo built with React, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, and i18next.

## Features

- 🎨 Modern UI with Tailwind CSS v4
- 🌐 Bilingual support (English/Turkish)
- 🛍️ Shopping cart with persistence
- ⭐ Favorites system
- 📱 Fully responsive design
- 🎭 Smooth animations with Framer Motion
- 🎯 TypeScript for type safety
- 🔒 Security hardened with input sanitization
- 🛡️ Error boundaries for crash prevention
- ♿ Accessibility improvements

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI components
- **Radix UI** - Accessible primitives
- **react-i18next** - Internationalization
- **Zustand** - State management
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit <http://localhost:5173>

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/     # Reusable components
│   ├── layout/     # Header, Layout
│   ├── product/    # ProductCard
│   └── ui/         # shadcn components
├── data/           # Static JSON data
├── i18n.ts         # i18n configuration
├── lib/            # Utilities
├── locales/        # Translation files
├── pages/          # Page components
├── stores/         # Zustand stores
└── types/          # TypeScript types
```

## Features Implemented

- ✅ Homepage with hero section, categories, and featured products
- ✅ Product listing page with grid/list view toggle
- ✅ Product detail page (basic)
- ✅ Shopping cart with persistence
- ✅ Favorites system
- ✅ Language toggle (EN/TR)
- ✅ Responsive design
- ✅ Smooth animations

## Production Readiness

### Security Status

This application includes:

- ✅ **Input Sanitization**: All user inputs are sanitized using DOMPurify
- ✅ **Error Boundaries**: Prevents entire app crashes
- ✅ **XSS Protection**: Sanitized HTML output
- ✅ **CSRF Tokens**: Form submission protection
- ✅ **Security Headers**: Content Security Policy configured
- ✅ **URL Validation**: External links validated

### Important Notes

⚠️ **Mock Authentication**: The current authentication system is for development only. Before deploying to production:

1. Implement real authentication with a secure backend
2. Disable mock auth by setting `VITE_ENABLE_MOCK_AUTH=false`
3. Set up proper API endpoints for all data operations
4. Configure CORS and security headers on your server
5. Add rate limiting for API requests
6. Implement proper session management

### Environment Variables

Create a `.env` file from `.env.example`:

```bash
# Environment: development | production
VITE_ENV=development

# WARNING: Never enable in production!
VITE_ENABLE_MOCK_AUTH=true

# Your backend API URL
VITE_API_URL=
```

### Security Checklist

Before deploying to production:

- [ ] Replace mock authentication with real auth provider
- [ ] Configure proper CORS on backend
- [ ] Set up environment variables in hosting platform
- [ ] Enable HTTPS only
- [ ] Configure CSP headers for your domain
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Implement rate limiting
- [ ] Add input validation on backend
- [ ] Set up database security
- [ ] Configure secure cookies for sessions

## CI/CD

This project includes a complete CI/CD pipeline using GitHub Actions.

### Workflows

- **CI** (`.github/workflows/ci.yml`): Runs on every push/PR with linting, type checking, and tests
- **Deploy** (`.github/workflows/deploy.yml`): Auto-deploys to production on main branch
- **PR Checks** (`.github/workflows/pr.yml`): Quality gates for pull requests
- **Release** (`.github/workflows/release.yml`): Automated releases on version tags
- **Dependencies** (`.github/workflows/update-dependencies.yml`): Weekly dependency updates

### Setup

1. Add required secrets to your GitHub repository
2. See `CI_CD_SETUP.md` for detailed configuration
3. See `DEPLOYMENT_GUIDE.md` for deployment options

### Quick Deploy

The pipeline automatically deploys on push to `main`. Configure your deployment platform:

**Vercel** (Recommended):

```bash
# Add to GitHub Secrets:
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

**Netlify**:

```bash
# Add to GitHub Secrets:
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
```

## Future Enhancements

- Real backend integration
- Payment gateway integration
- User authentication with JWT
- Product filtering/sorting
- Advanced search functionality
- Reviews and ratings system
- User profile management
- Order tracking
- Email notifications
- Admin dashboard

## Documentation

- [CI/CD Setup Guide](./CI_CD_SETUP.md) - Complete CI/CD configuration
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Deployment instructions
- [Changelog](./CHANGELOG.md) - Version history
- [Optimization Report](./PERFORMANCE_OPTIMIZATION_REPORT.md) - Performance improvements

## License

MIT
