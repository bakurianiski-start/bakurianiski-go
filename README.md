# bakurianiski-go

BakurianiSki booking website built with React, TypeScript, and Vite.

## Development

```sh
cd app
npm ci
npm run dev
```

## Deployment

The site is configured for Netlify. Netlify builds the frontend from `app/` and serves the booking endpoint with a Netlify Function.

Configure these environment variables in Netlify:

- `RESEND_API_KEY`
- `BOOKING_EMAIL`
- `RESEND_FROM_EMAIL`
