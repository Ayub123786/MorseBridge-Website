import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { initialBlogs, initialResources, initialEvents, initialPricing, initialFaqs } from './data/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'morsebridge_super_secure_secret_key_2026';

app.use(cors());
app.use(express.json());

// In-Memory Database Store (with initial seed data)
let db = {
  users: [
    {
      id: 'usr-1',
      name: 'Demo Founder',
      email: 'founder@morsebridge.com',
      password: 'password123',
      role: 'founder',
      company: 'Apex AI Systems',
      plan: 'Founder Pro',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    }
  ],
  blogs: [...initialBlogs],
  resources: [...initialResources],
  events: [...initialEvents],
  pricing: [...initialPricing],
  faqs: [...initialFaqs],
  submissions: [],
  advisoryBookings: [],
  subscribers: []
};

// Helper middleware for JWT Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// ================= API ROUTES =================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Morsebridge API', timestamp: new Date().toISOString() });
});

// --- Authentication Routes ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  // For easy testing, allow demo login or auto-create user if not found
  if (!user) {
    user = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email.toLowerCase(),
      password,
      role: 'founder',
      company: 'My Startup',
      plan: 'Community (Free)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    };
    db.users.push(user);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role, plan: user.plan },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      plan: user.plan,
      avatar: user.avatar
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, company, role } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    password,
    company: company || 'Startup',
    role: role || 'founder',
    plan: 'Community (Free)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role, plan: newUser.plan },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      company: newUser.company,
      plan: newUser.plan,
      avatar: newUser.avatar
    }
  });
});

app.post('/api/auth/reset-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  // Simulated email dispatch
  res.json({ message: 'Password reset link has been dispatched to your email address.' });
});

app.post('/api/auth/update-password', (req, res) => {
  const { token, newPassword } = req.body;
  if (!newPassword) return res.status(400).json({ error: 'New password is required' });
  res.json({ message: 'Password has been successfully updated.' });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    company: user.company,
    plan: user.plan,
    avatar: user.avatar
  });
});

// --- Blogs / Knowledge Hub Routes ---
app.get('/api/blogs', (req, res) => {
  const { category, search } = req.query;
  let results = [...db.blogs];

  if (category && category !== 'All') {
    results = results.filter(b => b.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json(results);
});

app.get('/api/blogs/:slug', (req, res) => {
  const blog = db.blogs.find(b => b.slug === req.params.slug);
  if (!blog) return res.status(404).json({ error: 'Article not found' });
  
  // Find related articles
  const related = db.blogs
    .filter(b => b.slug !== blog.slug && b.category === blog.category)
    .slice(0, 3);

  res.json({ ...blog, related });
});

// --- Resources Routes ---
app.get('/api/resources', (req, res) => {
  const { category, search } = req.query;
  let results = [...db.resources];

  if (category && category !== 'All') {
    results = results.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

// --- Events Routes ---
app.get('/api/events', (req, res) => {
  res.json(db.events);
});

app.post('/api/events/rsvp', (req, res) => {
  const { eventId, name, email, company, role, linkedin } = req.body;
  if (!eventId || !email || !name) {
    return res.status(400).json({ error: 'Event ID, name, and email are required' });
  }

  const rsvp = {
    id: `rsvp-${Date.now()}`,
    eventId,
    name,
    email,
    company,
    role,
    linkedin,
    timestamp: new Date().toISOString()
  };

  db.submissions.push({ type: 'EVENT_RSVP', data: rsvp });
  res.status(201).json({ message: 'RSVP received successfully! You will receive confirmation shortly.', rsvp });
});

// --- Advisory Booking Routes ---
app.post('/api/advisory/book', (req, res) => {
  const { name, email, startupName, roundTarget, message, preferredDate, stage } = req.body;
  if (!name || !email || !startupName) {
    return res.status(400).json({ error: 'Name, email, and startup name are required' });
  }

  const booking = {
    id: `adv-${Date.now()}`,
    name,
    email,
    startupName,
    roundTarget,
    stage: stage || 'Seed',
    message,
    preferredDate,
    status: 'Pending Review',
    createdAt: new Date().toISOString()
  };

  db.advisoryBookings.push(booking);
  res.status(201).json({ message: 'Advisory consultation request received. Our partner team will reach out within 24 hours.', booking });
});

// --- Startup Intake & Spotlight Submission Routes ---
app.post('/api/startups/apply', (req, res) => {
  const { founderName, email, companyName, website, pitchDeckUrl, targetAmount, sector, country, description } = req.body;
  if (!founderName || !email || !companyName) {
    return res.status(400).json({ error: 'Founder name, email, and company name are required' });
  }

  const submission = {
    id: `sub-${Date.now()}`,
    founderName,
    email,
    companyName,
    website,
    pitchDeckUrl,
    targetAmount,
    sector,
    country,
    description,
    status: 'Under Review',
    submittedAt: new Date().toISOString()
  };

  db.submissions.push({ type: 'STARTUP_APPLICATION', data: submission });
  res.status(201).json({ message: 'Application submitted successfully to Morsebridge venture committee.', submission });
});

app.post('/api/startups/get-featured', (req, res) => {
  const { founderName, email, companyName, metricGrowth, hookHeadline, logoUrl } = req.body;
  const featureRequest = {
    id: `feat-${Date.now()}`,
    founderName,
    email,
    companyName,
    metricGrowth,
    hookHeadline,
    logoUrl,
    status: 'Queued for Editorial',
    createdAt: new Date().toISOString()
  };

  db.submissions.push({ type: 'GET_FEATURED', data: featureRequest });
  res.status(201).json({ message: 'Spotlight feature request submitted.', featureRequest });
});

// --- Pricing & FAQs ---
app.get('/api/pricing', (req, res) => {
  res.json(db.pricing);
});

app.get('/api/faqs', (req, res) => {
  res.json(db.faqs);
});

// --- Newsletter Subscription ---
app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }

  if (!db.subscribers.includes(email.toLowerCase())) {
    db.subscribers.push(email.toLowerCase());
  }

  res.json({ message: 'Thank you for subscribing to Morsebridge Venture Dispatch.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Morsebridge MERN API Server is live on http://localhost:${PORT}`);
});
