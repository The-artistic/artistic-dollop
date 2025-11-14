# Farcaster Livescore Frame - GitHub-ready Starter

This repository is a minimal Next.js app (App Router) serving a Farcaster Frame (Livescore-style).
It includes:
- /api/frame -> returns fc:frame meta tags with a data URI image HTML
- /api/action -> handles button actions (Refresh / More Matches)
- pluggable providers (API-Football, GoalServe, generic)
- simple admin dashboard to edit leagues/teams (ephemeral in-memory for demo)
- multi-sport support (mocked; extend providers for real APIs)

## Quick local run

1. Install:
   npm install

2. Env (create .env.local):
   PROVIDER=mock
   SIGN_METHOD=hmac
   SECRET_SIGNING_KEY=replace_with_secret

3. Run:
   npm run dev
   Visit http://localhost:3000/api/frame

## Deploy on Vercel

1. Push to GitHub
2. Create new project on Vercel and connect the repo
3. Add Environment Variables on Vercel (see .env.sample)
4. Deploy. Use the production URL as the shared link in Warpcast.

