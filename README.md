# Mandi Mitra

Mandi Mitra is a simple procurement visibility app for farmers and mandi staff. It helps users track crop lots, understand queue status, book tokens, and receive clear updates about delays.

## Live Demo

Open the deployed app:

https://mandi-mitra-5eg459m5i-aishwaryakattupalli28-5787s-projects.vercel.app

## Features

- Farmer dashboard with crop and sale-lot status
- Step-by-step tracking from gate entry to payment
- Token booking and procurement centre schedules
- Queue and estimated wait information
- Delay explanations and next-step ETAs
- Staff view for updating lot status
- Simulated SMS inbox and notifications
- English, Hindi, Punjabi, Marathi, and Telugu labels
- Responsive layout for desktop and mobile

## Run Locally

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

The Vite frontend runs on port `5173`. The Express mock API runs on port `3001`.

## Technology

- React
- Vite
- Express
- Lucide React
- Vercel deployment

## Demo Note

This project uses mock, in-memory data for demonstration. Data resets whenever the API server restarts. It is not connected to a real government procurement, payment, SMS, or IVR system.
