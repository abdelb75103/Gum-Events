# Repository Guidelines

## Project Overview
This is a Next.js App Router event platform built with Firebase/Genkit, Stripe, Tailwind CSS, Radix UI, and shadcn-style components.

## Project Structure
- `src/app/`: App Router routes and page layouts.
- `src/components/`: Reusable UI and feature components.
- `src/ai/`: Genkit AI flows and development entry points.
- `src/lib/` and `src/hooks/`: Shared utilities, data access, and React hooks.
- `skills/`: Local workflow guidance for project-specific agent tasks.
- `public/`: Images, videos, and static event assets.
- `docs/`: Project documentation.

## Source of Truth
- Public pages include `src/app/page.tsx`, `src/app/our-story/page.tsx`, `src/app/volunteer/page.tsx`, and policy pages.
- Form/server actions live in `src/app/actions.ts`.
- AI sentiment analysis lives in `src/ai/flows/analyze-contact-form-sentiment.ts`.
- App-level constants live in `src/app/config.ts`.
- This Documents copy differs from the Desktop copy; compare before porting route-specific changes between them.

## Commands
- `npm run dev`: Start Next.js with Turbopack.
- `npm run genkit:dev`: Start the Genkit development server.
- `npm run genkit:watch`: Start Genkit in watch mode.
- `npm run build`: Build the production app.
- `npm run lint`: Run Next.js linting.
- `npm run typecheck`: Run TypeScript without emitting files.

## Coding Guidelines
- Keep App Router patterns consistent: server code in server contexts, client components only where interactivity requires them.
- Prefer existing Radix/shadcn-style components and `lucide-react` icons before introducing new UI primitives.
- Keep Firebase, Stripe, and Genkit secrets in environment variables; do not commit credentials.
- For UI work, check desktop and mobile layout, overflow, spacing, and touch targets.
- Preserve existing public media paths when changing event content.
- Keep donation/contribution, volunteer, contact, and public content flows aligned with existing copy and community tone.
- If changing AI flows, keep prompt and schema changes close to the relevant Genkit flow file.

## Verification
- Run `npm run typecheck` and `npm run lint` for code changes.
- Run `npm run build` for routing, data, auth, Stripe, or deployment-sensitive changes.
- For AI flow changes, run the relevant Genkit dev command and test the affected flow manually.
- Manually review the home page, contribution success page, volunteer page, and contact form after user-facing edits.
