# FlowvaHub Rewards — Assessment Submission

This repository contains the FlowvaHub Rewards UI implemented with React + TypeScript and Supabase for backend/auth. This README documents the work completed for the React Full-Stack Developer assessment, why decisions were made, how Supabase is used, and how to run and deploy the project.

**Live demo (deployed):** https://flowvahub-reward-self.vercel.app/

**GitHub repo:** https://github.com/Peculiars/flowvahub-reward

## Summary of work

- Recreated the Rewards page UI and flows from FlowvaHub.
- Implemented authentication using Supabase Auth (sign-up, sign-in, session persistence).
- Implemented reward listing, claiming flow, and claim verification using Supabase (database queries and inserts).
- Handled loading, empty, and error states across UI.
- Kept component architecture modular and reusable (`components/`, `pages/`, `services/`, `store/`).

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Supabase (Auth + Postgres)
- Zustand for client state

## What I implemented (high level)

- Authentication: Sign-up / Sign-in flows use Supabase GoTrue via `src/lib/supabase.ts`.
- Rewards listing: fetched from a `rewards` table; results are rendered in `RewardCard` components.
- Claiming flow: user triggers a claim which inserts a row into a `claims` table and updates balances atomically where needed (see `services/rewardsService.ts`).
- Onboarding & dashboard UI: preserved from the starter code and adapted to use real data flows.

## Key implementation points and justification

- Direct Supabase usage: All auth and DB operations are executed from the frontend as requested. This keeps the assessment focused on correct query usage and client-side handling.
- Atomicity and data consistency: Claim flows are designed to first verify the user's `points` balance (from `profiles`) and then perform an insert to `claims`. In production I'd use RLS policies and server-side functions (or Postgres transactions / RPC) to enforce atomic updates — but for this assessment I kept logic in the client with careful pre-checks and clear error handling.
- Security: RLS policies should be added in Supabase to ensure users can only insert claims for themselves and read necessary data. Because auth is handled client-side, RLS + policies are required in production; I documented the need to enable them in the project notes.
- Component structure: UI split into small components (`RewardCard`, `ClaimVerificationModal`, `PointsBalanceCard`) to improve reusability and testability.
- Loading and error states: All async flows expose `loading`, `success`, and `error` UI states. Empty lists show contextual messaging and CTA to earn points.

## How to run locally

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Create the tables belowe in your Supabase project (SQL editor).

4. Run the dev server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

6. Preview the production build

```bash
npm run preview
```

## Environment variables

- `VITE_SUPABASE_URL` — your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — your Supabase anon/public key

These are consumed in `src/lib/supabase.ts`.

## Notes on assumptions and trade-offs

- Timebox: This assessment was implemented under a time constraint. I prioritized accurate UI reproduction, working claim flows, auth, and clean component structure over advanced features (webhooks, email notifications, complete onboarding steps etc).
- Client-side logic vs server-side: For simplicity the app performs verification checks on the client before claiming. In production, a server-side transaction or Postgres function would be used, combined with RLS.
- Error handling: Standardized UI feedback is implemented; for production I'd add centralized error logging (Sentry) and more granular user messaging.

## Testing & verification

- Manual flows tested: sign-up, sign-in, reward listing, claim creation, claim UI states.
- Automated tests: None included in this assessment to keep scope focused. If you prefer, I can add a small Jest + React Testing Library suite for core flows.

## Deployment

- Any static-hosting provider supporting Vite builds works (Netlify, Vercel, Cloudflare Pages). Add the `VITE_` env vars in the deployment settings.


