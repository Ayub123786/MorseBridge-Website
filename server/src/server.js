import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { User, Submission, Subscriber } from './models.js';
import {
  initialBlogs,
  initialResources,
  initialEvents,
  initialPricing,
  initialFaqs,
  initialPodcasts,
  initialPartners,
  initialPastEvents,
  initialTestimonialShorts
} from './data/seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

// Ensure data directory exists on cloud hosts
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File persistence fallback helpers
function loadJsonFile(filepath, defaultValue) {
  try {
    if (fs.existsSync(filepath)) {
      const content = fs.readFileSync(filepath, 'utf8');
      if (content.trim()) {
        return JSON.parse(content);
      }
    }
  } catch (err) {
    console.error(`Error loading ${filepath}:`, err);
  }
  try {
    fs.writeFileSync(filepath, JSON.stringify(defaultValue, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${filepath}:`, err);
  }
  return defaultValue;
}

function saveJsonFile(filepath, data) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${filepath}:`, err);
  }
}

// Initial seed User
const defaultUsers = [
  {
    id: 'usr-1',
    name: 'Demo Founder',
    email: 'founder@morsebridge.com',
    password: 'password123',
    role: 'startup',
    company: 'Apex AI Systems',
    stage: 'Seed',
    targetRound: '$1M – $3M',
    plan: 'Founder Pro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    createdAt: new Date().toISOString()
  }
];

let persistedUsers = loadJsonFile(USERS_FILE, defaultUsers);
let persistedSubmissions = loadJsonFile(SUBMISSIONS_FILE, []);
let persistedSubscribers = loadJsonFile(SUBSCRIBERS_FILE, []);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'morsebridge_super_secure_jwt_secret_2026';
const MONGODB_URI = process.env.MONGODB_URI || '';

let isMongoConnected = false;

// Connect to MongoDB if URI is present
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB Atlas successfully!');
    })
    .catch((err) => {
      console.error('⚠️ MongoDB connection error:', err.message);
      console.log('🔄 Running on local JSON file persistence fallback.');
    });
} else {
  console.log('ℹ️ No MONGODB_URI found in .env — using local JSON file persistence.');
  console.log('👉 To connect MongoDB Atlas, add MONGODB_URI to server/.env');
}

app.use(cors());
app.use(express.json());

// In-Memory store fallback
let db = {
  users: persistedUsers,
  submissions: persistedSubmissions,
  subscribers: persistedSubscribers,
  blogs: [...initialBlogs],
  resources: [...initialResources],
  events: [...initialEvents],
  pricing: [...initialPricing],
  faqs: [...initialFaqs],
  podcasts: [...initialPodcasts],
  partners: [...initialPartners],
  pastEvents: [...initialPastEvents],
  testimonials: [...initialTestimonialShorts],
  advisoryBookings: []
};

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Morsebridge MERN API Server',
    databaseMode: isMongoConnected ? 'MongoDB Atlas (Live)' : 'Local File Persistence',
    dataStorage: {
      usersFile: USERS_FILE,
      submissionsFile: SUBMISSIONS_FILE,
      subscribersFile: SUBSCRIBERS_FILE,
      totalUsers: isMongoConnected ? 'stored in MongoDB' : db.users.length,
      totalSubmissions: isMongoConnected ? 'stored in MongoDB' : db.submissions.length
    },
    documentation: 'Access endpoints under /api (e.g. /api/users, /api/submissions, /api/events, /api/podcasts)'
  });
});

// Health check
app.get('/api/health', async (req, res) => {
  let userCount = db.users.length;
  let subCount = db.submissions.length;

  if (isMongoConnected) {
    try {
      userCount = await User.countDocuments();
      subCount = await Submission.countDocuments();
    } catch (e) {}
  }

  res.json({
    status: 'ok',
    service: 'Morsebridge API',
    database: isMongoConnected ? 'MongoDB Atlas' : 'Local JSON Files',
    timestamp: new Date().toISOString(),
    totalUsers: userCount,
    totalSubmissions: subCount
  });
});

// --- Data Inspection Endpoints (Protected by Admin Key) ---
app.get('/api/users', async (req, res) => {
  const adminKey = req.headers['x-admin-key'] || req.query.key;
  const expectedKey = process.env.ADMIN_KEY || 'morsebridge_admin_2026';

  if (adminKey !== expectedKey && process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Access denied: Valid x-admin-key header required.' });
  }

  if (isMongoConnected) {
    try {
      const users = await User.find().select('-password').sort({ createdAt: -1 });
      return res.json({
        count: users.length,
        storageMode: 'MongoDB Atlas',
        users
      });
    } catch (err) {
      console.error('Error querying MongoDB users:', err);
    }
  }

  const sanitizedUsers = db.users.map(({ password, ...rest }) => rest);
  res.json({
    count: sanitizedUsers.length,
    storageMode: 'Local JSON File',
    storageLocation: USERS_FILE,
    users: sanitizedUsers
  });
});

app.get('/api/submissions', async (req, res) => {
  const adminKey = req.headers['x-admin-key'] || req.query.key;
  const expectedKey = process.env.ADMIN_KEY || 'morsebridge_admin_2026';

  if (adminKey !== expectedKey && process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Access denied: Valid x-admin-key header required.' });
  }

  if (isMongoConnected) {
    try {
      const submissions = await Submission.find().sort({ createdAt: -1 });
      return res.json({
        count: submissions.length,
        storageMode: 'MongoDB Atlas',
        submissions
      });
    } catch (err) {
      console.error('Error querying MongoDB submissions:', err);
    }
  }

  res.json({
    count: db.submissions.length,
    storageMode: 'Local JSON File',
    storageLocation: SUBMISSIONS_FILE,
    submissions: db.submissions
  });
});

// --- Registration & User Intake Route ---
app.post('/api/auth/register', async (req, res) => {
  const {
    name,
    email,
    password,
    company,
    role,
    stage,
    sector,
    targetRound,
    checkSize,
    investorType,
    website,
    linkedin,
    notes
  } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const userData = {
    name,
    email: email.toLowerCase().trim(),
    company: company || (role === 'investor' ? 'Venture Fund' : 'Early Stage Startup'),
    role: role || 'startup',
    stage: stage || '',
    sector: sector || '',
    targetRound: targetRound || '',
    checkSize: checkSize || '',
    investorType: investorType || '',
    website: website || '',
    linkedin: linkedin || '',
    notes: notes || '',
    plan: 'Community (Free)',
  };

  // 1. Save to MongoDB if connected
  if (isMongoConnected) {
    try {
      let mongoUser = await User.findOne({ email: userData.email });
      if (mongoUser) {
        Object.assign(mongoUser, userData);
        await mongoUser.save();
      } else {
        mongoUser = await User.create(userData);
      }

      await Submission.create({
        type: role === 'investor' ? 'INVESTOR_REGISTRATION' : 'STARTUP_REGISTRATION',
        data: userData
      });

      return res.status(201).json({
        message: 'Registration saved successfully to MongoDB Atlas.',
        user: {
          id: mongoUser._id,
          name: mongoUser.name,
          email: mongoUser.email,
          role: mongoUser.role,
          company: mongoUser.company,
          stage: mongoUser.stage,
          targetRound: mongoUser.targetRound,
          checkSize: mongoUser.checkSize,
          createdAt: mongoUser.createdAt
        }
      });
    } catch (err) {
      console.error('MongoDB register save error:', err);
    }
  }

  // 2. Fallback to local JSON files
  const existing = db.users.find((u) => u.email.toLowerCase() === userData.email);
  if (existing) {
    Object.assign(existing, userData);
    existing.updatedAt = new Date().toISOString();
    saveJsonFile(USERS_FILE, db.users);

    return res.status(200).json({
      message: 'User profile updated and recorded successfully.',
      user: existing
    });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    ...userData,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveJsonFile(USERS_FILE, db.users);

  const leadSubmission = {
    id: `sub-${Date.now()}`,
    type: role === 'investor' ? 'INVESTOR_REGISTRATION' : 'STARTUP_REGISTRATION',
    data: newUser,
    timestamp: new Date().toISOString()
  };
  db.submissions.push(leadSubmission);
  saveJsonFile(SUBMISSIONS_FILE, db.submissions);

  res.status(201).json({
    message: 'Registration recorded successfully in the database.',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      company: newUser.company,
      stage: newUser.stage,
      targetRound: newUser.targetRound,
      checkSize: newUser.checkSize,
      createdAt: newUser.createdAt
    }
  });
});

// --- Login Route ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const cleanEmail = email.toLowerCase().trim();
  let user = null;

  if (isMongoConnected) {
    try {
      user = await User.findOne({ email: cleanEmail });
    } catch (e) {}
  }

  if (!user) {
    user = db.users.find((u) => u.email.toLowerCase() === cleanEmail);
  }

  if (!user) {
    user = {
      id: `usr-${Date.now()}`,
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      role: 'startup',
      company: 'My Startup',
      plan: 'Community (Free)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      try {
        const created = await User.create(user);
        user.id = created._id;
      } catch (e) {}
    } else {
      db.users.push(user);
      saveJsonFile(USERS_FILE, db.users);
    }
  }

  const token = jwt.sign(
    { id: user.id || user._id, email: user.email, name: user.name, role: user.role, plan: user.plan },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      plan: user.plan,
      avatar: user.avatar
    }
  });
});

// --- Public Endpoints (Blogs, Resources, Events, Podcasts) ---
app.get('/api/blogs', (req, res) => {
  const { category, search } = req.query;
  let results = [...db.blogs];

  if (category && category !== 'All') {
    results = results.filter((b) => b.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  res.json(results);
});

app.get('/api/blogs/:slug', (req, res) => {
  const blog = db.blogs.find((b) => b.slug === req.params.slug);
  if (!blog) return res.status(404).json({ error: 'Article not found' });

  const related = db.blogs.filter((b) => b.slug !== blog.slug && b.category === blog.category).slice(0, 3);

  res.json({ ...blog, related });
});

app.get('/api/resources', (req, res) => {
  res.json(db.resources);
});

app.get('/api/events', (req, res) => {
  res.json(db.events);
});

app.get('/api/podcasts', (req, res) => {
  res.json(db.podcasts);
});

app.get('/api/partners', (req, res) => {
  res.json(db.partners);
});

app.get('/api/past-events', (req, res) => {
  res.json(db.pastEvents);
});

app.get('/api/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/api/pricing', (req, res) => {
  res.json(db.pricing);
});

app.get('/api/faqs', (req, res) => {
  res.json(db.faqs);
});

// --- Newsletter Subscription ---
app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }

  const cleanEmail = email.toLowerCase().trim();

  if (isMongoConnected) {
    try {
      await Subscriber.findOneAndUpdate({ email: cleanEmail }, { email: cleanEmail }, { upsert: true });
    } catch (e) {}
  }

  if (!db.subscribers.includes(cleanEmail)) {
    db.subscribers.push(cleanEmail);
    saveJsonFile(SUBSCRIBERS_FILE, db.subscribers);
  }

  res.json({ message: 'Thank you for subscribing to Morsebridge Venture Dispatch.' });
});

// ============================================================================
// ADMIN PANEL API ENDPOINTS
// ============================================================================
const ADMIN_KEY = process.env.ADMIN_KEY || 'morsebridge_admin_2026';

function verifyAdminAuth(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.adminKey;
  const authHeader = req.headers.authorization;
  if (key && key === ADMIN_KEY) return next();
  if (authHeader) {
    try {
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded && (decoded.role === 'admin' || decoded.email.includes('admin'))) return next();
    } catch (e) {}
  }
  return res.status(401).json({ error: 'Unauthorized: Valid Admin Key Required' });
}

// 1. Verify Admin Passcode
app.post('/api/admin/verify', (req, res) => {
  const { key } = req.body;
  if (key === ADMIN_KEY) {
    return res.json({ success: true, message: 'Admin authentication verified' });
  }
  return res.status(401).json({ success: false, error: 'Invalid admin passcode' });
});

// 2. Admin Real-Time Overview & Stats
app.get('/api/admin/stats', verifyAdminAuth, async (req, res) => {
  try {
    let allUsers = [];
    let allSubmissions = [];
    let allSubscribers = [];

    if (isMongoConnected) {
      allUsers = await User.find({}).sort({ createdAt: -1 }).lean();
      allSubmissions = await Submission.find({}).sort({ createdAt: -1 }).lean();
      allSubscribers = await Subscriber.find({}).sort({ createdAt: -1 }).lean();
    } else {
      allUsers = db.users || [];
      allSubmissions = db.submissions || [];
      allSubscribers = (db.subscribers || []).map(s => typeof s === 'string' ? { email: s } : s);
    }

    const totalUsers = allUsers.length;
    const startups = allUsers.filter(u => (u.role || '').toLowerCase() === 'startup');
    const investors = allUsers.filter(u => (u.role || '').toLowerCase() === 'investor');
    const totalSubmissions = allSubmissions.length;
    const totalSubscribers = allSubscribers.length;

    // Stage breakdown
    const stageCounts = {};
    startups.forEach(s => {
      const st = s.stage || 'Unspecified';
      stageCounts[st] = (stageCounts[st] || 0) + 1;
    });

    // Check size breakdown
    const checkSizeCounts = {};
    investors.forEach(i => {
      const cs = i.checkSize || i.ticketSize || 'Unspecified';
      checkSizeCounts[cs] = (checkSizeCounts[cs] || 0) + 1;
    });

    res.json({
      totalUsers,
      totalStartups: startups.length,
      totalInvestors: investors.length,
      totalSubmissions,
      totalSubscribers,
      stageCounts,
      checkSizeCounts,
      database: isMongoConnected ? 'MongoDB Atlas Cloud' : 'Local JSON Store'
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ error: 'Failed to aggregate admin statistics' });
  }
});

// 3. Admin Get All Users
app.get('/api/admin/users', verifyAdminAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      const users = await User.find({}).sort({ createdAt: -1 }).lean();
      return res.json(users);
    }
    res.json(db.users || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users from database' });
  }
});

// 4. Admin Get All Form Submissions / Lead Intakes
app.get('/api/admin/submissions', verifyAdminAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      const submissions = await Submission.find({}).sort({ createdAt: -1 }).lean();
      return res.json(submissions);
    }
    res.json(db.submissions || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch form submissions from database' });
  }
});

// 5. Admin Get All Subscribers
app.get('/api/admin/subscribers', verifyAdminAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      const subs = await Subscriber.find({}).sort({ createdAt: -1 }).lean();
      return res.json(subs);
    }
    const subs = (db.subscribers || []).map((s, idx) => ({
      _id: `sub-${idx}`,
      email: typeof s === 'string' ? s : s.email,
      createdAt: new Date().toISOString()
    }));
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

// 6. Admin Delete User
app.delete('/api/admin/users/:id', verifyAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await User.findByIdAndDelete(id);
    }
    db.users = db.users.filter(u => (u._id || u.id) !== id);
    saveJsonFile(USERS_FILE, db.users);
    res.json({ success: true, message: 'User record deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Serve built frontend assets in production if client/dist exists
const CLIENT_DIST = path.join(__dirname, '../../client/dist');
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(CLIENT_DIST, 'index.html'));
  });
}

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Morsebridge MERN API Server is live on http://0.0.0.0:${PORT}`);
  if (MONGODB_URI) {
    console.log(`🍃 Database: MongoDB Atlas Cloud (Collections: users, submissions, subscribers)`);
  } else {
    console.log(`📁 Local Storage: ${USERS_FILE}`);
  }
});
