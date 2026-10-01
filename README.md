# Mandi Mitra

Mandi Mitra is a working design-review prototype for procurement visibility at India's MSP wheat/paddy centres. It models registration, slot booking, gate entry, quality check, Form-I verification, lifting, and payment using mock data.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. The Vite client runs on port 5173 and the Express mock API runs on port 3001.

## What is included

- Farmer dashboard with registered crop details, sale-lot tracking, stage timestamps, next-step ETA, queue-based estimated waits, centre schedules, and delay explanations.
- Five seeded farmers, two procurement centres, and lots spread across every major workflow stage. `KS-24-08177` demonstrates an explained rain delay.
- Staff view with centre capacity, queue context, farmer-facing notice preview, and a status update control for each tracked lot.
- In-app notifications plus a simulated SMS inbox. The inbox is intentionally formatted as the same plain-language update that could be sent through SMS or IVR.
- English, Hindi, Punjabi, Marathi, and Telugu labels for the farmer-facing shell. The language picker is available from the top bar.

## Mocked vs. production integration

The Express service in `server/index.js` is an in-memory adapter. Restarting the server resets the seed data. A production version should replace this adapter with:

- A government portal connector for E-Kharid, e-Uparjan, or the relevant state API.
- A persistent store for farmers, centres, lots, stage history, notices, and audit events.
- An authenticated staff workflow with role-based access and an audit trail for every status change.
- A real SMS/IVR provider such as Twilio or an Indian aggregator. The notification call should remain behind a notification service so it can be swapped without changing the React views.
- Verified Aadhaar/DBT payment status from the authorised payment system. This demo only displays a mocked `Verified` account marker and mocked payment stage.
- Government identity, consent, privacy, and grievance-redressal flows before handling real farmer or bank information.

## Product trade-offs

- The prototype uses a farmer/staff switch rather than full login so a reviewer can exercise both workflows quickly.
- Queue wait is a transparent heuristic (`queue / daily capacity * 60`) for the demo. It is not a promise of service time and should be replaced by centre-specific historical throughput and live batch data.
- The farmer view uses short labels, icons, stage numbers, and repeated plain-language explanations. A production rollout should add translated voice prompts, an assisted mode for local operators, and content review with farmers in each supported language.
- The UI is responsive and the SMS inbox illustrates graceful degradation, but true feature-phone interaction requires an IVR state machine, missed-call flow, delivery receipts, and retry handling.
- The app surfaces infrastructure reasons but does not claim to solve them. Staff still need to update the reason and ETA when weather, vehicles, or warehouse capacity changes.
