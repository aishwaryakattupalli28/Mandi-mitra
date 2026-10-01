import express from 'express'
import { createServer } from 'node:http'

const app = express()
const server = createServer(app)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})
app.use(express.json())

const stages = ['Gate entry', 'Quality check', 'Form-I verification', 'Lifting', 'Payment']
const stageLabels = {
  'Gate entry': 'Gate Entry',
  'Quality check': 'Quality Check',
  'Form-I verification': 'Form-I Verification',
  Lifting: 'Lifting',
  Payment: 'Payment',
}

const farmers = [
  { id: 'F-1024', name: 'Sukhwinder Singh', village: 'Kheri Kalan', crop: 'Wheat · 4.2 acres', language: 'pa', phone: '+91 98••• 2146' },
  { id: 'F-1025', name: 'Sunita Devi', village: 'Bassi Pathana', crop: 'Wheat · 2.1 acres', language: 'hi', phone: '+91 97••• 8081' },
  { id: 'F-1026', name: 'Ramesh Patil', village: 'Nandgaon', crop: 'Wheat · 5.0 acres', language: 'mr', phone: '+91 91••• 4420' },
  { id: 'F-1027', name: 'Harpreet Kaur', village: 'Mullanpur', crop: 'Paddy · 3.6 acres', language: 'pa', phone: '+91 88••• 1907' },
  { id: 'F-1028', name: 'Mohan Lal', village: 'Samana', crop: 'Wheat · 1.8 acres', language: 'hi', phone: '+91 86••• 6732' },
]

const centres = [
  { id: 'C-01', name: 'Kheri Kalan Grain Mandi', shortName: 'Kheri Kalan', district: 'Patiala', capacity: 180, queue: 126, openDates: ['18 Sep', '19 Sep', '20 Sep'], weather: 'Clear', note: 'Running on schedule' },
  { id: 'C-02', name: 'Bassi Pathana Procurement Centre', shortName: 'Bassi Pathana', district: 'Fatehgarh Sahib', capacity: 120, queue: 148, openDates: ['18 Sep', '20 Sep', '21 Sep'], weather: 'Rain delay', note: 'Vehicles arriving late' },
]

const now = new Date()
const time = (hoursAgo) => new Date(now.getTime() - hoursAgo * 3600000).toISOString()

let lots = [
  { id: 'KS-24-08142', farmerId: 'F-1024', centreId: 'C-01', crop: 'Wheat · 42 quintal', currentStage: 'Form-I verification', eta: 'Today, 4:30 PM', delayReason: null, stageHistory: [
    { stage: 'Gate entry', at: time(28), done: true, note: 'Token 48 · 8:12 AM' }, { stage: 'Quality check', at: time(26), done: true, note: 'Moisture 11.8% · Passed' }, { stage: 'Form-I verification', at: time(3), done: false, note: 'In review by centre inspector' }, { stage: 'Lifting', at: null, done: false, note: 'Expected tomorrow' }, { stage: 'Payment', at: null, done: false, note: 'Within 48 hours of lifting' },
  ] },
  { id: 'KS-24-07903', farmerId: 'F-1024', centreId: 'C-01', crop: 'Wheat · 28 quintal', currentStage: 'Payment', eta: 'Paid · 12 Sep', delayReason: null, stageHistory: [
    { stage: 'Gate entry', at: time(120), done: true, note: 'Token 12' }, { stage: 'Quality check', at: time(118), done: true, note: 'Passed' }, { stage: 'Form-I verification', at: time(94), done: true, note: 'Approved' }, { stage: 'Lifting', at: time(72), done: true, note: 'Warehouse receipt WR-8821' }, { stage: 'Payment', at: time(48), done: true, note: '₹58,800 credited' },
  ] },
  { id: 'KS-24-08177', farmerId: 'F-1025', centreId: 'C-02', crop: 'Wheat · 19 quintal', currentStage: 'Gate entry', eta: '20 Sep · 9:00 AM', delayReason: 'Procurement pushed 2 days due to unseasonal rain. Your new slot is shown below.', stageHistory: [
    { stage: 'Gate entry', at: null, done: false, note: 'New slot · 20 Sep, 9:00 AM' }, { stage: 'Quality check', at: null, done: false, note: 'After gate entry' }, { stage: 'Form-I verification', at: null, done: false, note: 'After quality check' }, { stage: 'Lifting', at: null, done: false, note: 'Expected 22 Sep' }, { stage: 'Payment', at: null, done: false, note: 'Within 48 hours of lifting' },
  ] },
  { id: 'KS-24-08061', farmerId: 'F-1026', centreId: 'C-01', crop: 'Wheat · 51 quintal', currentStage: 'Lifting', eta: 'Today, 6:00 PM', delayReason: 'Two transport vehicles arrived late this morning. Your lot is first in the next lifting batch.', stageHistory: [
    { stage: 'Gate entry', at: time(74), done: true, note: 'Token 24' }, { stage: 'Quality check', at: time(72), done: true, note: 'Passed' }, { stage: 'Form-I verification', at: time(49), done: true, note: 'Approved' }, { stage: 'Lifting', at: time(4), done: false, note: 'Queue position 3 · Vehicle assigned' }, { stage: 'Payment', at: null, done: false, note: 'Within 48 hours of lifting' },
  ] },
  { id: 'KS-24-08088', farmerId: 'F-1027', centreId: 'C-02', crop: 'Paddy · 36 quintal', currentStage: 'Quality check', eta: 'Today, 2:00 PM', delayReason: null, stageHistory: [
    { stage: 'Gate entry', at: time(8), done: true, note: 'Token 67' }, { stage: 'Quality check', at: time(2), done: false, note: 'Sample at lab · Moisture test' }, { stage: 'Form-I verification', at: null, done: false, note: 'After quality check' }, { stage: 'Lifting', at: null, done: false, note: 'Expected tomorrow' }, { stage: 'Payment', at: null, done: false, note: 'Within 48 hours of lifting' },
  ] },
]

const notifications = [
  { id: 1, type: 'delay', title: 'A new delay reason was added', body: 'KS-24-08177 · Bassi Pathana is delayed by rain. New slot: 20 Sep.', at: '10 min ago', unread: true },
  { id: 2, type: 'status', title: 'Form-I verification started', body: 'KS-24-08142 is being reviewed by the centre inspector.', at: '2 hours ago', unread: true },
  { id: 3, type: 'info', title: 'Kheri Kalan has open capacity', body: 'Tomorrow has 54 estimated open slots.', at: 'Yesterday', unread: false },
]

app.get('/api/bootstrap', (req, res) => res.json({ farmers, centres, lots, notifications, stages }))
app.patch('/api/lots/:id/status', (req, res) => {
  const lot = lots.find((item) => item.id === req.params.id)
  if (!lot) return res.status(404).json({ error: 'Lot not found' })
  const { stage, delayReason, eta } = req.body
  if (!stages.includes(stage)) return res.status(400).json({ error: 'Unknown stage' })
  const currentIndex = stages.indexOf(stage)
  lot.currentStage = stage
  lot.eta = eta || lot.eta
  lot.delayReason = delayReason || null
  lot.stageHistory = lot.stageHistory.map((item, index) => ({ ...item, done: index < currentIndex || stage === 'Payment' && index <= currentIndex, at: index < currentIndex || stage === 'Payment' && index <= currentIndex ? item.at || new Date().toISOString() : item.at }))
  const current = lot.stageHistory[currentIndex]
  current.done = stage === 'Payment' ? true : current.done
  current.note = delayReason || current.note
  notifications.unshift({ id: Date.now(), type: delayReason ? 'delay' : 'status', title: delayReason ? 'Procurement delay explained' : `${stageLabels[stage]} updated`, body: `${lot.id} · ${delayReason || `Now at ${stageLabels[stage]}`}`, at: 'Just now', unread: true })
  res.json({ lot, notification: notifications[0] })
})
app.patch('/api/notifications/read', (req, res) => { notifications.forEach((notification) => { notification.unread = false }); res.json({ ok: true }) })

app.use(express.static('dist'))
server.listen(3001, () => console.log('Mandi Mitra API running on http://localhost:3001'))
